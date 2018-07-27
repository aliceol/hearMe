import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
export default class EventPage extends Component {
  static navigationOptions = {
    title: "EventPage"
  };
  render() {
    return (
      <View>
        <Text>This is the EventPage Page</Text>
      </View>
    );
  }
}
