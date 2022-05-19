import { View, Text, Image, Pressable } from "react-native";
import { useState } from "react";
import React from "react";
import styles from "../RestaurantCard/styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

const RestaurantCard = (props) => {
  const navigation = useNavigation();
  // const [badgeStatus, setBadgeStatus] = useState(props.restaurant.status);
  const [badgeStatus, setBadgeStatus] = useState("TRY");

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function onPress() {
    navigation.navigate("RestaurantScreen", { id: props.restaurant.item.id });
  }

  function handleBadgePress() {
    if (badgeStatus === "TRY") {
      setBadgeStatus("TRIED");
    } else {
      setBadgeStatus("TRY");
    }
  }
  return (
    <Pressable onPress={onPress} style={styles.restaurantCardContainer}>
      <Image
        style={styles.backgroundImage}
        source={{ uri: props.restaurant.item.image_url }}
      />
      <View style={styles.distanceContainer}>
        <Ionicons name="navigate-outline" size={29} color="white" />
        <Text style={styles.distanceContainerText}>
          {(props.restaurant.item.distance * 0.000621371192).toFixed(1)} mi
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <Pressable onPress={handleBadgePress}>
          <MaterialCommunityIcons
            style={{ marginRight: 10 }}
            name="silverware-fork-knife"
            size={35}
            color={
              badgeStatus === "TRIED" ? "white" : "rgba(182, 182, 207, 0.62)"
            }
          />
        </Pressable>
        <Pressable onPress={handleBadgePress}>
          <Ionicons
            name="bookmark"
            size={35}
            color={
              badgeStatus === "TRY" ? "white" : "rgba(182, 182, 207, 0.62)"
            }
          />
        </Pressable>
      </View>
      <View style={styles.restaurantNameContainer}>
        <Text style={styles.restaurantName}>{props.restaurant.item.name}</Text>
        <Text style={styles.cuisine}>
          {props.restaurant.item.categories[0].title}
        </Text>
      </View>
    </Pressable>
  );
};

export default RestaurantCard;
