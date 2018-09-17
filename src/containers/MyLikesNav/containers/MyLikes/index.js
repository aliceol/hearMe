import React, { Component } from "react";
import Swipeout from "react-native-swipeout";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import moment from "moment";
import _ from "lodash";
import {
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity
} from "react-native";

import store from "react-native-simple-store";

export default class MyLikes extends Component {
  static navigationOptions = { headerBackTitle: null };

  state = {
    myLikes: [],
    isLoading: true,
    refreshing: false,
    activeRowKey: null
  };

  getMyLikes() {
    store.get("userToken").then(res => {
      const config = {
        headers: {
          Authorization: "Bearer " + res.token
        }
      };
      axios
        .get("https://hearme-api.herokuapp.com/api/user/getMyLikes", config)
        .then(response => {
          this.setState({
            myLikes: response.data,
            isLoading: false
          });
        });
    });
  }

  componentDidMount() {
    this.getMyLikes();
    this.willFocusSubscription = this.props.navigation.addListener(
      "willFocus",
      () => {
        this.getMyLikes();
      }
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  refreshData = () => {
    this.setState({ isLoading: true });
    this.getMyLikes();
  };

  //rendering one artist from the SK API
  renderArtistItem = ({ item }, index) => {
    let artistName = item.displayName;
    let artistPicURI = "https:" + item.pictureURI;
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
                artistName +
                " from your likes?",
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
                          "https://hearme-api.herokuapp.com/api/user/like/artist/" +
                            item.songKickId,
                          config
                        )
                        .then(response => {
                          console.log(response.data);
                        });
                    });

                    let newArtists = [...this.state.myLikes];
                    for (let j = 0; j < newArtists.length; j++) {
                      if (newArtists[j].songKickId === item.songKickId) {
                        newArtists.splice(j, 1);
                      }
                    }
                    this.setState({ myLikes: newArtists });
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
          style={styles.touchableView}
          onPress={() => {
            this.props.navigation.navigate("ArtistPage", {
              id: item.songKickId,
              name: item.displayName
            });
          }}
        >
          <View style={styles.unitArtist}>
            <ImageBackground
              style={styles.artistImage}
              source={{ uri: artistPicURI }}
              imageStyle={{ borderRadius: 40 }}
            />

            {/* <ImageBackground
              style={styles.artistImage}
              source={require("../../../../images/placeholder_concert.jpg")}
            >
              <Image
                style={styles.artistImage}
                // source={require("../../../../images/artist_2.jpg")}
                source={{
                  uri: "https:" + myResult.artistPicURI
                }}
                imageStyle={{ borderRadius: 40 }}
              />
            </ImageBackground> */}

            <View style={styles.artistInfo}>
              <View>
                <Text style={styles.artistName}>{item.displayName}</Text>
                {/* <Text style={styles.artistDate}>
                  On tour until:{" "}
                  {item.artist.onTourUntil
                    ? moment(item.artist.onTourUntil).format("MMM Do YY")
                    : "N/A"}
                </Text> */}
              </View>
              <Icon name="chevron-right" size={25} style={styles.chevron} />
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  };

  // rendering the FlatList "renderArtistList" calling the the function renderArtistItem

  _onRefresh = () => {
    this.getMyLikes();
  };

  renderArtistsList() {
    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        keyExtractor={(item, index) => item.songKickId.toString()}
        data={this.state.myLikes}
        renderItem={this.renderArtistItem}
      />
    );
  }

  //rendering the complete list of artist

  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.activityIndicator]}>
          <ActivityIndicator size="large" color="#2B2D5B" />
        </View>
      );
    }

    if (this.state.myLikes.length === 0) {
      return (
        <ScrollView>
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
          <View style={styles.infoContent}>
            <Text style={styles.info}>Start adding artists to your likes!</Text>
            <Text style={styles.emoji}>🤘</Text>
          </View>
        </ScrollView>
      );
    } else {
      return <React.Fragment>{this.renderArtistsList()}</React.Fragment>;
    }
  }
}

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1
  },
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
  backgroundScrollView: {
    backgroundColor: "#F4F8FF"
  },
  touchableView: {
    backgroundColor: "whitesmoke"
  },
  unitArtist: {
    borderColor: "#2B2D5B",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    padding: 20
  },
  artistImage: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,

    justifyContent: "center",
    alignItems: "center"
  },
  chevron: {
    color: "#2B2D5B"
  },
  artistName: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "300"
  },
  artistDate: {
    color: "#7f8c8d"
  },

  artistInfo: {
    width: 215,
    alignItems: "center",
    position: "absolute",
    right: 40,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
