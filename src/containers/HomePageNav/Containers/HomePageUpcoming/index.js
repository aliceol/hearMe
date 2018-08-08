import React, { Component, Fragment } from "react";
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SectionList
} from "react-native";
import { withNavigation } from "react-navigation";

const moment = require("moment");
moment().format();

import axios from "axios";

import ConcertCard from "../../Components/ConcertCard";

export default withNavigation(
  class HomePageUpcoming extends Component {
    static navigationOptions = {
      title: "HomePageUpcoming"
    };

    state = {
      events: [],
      page: 1,
      isLoading: true,
      error: "",
      isLoadingMore: false
    };

    getEvents() {
      axios
        .get(
          "https://hearme-api.herokuapp.com/api/city/upcoming/" +
            this.props.route.cityCode +
            "/" +
            this.state.page
        )
        .then(response => {
          console.log(response);
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
    }
    // after reaching the end of the displayed events list, this function is called to display 50 more events.
    handleLoadMore = () => {
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
    };

    // Storing in an array all dates at which events are happening
    getDates(events) {
      dates = [];
      for (let i = 0; i < events.length; i++) {
        if (dates.indexOf(events[i].start.date) === -1) {
          dates.push(events[i].start.date);
        }
      }
      return dates;
    }
    

    // rendering in an array all events happening on a defined date
    renderEventsCard(date, events) {
      eventsByDate = [];
      for (let i = 0; i < events.length; i++) {
        if (events[i].start.date === date) {
          eventsByDate.push(
            <ConcertCard event={events[i]} navigation={this.props.navigation} />
          );
        }
      }
      return eventsByDate;
    }

    // creating object with adequate formatting for generating the section list
    renderSectionListContent(events) {
      let dates = this.getDates(events);
      let sectionContents = [];
      for (let i = 0; i < dates.length; i++) {
        sectionContents.push({
          title: dates[i],
          data: this.renderEventsCard(dates[i], events)
        });
      }
      return sectionContents;
    }

    // formating the date header before the list of events happening at this date
    renderDateTitle(date) {
      return (
        moment(date).format("dddd") + ", " + moment(date).format("MMMM Do")
      );
    }

    render() {
      if (this.state.isLoading) {
        return (
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        );
      } else {
        sectionListData = this.renderSectionListContent(this.state.events);
        // SectionList used with onEndReached for infinite scrolling
        return (
          <SectionList
            style={[
              {
                paddingHorizontal: 10
              },
              styles.backgroundOfPage
            ]}
            renderItem={({ item, index, section }) => (
              <View key={index}>{item}</View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text
                style={[
                  {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    textAlign: "center",
                    marginBottom: 10,
                    paddingVertical: 5,
                    fontWeight: "bold",
                    color: "#2D3436"
                  },
                  styles.backgroundOfPage
                ]}
              >
                {this.renderDateTitle(title)}
              </Text>
            )}
            sections={sectionListData}
            keyExtractor={(item, index) => item + index}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={100}
          />
        );
      }
    }
    componentDidMount() {
      this.getEvents();
    }
  }
);

const styles = StyleSheet.create({
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
