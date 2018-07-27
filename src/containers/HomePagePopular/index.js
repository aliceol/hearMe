import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
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
            this.props.navigation.navigate("EventPageScreen");
          }}
        >
          <Text style={{ fontSize: 10 }}>Go To EventPageScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 100 }}
          onPress={() => {
            this.props.navigation.navigate("HomePageUpcomingScreen");
          }}
        >
          <Text style={{ fontSize: 10 }}>Go To HomePageUpcomingScreen</Text>
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
    );
  }
}
