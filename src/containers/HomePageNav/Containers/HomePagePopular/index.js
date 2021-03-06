import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SectionList,
  Dimensions,
  FlatList
} from "react-native";
import { withNavigation } from "react-navigation";

const moment = require("moment");
moment().format();

import axios from "axios";

import ConcertCard from "../../Components/ConcertCard";

const widthScreen = Dimensions.get("window").width;

export default class HomePagePopular extends Component {
  static navigationOptions = {
    title: "HomePageUpcoming"
  };

  constructor(props) {
    super(props);
    this.state = {
      events: props.eventsData.events,
      isLoading: props.eventsData.isLoading,
      isLoadingMore: props.eventsData.isLoadingMore,
      page: props.eventsData.page,
      error: "",
      index: props.eventsData.index,
      scrollIndex: props.eventsData.scrollIndex
    };
  }

  /*  handleLoadMore = () => {
    if (!this.state.isLoadingMore) {
      this.setState(
        {
          page: this.state.page + 1,
          isLoadingMore: true
        },
        () => {
          this.getEvents();
        }
      );
    }
  }; */
  /* 
  getEvents() {
    axios
      .get(
        "https://hearme-api.herokuapp.com/api/city/popular/" +
          this.props.city.code +
          "/" +
          this.state.page
      )
      .then(response => {
        this.setState({
          events: [...this.state.events, ...response.data],
          isLoading: false,
          isLoadingMore: false
        });
      })
      .catch(function(error) {
        console.log(
          "There has been a problem with your operation: " + error.message
        );
        throw error;
      });
  } */

  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.activityIndicator]}>
          <ActivityIndicator size="large" color="#2B2D5B" />
        </View>
      );
    } else {
      return (
        <FlatList
          ref="_FlatListPop"
          style={[
            {
              padding: 10
            },
            styles.backgroundOfPage
          ]}
          data={this.state.events}
          keyExtractor={(item, index) => item.displayName + index}
          onEndReachedThreshold={0.99}
          onEndReached={this.props.handleLoadMorePopular}
          onScroll={event => this.props.handleScroll("popular", event)}
          contentOffset={{ x: 0, y: this.state.scrollIndex }}
          renderItem={obj => {
            return (
              <ConcertCard event={obj.item} navigate={this.props.navigate} />
            );
          }}
        />
      );
    }
  }
  /*   componentDidMount() {
    if (this.props.city.code !== "") {
      this.getEvents();
    } 
  }*/
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  backgroundOfPage: {
    backgroundColor: "#F4F8FF"
  }
});
