import { StackNavigator } from "react-navigation";
import React, { Component } from "react";
import { StatusBar } from "react-native";
import { Platform, StyleSheet, Text, View } from "react-native";

// TOUTES NOS PAGES

import OnBoarding from "./src/containers/OnBoarding";
import CreateAccount from "./src/containers/CreateAccount";
import AccountInformation from "./src/containers/AccountInformation";
import AllowNotification from "./src/containers/AllowNotification";
import AllowGeolocalisation from "./src/containers/AllowGeolocalisation";
import HomePageUpcoming from "./src/containers/HomePageUpcoming";
import HomePagePopular from "./src/containers/HomePagePopular";
import EventPage from "./src/containers/EventPage";
import MyLikes from "./src/containers/MyLikes";
import ArtistPage from "./src/containers/ArtistPage";
import MyProfile from "./src/containers/MyProfile";
import MyCalendar from "./src/containers/MyCalendar";
import MySettings from "./src/containers/MySettings";

//

StatusBar.setBarStyle("light-content");

const App = StackNavigator({
  HomePageUpcomingScreen: {
    screen: HomePageUpcoming
  },
  OnBoardingScreen: {
    screen: OnBoarding
  },
  CreateAccountScreen: {
    screen: CreateAccount
  },
  AccountInformationScreen: {
    screen: AccountInformation
  },
  AllowNotificationScreen: {
    screen: AllowNotification
  },
  AllowGeolocalisationScreen: {
    screen: AllowGeolocalisation
  },
  HomePagePopularScreen: {
    screen: HomePagePopular
  },
  EventPageScreen: {
    screen: EventPage
  },
  MyLikesScreen: {
    screen: MyLikes
  },
  ArtistPageScreen: {
    screen: ArtistPage
  },
  MyProfileScreen: {
    screen: MyProfile
  },
  MyCalendarScreen: {
    screen: MyCalendar
  },
  MySettingsScreen: {
    screen: MySettings
  }
});

export default App;
