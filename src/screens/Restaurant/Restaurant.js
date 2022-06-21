import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import RestaurantItem from "../../components/RestaurantItem/RestaurantItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import defaultImage from "../../../assets/images/foodee_default_img.jpg";
import { useAuthContext } from "../../contexts/AuthContext";
import { useRestaurantContext } from "../../contexts/RestaurantContext";
import { User, RestaurantStatus } from "../../models";
import { DataStore } from "aws-amplify";

export default function Restaurant() {
  const { setDbUser, dbUser, userRestaurantList } = useAuthContext();
  const { addRestaurant, removeRestaurant, switchRestaurantStatus } =
    useRestaurantContext();
  const navigation = useNavigation();
  const route = useRoute();
  const restaurant = route.params;
  const [badgeStatus, setBadgeStatus] = useState(restaurant?.status);
  const [restaurantItems, setRestaurantItems] = useState([]);

  useEffect(() => {
    if (restaurant && badgeStatus === RestaurantStatus.TRIED) {
      console.log("Checking if user restaurant");
      const foundRestaurant = userRestaurantList?.find(
        (foundRestaurant) => foundRestaurant.id === restaurant.id
      );
      if (foundRestaurant) {
        setRestaurantItems(foundRestaurant?.items);
      }
      console.log("Found: ", foundRestaurant);
    }
  });

  function handleBadgePress(badgeType) {
    // Switch to opposite status if one is highlighted already
    console.log("Badge Status: ", badgeStatus, "Badge Type: ", badgeType);
    if (badgeStatus === RestaurantStatus.TRY && badgeType === "triedBadge") {
      setBadgeStatus(RestaurantStatus.TRIED);
      switchRestaurantStatus(RestaurantStatus.TRIED, restaurant);
    } else if (
      badgeStatus === RestaurantStatus.TRIED &&
      badgeType === "tryBadge"
    ) {
      setBadgeStatus(RestaurantStatus.TRY);
      switchRestaurantStatus(RestaurantStatus.TRY, restaurant);
    }
    // Make both icons not highlighted
    else if (badgeStatus === RestaurantStatus.TRY && badgeType === "tryBadge") {
      setBadgeStatus(null);
      removeRestaurant(restaurant?.id);
    } else if (
      badgeStatus === RestaurantStatus.TRIED &&
      badgeType === "triedBadge"
    ) {
      setBadgeStatus(null);
      removeRestaurant(restaurant?.id);
    }
    // Neither icon is highlighted
    else if (!badgeStatus && badgeType === "tryBadge") {
      setBadgeStatus(RestaurantStatus.TRY);
      addRestaurant(RestaurantStatus.TRY, restaurant);
    } else if (!badgeStatus && badgeType === "triedBadge") {
      setBadgeStatus(RestaurantStatus.TRIED);
      addRestaurant(RestaurantStatus.TRIED, restaurant);
    }
  }

  function addItemButton() {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("AddItemScreen", restaurant)}
        activeOpacity={0.5}
        style={styles.addButtonContainer}
      >
        <Text style={styles.addButtonText}>Add item</Text>
      </TouchableOpacity>
    );
  }

  async function deleteItem(id) {
    const updatedRestaurantList = userRestaurantList.map((place) => {
      if (
        place.id === restaurant.id &&
        place.status === RestaurantStatus.TRIED
      ) {
        console.log("Deleting Item");
        const updatedItemsList = place.items.filter((item) => item.id !== id);
        return {
          id: place.id,
          name: place.name,
          address: place.address,
          cuisine: place.cuisine,
          status: place.status,
          image: place.image,
          cost: place.cost,
          rating: place.rating,
          coordinates: {
            latitude: place.coordinates.latitude,
            longitude: place.coordinates.longitude,
          },
          items: updatedItemsList,
        };
      }
      return place;
    });
    console.log("Restaurants", updatedRestaurantList);
    try {
      const user = await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          updated.restaurants = updatedRestaurantList;
        })
      );
      setDbUser(user);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.restaurantScreen}>
      <View style={styles.restaurantImageContainer}>
        {restaurant.image !== "" ? (
          <Image
            style={styles.restaurantImage}
            source={{ uri: restaurant.image }}
          />
        ) : (
          <Image style={styles.restaurantImage} source={defaultImage} />
        )}
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={35} color="white" />
        </Pressable>
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
              style={{ marginRight: 10 }}
              name="bookmark"
              size={35}
              color={
                badgeStatus === "TRY" ? "white" : "rgba(182, 182, 207, 0.62)"
              }
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={{ width: "75%" }}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>

          {restaurant.cost ? (
            <Text style={styles.restaurantExtraDetails}>
              {restaurant.cuisine} • {restaurant.distance} mi •{restaurant.cost}
            </Text>
          ) : (
            <Text style={styles.restaurantExtraDetails}>
              {restaurant.cuisine} • {restaurant.distance} mi
            </Text>
          )}
          <Text style={styles.restaurantExtraDetails}>
            {restaurant.address}
          </Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>{restaurant.rating}</Text>
          <AntDesign name="star" size={29} color={"#FFC700"} />
        </View>
      </View>

      <View style={{ borderBottomColor: "#D6D6D6", borderBottomWidth: 0.5 }}>
        <Text style={styles.itemsTriedTitle}>Items tried</Text>
      </View>
      <View>
        <FlatList
          style={{ height: "35%" }}
          data={restaurantItems}
          renderItem={({ item }) => (
            <RestaurantItem deleteItem={deleteItem} item={item} />
          )}
          ListFooterComponent={
            badgeStatus === RestaurantStatus.TRIED ? addItemButton : <></>
          }
        />
      </View>
    </View>
  );
}
