import { createStackNavigator } from "react-navigation";
import ArtistPage from "./containers/ArtistPage";
import EventPage from "./containers/EventPage";
import HomePage from "./containers/HomePage";
import HomePagePopular from "./containers/HomePagePopular";
import HomePageUpcoming from "./containers/HomePageUpcoming";

const Home = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      headerBackTitle: null,
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "#b2bec3",
      title: "Home",
      headerStyle: {
        backgroundColor: "#2d3436"
      },
      headerTitleStyle: {
        color: "white"
      }
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
  }
});
export default Home;
