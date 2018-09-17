import { createStackNavigator } from "react-navigation";
import MyLikes from "./containers/MyLikes";
import ArtistPage from "../HomePageNav/Containers/ArtistPage";
import EventPage from "../HomePageNav/Containers/EventPage";

const MyLikesNav = createStackNavigator({
  MyLikes: {
    screen: MyLikes,
    navigationOptions: {
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "white",
      title: "My Likes",
      headerStyle: {
        backgroundColor: "#2B2D5B"
      },
      headerTitleStyle: {
        color: "white"
      }
    }
  },
  ArtistPage: {
    screen: ArtistPage,
    navigationOptions: {
      headerTintColor: "white",
      // headerBackTitle: null,

      headerStyle: {
        backgroundColor: "#2B2D5B"
      },
      headerTitleStyle: {
        color: "white"
      }
    },

    EventPage: {
      screen: EventPage,
      navigationOptions: {
        headerLeftContainerStyle: { paddingLeft: 10 },
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "#2B2D5B"
        },
        headerTitleStyle: {
          color: "white"
        }
      }
    }
  }
});
export default MyLikesNav;
