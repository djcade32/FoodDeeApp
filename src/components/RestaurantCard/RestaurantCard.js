import { View, Text, Image } from "react-native";
import { useState } from "react";
import React from "react";
import styles from "../RestaurantCard/styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const RestaurantCard = (props) => {
  return (
    <View style={styles.restaurantCardContainer}>
      <Image style={styles.backgroundImage} source={props.restaurant.image} />
      <View style={styles.distanceContainer}>
        <Ionicons name="navigate-outline" size={29} color="white" />
        <Text style={styles.distanceContainerText}>1.5 mi</Text>
      </View>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          style={{ marginRight: 10 }}
          name="silverware-fork-knife"
          size={35}
          color={
            props.restaurant.status === "TRY"
              ? "white"
              : "rgba(182, 182, 207, 0.62)"
          }
        />
        <Ionicons
          name="bookmark"
          size={35}
          color={
            props.restaurant.status === "TRIED"
              ? "white"
              : "rgba(182, 182, 207, 0.62)"
          }
        />
      </View>
      <View style={styles.restaurantNameContainer}>
        <Text style={styles.restaurantName}>{props.restaurant.name}</Text>
        <Text style={styles.cuisine}>{props.restaurant.cuisine}</Text>
      </View>
    </View>
  );
};

export default RestaurantCard;
