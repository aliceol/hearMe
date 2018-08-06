import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { createBottomTabNavigator } from "react-navigation";
import HomePage from "../HomePage";
import MyLikes from "../MyLikes";
import MyProfile from "../MyProfile";

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
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
    MyLikes: {
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
    MyProfile: {
      screen: MyProfile,
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          return <Icon name="profile" size={30} color={tintColor} />;
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
