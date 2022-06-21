import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles.";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const RestaurantItem = (props) => {
  return (
    <View style={styles.restaurantItemContainer}>
      <View style={{ width: "50%" }}>
        <Text style={styles.itemName}>{props.item.name} </Text>
      </View>
      <Text style={styles.itemType}>{props.item.type}</Text>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating}>{props.item.rating}</Text>
        <TouchableOpacity onPress={() => props.deleteItem(props.item.id)}>
          <MaterialCommunityIcons
            name="trash-can"
            size={24}
            color="rgba(182, 182, 207, 0.62)"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RestaurantItem;
