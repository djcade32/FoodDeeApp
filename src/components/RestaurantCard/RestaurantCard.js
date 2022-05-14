import { View, Text, Image } from "react-native";
import React from "react";
import styles from "../RestaurantCard/styles";
import restaurantImage from "../../../assets/data/images/restaurant-1.jpg";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const RestaurantCard = () => {
  return (
    <View style={styles.restaurantCardContainer}>
      <Image style={styles.backgroundImage} source={restaurantImage} />
      <View style={styles.distanceContainer}>
        <Ionicons name="navigate-outline" size={29} color="white" />
        <Text style={styles.distanceContainerText}>1.5 mi</Text>
      </View>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          style={{ marginRight: 10 }}
          name="silverware-fork-knife"
          size={35}
          color="#B6B6CF"
        />
        <Ionicons name="bookmark" size={35} color="white" />
      </View>
    </View>
  );
};

export default RestaurantCard;
