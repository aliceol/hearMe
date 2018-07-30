import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
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

  componentDidMount() {
    this.getThisEvent();
  }

  getThisEvent() {
    axios
      .get(
        "https://api.songkick.com/api/3.0/events/" +
          this.props.navigation.state.params.id +
          ".json?apikey=HNm0lW1pe8ODasVv"
      )
      .then(response => {
        console.log(response.data);
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
          <Text>
            {this.state.thisEvent.resultsPage.results.event.start.date}
          </Text>
          <Text>
            {this.state.thisEvent.resultsPage.results.event.displayName}
          </Text>
          <Text>{this.state.thisEvent.resultsPage.results.event.type}</Text>
          {/* <Text>
            Line Up :{
              this.state.thisEvent.resultsPage.results.event.performance.artist
                .displayName
            }
          </Text> */}
        </ScrollView>
      );
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
  }
});
