import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
export default class MyProfile extends Component {
  static navigationOptions = {
    title: "MyProfile"
  };
  render() {
    return (
      <View>
        <Text>This is the MyProfile Page</Text>
        <TouchableOpacity
          style={{ marginTop: 100 }}
          onPress={() => {
            this.props.navigation.navigate("MyCalendarScreen");
          }}
        >
          <Text style={{ fontSize: 10 }}>Go To MyCalendarScreen</Text>
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
            this.props.navigation.navigate("MySettingsScreen");
          }}
        >
          <Text style={{ fontSize: 10 }}>Go To MySettingsScreen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
