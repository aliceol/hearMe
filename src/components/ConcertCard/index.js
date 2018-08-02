import React, { Component, Fragment } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native";
import { withNavigation } from "react-navigation";
const moment = require("moment");
moment().format();

export default class TabViewExample extends React.Component {
  getImage() {
    randomImages = {
      image1: require("./photos/concert1.jpg"),
      image2: require("./photos/concert2.jpg"),
      image3: require("./photos/concert3.jpg"),
      image4: require("./photos/concert4.jpg"),
      image5: require("./photos/concert5.jpg"),
      image6: require("./photos/concert6.jpg"),
      image7: require("./photos/concert7.jpg"),
      image8: require("./photos/concert8.jpg"),
      image9: require("./photos/concert9.jpg"),
      image10: require("./photos/concert10.jpg"),
      image11: require("./photos/concert11.jpg"),
      image12: require("./photos/concert12.jpg"),
      image13: require("./photos/concert13.jpg"),
      image14: require("./photos/concert14.jpg"),
      image15: require("./photos/concert15.jpg"),
      image16: require("./photos/concert16.jpg"),
      image17: require("./photos/concert17.jpg"),
      image18: require("./photos/concert17.jpg"),
      image19: require("./photos/concert19.jpg"),
      image20: require("./photos/concert18.jpg"),
      image21: require("./photos/concert21.jpg")
    };
    let key = "image" + Math.floor(Math.random() * 21 + 1);
    return randomImages[key];
  }

  getLineUp(event) {
    let lineUp = event.performance[0].artist.displayName;
    for (let i = 1; i < event.performance.length; i++) {
      lineUp += ", " + event.performance[i].artist.displayName;
    }
    return lineUp;
  }

  renderDateCard(date) {
    dateCardFormat = moment(date).format("MMM DD");
    return dateCardFormat.slice(0, 3) + "\n" + dateCardFormat.slice(4, 6);
  }

  render() {
    let imageSource = this.getImage();

    return (
      <Fragment>
        <TouchableOpacity
          style={styles.concertCard}
          onPress={() => {
            this.props.navigate("EventPageScreen", {
              id: this.props.event.id,
              eventName: this.props.event.displayName
            });
          }}
        >
          <ImageBackground
            source={imageSource}
            style={{ width: "100%", height: 100 }}
          >
            <View style={{ height: 150, width: "100%", margin: 10 }}>
              <Text>{this.renderDateCard(this.props.event.start.date)}</Text>
            </View>
          </ImageBackground>
          <View>
            <Text>{this.props.event.venue.displayName}</Text>
            <Text numberOfLines={1}>
              Line up: {this.getLineUp(this.props.event)}
            </Text>
          </View>
        </TouchableOpacity>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  concertcard: {
    borderRadius: 10,
    overflow: "hidden"
  }
});
