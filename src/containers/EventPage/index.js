import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet
} from "react-native";

import axios from "axios";

export default class EventPage extends Component {
  static navigationOptions = {
    title: "EventPage"
  };

  state = {
    thisEvent: [],
    isLoading: true
  };

  getThisEvent() {
    axios
      .get(
        "https://hearme-api.herokuapp.com/api/event/" +
          this.props.navigation.state.params.id
      )
      .then(response => {
        console.log("data", response.data);
        this.setState({
          thisEvent: response.data,
          isLoading: false
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
      return (
        <ScrollView>
          <Text>{this.state.thisEvent.title}</Text>
        </ScrollView>
      );
    }
  }

  componentDidMount() {
    this.getThisEvent();
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
  }
});
