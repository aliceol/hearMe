import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
export default class MyCalendar extends Component {
  static navigationOptions = {
    title: "MyCalendar"
  };
  render() {
    return (
      <View>
        <Text>This is the MyCalendar Page</Text>
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
