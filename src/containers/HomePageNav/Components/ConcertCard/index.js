import React, { Fragment } from "react";
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

export default withNavigation(
  class TabViewExample extends React.Component {
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
              this.props.navigation.navigate("EventPage", {
                id: this.props.event.id
              });
            }}
          >
            <ImageBackground
              source={require("./photos/concert1.jpg")}
              style={{ width: "100%", height: 130 }}
            >
              <View style={{ height: 150, width: "100%", margin: 10 }}>
                <View style={styles.dateCard}>
                  <Text style={styles.dateCardText}>
                    {this.renderDateCard(this.props.event.start.date)}
                  </Text>
                </View>
              </View>
            </ImageBackground>
            <View style={[styles.concertInfo]}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={[styles.infoText, , styles.bold]}>
                  {this.props.event.venue.displayName === "Unknown venue"
                    ? ""
                    : this.props.event.venue.displayName}
                </Text>
                <View style={styles.time}>
                  {this.props.event.start.time ? (
                    <Text style={styles.infoText}>
                      {this.props.event.start.time.slice(0, 5)}
                    </Text>
                  ) : (
                    <Text />
                  )}
                </View>
              </View>
              <Text numberOfLines={1} style={styles.infoText}>
                <Text style={styles.bold}> Line up: </Text>{" "}
                {this.getLineUp(this.props.event)}
              </Text>
            </View>
          </TouchableOpacity>
        </Fragment>
      );
    }
  }
);

const styles = StyleSheet.create({
  concertCard: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 15
  },
  concertInfo: {
    backgroundColor: "#DFE6E9",
    padding: 5
  },
  infoText: {
    paddingVertical: 3
  },
  bold: {
    fontWeight: "bold"
  },
  dateCard: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 3,
    width: 35,
    textAlign: "center",
    overflow: "hidden",
    padding: 3
  },
  dateCardText: {
    color: "white",
    textAlign: "center"
  },
  time: {
    justifyContent: "center",
    paddingRight: 3
  }
});
