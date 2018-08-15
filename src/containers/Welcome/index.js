import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class Welcome extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <View>
        <ImageBackground
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height
          }}
          source={require("../../images/bg-test-2.jpg")}
        >
          <View style={styles.container}>
            <Text style={styles.hearmeLogo}>HearMe</Text>
            <Text style={styles.welcomeText}>Explore concerts nearby</Text>
          </View>

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
        </ImageBackground>
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
    fontSize: 20,
    color: "whitesmoke",
    fontWeight: "600"
  },

  hearmeLogo: {
    marginTop: 30,
    marginBottom: 10,
    color: "dodgerblue",
    fontWeight: "900",
    fontSize: 40
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
    backgroundColor: "#44bec7",
    padding: 8,
    borderRadius: 5,
    borderColor: "white",
    borderWidth: 2,
    width: "100%"
  },

  buttonContainer: {
    backgroundColor: "#0084ff",
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
    color: "white",
    fontWeight: "700",
    lineHeight: 35
  }
});
