import React, { Component } from "react";
import store from "react-native-simple-store";

import {
  StyleSheet,
  Keyboard,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";

export default class EditEmail extends Component {
  state = {
    email: "",

    btnSaveDisable: true
  };

  componentDidMount() {
    store.get("email").then(res => {
      this.setState({
        email: res.email
      });
    });
  }

  static navigationOptions = {
    headerBackTitle: null,
    headerLeftContainerStyle: { paddingLeft: 10 },
    headerTintColor: "white",
    title: "Edit E-mail",
    headerStyle: {
      backgroundColor: "#3498db"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  onChange = (key, value) => {
    this.setState(
      {
        [key]: value
      },
      () => {
        const { email } = this.state;
        if (email.length >= 1) {
          this.setState({
            btnSaveDisable: false
          });
        } else {
          this.setState({
            btnSaveDisable: true
          });
        }
      }
    );
  };

  renderBtn() {
    if (this.state.email.length >= 1) {
      return (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={Keyboard.dismiss}
        >
          <Text style={styles.buttonText}>SAVE</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.instructions}>
          Please enter a new e-mail address and hit save
        </Text>

        <TextInput
          value={this.state.email}
          onChangeText={text => {
            this.onChange("email", text);
          }}
          placeholderTextColor="black"
          placeholder={this.state.email}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
        />
        {this.renderBtn()}
      </View>
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
