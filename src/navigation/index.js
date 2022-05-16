import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";

import homeScreen from "../screens/Home/Home";
import Restaurant from "../screens/Restaurant/Restaurant";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen name="HomeTabs" component={HomeTabs} /> */}
      <Stack.Screen name="HomeTabs" component={Restaurant} />
    </Stack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      inactiveColor="black"
      barStyle={{ backgroundColor: "white" }}
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
        component={homeScreen}
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
        component={homeScreen}
        options={{
          tabBarLabel: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );

  const HomeStackNavigator = () => {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Restaurants" component={HomeScreen} />
        <HomeStack.Screen
          name="Restaurant"
          component={RestaurantDetailsScreen}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen name="Dish" component={DishDetailsScreen} />
        <HomeStack.Screen name="Basket" component={Basket} />
      </HomeStack.Navigator>
    );
  };
};
