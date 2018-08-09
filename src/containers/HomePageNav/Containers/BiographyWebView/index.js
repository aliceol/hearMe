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
  static navigationOptions = {};

  getThisEvent() {
    axios
      .get(
        "https://hearme-api.herokuapp.com/api/event/" +
          this.props.navigation.state.params.id
      )
      .then(response => {
        this.setState({
          thisEvent: response.data,
          isLoading: false,
          userToken: this.props.navigation.state.params.token
        });
      })
      .catch(err => console.log("getThisEvent", err));
  }

  refreshData = () => {
    this.setState({ isLoading: true });
    this.getThisEvent();
  };

  render() {
    console.log("prorrps", this.props);
    return (
      <WebView
        source={{
          uri:
            "https://www.songkick.com" +
            this.props.navigation.state.params.event.biographyLink
        }}
        style={{ marginTop: 20 }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 20
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
