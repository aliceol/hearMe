import React, { Fragment } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Modal
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";

import { SearchBar } from "react-native-elements";

import Icon from "react-native-vector-icons/FontAwesome";

/* import Modal from "react-native-modalbox";
 */
import HomePageUpcoming from "../HomePageUpcoming";
import HomePagePopular from "../HomePagePopular";

import TabViewComponent from "../../Components/TabViewComponent";

export default class TabViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      index: 0,
      cityName: "Paris",
      cityCode: "28909",
      coordinates: { lat: 48.8566, lng: 2.3522 },
      routes: [
        {
          key: "upcoming",
          title: "Upcoming Events",
          cityCode: "28909"
        },
        { key: "popular", title: "Popular Events", cityCode: "28909" }
      ],
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      cities: [
        "Paris",
        "Berlin",
        "Barcelona",
        "London",
        "Oslo",
        "Shanghai",
        "Hong-Kong",
        "Bordeaux",
        "Cannes",
        "Nice"
      ],
      query: "",
      matchingCities: []
    };
  }

  citiesCodes = {
    Paris: "28909",
    Berlin: "28443",
    Barcelona: "28714",
    London: "24426",
    Oslo: "31422",
    Shanghai: "28033",
    HongKong: "34358",
    Bordeaux: "28851",
    Cannes: "28857",
    Nice: "28903"
  };

  citiesCoordinates = {
    Paris: { lat: 48.8566, lng: 2.3522 },
    Berlin: { lat: 52.52, lng: 13.405 },
    Barcelona: { lat: 41.3851, lng: 2.1734 },
    London: { lat: 51.5074, lng: 0.1278 },
    Oslo: { lat: 59.9139, lng: 10.7522 },
    Shanghai: { lat: 31.226444, lng: 121.560501 },
    HongKong: { lat: 22.302219, lng: 114.174637 },
    Bordeaux: { lat: 44.837994, lng: -0.576675 },
    Cannes: { lat: 43.552849, lng: 7.017369 },
    Nice: { lat: 43.675819, lng: 7.289429 }
  };

  compareCities = () => {
    let queryLength = this.state.query.length;
    let matchingCities = [];
    if (queryLength > 0) {
      for (let i = 0; i < this.state.cities.length; i++) {
        if (this.state.query === this.state.cities[i].slice(0, queryLength)) {
          matchingCities.push(this.state.cities[i]);
        }
      }
    }
    //return matchingCities;
    this.setState({ matchingCities: matchingCities });
  };

  renderMatchingCities = cities => {
    let matchingCities = [];
    for (let i = 0; i < cities.length; i++) {
      matchingCities.push(
        <TouchableOpacity
          onPress={() => this.navigateToCity(cities[i])}
          key={cities[i]}
          style={styles.cityButton}
        >
          <Text style={{ fontSize: 20 }}>{cities[i]}</Text>
        </TouchableOpacity>
      );
    }
    return matchingCities;
  };

  navigateToCity = cityName => {
    const cityCode = this.citiesCodes[cityName];
    const coordinates = this.citiesCoordinates[this.citiesCoordinates];
    let newRoutes = [...this.state.routes];
    newRoutes[0].cityCode = cityCode;
    this.setState(
      {
        cityName: cityName,
        cityCode: cityCode,
        coordinates: coordinates,
        query: "",
        matchingCities: [],
        routes: newRoutes
      },
      () => {
        this.setState({ modalVisible: false });
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
      <Fragment>
        <Modal
          visible={this.state.modalVisible}
          style={[styles.modal, styles.modalSearch]}
          ref={"modalSearch"}
          swipeToClose={this.state.swipeToClose}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          onClosingState={this.onClosingState}
        >
          <TouchableOpacity
            onPress={() => this.setState({ modalVisible: false })}
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
          <View>{this.renderMatchingCities(this.state.matchingCities)}</View>
        </Modal>
        <View style={styles.citySearch}>
          <Text style={styles.cityDisplay}>{this.state.cityName}</Text>
          <TouchableOpacity
            onPress={() => this.setState({ modalVisible: true })}
          >
            <Icon name="search" size={30} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.mapViewButton}
          onPress={() => {
            this.props.navigation.navigate("MapView", {
              cityCode: this.state.cityCode,
              coordinates: this.citiesCoordinates[this.state.cityName]
            });
          }}
        >
          <Icon name="map-marker" size={30} />
          <Text style={styles.mapViewText}>Map View</Text>
        </TouchableOpacity>
        {/* <TabView
          navigationState={this.state}
          renderTabBar={props => (
            <TabBar
              {...props}
              indicatorStyle={{
                backgroundColor: "grey"
              }}
              style={{ backgroundColor: "#F4F8FF" }}
              labelStyle={{
                color: "black"
              }}
            />
          )}
          renderScene={SceneMap({
            upcoming: props => (
              <HomePageUpcoming {...props} navigation={this.props.navigation} />
            ),
            popular: props => (
              <HomePagePopular {...props} navigation={this.props.navigation} />
            )
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ height: 0, width: Dimensions.get("window").width }}
        /> */}
        <TabViewComponent {...this.state} />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  modalSearch: {},
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
  searchIcon: {
    height: 30,
    width: 30
  },
  mapViewButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "grey",
    color: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999
  },
  mapViewText: { textAlign: "center", fontSize: 12, marginTop: 3 },
  container: { backgroundColor: "transparent" },
  input: { backgroundColor: "transparent" },
  inputContainer: { backgroundColor: "transparent" },
  closeIcon: {
    marginTop: 20,
    margin: 10
  },
  cityButton: {
    paddingHorizontal: 20,
    paddingVertical: 10
  }
});
