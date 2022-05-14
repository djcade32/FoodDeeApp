import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import Home from "./src/screens/Home/Home";

// Loading fonts
function fetchFonts() {
  return Font.loadAsync({
    lato: require("./assets/fonts/Lato-Regular.ttf"),
    "lato-bold": require("./assets/fonts/Lato-Bold.ttf"),
    playfairDisplay: require("./assets/fonts/PlayfairDisplay-Regular.ttf"),
    "playfairDisplay-medium": require("./assets/fonts/PlayfairDisplay-Medium.ttf"),
    "playfairDisplay-bold": require("./assets/fonts/PlayfairDisplay-Bold.ttf"),
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      // Make sure all fonts are loaded before app shows screen
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Home />
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 30,
  },
});
