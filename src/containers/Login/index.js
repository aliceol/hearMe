import React, { Component } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    btnNextDisable: true
  };

  onChange = (key, value) => {
    this.setState(
      {
        [key]: value
      },
      () => {
        const { email, password } = this.state;
        if (email.length >= 3 && password.length >= 3) {
          this.setState({
            btnNextDisable: false
          });
        } else {
          this.setState({
            btnNextDisable: true
          });
        }
      }
    );
  };
  static navigationOptions = {
    headerBackTitle: null,

    headerLeftContainerStyle: { paddingLeft: 10 },
    headerTintColor: "white",
    title: "Login",
    headerStyle: {
      backgroundColor: "#2d3436"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.signupInfo}>
          Please Login to HearMe to explore concerts nearby
        </Text>
        <View style={styles.allInputs}>
          <TextInput
            value={this.state.email}
            onChangeText={text => this.onChange("email", text)}
            placeholderTextColor="#ecf0f1"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            keyboardType="email-address"
            placeholder="email"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            ref={input => (this.email = input)}
          />
          <TextInput
            value={this.state.password}
            onChangeText={text => this.onChange("password", text)}
            placeholderTextColor="#ecf0f1"
            secureTextEntry={true}
            returnKeyType="go"
            placeholder="password"
            style={styles.input}
            ref={input => (this.passwordInput = input)}
          />
          <View style={styles.nextContainer}>
            {!this.state.btnNextDisable ? (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => {
                  axios
                    .post("https://hearme-api.herokuapp.com/api/user/log_in", {
                      email: this.state.email,
                      password: this.state.password
                    })
                    .then(response => {
                      if (response.data && response.data.token) {
                        this.props.navigation.navigate("HomePage");
                        console.log(response.data);
                      }
                    })
                    .catch(err => {
                      console.log(err.response.status);
                      if (err.response.status === 401) {
                        alert("Wrong password");
                      } else if (err.response.status === 400) {
                        alert("User not found. Please check your credentials");
                      }
                    });
                }}
              >
                <Text style={styles.textNextButton}>Next</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  signupInfo: {
    fontSize: 15,
    margin: 20,
    textAlign: "justify",
    lineHeight: 25
  },
  allInputs: {
    padding: 20
  },

  nextContainer: {
    alignItems: "flex-end"
  },
  nextButton: {
    backgroundColor: "#2980b9",

    padding: 15,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 2,
    width: 80
  },
  textNextButton: {
    textAlign: "center",
    color: "white",
    fontWeight: "500"
  },
  input: {
    height: 44,
    backgroundColor: "#2d3436",
    borderRadius: 4,
    marginBottom: 15,
    color: "white",
    padding: 10
  }
});
