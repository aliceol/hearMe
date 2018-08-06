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
import HomePage from "./src/containers/HomePage";
import EditUsername from "./src/containers/EditUsername";
import EditEmail from "./src/containers/EditEmail";
import ChooseLocation from "./src/containers/ChooseLocation";
import ChoosePicture from "./src/containers/ChoosePicture";

//

StatusBar.setBarStyle("light-content");

const App = StackNavigator({
  MyProfile: {
    screen: MyProfile
  },
  ChoosePicture: {
    screen: ChoosePicture
  },
  HomePage: { screen: HomePage },
  HomePageUpcoming: {
    screen: HomePageUpcoming
  },
  OnBoarding: {
    screen: OnBoarding
  },
  CreateAccount: {
    screen: CreateAccount
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
  HomePagePopular: {
    screen: HomePagePopular
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
  }
});

export default App;
