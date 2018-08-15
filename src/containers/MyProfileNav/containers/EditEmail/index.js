import React, { Component } from "react";
import store from "react-native-simple-store";
import axios from "axios";

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
    title: "Edit email",
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
          onPress={() => {
            store.get("userToken").then(res => {
              const config = {
                headers: {
                  Authorization: "Bearer " + res.token
                }
              };
              console.log(config);
              axios
                .post(
                  "https://hearme-api.herokuapp.com/api/user/changeMyEmail",
                  {
                    email: this.state.email
                  },
                  config
                )
                .then(response => {
                  console.log(response.data);
                  if (response.data) {
                    store.save("email", {
                      email: this.state.email
                    });
                    this.props.navigation.navigate("MyProfile", {});
                  }
                });
            });
          }}
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
          Please enter a new email and hit save
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
