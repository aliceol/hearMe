import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class Welcome extends Component {
  static navigationOptions = {
    headerBackTitle: null,

    headerLeftContainerStyle: { paddingLeft: 10 },
    headerTintColor: "#b2bec3",
    title: "Create Your Account",
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
        <Icon name="music" size={70} style={styles.hearmeLogo} />
        <Text style={styles.welcomeText}>Exploring concerts nearby..</Text>

        <View style={styles.connectOptions}>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => {
              this.props.navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.buttonText}>Create an account</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.LoginButtonContainer}
            onPress={() => {
              this.props.navigation.navigate("Login");
            }}
          >
            <Text style={styles.LoginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  blackBoldText: {
    color: "black",
    textAlign: "center"
  },
  welcomeText: {
    fontSize: 15
  },

  hearmeLogo: {
    marginTop: 50,
    marginBottom: 20
  },

  connectOptions: {
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 60,
    padding: 20,
    width: "100%"
  },

  LoginButtonContainer: {
    marginTop: 20,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 5,
    borderColor: "#2980b9",
    borderWidth: 2,
    width: "100%"
  },

  buttonContainer: {
    backgroundColor: "#2980b9",
    padding: 8,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 2,
    width: "100%"
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "700",
    lineHeight: 35
  },
  LoginButtonText: {
    textAlign: "center",
    color: "#2980b9",
    fontWeight: "700",
    lineHeight: 35
  }
});
