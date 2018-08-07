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
  Alert,
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity
} from "react-native";

export default class MyLikes extends Component {
  state = {
    artists: [],
    refreshing: false,
    activeRowKey: null
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
  };

  // static navigationOptions = {
  //   headerBackTitle: null,

  //   headerLeftContainerStyle: { paddingLeft: 10 },
  //   headerTintColor: "white",
  //   title: "My Likes",
  //   headerStyle: {
  //     backgroundColor: "#3498db"
  //   },
  //   headerTitleStyle: {
  //     color: "white"
  //   }
  // };

  //function to get artist information from the SongKick API to be modified with our own API
  getArtistInfo = artist_id => {
    axios
      .get(
        "https://api.songkick.com/api/3.0/artists/" +
          artist_id +
          ".json?apikey=HNm0lW1pe8ODasVv"
      )
      .then(response => {
        let newState = { ...this.state };
        newState.artists.push(response.data.resultsPage.results);
        this.setState(newState, () => {
          console.log(
            `l'artiste ${artist_id} a été ajouté`,
            this.state.artists
          );
        });
      });
  };

  //rendering one artist from the SK API
  renderArtistItem = ({ item }, index) => {
    let artistName = item.artist.displayName;
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
                    let newArtist = [...this.state.artists];
                    for (let i = 0; i < newArtist.length; i++) {
                      if (newArtist[i].artist.id === item.artist.id) {
                        newArtist.splice(i, 1);
                      }
                    }
                    this.setState({ artists: newArtist });
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
              title: item.artist.displayName
            });
          }}
        >
          <View style={styles.unitArtist}>
            <ImageBackground
              style={styles.artistImage}
              source={require("../../images/artist_2.jpg")}
              imageStyle={{ borderRadius: 40 }}
            >
              <Image
                style={styles.icons}
                source={require("../../images/player.png")}
              />
            </ImageBackground>

            <View style={styles.artistInfo}>
              <View>
                <Text style={styles.artistName}>{artistName}</Text>
                <Text style={styles.artistDate}>
                  On tour until:{" "}
                  {item.artist.onTourUntil
                    ? moment(item.artist.onTourUntil).format("MMM Do YY")
                    : "N/A"}
                </Text>
              </View>
              <Icon name="chevron-right" size={25} style={styles.chevron} />
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  };

  //rendering the FlatList "renderArtistList" calling the the function renderArtistItem
  renderArtistsList() {
    return (
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        keyExtractor={(item, index) => item.artist.id.toString()}
        data={_.orderBy(this.state.artists, ["artist.onTourUntil"], ["asc"])}
        renderItem={this.renderArtistItem}
      />
    );
  }

  //rendering the complete list of artist

  render() {
    if (this.state.artists.length === 0) {
      return <Text>is Loading</Text>;
    } else {
      return <React.Fragment>{this.renderArtistsList()}</React.Fragment>;
    }
  }
  componentDidMount() {
    //receiving the data from the parent component
    const artists = this.props.navigation.state.params.artists;
    for (let i = 0; i < artists.length; i++) {
      this.getArtistInfo(artists[i]);
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
