import React, { Component } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput
} from "react-native";

export default class SignUp extends Component {
  state = {
    userName: "",
    email: "",
    password: "",
    passwordtwo: "",
    btnNextDisable: true
  };

  onChange = (key, value) => {
    this.setState(
      {
        [key]: value
      },
      () => {
        const { userName, email, password, passwordtwo } = this.state;
        if (
          userName.length >= 3 &&
          email.length >= 3 &&
          password.length >= 3 &&
          passwordtwo === password
        ) {
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
    title: "Sign Up",
    headerStyle: {
      backgroundColor: "#0084ff"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.signupInfo}>
          Please enter the following information to create your HearMe account
          and start exploring concerts nearby!
        </Text>
        <View style={styles.allInputs}>
          <TextInput
            value={this.state.userName}
            onChangeText={text => this.onChange("userName", text)}
            placeholderTextColor="#ecf0f1"
            returnKeyType="next"
            onSubmitEditing={() => this.email.focus()}
            placeholder="username"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />

          <TextInput
            value={this.state.email}
            onChangeText={text => this.onChange("email", text)}
            placeholderTextColor="#ecf0f1"
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            ref={input => (this.email = input)}
            keyboardType="email-address"
            placeholder="email"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
          <TextInput
            onSubmitEditing={() => this.passwordTwoInput.focus()}
            value={this.state.password}
            onChangeText={text => this.onChange("password", text)}
            placeholderTextColor="#ecf0f1"
            secureTextEntry={true}
            returnKeyType="next"
            placeholder="password"
            style={styles.input}
            ref={input => (this.passwordInput = input)}
          />
          <TextInput
            value={this.state.passwordtwo}
            onChangeText={text => this.onChange("passwordtwo", text)}
            placeholderTextColor="#ecf0f1"
            secureTextEntry={true}
            returnKeyType="go"
            placeholder="please repeat your password"
            style={styles.input}
            ref={input => (this.passwordTwoInput = input)}
          />
          <View style={styles.nextContainer}>
            {!this.state.btnNextDisable ? (
              <TouchableOpacity
                disabled={this.state.btnNextDisable}
                style={styles.nextButton}
                onPress={() => {
                  axios
                    .post("https://hearme-api.herokuapp.com/api/user/sign_up", {
                      userName: this.state.userName,
                      email: this.state.email,
                      password: this.state.password
                    })
                    .then(response => {
                      if (response.data && response.data.token) {
                        this.props.navigation.navigate("TabScreen");
                        console.log(response.data);
                      }
                    })
                    .catch(err => {
                      console.log(err.response);
                      if (err.response.status === 400) {
                        alert("E-mail or username already registered");
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
    backgroundColor: "#0084ff",
    borderRadius: 4,
    marginBottom: 15,
    color: "white",
    padding: 10
  }
});
