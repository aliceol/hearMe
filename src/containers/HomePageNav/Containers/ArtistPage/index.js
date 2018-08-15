import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import moment from "moment";
import store from "react-native-simple-store";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  AlertIOS
} from "react-native";
import ButtonLike from "../../Components/ButtonLike";

export default class ArtistPage extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeftContainerStyle: { paddingLeft: 10 },
    headerTintColor: "white",
    // title: navigation.state.params.title,
    headerStyle: {
      backgroundColor: "rgba(45,141,214,100)"
    },
    headerTitleStyle: {
      color: "white"
    }
  });

  state = {
    thisArtist: [],
    isLoading: true
  };

  getArtistInfo() {
    axios
      .get(
        "https://hearme-api.herokuapp.com/api/artist/" +
          this.props.navigation.state.params.id +
          "-" +
          this.props.navigation.state.params.name +
          "/1"
      )
      .then(response => {
        this.setState({
          thisArtist: response.data,
          isLoading: false
        });
      });
  }

  //onLike function will call the API to register the Like.
  onLike = () => {
    store.get("userToken").then(res => {
      const config = {
        headers: {
          Authorization: "Bearer " + res.token
        }
      };

      axios
        .get(
          "https://hearme-api.herokuapp.com/api/user/like/artist/" +
            this.props.navigation.state.params.id,
          config
        )
        ///then console.log(req.user.events)
        // dans MyCalendar --> faire le componentdidmount pour récupérer le tableau des events de l'utilisateur
        .then(response => {
          AlertIOS.alert("You just added this artist to your likes");
        });
    });
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      const myEvent = [];
      const myResult = this.state.thisArtist.response.resultsPage.results;
      let eventName = "";
      let eventCity = "";

      for (let i = 0; i < myResult.event.length; i++) {
        if (myResult.event[i].displayName.length > 25) {
          eventName = myResult.event[i].displayName.substr(0, 25) + "...";
        } else {
          eventName = myResult.event[i].displayName;
        }

        if (myResult.event[i].location.city.length > 13) {
          eventCity = myResult.event[i].location.city.substr(0, 13) + "...";
        } else {
          eventCity = myResult.event[i].location.city;
        }

        myEvent.push(
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("EventPage", {
                id: myResult.event[i].id,
                name: myResult.event[i].displayName
              });
            }}
            style={styles.unitEvent}
            key={i}
          >
            <View style={styles.rowitem}>
              <View style={styles.card}>
                <View style={styles.month}>
                  <Text style={styles.textMonth}>
                    {" "}
                    {moment(myResult.event[i].start.date).format("MMM")}
                  </Text>
                </View>
                <Text style={styles.textNumber}>
                  {myResult.event[i].start.date.substring(8)}
                </Text>
              </View>
              <View style={styles.content}>
                <View style={styles.cityAndVenue}>
                  <Text style={styles.artistName}>{eventName}</Text>
                  <View style={styles.markerAndText}>
                    <Icon
                      name="map-marker"
                      size={20}
                      style={styles.mapMarker}
                    />
                    <Text style={styles.textCityName}>{eventCity}</Text>
                  </View>
                </View>

                <View>
                  <Icon name="chevron-right" size={25} />
                </View>
              </View>
            </View>

            {/* <Text style={styles.date}>
              {moment(myResult.event[i].start.date).format("MMM Do YY")}
            </Text>
            <Text>{eventName}</Text>
            <Text>{eventCity}</Text> */}
          </TouchableOpacity>
        );
      }
      return (
        <ScrollView style={{ backgroundColor: "#ecf0f1" }}>
          <View style={styles.container}>
            <Image
              style={styles.artistImage}
              source={require("../../../../images/artist_2.jpg")}
              imageStyle={{ borderRadius: 40 }}
            />

            <ButtonLike onLike={this.onLike} />
          </View>
          <View style={styles.WholeCalendar}>
            <Text style={styles.upcomingEvents}>Upcoming Events</Text>
            <View>{myEvent}</View>
          </View>
        </ScrollView>
      );
    }
  }

  componentDidMount() {
    this.getArtistInfo();
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",

    margin: 20
  },
  artistImage: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,

    justifyContent: "center",
    alignItems: "center"
  },
  icons: {
    height: 20,
    width: 20
  },
  themeColor: {
    color: "#3498db"
  },
  WholeCalendar: {
    marginTop: 20
  },
  // upcomingEvents: {
  //   borderBottomColor: "red",
  //   borderBottomWidth: 1,
  //   paddingLeft: 10,
  //   paddingBottom: 10,
  //   fontSize: 18,
  //   fontWeight: "700"
  // },
  // unitEvent: {
  //   borderColor: "rgba(45,141,214,100)",
  //   borderBottomWidth: 1,
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  //   alignItems: "center",
  //   padding: 10
  // },

  // date: {
  //   flexDirection: "column",
  //   width: 40,
  //   height: 60,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   textAlign: "justify"
  // },
  // locationMarker: {
  //   width: 20,
  //   height: 20
  // },
  // location: {
  //   flexDirection: "row",
  //   width: 50,
  //   justifyContent: "space-between"
  // },
  // mapPicker: {
  //   color: "#3498db"
  // },
  // artistName: {
  //   fontSize: 16,
  //   color: "#2980b9"
  // },
  // centralContent: {
  //   alignItems: "center",
  //   height: 60,
  //   justifyContent: "space-around"
  // },
  rowitem: {
    padding: 15,
    backgroundColor: "#ecf0f1",
    flexDirection: "row",
    borderColor: "#bdc3c7",
    borderBottomWidth: 1
  },
  month: {
    height: 25,
    width: 80,
    backgroundColor: "#e74c3c",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    height: 80,
    width: 80,
    borderRadius: 5,
    backgroundColor: "white",
    overflow: "hidden",
    alignItems: "center"
  },
  textMonth: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white"
  },
  textNumber: {
    fontSize: 35,
    fontWeight: "700",
    marginTop: 5
  },
  cityAndVenue: {
    flexDirection: "column",
    justifyContent: "space-around",

    height: 80,
    marginLeft: 20
  },
  artistName: {
    fontSize: 20,
    fontWeight: "700"
  },
  markerAndText: {
    flexDirection: "row"
  },
  textCityName: {
    fontSize: 20
  },
  mapMarker: {
    marginRight: 10,
    color: "blue"
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between"
  },
  upcomingEvents: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: 18,

    fontWeight: "700"
  }
});
