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
      city: props.city,
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
      popular: props.popular,
      upcoming: props.upcoming
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
            <HomePageUpcoming
              {...props}
              navigation={this.props.navigation}
              city={this.state.city}
              eventsData={this.props.upcoming}
              handleLoadMoreUpcoming={this.props.handleLoadMoreUpcoming}
              handleScroll={this.props.handleScroll}
            />
          ),
          popular: props => (
            <HomePagePopular
              {...props}
              navigation={this.props.navigation}
              city={this.state.city}
              eventsData={this.props.popular}
              handleLoadMorePopular={this.props.handleLoadMorePopular}
              handleScroll={this.props.handleScroll}
            />
          )
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ height: 0, width: Dimensions.get("window").width }}
      />
    );
  }
}

export default withNavigation(TabViewComponent);
