import React, { Component } from "react";
import axios from "axios";
import store from "react-native-simple-store";
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
    btnNextDisable: true /* ,
    validEmail: true,
    emailIsFocused: false */
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
        /* if (!test.state.validEmail && !this.state.emailIsFocused) {
          this.setState({ validEmail: false });
        } */
      }
    );
  };
  static navigationOptions = {
    headerBackTitle: null,

    headerLeftContainerStyle: { paddingLeft: 10 },
    headerTintColor: "white",
    title: "Login",
    headerStyle: {
      backgroundColor: "#44bec7"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  /*   handleInputFocus = () => this.setState({ emailIsFocused: true });

  handleInputBlur = () => {
    this.setState({
      emailIsFocused: false,
      validEmail: validateEmail(this.state.email)
    });
  };

  validateEmail = mail => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(mail);
  }; */

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
            onFocus={this.handleInputFocus}
            onBlur={this.handleInputBlur}
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
                        if (response.data.account.profilePic) {
                          store.save(
                            "userAvatar",
                            response.data.account.profilePic
                          );
                        } else {
                          store.delete("userAvatar");
                        }

                        store.save("userToken", { token: response.data.token });
                        store.save("userName", {
                          userName: response.data.account.userName
                        });
                        store.save("email", {
                          email: response.data.account.email
                        });
                        this.props.navigation.navigate("TabScreen", {});
                      }
                    })
                    .catch(err => {
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
            {/* this.state.validEmail ? null : (
              <Text style={{ color: red }}>Pease enter a valid email</Text>
            ) */}
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
    backgroundColor: "#44bec7",
    borderRadius: 4,
    marginBottom: 15,
    color: "white",
    padding: 10
  }
});
