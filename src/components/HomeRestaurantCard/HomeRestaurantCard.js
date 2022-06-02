import { View, Text, Image, Pressable } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import styles from "../RestaurantCard/styles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import defaultImage from "../../../assets/images/foodee_default_img.jpg";

import { getCuisine } from "../../helpers/helpers";
import { useAuthContext } from "../../contexts/AuthContext";
import { User, RestaurantStatus } from "../../models";
import { DataStore } from "aws-amplify";
import { calculateDistance } from "../../helpers/helpers";

const HomeRestaurantCard = (props) => {
  const { setDbUser, dbUser, userRestaurantList, setUserRestaurantList } =
    useAuthContext();
  const restaurantDistance = calculateDistance(
    props.userLocation?.latitude,
    props.restaurant?.coordinates.latitude,
    props.userLocation?.longitude,
    props.restaurant?.coordinates.longitude
  ).toFixed(1);
  const navigation = useNavigation();
  const [badgeStatus, setBadgeStatus] = useState(props.restaurant.status);
  const restaurantData = {
    id: props.restaurant.id,
    name: props.restaurant.name,
    image: props.restaurant.image,
    address: props.restaurant.address,
    distance: restaurantDistance,
    cuisine: props.restaurant.cuisine,
    rating: props.restaurant.rating,
    cost: props.restaurant.cost,
    status: props.restaurant.status,
    coordinates: props.restaurant.coordinates,
  };

  useEffect(() => {
    const foundRestaurant = userRestaurantList.find(
      (restaurant) => restaurant.id === props.restaurant.id
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
      switchRestaurantStatus(RestaurantStatus.TRIED);
    } else if (
      badgeStatus === RestaurantStatus.TRIED &&
      badgeType === "tryBadge"
    ) {
      setBadgeStatus(RestaurantStatus.TRY);
      switchRestaurantStatus(RestaurantStatus.TRY);
    }
    // Make both icons not highlighted
    else if (badgeStatus === RestaurantStatus.TRY && badgeType === "tryBadge") {
      setBadgeStatus(null);
      removeRestaurantStatus();
    } else if (
      badgeStatus === RestaurantStatus.TRIED &&
      badgeType === "triedBadge"
    ) {
      setBadgeStatus(null);
      removeRestaurantStatus();
    }
  }
  // Neither icon is highlighted
  //   else if (!badgeStatus && badgeType === "tryBadge") {
  //     setBadgeStatus(RestaurantStatus.TRY);
  //     addRestaurantStatus(RestaurantStatus.TRY);
  //   } else if (!badgeStatus && badgeType === "triedBadge") {
  //     setBadgeStatus(RestaurantStatus.TRIED);
  //     addRestaurantStatus(RestaurantStatus.TRIED);
  //   }
  // }

  // async function addRestaurantStatus(status) {
  //   try {
  //     const user = await DataStore.save(
  //       User.copyOf(dbUser, (updated) => {
  //         updated.restaurants = [
  //           ...updated.restaurants,
  //           {
  //             id: restaurantData.id,
  //             name: restaurantData.name,
  //             address: restaurantData.address,
  //             cuisine: restaurantData.cuisine,
  //             status: status,
  //             image: restaurantData.image,
  //             cost: restaurantData.cost,
  //             rating: restaurantData.rating,
  //           },
  //         ];
  //       })
  //     );
  //     setDbUser(user);
  //     setUserRestaurantList((oldList) => [...oldList, ...user.restaurants]);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  async function removeRestaurantStatus() {
    const filteredList = userRestaurantList.filter(
      (restaurant) => restaurant.id !== props.restaurant?.id
    );
    console.log("Filtered List: ", filteredList);
    try {
      const user = await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          updated.restaurants = filteredList;
        })
      );
      setDbUser(user);
      setUserRestaurantList(filteredList);
    } catch (e) {
      console.log(e);
    }
  }

  async function switchRestaurantStatus(status) {
    console.log("Switching Status");
    let filteredList = userRestaurantList.filter(
      (restaurant) => restaurant.id !== props.restaurant?.id
    );
    console.log("Filtered List: ", filteredList);
    filteredList = [
      ...filteredList,
      {
        id: restaurantData.id,
        name: restaurantData.name,
        address: restaurantData.address,
        cuisine: restaurantData.cuisine,
        status: status,
        image: restaurantData.image,
        cost: restaurantData.cost,
        rating: restaurantData.rating,
        coordinates: {
          latitude: restaurantData.coordinates.latitude,
          longitude: restaurantData.coordinates.longitude,
        },
      },
    ];
    try {
      const user = await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          updated.restaurants = filteredList;
        })
      );
      setDbUser(user);
      setUserRestaurantList(filteredList);
    } catch (e) {
      console.log(e);
    }
  }

  // A work around that is used to update and sync Amplify's Cloud DB
  useEffect(() => {
    const subscription = DataStore.observe(User).subscribe(({ element }) => {
      setDbUser(element);
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <Pressable onPress={() => onPress()} style={styles.restaurantCardContainer}>
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

export default HomeRestaurantCard;
