import { createStackNavigator } from "react-navigation";
import MyProfile from "./containers/MyProfile";
import MySettings from "./containers/MySettings";
import ChooseLocation from "./containers/ChooseLocation";
import EditUsername from "./containers/EditUsername";
import EditEmail from "./containers/EditEmail";
import SpotifyConnect from "./containers/SpotifyConnect";
import Welcome from "../Welcome/index.js";

const Profile = createStackNavigator({
  MyProfile: {
    screen: MyProfile,
    navigationOptions: {
      headerBackTitle: null,
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "white",
      title: "My Profile",
      headerStyle: {
        backgroundColor: "#2B2D5B"
      },
      headerTitleStyle: {
        color: "white"
      }
    }
  },

  ChooseLocation: {
    screen: ChooseLocation,
    navigationOptions: {
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "white",
      title: "Location",
      headerStyle: {
        backgroundColor: "#2B2D5B"
      },
      headerTitleStyle: {
        color: "black"
      }
    }
  },
  MySettings: {
    screen: MySettings,
    navigationOptions: {
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "white",
      title: "Settings",
      headerStyle: {
        backgroundColor: "#2B2D5B"
      },
      headerTitleStyle: {
        color: "white"
      }
    }
  },
  EditUsername: {
    screen: EditUsername,
    navigationOptions: {
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "#white",
      title: "Edit Username",
      headerStyle: {
        backgroundColor: "#2B2D5B"
      },
      headerTitleStyle: {
        color: "white"
      }
    }
  },
  EditEmail: {
    screen: EditEmail,
    navigationOptions: {
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "#white",
      title: "Edit email",
      headerStyle: {
        backgroundColor: "#2B2D5B"
      },
      headerTitleStyle: {
        color: "white"
      }
    }
  },
  SpotifyConnect: {
    screen: SpotifyConnect,
    navigationOptions: {
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "white",
      title: "Spotify Connect",
      headerStyle: {
        backgroundColor: "#2B2D5B"
      },
      headerTitleStyle: {
        color: "white"
      }
    }
  },
  WelcomeScreen: {
    screen: Welcome
  }
});
export default Profile;
