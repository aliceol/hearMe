import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

export default class EditEmail extends Component {
  static navigationOptions = {
    headerBackTitle: null,
    headerLeftContainerStyle: { paddingLeft: 10 },
    headerTintColor: "white",
    title: "Edit Email",
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
        <Text style={styles.instructions}>
          Your email address is used to log in to HearMe and for password
          recovery.
        </Text>
        <TextInput
          placeholderTextColor="black"
          placeholder="current_email"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        <Text style={styles.subinfo}>
          We will not expose your email address to other users on HearMe or send
          you junk mail.
        </Text>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  input: {
    backgroundColor: "lightgrey",
    color: "black",
    padding: 15
  },
  subinfo: {
    fontSize: 12,
    padding: 15,
    color: "#7f8c8d"
  },
  instructions: {
    padding: 25,
    textAlign: "center"
  }
});
