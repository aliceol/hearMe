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
  WebView,
  ImageBackground
} from "react-native";

import { withNavigation } from "react-navigation";
import { MapView, Marker } from "react-native-maps";
import store from "react-native-simple-store";

import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

export default class EventPage extends Component {
  // static navigationOptions = { header: null };

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
        this.setState({
          thisEvent: response.data,
          isLoading: false
        });
      })
      .catch(err => console.log("getThisEvent", err));
  }

  addToCalendar = () => {
    store.get("userToken").then(res => {
      const config = {
        headers: {
          Authorization: "Bearer " + res.token
        }
      };

      axios
        .get(
          "https://hearme-api.herokuapp.com/api/user/add/event/" +
            this.props.navigation.state.params.id,
          config
        )
        ///then console.log(req.user.events)
        // dans MyCalendar --> faire le componentdidmount pour récupérer le tableau des events de l'utilisateur
        .then(response => {
          AlertIOS.alert("You just added this event to your calendar");
        });
    });
  };

  refreshData = () => {
    this.setState({ isLoading: true });
    this.getThisEvent();
  };

  renderEventArtists() {
    if (this.state.thisEvent.performance) {
      const eventArtists = [];
      let artistName = "Hello World";

      for (let i = 0; i < this.state.thisEvent.performance.length; i++) {
        if (this.state.thisEvent.performance.length > 0) {
          if (
            this.state.thisEvent.performance[i].artist.displayName.length > 12
          ) {
            artistName =
              this.state.thisEvent.performance[i].artist.displayName.substr(
                0,
                12
              ) + "...";
          } else {
            artistName = this.state.thisEvent.performance[i].artist.displayName;
          }
        }
        eventArtists.push(
          <TouchableOpacity
            key={i}
            style={styles.artists}
            onPress={() => {
              this.props.navigation.navigate("ArtistPage", {
                id: this.state.thisEvent.performance[i].artist.songKickId,
                name: this.state.thisEvent.performance[i].artist.displayName
              });
            }}
          >
            <View>
              <Image
                source={require("../../Components/ConcertCard/photos/concert3.jpg")}
                style={styles.artistsPicture}
              />
            </View>

            <Text style={{ fontSize: 10, marginTop: 5, textAlign: "center" }}>
              {artistName}
            </Text>
          </TouchableOpacity>
        );
        if (i === this.state.thisEvent.performance.length - 1) {
          return eventArtists;
        }
      }
    }
  }

  renderMap = venue => {
    if (venue.lat) {
      return (
        <MapView
          style={{
            height: 300,
            width: Dimensions.get("window").width - 20
          }}
          initialRegion={{
            latitude: Number(venue.lat),
            longitude: Number(venue.lng),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
          }} /* 
          rotateEnabled={false}
          scrollEnabled={false} */
        >
          <Marker
            coordinate={{
              latitude: Number(venue.lat),
              longitude: Number(venue.lng)
            }}
            title={venue.name}
          />
        </MapView>
      );
    } else {
      return null;
    }
  };

  renderAddtionalDetails = event => {
    if (event.additionalDetails) {
      return (
        <View>
          <Text style={styles.titles}>Additionnal Details</Text>
          <Text>{event.additionalDetails}</Text>
        </View>
      );
    }
  };

  renderBio = event => {
    if (event.biography) {
      return (
        <View>
          <Text style={styles.titles}>
            {event.performance[0].artist.displayName} Biography
          </Text>
          <Text>{event.biography}</Text>
          <Button
            title="Read More..."
            onPress={() =>
              this.props.navigation.navigate("WebView", {
                URI: "https://www.songkick.com" + event.biographyLink
              })
            }
          />
        </View>
      );
    }
  };
  // {event.biographyLink}
  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      console.log(this.state.thisEvent);
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => this.addToCalendar()}
          >
            <Icon
              name="plus-circle"
              size={50}
              color="#7E97FC"
              style={{ marginLeft: 1 }}
            />
          </TouchableOpacity>
          <View>
            <ImageBackground
              source={require("../../../../images/placeholder_concert.jpg")}
              style={styles.image}
            >
              <Image
                style={styles.image}
                source={{
                  uri:
                    "https://www.songkick.com/" + this.state.thisEvent.photoURI
                }}
              />
            </ImageBackground>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => this.addToCalendar()}
            >
              <Icon
                name="plus-circle"
                size={30}
                color="#7E97FC"
                style={{ marginLeft: 1 }}
              />
            </TouchableOpacity>
          </View>
          {this.state.thisEvent.venue ? (
            <View style={styles.infoView}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("VenuePage", {
                    id: this.state.thisEvent.venue.songKickId,
                    name: this.state.thisEvent.venue.name
                  })
                }
              >
                <Text style={styles.venueName}>
                  {this.state.thisEvent.venue.name}
                </Text>
              </TouchableOpacity>
              <Text style={styles.venueAddress}>
                {this.state.thisEvent.venue.address}
              </Text>
              <Text style={styles.eventTitle}>
                {this.state.thisEvent.title}
              </Text>
            </View>
          ) : null}
          <Text style={styles.greyBar} />
          <View style={styles.infoView}>
            <Text style={styles.titles}>Line Up</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {this.renderEventArtists()}
            </ScrollView>
          </View>
          <Text style={styles.greyBar} />

          <View style={styles.infoView}>
            {this.renderMap(this.state.thisEvent.venue)}
            {this.renderBio(this.state.thisEvent)}
            {this.renderAddtionalDetails(this.state.thisEvent)}
            <Text style={styles.titles}>More Info</Text>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={styles.sk_logo}
                source={require("../../../../images/powered-by-songkick-pink.png")}
              />
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("WebView", {
                    URI:
                      this.state.thisEvent.uri.slice(0, 4) +
                      "s" +
                      this.state.thisEvent.uri.slice(4)
                  })
                }
              >
                <Text>Browse this event on SongKick Website</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      );
    }
  }

  componentDidMount() {
    this.getThisEvent();
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.getThisEvent();
      }
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
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
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    width: 54,
    height: 54
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
  greyBar: {
    height: 1,
    width: Dimensions.get("window").width,
    backgroundColor: "grey"
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
  },
  sk_logo: {
    width: 100,
    height: 30,
    resizeMode: "contain"
  }
});
