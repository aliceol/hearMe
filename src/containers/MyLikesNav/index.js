import { createStackNavigator } from "react-navigation";
import MyLikes from "./containers/MyLikes";
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
        color: "black"
      }
    }
  }
});
export default MyLikesNav;
