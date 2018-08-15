import { createStackNavigator } from "react-navigation";
import MyLikes from "./containers/MyLikes";
import ArtistPage from "../HomePageNav/Containers/ArtistPage";
import EventPage from "../HomePageNav/Containers/EventPage";

const MyLikesNav = createStackNavigator({
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
        color: "white"
      }
    }
  },
  ArtistPage: {
    screen: ArtistPage,
    navigationOptions: {
      headerTintColor: "#b2bec3",
      // headerBackTitle: null,

      headerStyle: {
        backgroundColor: "#2d3436"
      },
      headerTitleStyle: {
        color: "white"
      }
    },

    EventPage: {
      screen: EventPage,
      navigationOptions: {
        headerLeftContainerStyle: { paddingLeft: 10 },
        headerTintColor: "#b2bec3",
        title: "Event",
        headerStyle: {
          backgroundColor: "#2d3436"
        },
        headerTitleStyle: {
          color: "white"
        }
      }
    }
  }
});
export default MyLikesNav;
