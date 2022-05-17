import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { Button } from "react-native";

import homeScreen from "../screens/Home/Home";
import restaurantScreen from "../screens/Restaurant/Restaurant";
import ProfileScreen from "../screens/Profile/Profile";
import AddItemScreen from "../screens/AddItem/AddItem";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
    </Stack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      inactiveColor="black"
      barStyle={{
        backgroundColor: "white",
        borderTopColor: "#D6D6D6",
        borderTopWidth: 0.5,
      }}
      activeColor="#FF9A62"
    >
      <Tab.Screen
        name="Search"
        component={homeScreen}
        options={{
          tabBarLabel: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="search" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="silverware-fork-knife"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator initialRouteName="HomeScreen">
      <HomeStack.Screen
        name="HomeScreen"
        component={homeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="RestaurantScreen"
        component={restaurantScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="AddItemScreen"
        component={AddItemScreen}
        options={{
          headerShown: true,
          title: "Add item",
          headerTitleStyle: { fontFamily: "lato" },
          headerBackTitle: "Cancel",
          headerBackTitleStyle: { fontFamily: "lato" },
        }}
      />
    </HomeStack.Navigator>
  );
};
