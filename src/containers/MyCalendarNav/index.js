import { createStackNavigator } from "react-navigation";
import MyCalendar from "./containers/MyCalendar";
import EventPage from "../HomePageNav/Containers/EventPage";
const MyCalNav = createStackNavigator({
  MyCalendar: {
    screen: MyCalendar,
    navigationOptions: {
      headerLeftContainerStyle: { paddingLeft: 10 },
      headerTintColor: "#b2bec3",
      title: "My Calendar",
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
export default MyCalNav;
