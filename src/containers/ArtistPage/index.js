import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
export default class AllowNotification extends Component {
  static navigationOptions = {
    title: "AllowNotification"
  };
  render() {
    return (
      <View>
        <Text>This is the AllowNotification Page</Text>
        <TouchableOpacity
          style={{ marginTop: 100 }}
          onPress={() => {
            this.props.navigation.navigate("AllowGeolocalisationScreen");
          }}
        >
          <Text style={{ fontSize: 30 }}>Go To AllowGeolocalisationScreen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
