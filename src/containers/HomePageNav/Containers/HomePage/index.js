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
      popular: {
        page: 1,
        events: [],
        index: 1,
        isLoading: true,
        isLoadingMore: false
      },
      upcoming: {
        page: 1,
        events: [],
        index: 1,
        isLoading: true,
        isLoadingMore: false
      }
    };
  }

  handleLoadMore = cat => {
    console.log("handleLoadMore", cat);
    categoryState = { ...this.state[cat] };

    if (!categoryState.isLoadingMore) {
      categoryState.page += 1;
      categoryState.isLoadingMore = true;
      this.setState(
        {
          [cat]: categoryState
        },
        () => {
          if (cat === "popular") {
            this.getPopularEvents();
          } else if (cat === "upcoming") {
            this.getUpcomingEvents();
          }
        }
      );
    }
  };

  handleLoadMorePopular = () => {
    console.log("handleLoadMorePopular");
    categoryState = { ...this.state.popular };

    if (!categoryState.isLoadingMore) {
      categoryState.page += 1;
      categoryState.isLoadingMore = true;
      this.setState(
        {
          popular: categoryState
        },
        () => {
          this.getPopularEvents();
        }
      );
    }
  };

  handleLoadMoreUpcoming = () => {
    console.log("handleLoadMoreUpcoming");
    categoryState = { ...this.state.upcoming };

    if (!categoryState.isLoadingMore) {
      categoryState.page += 1;
      categoryState.isLoadingMore = true;
      this.setState(
        {
          upcoming: categoryState
        },
        () => {
          this.getUpcomingEvents();
        }
      );
    }
  };

  handleScroll = (cat, event) => {
    console.log(this.state[cat].index, event.nativeEvent.contentOffset.y / 201);

    if (
      event.nativeEvent.contentOffset.y / 201 - this.state[cat].index >= 0 ||
      event.nativeEvent.contentOffset.y / 201 - this.state[cat].index <= -1
    ) {
      categoryState = { ...this.state[cat] };
      categoryState.index =
        Math.floor(event.nativeEvent.contentOffset.y / 201) + 1;
      this.setState(
        {
          [cat]: categoryState
        },
        console.log("after setstate", this.state[cat].index)
      );
    }
  };

  getUpcomingEvents() {
    upcomingState = { ...this.state.upcoming };
    axios
      .get(
        "https://hearme-api.herokuapp.com/api/city/upcoming/" +
          this.state.city.code +
          "/" +
          this.state.upcoming.page
      )
      .then(response => {
        loadedUpcomingEvents = [...upcomingState.events];
        upcomingState.events = [...loadedUpcomingEvents, ...response.data];

        upcomingState.isLoading = false;
        upcomingState.isLoadingMore = false;
        console.log("upcost", upcomingState);
        this.setState({
          upcoming: upcomingState
        });
      })
      .catch(function(error) {
        console.log(
          "There has been a problem with your operation: " + error.message
        );
        throw error;
      });
  }

  getPopularEvents() {
    popularState = { ...this.state.popular };
    axios
      .get(
        "https://hearme-api.herokuapp.com/api/city/popular/" +
          this.state.city.code +
          "/" +
          this.state.popular.page
      )
      .then(response => {
        loadedPopularEvents = [...popularState.events];
        popularState.events = [...loadedPopularEvents, ...response.data];
        popularState.isLoading = false;
        popularState.isLoadingMore = false;
        this.setState({
          popular: popularState
        });
      })
      .catch(function(error) {
        console.log(
          "There has been a problem with your operation: " + error.message
        );
        throw error;
      });
  }

  render() {
    console.log("hpstate", this.state);
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

        <TabViewComponent
          {...this.state}
          handleLoadMorePopular={this.handleLoadMorePopular}
          handleLoadMoreUpcoming={this.handleLoadMoreUpcoming}
          handleScroll={this.handleScroll}
        />
      </Fragment>
    );
  }
  componentDidMount() {
    this.getPopularEvents();
    this.getUpcomingEvents();
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
