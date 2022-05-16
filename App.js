import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import RootNavigator from "./src/navigation";
import { NavigationContainer } from "@react-navigation/native";

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
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <RootNavigator />
        </TouchableWithoutFeedback>
        <StatusBar style="auto" />
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
