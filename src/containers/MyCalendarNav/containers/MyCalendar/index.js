import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import store from "react-native-simple-store";

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator
} from "react-native";

export default class MyCalendar extends Component {
  state = {
    myCalendar: [],
    isLoading: true
  };

  getMyCalendar() {
    store.get("userToken").then(res => {
      console.log(res.token);
      const config = {
        headers: {
          Authorization: "Bearer " + res.token
        }
      };
      axios
        .get("https://hearme-api.herokuapp.com/api/user/getMyCalendar", config)
        .then(response => {
          console.log("data", response);
          this.setState({
            myCalendar: response,
            isLoading: false
          });
        });
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      // let myCalendarEvents = [];

      // for (let i = 0; i<this.state.myCalendar.length; i++){

      // }

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
  componentDidMount() {
    this.getMyCalendar();
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
