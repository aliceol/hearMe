import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import store from "react-native-simple-store";

import { StyleSheet, View, Text, ScrollView, Image } from "react-native";

export default class MyCalendar extends Component {
  state = {
    events: {},
    isLoading: true
  };
  componentDidMount() {
    console.log("mounted");

    store.get("userToken").then(res => {
      USER_TOKEN = res.token;

      axios
        .get("https://hearme-api.herokuapp.com/api/user/getMyCalendar", {
          headers: { Authorization: "Bearer " + USER_TOKEN }
        })

        .then(response => {
          // this.setState(
          // events: response.data,
          // isLoading: false
          console.log("bonj", response.data);
        });
    });
  }

  _keyExtractor = (item, index) => item._id;

  render() {
    return (
      <React.Fragment>
        <ScrollView style={styles.wholeCalendar}>
          <View style={styles.unitEvent}>
            <View style={styles.date}>
              <Text>WED</Text>
              <Text style={styles.themeColor}>20</Text>
              <Text style={styles.themeColor}>JUN</Text>
            </View>
            <View style={styles.centralContent}>
              <Text style={styles.artistName}>Artist Name</Text>
              <Text>Venue Name</Text>
            </View>

            <View style={styles.location}>
              <Icon name="map-marker" size={20} style={styles.mapPicker} />
              <Text>Paris, FR</Text>
            </View>
          </View>
        </ScrollView>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  themeColor: {
    color: "#3498db"
  },
  unitEvent: {
    borderColor: "#3498db",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  },

  date: {
    flexDirection: "column",
    width: 40,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "justify"
  },
  mapPicker: {
    color: "#3498db",
    marginRight: 10
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  artistName: {
    fontSize: 16,
    color: "#2980b9"
  },
  centralContent: {
    alignItems: "center",
    height: 60,
    justifyContent: "space-around"
  }
});
