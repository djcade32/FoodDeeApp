import { View, Text, Image, Pressable } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import styles from "../RestaurantCard/styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import defaultImage from "../../../assets/images/foodee_default_img.jpg";

import { getCuisine } from "../../helpers/helpers";
import { useAuthContext } from "../../contexts/AuthContext";
import { User, RestaurantStatus, Restaurant } from "../../models";
import { DataStore } from "aws-amplify";

const RestaurantCard = (props) => {
  const { dbUser, userRestaurantList, setUserRestaurantList } =
    useAuthContext();
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
  const [badgeStatus, setBadgeStatus] = useState();

  function onPress() {
    navigation.navigate("RestaurantScreen", restaurantData);
  }

  function handleBadgePress(badgeType) {
    if (badgeStatus === RestaurantStatus.TRY && badgeType === "triedBadge") {
      setBadgeStatus(RestaurantStatus.TRIED);
    } else if (
      badgeStatus === RestaurantStatus.TRY &&
      badgeType === "tryBadge"
    ) {
      setBadgeStatus();
    } else if (
      badgeStatus === RestaurantStatus.TRIED &&
      badgeType === "tryBadge"
    ) {
      setBadgeStatus(RestaurantStatus.TRY);
    } else if (
      badgeStatus === RestaurantStatus.TRIED &&
      badgeType === "triedBadge"
    ) {
      setBadgeStatus();
    } else if (!badgeStatus && badgeType === "tryBadge") {
      setBadgeStatus(RestaurantStatus.TRY);
      addRestaurant(RestaurantStatus.TRY);
    } else if (!badgeStatus && badgeType === "triedBadge") {
      setBadgeStatus(RestaurantStatus.TRIED);
      addRestaurant(RestaurantStatus.TRIED);
    }
  }

  async function addRestaurant(status) {
    try {
      const user = await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          updated.restaurants = [
            ...updated.restaurants,
            {
              id: restaurantData.id,
              name: restaurantData.name,
              address: restaurantData.address,
              cuisine: restaurantData.cuisine,
              status: status,
              image: restaurantData.image,
              cost: restaurantData.cost,
              rating: restaurantData.rating,
            },
          ];
        })
      );
      console.log(user);
      setUserRestaurantList((oldList) => [...oldList, ...user.restaurants]);
    } catch (e) {
      console.log(e);
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
