import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  AlertIOS,
  WebView
} from "react-native";

export default class EventPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.URI
  });

  render() {
    return (
      <WebView
        source={{
          uri: this.props.navigation.state.params.URI
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  image: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width
  },
  addButton: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "white",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36
  },
  infoView: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 30,
    justifyContent: "space-between"
  },
  venueName: {
    fontSize: 16,
    fontWeight: "bold"
  },
  venueAddress: {
    fontSize: 12,
    color: "grey"
  },
  eventTitle: {
    fontSize: 12,
    color: "black",
    marginTop: 5,
    borderBottomColor: "grey"
  },
  artists: {
    marginRight: 20,
    alignItems: "center"
  },
  artistsPicture: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  titles: {
    fontSize: 17,
    marginBottom: 30,
    marginTop: 5
  }
});
