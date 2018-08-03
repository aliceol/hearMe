import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { withNavigation } from "react-navigation";
export default class HomePagePopular extends Component {
  static navigationOptions = {
    title: "HomePagePopular"
  };
  render() {
    return (
      <View>
        <Text>This is the HomePagePopular Page</Text>
        <TouchableOpacity
          style={{ marginTop: 100 }}
          onPress={() => {
            this.props.navigation.navigate("EventPage");
          }}
        >
          <Text style={{ fontSize: 10 }}>Go To EventPageScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 100 }}
          onPress={() => {
            this.props.navigation.navigate("HomePageUpcoming");
          }}
        >
          <Text style={{ fontSize: 10 }}>Go To HomePageUpcomingScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 100 }}
          onPress={() => {
            this.props.navigation.navigate("MyLikes");
          }}
        >
          <Text style={{ fontSize: 10 }}>Go To MyLikesScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 100 }}
          onPress={() => {
            this.props.navigation.navigate("MyProfile");
          }}
        >
          <Text style={{ fontSize: 10 }}>Go To MyProfileScreen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
