import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import Swipeout from "react-native-swipeout";
import store from "react-native-simple-store";

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";

export default class MyCalendar extends Component {
  state = {
    myCalendar: [],
    isLoading: true,
    refreshing: false,
    activeRowKey: null
  };

  getMyCalendar() {
    store.get("userToken").then(res => {
      const config = {
        headers: {
          Authorization: "Bearer " + res.token
        }
      };
      axios
        .get("https://hearme-api.herokuapp.com/api/user/getMyCalendar", config)
        .then(response => {
          this.setState({
            myCalendar: response.data,
            isLoading: false
          });
        });
    });
  }

  renderLikesItem = ({ item }, index) => {
    let eventName = item.displayName;
    const swipeSettings = {
      autoClose: true,
      onClose: () => {
        if (this.state.activeRowKey != null) {
          this.setState({ activeRowKey: null });
        }
      },
      onOpen: () => {},
      right: [
        {
          onPress: () => {
            Alert.alert(
              "Alert",
              "Are you sure you want to remove " +
                eventName +
                " from your calendar?",
              [
                {
                  text: "No",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "Yes",
                  onPress: () => {
                    //axios --> call the API to remove the item from the list
                    let newCalendar = [...this.state.myCalendar];
                    for (let j = 0; j < newCalendar.length; j++) {
                      if (newCalendar[j].songKickId === item.songKickId) {
                        newCalendar.splice(j, 1);
                      }
                    }
                    this.setState({ myCalendar: newCalendar });
                  }
                }
              ]
            );
          },
          text: "Delete",
          type: "delete"
        }
      ]
    };

    return (
      <Swipeout {...swipeSettings}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("EventPage", {
              id: item.songKickId
            });
          }}
        >
          <View style={styles.unitEvent}>
            <View style={styles.date}>
              <Text style={styles.themeColor}>{item.start.date}</Text>
            </View>
            <View style={styles.centralContent}>
              <Text style={styles.artistName}>
                {item.performance[0].artist.displayName}
              </Text>
              <Text>{item.venue.name}</Text>
            </View>

            <View style={styles.location}>
              <Icon name="map-marker" size={20} style={styles.mapPicker} />
              <Text>{item.venue.city} , </Text>
              <Text>{item.venue.country}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  };

  renderLikesList() {
    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        keyExtractor={(item, index) => item.songKickId.toString()}
        data={this.state.myCalendar}
        renderItem={this.renderLikesItem}
      />
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

      return <React.Fragment>{this.renderLikesList()}</React.Fragment>;
    }
  }

  componentDidMount() {
    this.getMyCalendar();
  }
}

const styles = StyleSheet.create({
  container: {},
  themeColor: {
    color: "#3498db"
  },
  unitEvent: {
    borderColor: "#3498db",
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10
  },

  date: {
    flexDirection: "column",
    width: 40,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "justify"
  },
  mapPicker: {
    color: "#3498db",
    marginRight: 10
  },
  location: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  artistName: {
    fontSize: 16,
    color: "#2980b9"
  },
  centralContent: {
    alignItems: "center",
    height: 60,
    justifyContent: "space-around"
  }
});
