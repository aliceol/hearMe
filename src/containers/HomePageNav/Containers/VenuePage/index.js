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
  FlatList,
  AlertIOS
} from "react-native";

export default class Venue extends Component {
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
    thisVenue: {},
    events: [],
    isLoading: true
  };

  _keyExtractor = (item, index) => item._id;

  getVenueInfo() {
    console.log(this.props.navigation.state.params.id);
    axios
      .get(
        "https://hearme-api.herokuapp.com/api/venues/" +
          this.props.navigation.state.params.id
      )
      .then(response => {
        console.log(response.data);
        this.setState({
          thisVenue: response.data.response.venueDetails,
          events: response.data.response.event,
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
      return (
        <React.Fragment>
          <View style={styles.bg}>
            <View style={styles.venueNameAndStreet}>
              <Text style={styles.venueName}>
                {this.state.thisVenue.displayName}
              </Text>
              <View style={styles.address}>
                <Text>{this.state.thisVenue.street + ", "}</Text>

                <Text>{this.state.thisVenue.zip + " "}</Text>
                <Text>{this.state.thisVenue.metroArea.displayName}</Text>
              </View>
            </View>
            <Text style={styles.upcomingEvents}>Upcoming Events</Text>

            <FlatList
              keyExtractor={this._keyExtractor}
              data={this.state.events}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate("EventPage", {
                        id: item.id
                      });
                    }}
                  >
                    <View style={styles.rowitem}>
                      <View style={styles.card}>
                        <View style={styles.month}>
                          <Text style={styles.textMonth}>
                            {moment(item.start.date).format("MMM")}
                          </Text>
                        </View>
                        <Text style={styles.textNumber}>
                          {item.start.date.substring(8)}
                        </Text>
                      </View>
                      <View style={styles.content}>
                        <View style={styles.cityAndVenue}>
                          <Text style={styles.artistName}>
                            {item.performance[0].displayName}
                          </Text>
                          <View style={styles.markerAndText}>
                            <Icon
                              name="clock-o"
                              size={20}
                              style={styles.mapMarker}
                            />
                            <Text style={styles.textTime}>
                              {item.start.time
                                ? item.start.time.substring(0, 5)
                                : "N/A"}
                            </Text>
                          </View>
                        </View>

                        <View>
                          <Icon name="chevron-right" size={25} />
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </React.Fragment>
      );
    }
  }

  componentDidMount() {
    this.getVenueInfo();
  }
}

const styles = StyleSheet.create({
  rowitem: {
    padding: 15,
    backgroundColor: "#ecf0f1",
    flexDirection: "row",
    borderColor: "#bdc3c7",
    borderBottomWidth: 1
  },
  bg: {
    backgroundColor: "#ecf0f1"
  },
  upcomingEvents: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "700"
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
  venueName: {
    fontSize: 25,
    color: "black",
    fontWeight: "800"
  },
  venueNameAndStreet: {
    padding: 10,
    height: 70,
    justifyContent: "space-between",
    marginTop: 10
  },
  address: {
    flexDirection: "row"
  },

  cityAndVenue: {
    flexDirection: "column",
    justifyContent: "space-around",

    height: 80,
    marginLeft: 20
  },
  artistName: {
    fontSize: 20,
    fontWeight: "500"
  },
  markerAndText: {
    flexDirection: "row",
    borderColor: "red",
    borderWidth: 1
  },
  textTime: {
    fontSize: 20
  },
  mapMarker: {
    marginRight: 10,
    marginBottom: 0,
    color: "blue"
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between"
  }
});
