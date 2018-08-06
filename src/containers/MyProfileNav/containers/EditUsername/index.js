import React, { Component } from "react";
import {
  StyleSheet,
  Keyboard,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";

export default class EditUsername extends Component {
  static navigationOptions = {
    headerBackTitle: null,
    headerLeftContainerStyle: { paddingLeft: 10 },
    headerTintColor: "white",
    title: "Edit Username",
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
          Please enter your username and hit save
        </Text>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          keyboardVerticalOffset={64}
        >
          <TextInput
            placeholderTextColor="black"
            placeholder="current_username"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={Keyboard.dismiss}
          >
            <Text style={styles.buttonText}>SAVE</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  input: {
    backgroundColor: "lightgrey",
    color: "black",
    padding: 15
  },
  instructions: {
    padding: 25,
    textAlign: "center"
  },
  buttonContainer: {
    backgroundColor: "#2980b9",

    padding: 15,
    width: "100%"
  },

  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "700"
  }
});
