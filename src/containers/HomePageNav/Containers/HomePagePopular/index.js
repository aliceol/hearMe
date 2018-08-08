import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SectionList,
  FlatList
} from "react-native";
import { withNavigation } from "react-navigation";

const moment = require("moment");
moment().format();

import axios from "axios";

import ConcertCard from "../../Components/ConcertCard";

export default class HomePageUpcoming extends Component {
  static navigationOptions = {
    title: "HomePageUpcoming"
  };

  state = {
    events: [],
    isLoading: true,
    error: ""
  };

  getEvents() {
    axios
      .get(
        "https://hearme-api.herokuapp.com/api/city/popular/" +
          this.props.route.cityCode
      )
      .then(response => {
        this.setState({
          events: response.data,
          isLoading: false
        });
      })
      .catch(function(error) {
        console.log(
          "There has been a problem with your operation: " + error.message
        );
        throw error;
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
      return (
        <FlatList
          style={[
            {
              padding: 10
            },
            styles.backgroundOfPage
          ]}
          data={this.state.events}
          keyExtractor={(item, index) => item.displayName}
          renderItem={obj => {
            return (
              <ConcertCard event={obj.item} navigate={this.props.navigate} />
            );
          }}
        />
      );
    }
  }
  componentDidMount() {
    if (this.props.route.cityCode !== "") {
      this.getEvents();
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  backgroundOfPage: {
    backgroundColor: "#F4F8FF"
  }
});

/* <SectionList
          
          renderItem={({ item, index, section }) => (
            <View key={index}>{item}</View>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text
              style={[
                {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  textAlign: "center",
                  marginBottom: 10,
                  paddingVertical: 5,
                  fontWeight: "bold",
                  color: "#2D3436"
                },
                styles.backgroundOfPage
              ]}
            >
              {this.renderDateTitle(title)}
            </Text>
          )}
          sections={sectionListData}
          keyExtractor={(item, index) => item + index}
        /> */
/* <Flatlist
          data={this.state.events}
          keyExtractor={(item, index) => item}
          renderItem={({ obj }) => <Text>{obj.title}</Text>}
        /> */

/* <ConcertCard event={obj.item} navigate={this.props.navigate} /> */
