import { createStackNavigator } from "react-navigation";
import ArtistPage from "./Containers/ArtistPage";
import EventPage from "./Containers/EventPage";
import HomePage from "./Containers/HomePage";
import HomePagePopular from "./Containers/HomePagePopular";
import HomePageUpcoming from "./Containers/HomePageUpcoming";
import BiographyWebView from "./Containers/BiographyWebView";

const Home = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null
    }
  },

  HomePagePopular: {
    screen: HomePagePopular,
    navigationOptions: {
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "#b2bec3",
      title: "Popular Events",
      headerStyle: {
        backgroundColor: "#2d3436"
      },
      headerTitleStyle: {
        color: "black"
      }
    }
  },
  HomePageUpcoming: {
    screen: HomePageUpcoming,
    navigationOptions: {
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "#b2bec3",
      title: "Upcoming Events",
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
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "#b2bec3",
      title: "Artist Page",
      headerStyle: {
        backgroundColor: "#2d3436"
      },
      headerTitleStyle: {
        color: "white"
      }
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
  },
  BiographyWebView: {
    screen: BiographyWebView,
    navigationOptions: {
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "#b2bec3",
      title: "Biography",
      headerStyle: {
        backgroundColor: "#2d3436"
      },
      headerTitleStyle: {
        color: "white"
      }
    }
  }
});
export default Home;
