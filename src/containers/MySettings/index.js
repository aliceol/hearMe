import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default class Settings extends Component {
  static navigationOptions = {
    headerBackTitle: null,
    headerLeftContainerStyle: { paddingLeft: 10 },
    headerTintColor: "white",
    title: "MySettings",
    headerStyle: {
      backgroundColor: "#3498db"
    },
    headerTitleStyle: {
      color: "white"
    }
  };
  logout() {
    alert("log out");
  }
  render() {
    return (
      <React.Fragment>
        <View style={styles.optionsBlock1}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("EditUsername");
            }}
          >
            <View style={styles.settingOptionsBlock}>
              <Text style={styles.settingInfo}>Username</Text>
              <Text style={styles.editableInfo}>NameOfTheUser</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("EditEmail");
            }}
          >
            <View style={styles.lastSettingOption}>
              <Text style={styles.settingInfo}>Email</Text>
              <Text style={styles.editableInfo}>Email@oftheuser</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={this.logout}>
          <View style={styles.optionsBlock2}>
            <View style={styles.settingOptionsBlock2}>
              <Text style={styles.settingInfo}>Logout</Text>
              <Image
                style={styles.logoutlogo}
                source={require("../../images/logout.png")}
              />
            </View>
          </View>
        </TouchableOpacity>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  optionsBlock1: {
    marginTop: 40,
    borderColor: "grey",
    backgroundColor: "lightgrey",
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  settingOptionsBlock: {
    padding: 15,
    borderColor: "grey",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  lastSettingOption: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  editableInfo: {
    color: "#95a5a6",
    position: "absolute",
    right: 30
  },
  logoutlogo: {
    width: 20,
    height: 20,
    right: 30,
    position: "absolute"
  },
  settingOptionsBlock2: {
    padding: 15,
    borderColor: "grey",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: "lightgrey",

    flexDirection: "row",
    alignItems: "center"
  },

  optionsBlock2: {
    marginTop: 80
  }
});
