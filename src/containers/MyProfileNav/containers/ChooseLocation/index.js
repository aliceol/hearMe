import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { SearchBar } from "react-native-elements";

import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";

export default class ChooseLocation extends Component {
  static navigationOptions = {
    header: null
  };

  generateCitiesArray = () => {
    const citiesNamesArray = [];
    for (let i = 0; i < cities.length; i++) {
      citiesNamesArray.push(cities[i].name);
    }
    this.setState({ cities: citiesNamesArray });
  };

  state = {
    cities: ["Paris", "Berlin", "Barcelona", "London", "Oslo"],
    query: "",
    matchingCities: ["Paris", "Berlin", "Barcelona", "London", "Oslo"]
  };

  citiesCodes = {
    Paris: "28909",
    Berlin: "28443",
    Barcelona: "28714",
    London: "24426",
    Oslo: "31422"
  };

  citiesCoordinates = {
    Paris: { lat: 48.8566, lng: 2.3522 },
    Berlin: { lat: 52.52, lng: 13.405 },
    Barcelona: { lat: 41.3851, lng: 2.1734 },
    London: { lat: 51.5074, lng: 0.1278 },
    Oslo: { lat: 59.9139, lng: 10.7522 }
  };

  compareCities = () => {
    let queryLength = this.state.query.length;
    let matchingCities = [];
    if (queryLength > 0) {
      for (let i = 0; i < this.state.cities.length; i++) {
        if (this.state.query === this.state.cities[i].slice(0, queryLength)) {
          matchingCities.push(
            <TouchableOpacity
              onPress={() => this.navigateToCity(this.state.cities[i])}
              key={this.state.cities[i]}
            >
              <Text>{this.state.cities[i]}</Text>
            </TouchableOpacity>
          );
        }
      }
    }
    this.setState({ matchingCities: matchingCities });
  };

  navigateToCity = cityName => {
    this.props.navigation.replace("HomePage", {
      cityName: cityName,
      cityCode: this.citiesCodes[cityName]
    });
  };

  /* handleChangeText = query => {
    this.setState(
      state => ({ ...state, query: query || "" }),
      () => this.compareCities()
    );
  }; */

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
        <View>{this.state.matchingCities}</View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: { backgroundColor: "transparent" },
  input: { backgroundColor: "transparent" },
  inputContainer: { backgroundColor: "transparent" },
  closeIcon: {
    marginTop: 20,
    margin: 10
  }
});
