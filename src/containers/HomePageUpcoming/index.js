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

export default class HomePageUpcoming extends Component {
  static navigationOptions = {
    title: "HomePageUpcoming"
  };

  state = {
    events: {},
    isLoading: true,
    error: ""
  };

  componentDidMount() {
    this.getEvents();
  }

  getEvents() {
    console.log("1");
    axios
      .get(
        "https://api.songkick.com/api/3.0/metro_areas/28909/calendar.json?apikey={api-key}"
      )
      .then(response => {
        this.setState({
          events: response.data,
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
      let artist = null;

      myEvents = [];
      for (
        let i = 0;
        i < this.state.events.resultsPage.results.event.length;
        i++ // if (
      ) //   this.state.events.resultsPage.results.event[i].performance.artist
      //     .displayName === null ||
      //   this.state.events.resultsPage.results.event[i].performance.artist
      //     .displayName === undefined
      // ) {
      //   artist = "Inconnu";
      // } else {
      //   artist = this.state.events.resultsPage.results.event[i].performance
      //     .artist.displayName;
      // }

      {
        myEvents.push(
          <TouchableOpacity
            style={{ marginBottom: 10 }}
            key={this.state.events.resultsPage.results.event[i].id}
            onPress={() => {
              this.props.navigation.navigate("EventPageScreen", {
                id: this.state.events.resultsPage.results.event[i].id,
                eventName: this.state.events.resultsPage.results.event[i]
                  .displayName
              });
            }}
          >
            <Text style={{}}>
              {this.state.events.resultsPage.results.event[i].id}
            </Text>
            <Text>
              {this.state.events.resultsPage.results.event[i].start.date}
            </Text>
            <Text>
              {this.state.events.resultsPage.results.event[i].displayName}
            </Text>
            <Text>{this.state.events.resultsPage.results.event[i].type}</Text>
            {/* <Text>Line Up :{artist}</Text> */}
          </TouchableOpacity>
        );
      }

      // for (
      //   let j = 0;
      //   j <
      //   this.state.events.resultsPage.results.event[i].performance.displayName
      //     .length;
      //   j++
      // ) {
      //   myEvents.push(
      //     <View>
      //       <Text>
      //         Line Up :{
      //           this.state.events.resultsPage.results.event[i].performance
      //             .displayName[j]
      //         }
      //       </Text>
      //     </View>
      //   );
      // }

      console.log(this.state.events.resultsPage.results.event.length);
      return (
        <ScrollView>
          <View style={{ marginBottom: 10 }}>{myEvents}</View>

          <View>
            <Text>This is the HomePageUpcoming Page</Text>
            <TouchableOpacity
              style={{ marginTop: 100 }}
              onPress={() => {
                this.props.navigation.navigate("EventPageScreen");
              }}
            >
              <Text style={{ fontSize: 10 }}>Go To EventPageScreen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 100 }}
              onPress={() => {
                this.props.navigation.navigate("HomePagePopularScreen");
              }}
            >
              <Text style={{ fontSize: 10 }}>Go To HomePagePopularScreen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 100 }}
              onPress={() => {
                this.props.navigation.navigate("MyLikesScreen");
              }}
            >
              <Text style={{ fontSize: 10 }}>Go To MyLikesScreen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginTop: 100 }}
              onPress={() => {
                this.props.navigation.navigate("MyProfileScreen");
              }}
            >
              <Text style={{ fontSize: 10 }}>Go To MyProfileScreen</Text>
            </TouchableOpacity>
          </View>
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
