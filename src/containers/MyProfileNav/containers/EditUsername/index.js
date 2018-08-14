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

export default class EditUsername extends Component {
  state = {
    userName: "",
    btnSaveDisable: true
  };

  componentDidMount() {
    store.get("userName").then(res => {
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
              axios
                .post(
                  "https://hearme-api.herokuapp.com/api/user/changeMyUserName",
                  config,
                  {
                    userName: this.state.userName
                  }
                )
                .then(response => {
                  console.log(response.data);
                  if (response.data) {
                    // store.save("userName", {
                    //   userName: this.state.userName
                    // });
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
