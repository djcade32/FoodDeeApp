import { View, Text } from "react-native";
import React from "react";
import styles from "./styles.";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

const RestaurantItem = (props) => {
  return (
    <View style={styles.restaurantItemContainer}>
      <View style={{ width: "50%" }}>
        <Text style={styles.itemText}>{props.item.itemName}</Text>
      </View>
      <Text style={styles.itemText}>• Food</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>5</Text>
        <AntDesign
          style={{ marginRight: 15 }}
          name="star"
          size={29}
          color={"#FFC700"}
        />
        <MaterialCommunityIcons
          name="trash-can"
          size={29}
          color="rgba(182, 182, 207, 0.62)"
        />
      </View>
    </View>
  );
};

export default RestaurantItem;
