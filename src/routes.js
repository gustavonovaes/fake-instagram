import React from "react";
import { Image, StyleSheet } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";

import logo from "./assets/instagram.png";

import Feed from "./screens/Feed";

const Router = createAppContainer(
  createStackNavigator({
    Feed
  }, {
      defaultNavigationOptions: {
        headerStyle: {
          elevation: 0,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor: "rgba(0,0,0,0.0975)"
        },
        headerTitleContainerStyle: {
          justifyContent: "center",
          backgroundColor: "#fafafa",
        },
        headerTitle: <Image source={logo} />
      }
    })
);

export default Router;