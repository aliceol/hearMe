import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
export default class MySettings extends Component {
  static navigationOptions = {
    title: "MySettings"
  };
  render() {
    return (
      <View>
        <Text>This is the MySettings Page</Text>
        <TouchableOpacity
          style={{ marginTop: 100 }}
          onPress={() => {
            this.props.navigation.navigate("label");
          }}
        >
          <Text style={{ fontSize: 30 }}>Go To label</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
