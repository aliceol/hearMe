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
    thisVenue: [],
    isLoading: true
  };

  /* getVenueInfo() {
    axios
      .get(
        "https://hearme-api.herokuapp.com/api/venue/" +
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
 */

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
          <View style={styles.container}>
            <Text>Venue Page</Text>
          </View>
        </React.Fragment>
      );
    }
  }

  /* componentDidMount() {
    this.getVenueInfo();
  } */
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
    marginTop: 60
  },
  upcomingEvents: {
    borderBottomColor: "red",
    borderBottomWidth: 1,
    paddingLeft: 10,
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "700"
  },
  unitEvent: {
    borderColor: "rgba(45,141,214,100)",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  },

  date: {
    flexDirection: "column",
    width: 40,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "justify"
  },
  locationMarker: {
    width: 20,
    height: 20
  },
  location: {
    flexDirection: "row",
    width: 50,
    justifyContent: "space-between"
  },
  mapPicker: {
    color: "#3498db"
  },
  artistName: {
    fontSize: 16,
    color: "#2980b9"
  },
  centralContent: {
    alignItems: "center",
    height: 60,
    justifyContent: "space-around"
  }
});
