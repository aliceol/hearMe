import { createStackNavigator } from "react-navigation";
import MyProfile from "./containers/MyProfile";
import MyLikes from "../MyLikes";
import ChooseLocation from "../ChooseLocation";

const MyProfileNav = createStackNavigator({
  MyProfile: {
    screen: MyProfile,
    navigationOptions: {
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "#b2bec3",
      title: "My Profile",
      headerStyle: {
        backgroundColor: "#2d3436"
      },
      headerTitleStyle: {
        color: "black"
      }
    }
  },
  /* MyCalendar: {
    screen: MyCalendar,
    navigationOptions: {
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "#b2bec3",
      title: "My Calendar",
      headerStyle: {
        backgroundColor: "#2d3436"
      },
      headerTitleStyle: {
        color: "black"
      }
    }
  }, */
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
  MyLikes: {
    screen: MyLikes,
    navigationOptions: {
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "#b2bec3",
      title: "My Likes",
      headerStyle: {
        backgroundColor: "#2d3436"
      },
      headerTitleStyle: {
        color: "black"
      }
    }
  }
});
export default MyProfileNav;
