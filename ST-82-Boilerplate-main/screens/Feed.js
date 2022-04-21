import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import PostCard from "./PostCard.js";

import AppLoading from "expo-app-loading";
import { FlatList } from "react-native-gesture-handler";

let posts = require("./temp_posts.json");

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class Feed extends Component {

  constructor(){
    this.state = {
      posts : []
    }
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  renderItem = ({ item: post }) => {
    return <PostCard post={post} navigation = {this.props.navigation}/>;
  };

  keyExtractor = (item, index) => index.toString();

  fetchPosts = () => {
    firebase
      .database()
      .ref("/posts/")
      .on(
        "value",
        snapshot => {
          let posts = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              posts.push({
                key: key,
                value: snapshot.val()[key]
              });
            });
          }
          this.setState({ posts: posts });
          this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log("The read failed: " + errorObject.code);
        }
      );
  };

  render() {
      return (
        <View style={this.state.light_theme ? styles.containerLight : styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={this.state.light_theme
                    ? styles.appTitleTextLight
                    : styles.appTitleText}>Spectagram App</Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={posts}
              renderItem={this.renderItem}
            />
          </View>
        </View>
      );
   }
 }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center"
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
  },
  cardContainer: {
    flex: 0.93
  }
});
