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
    },
    madrid: {
      name: "Marid",
      code: "28755",
      coordinates: { lat: 40.4168, lng: 40.4168 }
    },
    lisbon: {
      name: "Lisbon",
      code: "31802",
      coordinates: { lat: 38.7223, lng: 9.1393 }
    },
    lille: {
      name: "Lille",
      code: "28886",
      coordinates: { lat: 50.6292, lng: 3.0573 }
    },
    brussels: {
      name: "Brussels",
      code: "26854",
      coordinates: { lat: 50.8503, lng: 4.3517 }
    },
    antwerp: {
      name: "Antwerp",
      code: "26852",
      coordinates: { lat: 51.2194, lng: 4.4025 }
    },
    amsterdam: {
      name: "Amsterdam",
      code: "31366",
      coordinates: { lat: 52.3702, lng: 4.8952 }
    },
    rotterdam: {
      name: "Rotterdam",
      code: "31405",
      coordinates: { lat: 51.9244, lng: 4.4777 }
    },
    copenhagen: {
      name: "Copenhagen",
      code: "28617",
      coordinates: { lat: 55.6761, lng: 12.5683 }
    },
    turin: {
      name: "Turin",
      code: "30383",
      coordinates: { lat: 45.0703, lng: 7.6869 }
    },
    milan: {
      name: "Milan",
      code: "30338",
      coordinates: { lat: 45.4642, lng: 9.19 }
    },
    rome: {
      name: "Rome",
      code: "30366",
      coordinates: { lat: 41.9028, lng: 12.4964 }
    },
    athens: {
      name: "Athens & Mykonos",
      code: "28976",
      coordinates: { lat: 37.9838, lng: 23.7275 }
    },
    vienna: {
      name: "Vienna",
      code: "26771",
      coordinates: { lat: 48.2082, lng: 16.3738 }
    },
    helsinki: {
      name: "Helsinki",
      code: "28825",
      coordinates: { lat: 60.1699, lng: 24.9384 }
    },
    stockholm: {
      name: "Stockholm",
      code: "32252",
      coordinates: { lat: 59.3293, lng: 18.0686 }
    },
    budapest: {
      name: "Budapest",
      code: "29047",
      coordinates: { lat: 47.4979, lng: 19.0402 }
    },
    bucharest: {
      name: "Bucharest",
      code: "31841",
      coordinates: { lat: 44.4268, lng: 26.1025 }
    },
    prague: {
      name: "Prague",
      code: "28425",
      coordinates: { lat: 50.0755, lng: 14.4378 }
    },
    casablanca: {
      name: "Casablanca",
      code: "30865",
      coordinates: { lat: 33.5731, lng: 7.5898 }
    },
    newyork: {
      name: "New York City",
      code: "7644",
      coordinates: { lat: 40.7128, lng: -74.006 }
    },
    miami: {
      name: "Miami",
      code: "9776",
      coordinates: { lat: 25.7617, lng: 80.1918 }
    },
    losangeles: {
      name: "Los Angeles",
      code: "17835",
      coordinates: { lat: 34.0522, lng: 118.2437 }
    },
    tokyo: {
      name: "Tokyo",
      code: "30717",
      coordinates: { lat: 35.6895, lng: 139.6917 }
    },
    bangkok: {
      name: "Bangkok",
      code: "32333",
      coordinates: { lat: 13.7563, lng: 100.5018 }
    },
    ibiza: {
      name: "Ibiza",
      code: "34669",
      coordinates: { lat: 39.02, lng: 1.4821 }
    },
    bogota: {
      name: "Bogota",
      code: "98286",
      coordinates: { lat: 4.711, lng: -74.0721 }
    },
    medellin: {
      name: "Medellin",
      code: "28331",
      coordinates: { lat: 6.2442, lng: -75.5812 }
    },
    cali: {
      name: "Cali",
      code: "28299",
      coordinates: { lat: 3.4516, lng: -76.532 }
    },
    quito: {
      name: "Quito",
      code: "28663",
      coordinates: { lat: 0.1807, lng: -78.4678 }
    },
    mexicocity: {
      name: "Mexico City",
      code: "34385",
      coordinates: { lat: 19.4326, lng: -99.1332 }
    },
    saopaulo: {
      name: "São Paulo",
      code: "27274",
      coordinates: { lat: -23.5505, lng: -46.6333 }
    },
    mumbai: {
      name: "Mumbai",
      code: "34859",
      coordinates: { lat: 19.076, lng: 72.8777 }
    },
    seoul: {
      name: "Seoul",
      code: "30784",
      coordinates: { lat: 37.5665, lng: 126.978 }
    },
    osaka: {
      name: "Osaka",
      code: "30647",
      coordinates: { lat: 34.6937, lng: 135.5022 }
    },
    lagos: {
      name: "Lagos",
      code: "31300",
      coordinates: { lat: 6.5244, lng: 3.3792 }
    },
    buenosaires: {
      name: "Buenos Aires",
      code: "32911",
      coordinates: { lat: -34.6037, lng: -58.3816 }
    },
    riodejaneiro: {
      name: "Rio de Janeiro",
      code: "27232",
      coordinates: { lat: -22.9068, lng: -43.1729 }
    },
    delhi: {
      name: "Delhi",
      code: "29541",
      coordinates: { lat: 28.7041, lng: 77.1025 }
    },
    manila: {
      name: "Manila",
      code: "31573",
      coordinates: { lat: 14.5995, lng: 120.9842 }
    },
    istanbul: {
      name: "Istanbul",
      code: "32463",
      coordinates: { lat: 41.0082, lng: 28.9784 }
    },
    beijing: {
      name: "Beijing",
      code: "34580",
      coordinates: { lat: 39.9042, lng: 116.4074 }
    },
    jakarta: {
      name: "Jakarta",
      code: "29154",
      coordinates: { lat: -6.1751, lng: 106.865 }
    },
    lima: {
      name: "Lima",
      code: "31493",
      coordinates: { lat: -12.0464, lng: -77.0428 }
    },
    hanoi: {
      name: "Hanoi",
      code: "32743",
      coordinates: { lat: 21.0278, lng: 105.8342 }
    },
    santiagodechile: {
      name: "Santiago de Chile",
      code: "27525",
      coordinates: { lat: -33.4489, lng: -70.6693 }
    },
    panamacity: {
      name: "Panama City",
      code: "56112",
      coordinates: { lat: 8.9824, lng: -79.5199 }
    },
    singapore: {
      name: "Singapore",
      code: "32258",
      coordinates: { lat: 1.3521, lng: 103.8198 }
    },
    ankara: {
      name: "Ankara",
      code: "32417",
      coordinates: { lat: 39.9334, lng: 32.8597 }
    },
    stpetersburg: {
      name: "St. Petersburg",
      code: "35625",
      coordinates: { lat: 59.9343, lng: 30.3351 }
    },
    sydney: {
      name: "Sydney",
      code: "26794",
      coordinates: { lat: -33.8688, lng: -151.2093 }
    },
    montreal: {
      name: "Montreal",
      code: "27377",
      coordinates: { lat: 45.5017, lng: -73.5673 }
    },
    toronto: {
      name: "Toronto",
      code: "27396",
      coordinates: { lat: 43.6532, lng: -79.3832 }
    },
    vancouver: {
      name: "Vancouver",
      code: "27398",
      coordinates: { lat: 49.2827, lng: -123.1207 }
    },
    boston: {
      name: "Boston",
      code: "18842",
      coordinates: { lat: 42.3601, lng: -71.0589 }
    },
    melbourne: {
      name: "Melbourne",
      code: "26790",
      coordinates: { lat: -37.8136, lng: 144.9631 }
    },
    canberra: {
      name: "Canberra",
      code: "26781",
      coordinates: { lat: -35.2809, lng: 149.13 }
    },
    johannesburg: {
      name: "Johannesburg",
      code: "32800",
      coordinates: { lat: -26.2041, lng: 28.0473 }
    },
    izmir: {
      name: "Izmir",
      code: "32464",
      coordinates: { lat: 38.4237, lng: 27.1428 }
    },
    capetown: {
      name: "Cape Town",
      code: "32788",
      coordinates: { lat: -33.9249, lng: 18.4241 }
    },
    taipei: {
      name: "Taipei",
      code: "32576",
      coordinates: { lat: 25.033, lng: 121.5654 }
    },
    sanfrancisco: {
      name: "San Francisco",
      code: "26330",
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    portland: {
      name: "Portland",
      code: "12283",
      coordinates: { lat: 45.5122, lng: -122.6587 }
    },
    washington: {
      name: "Washington DC",
      code: "1409",
      coordinates: { lat: 38.9072, lng: -77.0369 }
    },
    philadelphia: {
      name: "Philadelphia",
      code: "5202",
      coordinates: { lat: 39.9526, lng: -75.1652 }
    },
    seattle: {
      name: "Seattle",
      code: "2846",
      coordinates: { lat: 47.6062, lng: -122.3321 }
    },
    chicago: {
      name: "Chigago",
      code: "9426",
      coordinates: { lat: 41.8781, lng: -87.6298 }
    },
    orlando: {
      name: "Orlando",
      code: "3733",
      coordinates: { lat: 28.5383, lng: -81.3792 }
    },
    pittsburgh: {
      name: "Pittsburgh",
      code: "22443",
      coordinates: { lat: 40.4406, lng: -79.9959 }
    },
    manchester: {
      name: "Manchester",
      code: "24475",
      coordinates: { lat: 53.4808, lng: 2.2426 }
    },
    marseille: {
      name: "Marseille",
      code: "156979",
      coordinates: { lat: 43.2965, lng: 5.3698 }
    },
    lyon: {
      name: "Lyon",
      code: "28889",
      coordinates: { lat: 45.764, lng: 4.8357 }
    },
    nantes: {
      name: "Nantes",
      code: "28901",
      coordinates: { lat: 47.2184, lng: 1.5536 }
    },
    detroit: {
      name: "Detroit",
      code: "18073",
      coordinates: { lat: 42.3314, lng: 83.0458 }
    },
    glasgow: {
      name: "Glasgow",
      code: "24473",
      coordinates: { lat: 55.8642, lng: 4.2518 }
    },
    telaviv: {
      name: "Tel Aviv",
      code: "33176",
      coordinates: { lat: 32.0853, lng: 34.7818 }
    },
    cancun: {
      name: "Cancun",
      code: "69001",
      coordinates: { lat: 21.1619, lng: -86.8515 }
    },
    neworleans: {
      name: "New Orleans",
      code: "11772",
      coordinates: { lat: 29.9511, lng: -90.0715 }
    },
    belgrade: {
      name: "Belgrade",
      code: "31876",
      coordinates: { lat: 44.7866, lng: 20.4489 }
    },
    sainttropez: {
      name: "Saint-Tropez",
      code: "62526",
      coordinates: { lat: 43.2677, lng: 6.6407 }
    },
    lasvegas: {
      name: "Las Vegas",
      code: "8396",
      coordinates: { lat: 36.1699, lng: -115.1398 }
    },
    hamburg: {
      name: "Hamburg",
      code: "28498",
      coordinates: { lat: 53.5511, lng: 9.9937 }
    },
    beirut: {
      name: "Beirut",
      code: "30810",
      coordinates: { lat: 33.8938, lng: 35.5018 }
    },
    cusco: {
      name: "Cusco",
      code: "31482",
      coordinates: { lat: 13.532, lng: 71.9675 }
    },
    austin: {
      name: "Austin",
      code: "9179",
      coordinates: { lat: 30.2672, lng: -97.7431 }
    },
    hochiminhcity: {
      name: "Ho Chi Minh City",
      code: "32746",
      coordinates: { lat: 10.8231, lng: 106.6297 }
    }
  };

  state = {
    query: "",
    matchingCities: []
  };

  compareCities = () => {
    let queryLength = this.state.query.length;
    let matchingCities = [];
    let cities = Object.keys(this.cities).sort();
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
      this.refs._scrollView.scrollTo({ x: 0, y: 0, animated: false });
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
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <ScrollView ref="_scrollView" style={{ flex: 1 }}>
            {this.renderMatchingCities(this.state.matchingCities)}
          </ScrollView>
        </KeyboardAvoidingView>
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
