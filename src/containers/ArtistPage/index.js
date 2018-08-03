import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground
} from "react-native";
import ButtonLike from "../../components/ButtonLike";

export default class LoginForm extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeftContainerStyle: { paddingLeft: 10 },
    headerTintColor: "white",
    title: navigation.state.params.title,
    headerStyle: {
      backgroundColor: "rgba(45,141,214,100)"
    },
    headerTitleStyle: {
      color: "white"
    }
  });
  //onLike function will call the API to register the Like.
  onLike = () => {};
  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <ImageBackground
            style={styles.artistImage}
            source={require("../../images/artist_2.jpg")}
            imageStyle={{ borderRadius: 40 }}
          >
            <Image
              style={styles.icons}
              source={require("../../images/player.png")}
            />
          </ImageBackground>
          <ButtonLike onLike={this.onLike} />
        </View>
        <View style={styles.WholeCalendar}>
          <Text style={styles.upcomingEvents}>Upcoming Events</Text>
          <ScrollView>
            <View style={styles.unitEvent}>
              <View style={styles.date}>
                <Text>WED</Text>
                <Text style={styles.themeColor}>20</Text>
                <Text style={styles.themeColor}>JUN</Text>
              </View>
              <View style={styles.centralContent}>
                <Text>Venue Name</Text>
              </View>

              <View style={styles.location}>
                <Icon name="map-marker" size={20} style={styles.mapPicker} />
                <Text>City</Text>
              </View>
            </View>
            <View style={styles.unitEvent}>
              <View style={styles.date}>
                <Text>WED</Text>
                <Text style={styles.themeColor}>20</Text>
                <Text style={styles.themeColor}>JUN</Text>
              </View>
              <View style={styles.centralContent}>
                <Text>Venue Name</Text>
              </View>

              <View style={styles.location}>
                <Icon name="map-marker" size={20} style={styles.mapPicker} />
                <Text>City</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </React.Fragment>
    );
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
