import React, { Component } from 'react';
import { View, Text, Modal, Button } from 'react-native';
import { WebView } from 'react-native-webview';

export default class Paypal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        paypalModalVisible: false,
    };
  }

    _paypalToggleModal = () => {
        this.setState({ paypalModalVisible: !this.state.isModalVisible })
    }
      handleResponse = data => {
    if (data.title === "success") {
      this.setState({ paypalModalVisible: !this.state.paypalModalVisible }, () => alert('Status is success'));
    } else if (data.title === "cancel") {
      this.setState({ paypalModalVisible: !this.state.paypalModalVisible }, () => alert('Status is cancel'));
    } else {
      return;
    }
  };


  render() {
    return (
      <View>
        <Text> Paypal </Text>
            <Modal visible={this.state.paypalModalVisible} onRequestClose={this._paypalToggleModal}>
                <WebView
                    source={{ uri: 'http://localhost:4050' }}
                injectedJavaScript={`document.f1.submit()`}
                onNavigationStateChange={data => {
                  this.handleResponse(data)
                }}
                />
                <Button
                    onPress={this._paypalToggleModal}
                    title = 'Back'
                />
                
            </Modal>
            <Button title='Pay with paypal' 
            onPress={this._paypalToggleModal}
            />
      </View>
    );
  }
}
