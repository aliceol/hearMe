import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Avatar from "../../../../components/Avatar";
import store from "react-native-simple-store";

import axios from "axios";

export default class MyProfile extends React.Component {
  state = {
    isLoading: true,
    userName: ""
  };

  componentDidMount() {
    store.get("userToken").then(res => {
      console.log(res.token);
      const config = {
        headers: {
          Authorization: "Bearer " + res.token
        }
      };
      axios
        .get("https://hearme-api.herokuapp.com/api/user/getMyInfo", config)
        .then(response => {
          console.log(response);
          this.setState({
            userName: response.data,
            isLoading: false
          });
          console.log(response.data);
        });
    });
  }

  render() {
    // if (this.state.isLoading) {
    //   return <Text>is loading</Text>;
    // } else
    return (
      <React.Fragment>
        <View style={styles.container}>
          <View style={styles.photocontainer}>
            <Avatar />
            <Text style={styles.usernameDisplay}>{this.state.userName}</Text>
          </View>

          <View style={styles.allOptions}>
            {/* 
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("MySettings");
              }}
            >
              <View style={styles.oneOption}>
                <View style={styles.iconAndText}>
                  <View style={{ paddingLeft: 30 }}>
                    <Icon name="cog" size={30} style={styles.fontAwesomeCal} />
                    <Text style={styles.optionTitle}>Settings</Text>
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
                    size={30}
                    style={styles.fontAwesomeLoc}
                  />

                  <Text style={styles.optionTitle}>Location</Text>
                </View>
                <Icon name="chevron-right" size={20} style={styles.chevron} />
              </View>
            </TouchableOpacity> */}

            {/* <TouchableOpacity
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
            </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.oneOption}
              onPress={() => {
                this.props.navigation.navigate("MySettings");
              }}
            >
              <View style={styles.iconAndText}>
                <View style={{ width: 40 }}>
                  <Icon name="cog" size={30} style={styles.fontAwesomeCog} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.optionTitle}>Settings</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={20} style={styles.chevron} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.oneOption}
              onPress={() => {
                console.log("PRESSED");
              }}
            >
              <View style={styles.iconAndText}>
                <View style={{ width: 40 }}>
                  <Icon
                    name="location-arrow"
                    size={30}
                    style={styles.fontAwesomeLoc}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.optionTitle}>Location</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={20} style={styles.chevron} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.oneOption}
              onPress={() => {
                this.props.navigation.navigate("SpotifyConnect");
              }}
              style={styles.oneOption}
            >
              <View style={styles.iconAndText}>
                <View style={{ width: 40 }}>
                  <Icon
                    name="spotify"
                    size={30}
                    style={styles.fontAwesomeSpotify}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.optionTitle}>Spotify Connect</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={20} style={styles.chevron} />
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
  fontAwesomeCog: {
    color: "#0084ff"
  },
  fontAwesomeLoc: {
    color: "#44bec7"
  },
  fontAwesomeSpotify: {
    color: "#1db954"
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
    // marginLeft: 30,

    width: "100%"
  },
  chevron: {
    color: "#2c3e50"
  },
  allOptions: {
    backgroundColor: "whitesmoke",
    marginTop: 50,
    borderColor: "#2c3e50",
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

    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  oneOption: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#2c3e50",
    /* height: 100, */
    alignItems: "center",
    justifyContent: "space-between"
  }
});
