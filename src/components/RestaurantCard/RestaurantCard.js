import { View, Text, Image, Pressable } from "react-native";
import { useState } from "react";
import React from "react";
import styles from "../RestaurantCard/styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import defaultImage from "../../../assets/images/foodee_default_img.jpg";

import { getCuisine } from "../../helpers/helpers";

const RestaurantCard = (props) => {
  const restaurantDistance = (
    props.restaurant.item.distance * 0.000621371192
  ).toFixed(1);

  const restaurantData = {
    id: props.restaurant.item?.id,
    name: props.restaurant.item?.name,
    image: props.restaurant.item?.image_url,
    address:
      props.restaurant.item.location?.display_address[0] +
      " " +
      props.restaurant.item.location?.display_address[1],
    distance: restaurantDistance,
    cuisine: getCuisine(props.restaurant.item.categories),
    rating: props.restaurant.item?.rating,
    cost: props.restaurant.item?.price,
  };
  const navigation = useNavigation();
  // const [badgeStatus, setBadgeStatus] = useState(props.restaurant.status);
  const [badgeStatus, setBadgeStatus] = useState();

  function onPress() {
    navigation.navigate("RestaurantScreen", restaurantData);
  }

  function handleBadgePress(badgeType) {
    if (badgeStatus === "TRY" && badgeType === "triedBadge") {
      setBadgeStatus("TRIED");
    } else if (badgeStatus === "TRY" && badgeType === "tryBadge") {
      setBadgeStatus();
    } else if (badgeStatus === "TRIED" && badgeType === "tryBadge") {
      setBadgeStatus("TRY");
    } else if (badgeStatus === "TRIED" && badgeType === "triedBadge") {
      setBadgeStatus();
    } else if (!badgeStatus && badgeType === "tryBadge") {
      setBadgeStatus("TRY");
    } else if (!badgeStatus && badgeType === "triedBadge") {
      setBadgeStatus("TRIED");
    }
  }
  return (
    <Pressable onPress={onPress} style={styles.restaurantCardContainer}>
      {restaurantData.image !== "" ? (
        <Image
          style={styles.backgroundImage}
          source={{ uri: restaurantData.image }}
        />
      ) : (
        <Image style={styles.backgroundImage} source={defaultImage} />
      )}
      <View style={styles.distanceContainer}>
        <Ionicons name="navigate-outline" size={29} color="white" />
        <Text style={styles.distanceContainerText}>
          {restaurantDistance} mi
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <Pressable onPress={() => handleBadgePress("triedBadge")}>
          <MaterialCommunityIcons
            style={{ marginRight: 10 }}
            name="silverware-fork-knife"
            size={35}
            color={
              badgeStatus === "TRIED" ? "white" : "rgba(182, 182, 207, 0.62)"
            }
          />
        </Pressable>
        <Pressable onPress={() => handleBadgePress("tryBadge")}>
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
        <Text style={styles.restaurantName}>{restaurantData.name}</Text>
        <Text style={styles.cuisine}>{restaurantData.cuisine}</Text>
      </View>
    </Pressable>
  );
};

export default RestaurantCard;
