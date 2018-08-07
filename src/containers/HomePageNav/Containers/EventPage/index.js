import React, { Component } from "react";
import {
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  AlertIOS
} from "react-native";

import { withNavigation } from "react-navigation";

import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

export default class EventPage extends Component {
  static navigationOptions = { header: null };

  state = {
    thisEvent: [],
    isLoading: true
  };

  getThisEvent() {
    console.log(this.props.navigation.state.params);
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
      const eventArtists = [];

      let artistName = "";

      for (let i = 0; i < this.state.thisEvent.performance.length; i++) {
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
        eventArtists.push(
          <TouchableOpacity
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
              <Icon
                name="play"
                size={20}
                color="white"
                style={{
                  position: "absolute",
                  top: 20,
                  left: 23
                }}
              />
            </View>

            <Text style={{ fontSize: 10, marginTop: 5, textAlign: "center" }}>
              {artistName}
            </Text>
          </TouchableOpacity>
        );
      }

      return (
        <ScrollView style={styles.container}>
          <View>
            <Image
              style={styles.image}
              source={require("../../Components/ConcertCard/photos/concert1.jpg")}
            />
            <TouchableOpacity
              style={styles.addButton}
              // onPress={() =>
              //   axios.get(
              //     "//link avec id de l'event "
              //     ///then console.log(req.user.events)
              //     // dans MyCalendar --> faire le componentdidmount pour récupérer le tableau des events de l'utilisateur
              //   )
              //   AlertIOS.alert("You just added this event to your calendar")
              // }
            >
              <Icon
                name="plus-circle"
                size={30}
                color="#7E97FC"
                style={{ marginLeft: 1 }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.infoView}>
            <Text style={styles.venueName}>
              {this.state.thisEvent.venue.name}
            </Text>
            <Text style={styles.venueAddress}>
              {this.state.thisEvent.venue.address}
            </Text>
            <Text style={styles.eventTitle}>{this.state.thisEvent.title}</Text>
          </View>
          <Text
            style={{
              height: 1,
              width: Dimensions.get("window").width - 35,
              marginLeft: 15,
              backgroundColor: "grey"
            }}
          />
          <View style={styles.infoView}>
            <Text style={styles.titles}>Line Up</Text>
            <ScrollView
              horizontal="true"
              showsHorizontalScrollIndicator="false"
            >
              {eventArtists}
            </ScrollView>
          </View>
          <Text
            style={{
              height: 1,
              width: Dimensions.get("window").width - 35,
              marginLeft: 15,
              backgroundColor: "grey"
            }}
          />
          <View style={styles.infoView}>
            <Text style={styles.titles}>Description</Text>
            <Text>
              Dumque ibi diu moratur commeatus opperiens, quorum translationem
              ex Aquitania verni imbres solito crebriores prohibebant auctique
              torrentes, Herculanus advenit protector domesticus, Hermogenis ex
              magistro equitum filius, apud Constantinopolim, ut supra
              rettulimus, populari quondam turbela discerpti. quo verissime
              referente quae Gallus egerat, damnis super praeteritis maerens et
              futurorum timore suspensus angorem animi quam diu potuit
              emendabat.
            </Text>
          </View>
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
    backgroundColor: "white",
    marginTop: 20
  },
  image: {
    width: Dimensions.get("window").width,
    height: 200
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
