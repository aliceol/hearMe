import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default class SpotifyConnect extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textAndButton}>
          <View style={styles.infoContent}>
            <Text style={styles.info}>
              Enable your Spotify Account on HearMe to listen to music!
            </Text>
            <Text style={styles.emoji}> 🤘 </Text>
          </View>
          <TouchableOpacity style={styles.buttonContainer}>
            <Icon name="spotify" size={30} style={styles.fontAwesomeSpotify} />

            <Text style={styles.buttonText}> Spotify Connect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    justifyContent: "center",
    alignItems: "center",

    flex: 1
  },
  infoContent: {
    flexDirection: "column",
    marginBottom: 10
  },
  info: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  emoji: {
    textAlign: "center",
    fontSize: 50
  },
  textAndButton: {},
  buttonContainer: {
    backgroundColor: "#1db954",
    padding: 8,
    borderRadius: 50,
    borderColor: "black",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    fontWeight: "700",
    lineHeight: 35,
    fontSize: 20
  }
});
