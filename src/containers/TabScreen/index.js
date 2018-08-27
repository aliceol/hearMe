import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { createBottomTabNavigator } from "react-navigation";
import HomePageNav from "../HomePageNav";
import MyLikesNav from "../MyLikesNav";
import MyProfileNav from "../MyProfileNav";
import MyCalendarNav from "../MyCalendarNav";

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomePageNav,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return <Icon name="home" size={30} color={tintColor} />;
        },
        tabBarOptions: {
          activeTintColor: "#2B2D5B",
          inactiveTintColor: "gray"
        }
      }
    },
    "My Calendar": {
      screen: MyCalendarNav,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return <Icon name="calendar" size={30} color={tintColor} />;
        },
        tabBarOptions: {
          activeTintColor: "#2B2D5B",
          inactiveTintColor: "gray"
        }
      }
    },
    "My Likes": {
      screen: MyLikesNav,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return <Icon name="heart" size={30} color={tintColor} />;
        },
        tabBarOptions: {
          activeTintColor: "#2B2D5B",
          inactiveTintColor: "gray"
        }
      }
    },
    Profile: {
      screen: MyProfileNav,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return <Icon name="user" size={30} color={tintColor} />;
        },
        tabBarOptions: {
          activeTintColor: "#2B2D5B",
          inactiveTintColor: "gray"
        }
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
