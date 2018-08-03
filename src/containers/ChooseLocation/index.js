import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

export default class ChooseLocation extends Component {
  static navigationOptions = {
    headerLeftContainerStyle: { paddingLeft: 10 },
    headerTintColor: "white",
    title: "Location",
    headerStyle: {
      backgroundColor: "#3498db"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  render() {
    return (
      <React.Fragment>
        <Text>Here you can change your location</Text>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
