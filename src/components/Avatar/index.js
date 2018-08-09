// Components/Avatar.js

import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import ImagePicker from "react-native-image-picker";
import axios from "axios";
import store from "react-native-simple-store";

class Avatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      avatar: require("../../images/ic_tag_faces.png")
    };
    // this.setState est appelé dans un callback dans showImagePicker, pensez donc bien à binder la fonction _avatarClicked
    this._avatarClicked = this._avatarClicked.bind(this);
  }

  _avatarClicked() {
    ImagePicker.showImagePicker({}, response => {
      if (response.didCancel) {
        console.log("L'utilisateur a annulé");
      } else if (response.error) {
        console.log("Erreur : ", response.error);
      } else {
        console.log("Photo : ", response.uri);
        let source = { uri: "data:image/jpeg;base64," + response.data };

        console.log(source);
        let sourceBase64 = "data:image/jpeg;base64," + response.data;
        console.log(sourceBase64);
        this.setState(
          {
            avatar: source,
            files: [sourceBase64]
          },
          () => {
            store.get("userToken").then(res => {
              console.log(res.token);
              const config = {
                headers: {
                  Authorization: "Bearer " + res.token
                }
              };
              axios
                .post(
                  "http://localhost:3000/api/user/uploadPicture",
                  {
                    ...this.state //copie du state
                  },
                  config
                )
                .then(response => {
                  console.log(response);
                })
                .catch(err => {
                  console.log(err);
                });
            });
          }
        );
      }
    });
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.touchableOpacity}
        onPress={this._avatarClicked}
      >
        <Image style={styles.avatar} source={this.state.avatar} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  touchableOpacity: {
    margin: 5,
    width: 120, // Pensez bien à définir une largeur ici, sinon toute la largeur de l'écran sera cliquable
    height: 120,
    justifyContent: "center",
    alignItems: "center"
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    borderColor: "#2d3436",
    borderWidth: 2
  }
});

export default Avatar;
