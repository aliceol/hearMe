import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity
} from "react-native";

import { SearchBar } from "react-native-elements";

import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

export default class ChooseLocation extends Component {
  static navigationOptions = {
    header: null
  };

  cities = {
    paris: {
      name: "Paris",
      code: "28909",
      coordinates: { lat: 48.8566, lng: 2.3522 }
    },
    berlin: {
      name: "Berlin",
      code: "28443",
      coordinates: { lat: 52.52, lng: 13.405 }
    },
    barcelona: {
      name: "Barcelona",
      code: "28714",
      coordinates: { lat: 41.3851, lng: 2.1734 }
    },
    london: {
      name: "London",
      code: "24426",
      coordinates: { lat: 51.5074, lng: 0.1278 }
    },
    oslo: {
      name: "Oslo",
      code: "31422",
      coordinates: { lat: 59.9139, lng: 10.7522 }
    },
    shanghai: {
      name: "Shanghai",
      code: "28033",
      coordinates: { lat: 31.226444, lng: 121.560501 }
    },
    hongkong: {
      name: "Hong-Kong",
      code: "34358",
      coordinates: { lat: 22.302219, lng: 114.174637 }
    },
    bordeaux: {
      name: "Bordeaux",
      code: "28851",
      coordinates: { lat: 44.837994, lng: -0.576675 }
    },
    cannes: {
      name: "Cannes",
      code: "28857",
      coordinates: { lat: 43.552849, lng: 7.017369 }
    },
    nice: {
      name: "Nice",
      code: "28903",
      coordinates: { lat: 43.675819, lng: 7.289429 }
    }
  };

  state = {
    query: "",
    matchingCities: []
  };

  compareCities = () => {
    let queryLength = this.state.query.length;
    let matchingCities = [];
    let cities = Object.keys(this.cities);
    if (queryLength === 0) {
      this.setState({ matchingCities: cities });
    } else if (queryLength > 0) {
      for (let i = 0; i < cities.length; i++) {
        if (
          this.state.query.toLowerCase() ===
          cities[i].slice(0, queryLength).toLowerCase()
        ) {
          matchingCities.push(cities[i]);
        }
      }
      this.setState({ matchingCities: matchingCities });
    }
  };

  renderMatchingCities = cities => {
    let matchingCities = [];
    for (let i = 0; i < cities.length; i++) {
      matchingCities.push(
        <TouchableOpacity
          onPress={() => this.navigateToCity(this.cities[cities[i]])}
          key={cities[i]}
          style={styles.cityButton}
        >
          <Text style={{ fontSize: 20 }}>{this.cities[cities[i]].name}</Text>
        </TouchableOpacity>
      );
    }
    return matchingCities;
  };

  navigateToCity = city => {
    this.setState(
      {
        query: "",
        matchingCities: []
      },
      () => {
        this.props.navigation.replace("HomePage", {
          city: city
        });
      }
    );
  };

  handleChangeText = query => {
    this.setState(
      state => ({ ...state, query: query || "" }),
      () => this.compareCities()
    );
  };

  handleClear = () => {
    this.handleChangeText("");
  };

  render() {
    return (
      <React.Fragment>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
        >
          <Icon name="times" size={30} style={styles.closeIcon} />
        </TouchableOpacity>

        <SearchBar
          lightTheme
          clearIcon={{ color: "black" }}
          onChangeText={this.handleChangeText}
          onClear={this.handleClear}
          placeholder="Where do you want to go?"
          containerStyle={styles.container}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          value={this.state.query}
        />
        <ScrollView>
          <KeyboardAvoidingView
            keyboardVerticalOffset={300}
            behavior="padding"
            style={{ flexGrow: 1 }}
          >
            {this.renderMatchingCities(this.state.matchingCities)}
          </KeyboardAvoidingView>
        </ScrollView>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.compareCities();
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: "transparent" },
  input: { backgroundColor: "transparent" },
  inputContainer: { backgroundColor: "transparent" },
  closeIcon: {
    marginTop: 20,
    margin: 10
  },
  citySearch: {
    backgroundColor: "#F4F8FF",
    height: 60,
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    color: "whitesmoke",
    marginTop: 20
  },
  cityDisplay: {
    fontSize: 30,
    fontWeight: "500"
  },
  closeIcon: {
    marginTop: 20,
    margin: 10
  },
  cityButton: {
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});
