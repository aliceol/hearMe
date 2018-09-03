import React, { Fragment } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Modal
} from "react-native";

import axios from "axios";

import { TabView, TabBar, SceneMap } from "react-native-tab-view";

import { SearchBar } from "react-native-elements";

import Icon from "react-native-vector-icons/FontAwesome";

import TabViewComponent from "../../Components/TabViewComponent";

export default class TabViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: props.navigation.state.params
        ? props.navigation.state.params.city
        : {
            name: "Paris",
            code: "28909",
            coordinates: { lat: 48.8566, lng: 2.3522 }
          },
      index: 0,
      routes: [
        {
          key: "upcoming",
          title: "Upcoming Events"
        },
        { key: "popular", title: "Popular Events" }
      ],
      popular: { page: 1, events: [], isLoading: true, isLoadingMore: false },
      upcoming: { page: 1, events: [], isLoading: true, isLoadingMore: false }
    };
  }

  handleLoadMore = cat => {
    categoryState = { ...this.state[cat] };
    if (!categoryState.isLoadingMore) {
      categoryState.page += 1;
      categoryState.isLoadingMore = true;
      this.setState(
        {
          [cat]: categoryState
        },
        () => {
          this.getEvents(cat);
        }
      );
    }
  };

  getEvents(cat) {
    categoryState = { ...this.state[cat] };
    axios
      .get(
        "https://hearme-api.herokuapp.com/api/city/" +
          cat +
          "/" +
          this.state.city.code +
          "/" +
          this.state[cat].page
      )
      .then(response => {
        categoryState.events += response.data;
        categoryState.isLoading = false;
        categoryState.isLoadingMore = false;
        this.setState(
          {
            [cat]: categoryState
          },
          () => {
            console.log(
              this.state.popular.events.length > 0
                ? this.state.popular.events[0]
                : "0"
            );
            console.log(
              this.state.upcoming.events.length > 0
                ? this.state.upcoming.events[0]
                : "0"
            );
          }
        );
      })
      .catch(function(error) {
        console.log(
          "There has been a problem with your operation: " + error.message
        );
        throw error;
      });
  }

  render() {
    console.log("props", this.props);
    return (
      <Fragment>
        <View style={styles.citySearch}>
          <Text style={styles.cityDisplay}>{this.state.city.name}</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("ChooseLocation");
            }}
          >
            <Icon name="search" size={30} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.mapViewButton}
          onPress={() => {
            this.props.navigation.navigate("MapView", {
              city: this.state.city
            });
          }}
        >
          <Icon name="map-marker" size={30} />
          <Text style={styles.mapViewText}>Map View</Text>
        </TouchableOpacity>

        <TabViewComponent {...this.state} />
      </Fragment>
    );
  }
  componentDidMount() {
    this.getEvents("upcoming");
    this.getEvents("popular");
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
