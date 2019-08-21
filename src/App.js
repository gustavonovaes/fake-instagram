import React from "react";
import { StatusBar, SafeAreaView } from "react-native";

import Router from "./routes";

export default function App() {
  return <SafeAreaView style={{ flex: 1 }}>
    <StatusBar backgroundColor="#fafafa" />
    <Router />
  </SafeAreaView>
}