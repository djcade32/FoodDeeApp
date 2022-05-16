import { View, Text, Image } from "react-native";
import React from "react";
import styles from "./styles";
import userData from "../../../assets/data/userData";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";

const USER = userData[0];

export default function Restaurant() {
  return (
    <View style={styles.restaurantScreen}>
      <View style={styles.restaurantImageContainer}>
        <Image
          style={styles.restaurantImage}
          source={USER.restaurants[1].image}
        />
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            style={{ marginRight: 10 }}
            name="silverware-fork-knife"
            size={35}
            color={
              USER.restaurants[1].status === "TRY"
                ? "white"
                : "rgba(182, 182, 207, 0.62)"
            }
          />
          <Ionicons
            name="bookmark"
            size={35}
            color={
              USER.restaurants[1].status === "TRIED"
                ? "white"
                : "rgba(182, 182, 207, 0.62)"
            }
          />
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={{ width: "75%" }}>
          <Text style={styles.restaurantName}>{USER.restaurants[0].name}</Text>
          <Text style={styles.restaurantExtraDetails}>
            {USER.restaurants[0].cuisine} • 1.5 mi • {USER.restaurants[0].cost}
          </Text>
          <Text style={styles.restaurantExtraDetails}>
            {USER.restaurants[1].address} 22314
          </Text>
        </View>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>4.3</Text>
          <AntDesign name="star" size={29} color={"#FFC700"} />
        </View>
      </View>
    </View>
  );
}
