import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Avatar from "../../../../components/Avatar";

export default class MyProfile extends React.Component {
  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <TouchableOpacity
            s
            onPress={() => {
              this.props.navigation.navigate("MySettings");
            }}
          >
            <Icon name="cog" size={30} style={styles.containercog} />
          </TouchableOpacity>

          <View style={styles.photocontainer}>
            <Avatar />
            <Text style={styles.usernameDisplay}>Username</Text>
          </View>

          <View style={styles.allOptions}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("MyCalendar");
              }}
            >
              <View style={styles.oneOption}>
                <View style={styles.iconAndText}>
                  <View>
                    <Icon
                      name="calendar"
                      size={20}
                      style={styles.fontAwesomeCal}
                    />
                  </View>
                  <View>
                    <Text style={styles.optionTitle}>My Calendar</Text>
                  </View>
                </View>
                <Icon name="chevron-right" size={20} style={styles.chevron} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("ChooseLocation");
              }}
            >
              <View style={styles.oneOption}>
                <View style={styles.iconAndText}>
                  <Icon
                    name="location-arrow"
                    size={20}
                    style={styles.fontAwesomeLoc}
                  />

                  <Text style={styles.optionTitle}>Location</Text>
                </View>
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
                <View style={styles.iconAndText}>
                  <Icon
                    name="heart"
                    size={20}
                    style={styles.fontAwesomeHeart}
                  />

                  <Text style={styles.optionTitle}>My Likes</Text>
                </View>
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
  container: { flex: 1, backgroundColor: "whitesmoke" },

  containercog: {
    position: "absolute",
    position: "absolute",
    right: 20,
    marginTop: 20,
    color: "black",
    fontSize: 30
  },
  fontAwesomeCal: {
    color: "#0084ff"
  },
  fontAwesomeLoc: {
    color: "#44bec7"
  },
  fontAwesomeHeart: {
    color: "#fa3c4c"
  },

  addPhoto: {
    color: "white"
  },
  settingcog: {
    width: 25,
    height: 25,
    marginTop: 20
  },
  plusContainer: {
    backgroundColor: "#2d3436",
    justifyContent: "center",
    alignItems: "center",
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
    marginBottom: 20
  },

  photocontainer: {
    marginTop: 40,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",

    height: 130
  },
  usernameDisplay: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center"
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 30
  },
  chevron: {
    color: "#2c3e50"
  },
  allOptions: {
    backgroundColor: "whitesmoke",
    marginTop: 50,
    borderColor: "#2c3e50",
    borderBottomWidth: 1,
    borderTopWidth: 1
  },
  lastOption: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  iconAndText: {
    flexDirection: "row",
    width: "40%"
  },
  oneOption: {
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#2c3e50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
});
