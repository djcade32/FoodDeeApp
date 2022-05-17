import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import userData from "../../../assets/data/userData";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import RestaurantItem from "../../components/RestaurantItem/RestaurantItem";
import { useNavigation } from "@react-navigation/native";

const USER = userData[0];

export default function Restaurant() {
  const navigation = useNavigation();

  return (
    <View style={styles.restaurantScreen}>
      <View style={styles.restaurantImageContainer}>
        <Image
          style={styles.restaurantImage}
          source={USER.restaurants[1].image}
        />
        <Ionicons
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          name="arrow-back"
          size={35}
          color="white"
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
          <Text style={styles.rating}>{USER.restaurants[0].rating}</Text>
          {/* <AntDesign name="star" size={29} color={"#FFC700"} /> */}
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
