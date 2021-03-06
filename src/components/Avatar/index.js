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
      avatar: require("../../images/white-bg.jpg") // photo blanche
    };
    // this.setState est appelé dans un callback dans showImagePicker, pensez donc bien à binder la fonction _avatarClicked
    this._avatarClicked = this._avatarClicked.bind(this);
  }

  componentDidMount() {
    store.get("userAvatar").then(userAvatar => {
      if (userAvatar) {
        this.setState({ avatar: { uri: userAvatar.secure_url } });
      } else {
        // photo par defaut
        this.setState({ avatar: require("../../images/camera-icon-2.png") });
      }
    });
  }

  _avatarClicked() {
    ImagePicker.showImagePicker({}, response => {
      if (response.didCancel) {
        console.log("L'utilisateur a annulé");
      } else if (response.error) {
        console.log("Erreur : ", response.error);
      } else {
        let source = { uri: "data:image/jpeg;base64," + response.data };
        let sourceBase64 = "data:image/jpeg;base64," + response.data;
        this.setState(
          {
            avatar: source,
            files: [sourceBase64]
          },
          () => {
            store.get("userToken").then(res => {
              const config = {
                headers: {
                  Authorization: "Bearer " + res.token
                }
              };
              axios
                .post(
                  "https://hearme-api.herokuapp.com/api/user/uploadPicture",
                  {
                    ...this.state //copie du state
                  },
                  config
                )
                .then(response => {
                  store.save("userAvatar", response.data); // store.save("secure-url": secure_url)
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
    borderColor: "#2d3436"
    // borderWidth: 2
  }
});

export default Avatar;
