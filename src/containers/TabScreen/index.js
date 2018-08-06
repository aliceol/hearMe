import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { createBottomTabNavigator } from "react-navigation";
import HomePage from "../HomePage";
import MyLikes from "../MyLikes";
import MyProfileNav from "../MyProfileNav";
import MyCalendarNav from "../MyCalendarNav";

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return <Icon name="home" size={30} color={tintColor} />;
        }
      },
      tabBarOptions: {
        activeTintColor: "blue",
        inactiveTintColor: "gray"
      }
    },
    "My Calendar": {
      screen: MyCalendarNav,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return <Icon name="calendar" size={30} color={tintColor} />;
        }
      },
      tabBarOptions: {
        activeTintColor: "blue",
        inactiveTintColor: "gray"
      }
    },
    Likes: {
      screen: MyLikes,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return <Icon name="heart" size={30} color={tintColor} />;
        }
      },
      tabBarOptions: {
        activeTintColor: "blue",
        inactiveTintColor: "gray"
      }
    },
    Profile: {
      screen: MyProfileNav,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return <Icon name="user" size={30} color={tintColor} />;
        }
      },
      tabBarOptions: {
        activeTintColor: "blue",
        inactiveTintColor: "gray"
      }
    }
  },

  {
    initialRouteName: "Home",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#f4511e"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);
