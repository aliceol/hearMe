import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default class Profile extends Component {
  static navigationOptions = {
    headerBackTitle: null,

    headerLeftContainerStyle: { paddingLeft: 10 },
    headerTintColor: "#b2bec3",
    title: "Profile",
    headerStyle: {
      backgroundColor: "#2d3436"
    },
    headerTitleStyle: {
      color: "white"
    }
  };

  state = {
    userModel: {
      id: "",
      username: "",
      profilePic: "",
      loc: [],
      favArtists: [],
      events: [],
      profilePic: ""
    }
  };

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("MySettings");
            }}
          >
            <Icon name="cog" size={30} style={styles.containercog} />
          </TouchableOpacity>

          <View style={styles.photocontainer}>
            <Image
              style={styles.userphoto}
              source={require("../../images/placeholder_2.jpg")}
            />

            <Text style={styles.usernameDisplay}>Username</Text>
          </View>

          <View style={styles.allOptions}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("MyCalendar");
              }}
            >
              <View style={styles.oneOption}>
                <Text style={styles.optionTitle}>My Calendar</Text>
                <Icon name="chevron-right" size={20} style={styles.chevron} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("ChooseLocation");
              }}
            >
              <View style={styles.oneOption}>
                <Text style={styles.optionTitle}>Location</Text>
                <Icon name="chevron-right" size={20} style={styles.chevron} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("MyLikes", {
                  artists: [2596951, 253846, 757422]
                });
              }}
            >
              <View style={styles.lastOption}>
                <Text style={styles.optionTitle}>My Likes</Text>
                <Icon name="chevron-right" size={20} style={styles.chevron} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#a29bfe" },

  containercog: {
    position: "absolute",
    position: "absolute",
    right: 20,
    marginTop: 20,
    color: "black",
    fontSize: 30
  },

  settingcog: {
    width: 25,
    height: 25,
    marginTop: 20
  },
  userphoto: {
    borderColor: "#3498db",
    borderWidth: 2,
    width: 90,
    height: 90,
    borderRadius: 90 / 2
  },
  photocontainer: {
    marginTop: 40,
    alignItems: "center",
    height: 120,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  usernameDisplay: {
    fontWeight: "bold",
    fontSize: 18
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "300"
  },
  chevron: {
    color: "#3498db"
  },
  allOptions: {
    backgroundColor: "whitesmoke",
    marginTop: 50,
    borderColor: "#3498db",
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  lastOption: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  oneOption: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#3498db",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
