import { View, Text, Image, Pressable } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import styles from "../RestaurantCard/styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import defaultImage from "../../../assets/images/foodee_default_img.jpg";

import { getCuisine } from "../../helpers/helpers";
import { useAuthContext } from "../../contexts/AuthContext";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
import { User, RestaurantStatus } from "../../models";
import { DataStore } from "aws-amplify";

const RestaurantCard = (props) => {
  const { setDbUser, userRestaurantList } = useAuthContext();
  const { addRestaurant, removeRestaurant, switchRestaurantStatus } =
    useRestaurantContext();

  const restaurantDistance = (
    props.restaurant.item?.distance * 0.000621371192
  ).toFixed(1);
  const navigation = useNavigation();
  const [badgeStatus, setBadgeStatus] = useState(null);

  const restaurantData = {
    id: props.restaurant.item?.id,
    name: props.restaurant.item?.name,
    image: props.restaurant.item?.image_url,
    address:
      props.restaurant.item.location?.display_address.length > 1
        ? props.restaurant.item.location?.display_address[0] +
          " " +
          props.restaurant.item.location?.display_address[1]
        : props.restaurant.item.location?.display_address[0],
    distance: restaurantDistance,
    cuisine: getCuisine(props.restaurant.item.categories),
    rating: props.restaurant.item?.rating,
    cost: props.restaurant.item?.price,
    status: badgeStatus,
    coordinates: props.restaurant.item?.coordinates,
  };

  useEffect(() => {
    const foundRestaurant = userRestaurantList?.find(
      (restaurant) => restaurant.id === props.restaurant.item?.id
    );
    setBadgeStatus(foundRestaurant?.status);
  }, [userRestaurantList]);

  function onPress() {
    navigation.navigate("RestaurantScreen", restaurantData);
  }

  function handleBadgePress(badgeType) {
    // Switch to opposite status if one is highlighted already
    if (badgeStatus === RestaurantStatus.TRY && badgeType === "triedBadge") {
      setBadgeStatus(RestaurantStatus.TRIED);
      switchRestaurantStatus(RestaurantStatus.TRIED, props.restaurant.item);
    } else if (
      badgeStatus === RestaurantStatus.TRIED &&
      badgeType === "tryBadge"
    ) {
      setBadgeStatus(RestaurantStatus.TRY);
      switchRestaurantStatus(RestaurantStatus.TRY, props.restaurant.item);
    }
    // Make both icons not highlighted
    else if (badgeStatus === RestaurantStatus.TRY && badgeType === "tryBadge") {
      setBadgeStatus(null);
      removeRestaurant(props.restaurant.item?.id);
    } else if (
      badgeStatus === RestaurantStatus.TRIED &&
      badgeType === "triedBadge"
    ) {
      setBadgeStatus(null);
      removeRestaurant(props.restaurant.item?.id);
    }
    // Neither icon is highlighted
    else if (!badgeStatus && badgeType === "tryBadge") {
      setBadgeStatus(RestaurantStatus.TRY);
      addRestaurant(RestaurantStatus.TRY, restaurantData);
    } else if (!badgeStatus && badgeType === "triedBadge") {
      setBadgeStatus(RestaurantStatus.TRIED);
      addRestaurant(RestaurantStatus.TRIED, restaurantData);
    }
  }

  // A work around that is used to update and sync Amplify's Cloud DB
  useEffect(() => {
    const subscription = DataStore.observe(User).subscribe(({ element }) => {
      setDbUser(element);
    });
    return () => subscription.unsubscribe();
  }, [User]);

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
