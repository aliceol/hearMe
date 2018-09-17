import { createStackNavigator } from "react-navigation";
import ArtistPage from "./Containers/ArtistPage";
import EventPage from "./Containers/EventPage";
import HomePage from "./Containers/HomePage";
import VenuePage from "./Containers/VenuePage";
import HomePagePopular from "./Containers/HomePagePopular";
import HomePageUpcoming from "./Containers/HomePageUpcoming";
import WebView from "./Containers/WebView";
import MapView from "./Containers/MapView";
import ChooseLocation from "../MyProfileNav/containers/ChooseLocation";

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
      headerStyle: {
        backgroundColor: "#2B2D5B"
      },
      headerTitleStyle: {
        color: "white"
      }
    }
  },
  HomePageUpcoming: {
    screen: HomePageUpcoming,
    navigationOptions: {
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "#b2bec3",
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
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2B2D5B"
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
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "#2B2D5B"
      },
      headerTitleStyle: {
        color: "white"
      }
    }
  },
  VenuePage: {
    screen: VenuePage,
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
  },
  WebView: {
    screen: WebView,
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
  },
  MapView: {
    screen: MapView,
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
  },
  ChooseLocation: {
    screen: ChooseLocation
  }
});

export default Home;
