import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import CameraRollPicker from "react-native-camera-roll-picker";

export default class ChoosePicture extends Component {
  state = {
    btnDisable: true
  };

  getSelectedImages = images => {
    console.log(images);
    if (images.length === 1) {
      this.setState({ btnDisable: false });
    }
    if (images.length === 0) {
      this.setState({ btnDisable: true });
    }
  };

  // renderImage = images => {
  //   if (images.length) {
  //     return <Image source={{ uri: image.uri }} />;
  //   }
  // };
  
  render() {
    return (
      <View style={styles.container}>
        <CameraRollPicker callback={this.getSelectedImages} maximum={1} />
        {!this.state.btnDisable ? (
          <TouchableOpacity
            style={styles.AddPhotoButton}
            // onPress={() => this.renderImage(images)}
          >
            <Text style={styles.AddPhotoButtonText}>Add photo</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  AddPhotoButton: {
    backgroundColor: "#2980b9",
    padding: 20
  },
  AddPhotoButtonText: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
    fontWeight: "700"
  }
});
