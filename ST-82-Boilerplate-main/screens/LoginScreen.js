import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import * as Google from "expo-google-app-auth";
import firebase from "firebase";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

export default class LoginScreen extends Component{
    render() {
        if (!this.state.fontsLoaded) {
          return <AppLoading />;
        } else {
          return (
            <View style={this.state.light_theme ? styles.containerLight : styles.container}>
              <SafeAreaView style={styles.droidSafeArea} />
              <View style={styles.appTitle}>
                <Image
                  source={require("../assets/logo.png")}
                  style={styles.appIcon}
                ></Image>
                <Text style={styles.appTitleText}>{`Storytelling\nApp`}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => this.signInWithGoogleAsync()}
                >
                  <Image
                    source={require("../assets/google_icon.png")}
                    style={styles.googleIcon}
                  ></Image>
                  <Text style={styles.googleText}>Sign in with Google</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.cloudContainer}>
                <Image
                  source={require("../assets/cloud.png")}
                  style={styles.cloudImage}
                ></Image>
              </View>
            </View>
          );
        }
      }
    }
