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

export default class EditUsername extends Component {
  state = {
    userName: "",

    btnSaveDisable: true
  };

  componentDidMount() {
    store.get("userName").then(res => {
      console.log(res.userName);
      this.setState({
        userName: res.userName
      });
    });
  }

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

  onChange = (key, value) => {
    console.log("Hello 2");
    this.setState(
      {
        [key]: value
      },
      () => {
        const { userName } = this.state;
        if (userName.length >= 1) {
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
    if (this.state.userName.length >= 1) {
      console.log(this.state.userName.length);

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
    console.log("Hello 1");

    return (
      <View>
        <Text style={styles.instructions}>
          Please enter your username and hit save
        </Text>

        <TextInput
          value={this.state.userName}
          onChangeText={text => {
            this.onChange("userName", text);
          }}
          placeholderTextColor="black"
          placeholder={this.state.userName}
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
