import React from "react";
import { Dimensions } from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import HomePageUpcoming from "../../Containers/HomePageUpcoming";
import HomePagePopular from "../../Containers/HomePagePopular";
import { withNavigation } from "react-navigation";

class TabViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      cityName: props.cityName,
      cityCode: props.cityCode,
      routes: [
        {
          key: props.routes[0].key,
          title: props.routes[0].title,
          cityCode: props.routes[0].cityCode
        },
        {
          key: props.routes[1].key,
          title: props.routes[1].title,
          cityCode: props.routes[1].cityCode
        }
      ],
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      cities: props.cities,
      query: "",
      matchingCities: []
    };
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{
              backgroundColor: "grey"
            }}
            style={{ backgroundColor: "#F4F8FF" }}
            labelStyle={{
              color: "black"
            }}
          />
        )}
        renderScene={SceneMap({
          upcoming: props => (
            <HomePageUpcoming {...props} navigation={this.props.navigation} />
          ),
          popular: props => (
            <HomePagePopular {...props} navigation={this.props.navigation} />
          )
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ height: 0, width: Dimensions.get("window").width }}
      />
    );
  }
}

export default withNavigation(TabViewComponent);
