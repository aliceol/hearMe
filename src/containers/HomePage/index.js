import React, { Fragment } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import Icon from "react-native-vector-icons/FontAwesome";

import HomePageUpcoming from "../HomePageUpcoming";
import HomePagePopular from "../HomePagePopular";

export default class TabViewPage extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "upcoming", title: "UpcomingEvents" },
      { key: "popular", title: "PopularVenues" }
    ]
  };

  static navigationOptions = {
    title: "HomePage"
  };

  render() {
    // The search button is an image without onPress function. To be replaced by an icon with the onPress function to expand the search bar.
    return (
      <Fragment>
        <View style={styles.citySearch}>
          <Text style={styles.cityDisplay}>Paris</Text>
          <Icon name="search" size={30} />
        </View>
        <TabView
          navigationState={this.state}
          renderTabBar={props => (
            <TabBar /* Component used for styling of the TabView element, see  https://github.com/react-native-community/react-native-tab-view*/
              {...props}
              indicatorStyle={{
                backgroundColor: "grey"
              }}
              style={{ backgroundColor: "#F4F8FF" }}
              labelStyle={{
                color: "black"
              }}
            />
          )}
          renderScene={SceneMap({
            upcoming: props => (
              <HomePageUpcoming
                {...props}
                navigate={this.props.navigation.navigate}
              />
            ),
            popular: props => (
              <HomePagePopular
                {...props}
                navigate={this.props.navigation.navigate}
              />
            )
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ height: 0, width: Dimensions.get("window").width }}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  citySearch: {
    backgroundColor: "#F4F8FF",
    height: 60,
    display: "flex",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
    color: "whitesmoke"
  },
  cityDisplay: {
    fontSize: 30,
    fontWeight: "500"
  },
  searchIcon: {
    height: 30,
    width: 30
  }
});
