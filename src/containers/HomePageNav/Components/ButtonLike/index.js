import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export default class ButtonLike extends Component {
  //by default the button is "liked"(toggle:true) if the user accesses the artist from his "My_Likes"
  state = {
    toggle: this.props.liked
  };

  _onPress() {
    const newState = !this.state.toggle;
    this.setState({ toggle: newState });

    //receives the props from the ArtistPage's ButtonLike
    this.props.onLike();
  }
  render() {
    console.log("bdkdjd", this.state);
    const { toggle } = this.state;
    const textValue = toggle ? "Liked" : "Like";
    const buttonBg = toggle ? "dodgerblue" : "white";
    const textColor = toggle ? "white" : "black";
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this._onPress()}
          style={{
            marginTop: 20,
            backgroundColor: buttonBg,
            justifyContent: "center",
            width: "20%",
            height: 40,
            borderRadius: 10,
            borderColor: "dodgerblue",
            borderWidth: 2
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: textColor,
              fontSize: 16
            }}
          >
            {textValue}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  }
});
