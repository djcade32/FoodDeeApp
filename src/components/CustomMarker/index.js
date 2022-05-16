import { View, Text } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";
import {
  Entypo,
  MaterialIcons,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const CustomMarker = ({ data }) => {
  let icon = null;
  switch (data.cuisine) {
    case "American":
      icon = <FontAwesome5 name="hamburger" size={24} color="white" />;
      break;
    case "Cafe":
      icon = <Ionicons name="cafe" size={24} color="white" />;
      break;
    case "Italian":
      icon = <Ionicons name="pizza" size={24} color="white" />;
      break;
    case "Japanese" || "Asain":
      icon = <MaterialCommunityIcons name="rice" size={24} color="white" />;
      break;

    default:
      break;
  }
  return (
    <Marker
      coordinate={{
        latitude: data.lat,
        longitude: data.lng,
      }}
      title={data.name}
      description={data.address}
    >
      <View
        style={{ backgroundColor: "#FF9A62", padding: 5, borderRadius: "50%" }}
      >
        {icon}
      </View>
    </Marker>
  );
};

export default CustomMarker;
