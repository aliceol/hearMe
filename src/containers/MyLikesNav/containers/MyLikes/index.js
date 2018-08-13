//creer une copie du tableau dans le state,
//faire le slice sur cette copie
// set state sur la nouvelle copie slicée

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
  state = {
    myLikes: [],
    isLoading: true,
    refreshing: false,
    activeRowKey: null
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
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
  }

  //rendering one artist from the SK API
  renderArtistItem = ({ item }, index) => {
    let artistName = item.displayName;
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
                    //axios --> call the API to remove the item from the list
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
              source={require("../../../../images/artist_2.jpg")}
              imageStyle={{ borderRadius: 40 }}
            >
              <Image
                style={styles.icons}
                source={require("../../../../images/player.png")}
              />
            </ImageBackground>

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
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    } else {
      return <React.Fragment>{this.renderArtistsList()}</React.Fragment>;
      // const like = [];
      // for (let i = 0; i < this.state.myLikes.length; i++) {
      //   like.push(
      //     <TouchableOpacity>
      //       <View>
      //         <Text>{this.state.myLikes[i].displayName}</Text>
      //       </View>
      //     </TouchableOpacity>
      //   );
      // }

      // return <React.Fragment>{this.renderArtistsList()}</React.Fragment>;
    }
  }
}

const styles = StyleSheet.create({
  backgroundScrollView: {
    backgroundColor: "#F4F8FF"
  },
  touchableView: {
    backgroundColor: "whitesmoke"
  },
  unitArtist: {
    borderColor: "#3498db",
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
    color: "#3498db"
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
