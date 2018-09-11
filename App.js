import { createStackNavigator } from "react-navigation";
import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Platform, StyleSheet, Text, View } from "react-native";

// TOUTES NOS PAGES

import Welcome from "./src/containers/Welcome";
import SignUp from "./src/containers/SignUp";
import Login from "./src/containers/Login";

/* import WelcomeNav from "./src/containers/WelcomeNav"; */
import TabScreen from "./src/containers/TabScreen";

StatusBar.setBarStyle("light-content");

const App = createStackNavigator({
  Welcome: {
    screen: Welcome
  },
  SignUp: {
    screen: SignUp
  },
  Login: {
    screen: Login
  },
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
      header: null
    }
  }

  /* HomePage: { screen: HomePage },

    Welcome: {
      screen: Welcome
    },
    SignUp: {
      screen: SignUp
    },
    Login: {
      screen: Login
    },
    HomePage: { screen: HomePage },
    MyProfile: {
      screen: MyProfile
    },
    HomePagePopular: {
      screen: HomePagePopular
    },
    HomePageUpcoming: {
      screen: HomePageUpcoming
    },
    OnBoarding: {
      screen: OnBoarding
    },
    CreateAccount: {
      screen: CreateAccount
    },
    MyProfile: {
      screen: MyProfile
    },
    AccountInformation: {
      screen: AccountInformation
    },
    AllowNotification: {
      screen: AllowNotification
    },
    AllowGeolocalisation: {
      screen: AllowGeolocalisation
    },
    EventPage: {
      screen: EventPage
    },
    MyLikes: {
      screen: MyLikes
    },
    ArtistPage: {
      screen: ArtistPage
    },
    ChooseLocation: {
      screen: ChooseLocation
    },
    MyCalendar: {
      screen: MyCalendar
    },
    MySettings: {
      screen: MySettings
    },
    EditUsername: {
      screen: EditUsername
    },
    EditEmail: {
      screen: EditEmail
    } */
});

export default App;
