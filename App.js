import { createStackNavigator } from "react-navigation";
import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Platform, StyleSheet, Text, View } from "react-native";

// TOUTES NOS PAGES

/* import HomePageUpcoming from "./src/containers/HomePageUpcoming";
import HomePagePopular from "./src/containers/HomePagePopular";
import EventPage from "./src/containers/EventPage";
import MyLikes from "./src/containers/MyLikes";
import ArtistPage from "./src/containers/ArtistPage";
import MyProfile from "./src/containers/MyProfile";
import MyCalendar from "./src/containers/MyCalendar";
import MySettings from "./src/containers/MySettings";
import HomePage from "./src/containers/HomePage";
import EditUsername from "./src/containers/EditUsername";
import EditEmail from "./src/containers/EditEmail";
import ChooseLocation from "./src/containers/ChooseLocation"; */
import Welcome from "./src/containers/Welcome";
import SignUp from "./src/containers/SignUp";
import Login from "./src/containers/Login";

/* import WelcomeNav from "./src/containers/WelcomeNav"; */
import TabScreen from "./src/containers/TabScreen";

StatusBar.setBarStyle("light-content");

const App = createStackNavigator({
  TabScreen: {
    screen: TabScreen,
    navigationOptions: {
      header: null
    }
  },

  SignUpScreen: {
    screen: SignUp
  },
  LoginScreen: {
    screen: Login
  },
  WelcomeScreen: {
    screen: Welcome
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
