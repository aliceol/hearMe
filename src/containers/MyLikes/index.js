import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from "react-native";
export default class MyLikes extends Component {
  static navigationOptions = {
    title: "MyLikes"
  };
  render() {
    return (
      <View>
        <Text>This is the MyLikes Page</Text>
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
            this.props.navigation.navigate("ArtistPageScreen");
          }}
        >
          <Text style={{ fontSize: 10 }}>Go To ArtistPageScreen</Text>
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
