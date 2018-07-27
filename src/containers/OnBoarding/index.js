import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
export default class OnBoarding extends Component {
  static navigationOptions = {
    title: "OnBoarding"
  };
  render() {
    return (
      <View>
        <Text>This is the OnBoarding Page</Text>
        <TouchableOpacity
          style={{ marginTop: 100 }}
          onPress={() => {
            this.props.navigation.navigate("CreateAccountScreen");
          }}
        >
          <Text style={{ fontSize: 30 }}>Go To CreateAccountScreen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
