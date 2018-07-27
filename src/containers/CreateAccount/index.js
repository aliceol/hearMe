import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
export default class CreateAccount extends Component {
  static navigationOptions = {
    title: "CreateAccount"
  };
  render() {
    return (
      <View>
        <Text>This is the CreateAccount Page</Text>
        <TouchableOpacity
          style={{ marginTop: 100 }}
          onPress={() => {
            this.props.navigation.navigate("AccountInformationScreen");
          }}
        >
          <Text style={{ fontSize: 30 }}>Go To AccountInformationScreen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
