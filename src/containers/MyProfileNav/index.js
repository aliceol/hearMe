import { createStackNavigator } from "react-navigation";
import MyProfile from "./containers/MyProfile";
import MySettings from "./containers/MySettings";
import ChooseLocation from "./containers/ChooseLocation";
import EditUsername from "./containers/EditUsername";
import EditEmail from "./containers/EditEmail";

const Profile = createStackNavigator({
  MyProfile: {
    screen: MyProfile,
    navigationOptions: {
      headerBackTitle: null,
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "#b2bec3",
      title: "My Profile",
      headerStyle: {
        backgroundColor: "#2d3436"
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
      headerTintColor: "#b2bec3",
      title: "Location",
      headerStyle: {
        backgroundColor: "#2d3436"
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
      headerTintColor: "#b2bec3",
      title: "Settings",
      headerStyle: {
        backgroundColor: "#2d3436"
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
      headerTintColor: "#b2bec3",
      title: "Edit Username",
      headerStyle: {
        backgroundColor: "#2d3436"
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
      headerTintColor: "#b2bec3",
      title: "Edit email",
      headerStyle: {
        backgroundColor: "#2d3436"
      },
      headerTitleStyle: {
        color: "white"
      }
    }
  }
});
export default Profile;
