import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
export default class AccountInformation extends Component {
  static navigationOptions = {
    title: "AccountInformation"
  };
  render() {
    return (
      <View>
        <Text>This is the AccountInformation Page</Text>
        <TouchableOpacity
          style={{ marginTop: 100 }}
          onPress={() => {
            this.props.navigation.navigate("AllowNotificationScreen");
          }}
        >
          <Text style={{ fontSize: 30 }}>Go To AllowNotificationScreen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
