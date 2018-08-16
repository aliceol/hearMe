import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import Swipeout from "react-native-swipeout";
import moment from "moment";
import store from "react-native-simple-store";
import _ from "lodash";


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
  static navigationOptions = { headerBackTitle: null };

  state = {
    myCalendar: [],
    isLoading: true,
    refreshing: false,
    activeRowKey: null,
    date: null
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
          console.log(response.data);
          this.setState({
            myCalendar: response.data,
            isLoading: false
          });
        });
    });
  }

  componentDidMount() {
    this.getMyCalendar();
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.getMyCalendar();
      }
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  refreshData = () => {
    this.setState({ isLoading: true });
    this.getMyCalendar();
  };

  renderLikesItem = ({ item }, index) => {
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
              "Are you sure you want to remove this event from your calendar?",
              [
                {
                  text: "No",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
                {
                  text: "Yes",
                  onPress: () => {
                    store.get("userToken").then(res => {
                      const config = {
                        headers: {
                          Authorization: "Bearer " + res.token
                        }
                      };
                      axios
                        .get(
                          "https://hearme-api.herokuapp.com/api/user/add/event/" +
                            item.songKickId,
                          config
                        )
                        .then(response => {
                          console.log(response.data);
                        });
                    });
                    //axios --> call the API to remove the item from the list

                    let newCalendar = [...this.state.myCalendar];
                    for (let j = 0; j < newCalendar.length; j++) {
                      if (newCalendar[j].songKickId === item.songKickId) {
                        newCalendar.splice(j, 1);
                      }
                    }
                    store.update("userCalendar", { calendar: newCalendar });
                    this.setState({ myCalendar: newCalendar });
                    console.log("new one", this.state.myCalendar);
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
    console.log("item", item);
    return (
      <Swipeout {...swipeSettings}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate("EventPage", {
              id: item.songKickId
            });
          }}
        >
          <View style={styles.rowitem}>
            <View style={styles.card}>
              <View style={styles.month}>
                <Text style={styles.textMonth}>
                  {" "}
                  {moment(item.start.date).format("MMM")}
                </Text>
              </View>
              <Text style={styles.textNumber}>
                {item.start.date.substring(8)}
              </Text>
            </View>
            <View style={styles.content}>
              <View style={styles.cityAndVenue}>
                <Text style={styles.artistName}>
                  {item.performance[0].artist.displayName}
                </Text>
                <View style={styles.markerAndText}>
                  <Icon name="map-marker" size={20} style={styles.mapMarker} />
                  <Text style={styles.textCityName}>{item.venue.name}</Text>
                </View>
              </View>

              <View>
                <Icon name="chevron-right" size={25} />
              </View>
            </View>

          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  };

  _onRefresh = () => {

    this.getMyCalendar();
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
        data={_.orderBy(this.state.myCalendar, ["start.date"], ["asc"])}
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
    }
    if (this.state.myCalendar.length === 0) {
      return (
        <ScrollView>
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
          <View style={styles.infoContent}>
            <Text style={styles.info}>
              Start adding events to your calendar!
            </Text>
            <Text style={styles.emoji}>🎸</Text>
          </View>
        </ScrollView>
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
  infoContent: {
    flexDirection: "column",
    marginTop: 50
  },
  info: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  emoji: {
    textAlign: "center",
    fontSize: 50
  },
  rowitem: {
    padding: 15,
    backgroundColor: "#ecf0f1",
    flexDirection: "row",
    borderColor: "#bdc3c7",
    borderBottomWidth: 1
  },
  month: {
    height: 25,
    width: 80,
    backgroundColor: "#e74c3c",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    height: 80,
    width: 80,
    borderRadius: 5,
    backgroundColor: "white",
    overflow: "hidden",
    alignItems: "center"
  },
  textMonth: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white"
  },
  textNumber: {
    fontSize: 35,
    fontWeight: "700",
    marginTop: 5
  },
  cityAndVenue: {
    flexDirection: "column",
    justifyContent: "space-around",

    height: 80,
    marginLeft: 20
  },
  artistName: {
    fontSize: 20,
    fontWeight: "700"
  },
  markerAndText: {
    flexDirection: "row"
  },
  textCityName: {
    fontSize: 20
  },
  mapMarker: {
    marginRight: 10,
    color: "blue"
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between"
  }
});
