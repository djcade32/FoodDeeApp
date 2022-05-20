import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import userData from "../../../assets/data/userData";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import RestaurantItem from "../../components/RestaurantItem/RestaurantItem";
import { useNavigation, useRoute } from "@react-navigation/native";
import defaultImage from "../../../assets/images/foodee_default_img.jpg";

const USER = userData[0];

export default function Restaurant() {
  const navigation = useNavigation();
  const route = useRoute();
  // const id = route.params?.id;
  const restaurant = route.params;

  const [badgeStatus, setBadgeStatus] = useState(USER.restaurants[1].status);

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
        <Ionicons
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          name="arrow-back"
          size={35}
          color="white"
        />
        <View style={styles.iconContainer}>
          <Pressable onPress={() => handleBadgePress("tryBadge")}>
            <MaterialCommunityIcons
              style={{ marginRight: 10 }}
              name="silverware-fork-knife"
              size={35}
              color={
                badgeStatus === "TRY" ? "white" : "rgba(182, 182, 207, 0.62)"
              }
            />
          </Pressable>
          <Pressable onPress={() => handleBadgePress("triedBadge")}>
            <Ionicons
              name="bookmark"
              size={35}
              color={
                badgeStatus === "TRIED" ? "white" : "rgba(182, 182, 207, 0.62)"
              }
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={{ width: "75%" }}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantExtraDetails}>
            {restaurant.cuisine} • {restaurant.distance} mi • {restaurant.cost}
          </Text>
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
          data={USER.items}
          renderItem={({ item }) => <RestaurantItem item={item} />}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("AddItemScreen")}
        activeOpacity={0.5}
        style={styles.addButtonContainer}
      >
        <Text style={styles.addButtonText}>Add item</Text>
      </TouchableOpacity>
    </View>
  );
}
