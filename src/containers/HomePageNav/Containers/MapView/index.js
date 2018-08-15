import React, { Component } from "react";
import {
  Text,
  Dimensions,
  ActivityIndicator,
  Platform,
  View,
  StyleSheet
} from "react-native";
import Carousel from "react-native-snap-carousel";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { PermissionsAndroid } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import ConcertCard from "../../Components/ConcertCard";

const horizontalMargin = 1;
const slideWidth = Dimensions.get("window").width - 20;

const sliderWidth = Dimensions.get("window").width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 80;

export default class EventCarousel extends Component {
  state = {
    latitude: this.props.navigation.state.params.coordinates.lat,
    longitude: this.props.navigation.state.params.coordinates.lng,
    error: null,
    events: [],
    isLoading: true,
    activeMarker: 0
  };

  removeEventsWithoutLoc(events) {
    let eventsToDelete = [];

    for (let i = 0; i < events.length; i++) {
      if (!events[i].venue.lat) {
        eventsToDelete.push(i);
      }
    }

    if (eventsToDelete.length > 0) {
      for (let j = eventsToDelete.length - 1; j >= 0; j--) {
        events.splice(eventsToDelete[j], 1);
      }
    }

    return events;
  }

  _renderItem = event => {
    return (
      <ConcertCard event={event.item} navigation={this.props.navigation} />
    );
  };

  _centerMapOnMarker(markerIndex) {
    const mapRef = this._mapView;
    const markerData = this.state.events[markerIndex];

    if (!markerData || !mapRef) {
      return;
    }

    mapRef.animateToRegion({
      latitude: markerData.venue.lat,
      longitude: markerData.venue.lng,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02
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
      let allMarkers = [];
      for (i = 0; i < this.state.events.length; i++) {
        this.state.events[i].venue.lat
          ? allMarkers.push(
              (i => {
                return (
                  <Marker
                    key={this.state.events[i].id}
                    coordinate={{
                      latitude: this.state.events[i].venue.lat,
                      longitude: this.state.events[i].venue.lng
                    }}
                    size={30}
                    title={this.state.events[i].venue.displayName}
                    description={this.state.events[i].title}
                    onPress={() => {
                      this._carousel.snapToItem(i);
                    }}
                    onCalloutPress={e => {
                      console.log(this.state.events);
                      this.props.navigation.navigate("VenuePage", {
                        id: this.state.events[i].venue.id
                      });
                    }}
                  >
                    <Text>
                      <Icon
                        name="map-pin"
                        size={30}
                        style={{
                          color: i === this.state.activeMarker ? "red" : "black"
                        }}
                      />
                    </Text>
                  </Marker>
                );
              })(i)
            )
          : null;
      }

      return (
        <View style={{ flex: 1, position: "relative" }}>
          <MapView
            ref={c => (this._mapView = c)}
            showsUserLocation={true}
            showsMyLocationButton={true}
            style={styles.map}
            region={{
              latitude: this.state.latitude - 0.03,
              longitude: this.state.longitude,
              latitudeDelta: 0.15,
              longitudeDelta: 0.15
            }}
          >
            {allMarkers}
          </MapView>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.removeEventsWithoutLoc(this.state.events)}
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
            }}
          />
        </View>
      );
    }
  }

  componentDidMount() {
    axios
      .get(
        "https://hearme-api.herokuapp.com/api/city/upcoming/" +
          this.props.navigation.state.params.cityCode +
          "/1"
      )
      .then(response => {
        this.setState({
          isLoading: false,
          events: response.data
        });
      })

      .catch(function(error) {
        // handle error
        console.log(error);
      });

    if (Platform.OS == "ios") {
      // permission will be asked automatically by ios
      /* navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            error: null
          });
        },
        error => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000 }
      ); */
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
            alert("We can't access your position, please explore the map");
          }
        })
        .catch(err => {
          console.log("PermissionsAndroid", err);
        });
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
