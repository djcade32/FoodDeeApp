import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  View,
  Text,
} from "react-native";
import { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import RootNavigator from "./src/navigation";
import { NavigationContainer } from "@react-navigation/native";

import { Amplify, Analytics } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from "aws-amplify-react-native";
import AuthContextProvider from "./src/contexts/AuthContext";

Amplify.configure({ ...awsconfig, Analytics: { disabled: true } });

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

function App() {
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
        <AuthContextProvider>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <RootNavigator />
          </TouchableWithoutFeedback>
        </AuthContextProvider>
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

export default withAuthenticator(App);
