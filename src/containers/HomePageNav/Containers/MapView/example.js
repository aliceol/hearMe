import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  ActivityIndicator,
  Image,
  Dimensions
} from "react-native";
import { Icon } from "react-native-vector-icons/FontAwesome";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";

import { PermissionsAndroid } from "react-native";
import axios from "axios";
import Carousel from "react-native-snap-carousel";

import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import icoMoonConfig from "../assets/fonts/selection.json";
const IconIcomoon = createIconSetFromIcoMoon(icoMoonConfig);

const horizontalMargin = 1;
const slideWidth = 310;

const sliderWidth = Dimensions.get("window").width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 80;

class AroundMe extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Autour de moi",
    headerStyle: { backgroundColor: "#fecb2f" },
    headerTitleStyle: { fontWeight: "500" }
  });
  state = {
    latitude: 48.856358,
    longitude: 2.347764,
    error: null,
    restaurants: []
  };

  componentDidMount() {
    axios
      .get(
        "https://lesgrandsducs-back.herokuapp.com/api/restaurants/all?limit=5"
      )
      // .get(
      //   "https://lesgrandsducs-back.herokuapp.com/api/restaurants/5b601ee72cf3e808c229f727"
      // )
      .then(response => {
        this.setState({
          isLoading: false,
          restaurants: response.data
        });
      })

      .catch(function(error) {
        // handle error
        console.log(error);
      });

    if (Platform.OS == "ios") {
      // permission will be asked automatically by ios
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null
          });
          console.log("position.coords", position.coords);
          console.log("this.state", this.state);
        },
        error => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000 }
      );
      // ok
    }
    if (Platform.OS == "android") {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Contacts",
          message: "Describing why I need to access contact information."
        }
      )
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // permission granted
            navigator.geolocation.getCurrentPosition(
              position => {
                this.setState({
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  error: null
                });
              },
              error => this.setState({ error: error.message }),
              { enableHighAccuracy: true, timeout: 20000 }
            );
            // ok
          } else {
            alert(
              "Votre position n'est pas récupérée par l'application, vous devrez zoomer sur la carte vous-même."
            );
          }
        })
        .catch(err => {
          console.log("PermissionsAndroid", err);
        });
    }
  }

  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <View style={styles.slideInnerContainer}>
          <Text style={{ color: "white" }}>{item.title}</Text>
          <Text style={{ color: "white" }}>{item.type_ambiance}</Text>
        </View>
      </View>
    );
  }

  _centerMapOnMarker(markerIndex) {
    const mapRef = this._mapView;
    const markerData = this.state.restaurants[markerIndex];

    if (!markerData || !mapRef) {
      return;
    }
    mapRef.animateToRegion({
      latitude: markerData.address_geocode.latitude,
      longitude: markerData.address_geocode.longitude,
      latitudeDelta: 0.0315,
      longitudeDelta: 0.0258
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      // console.log("this.state.restaurants", this.state.restaurants);
      let allMarkers = [];

      for (i = 0; i < this.state.restaurants.length; i++) {
        allMarkers.push(
          <Marker
            key={i}
            coordinate={{
              latitude: this.state.restaurants[i].address_geocode.latitude,
              longitude: this.state.restaurants[i].address_geocode.longitude
            }}
            size={30}
            title={this.state.restaurants[i].title}
            description={
              this.state.restaurants[i].type_ambiance +
              " " +
              this.state.restaurants[i].type_cuisine_one
            }
          >
            <Text>
              <IconIcomoon
                name="pin-full"
                color="black"
                backgroundColor="black"
                size={50}
              />
            </Text>
          </Marker>
        );
      }
      let { width, height } = Dimensions.get("window");
      const ASPECT_RATIO = width / height;
      let LATITUDE_DELTA = 0.03;
      return (
        <View style={{ flex: 1, position: "relative" }}>
          <MapView
            ref={c => (this._mapView = c)}
            style={styles.map}
            region={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LATITUDE_DELTA * ASPECT_RATIO
              // longitudeDelta: 0.0121
            }}
          >
            {allMarkers}
          </MapView>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.restaurants}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            itemHeight={itemHeight}
            containerCustomStyle={{ flexGrow: 0 }}
            paddingHorizontal={horizontalMargin}
            inactiveSlideOpacity={1}
            inactiveSlideScale={0}
            loop={true}
            containerCustomStyle={{ position: "absolute", bottom: 0 }}
            onSnapToItem={slideIndex => {
              this._centerMapOnMarker(slideIndex);
              // console.log("marker", allMarkers[slideIndex]);
            }}
            /* contentContainerCustomStyle={{ opacity: 1 }} */
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative"
  },
  slide: {
    width: itemWidth,
    height: itemHeight,
    paddingHorizontal: horizontalMargin,
    backgroundColor: "black",
    bottom: 5,
    borderRadius: 5,
    marginTop: 5
    // other styles for the item container
  },
  slideInnerContainer: {
    width: slideWidth,
    flex: 1,
    paddingTop: 8

    // other styles for the inner container
  }
});

export default AroundMe;
