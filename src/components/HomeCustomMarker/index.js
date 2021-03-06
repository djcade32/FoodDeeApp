import { View } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { getCuisineIcon, calculateDistance } from "../../helpers/helpers";

const HomeCustomMarker = ({ data, userLocation }) => {
  const navigation = useNavigation();

  const restaurantDistance = calculateDistance(
    userLocation?.latitude,
    data?.coordinates.latitude,
    userLocation?.longitude,
    data?.coordinates.longitude
  ).toFixed(1);

  const restaurantData = {
    id: data.id,
    name: data.name,
    image: data.image,
    address: data.address,
    distance: restaurantDistance,
    cuisine: data.cuisine,
    rating: data.rating,
    cost: data.cost,
    status: data.status,
    coordinates: data.coordinates,
  };

  function onPress() {
    navigation.navigate("RestaurantScreen", restaurantData);
  }

  const icon = getCuisineIcon(data.cuisine);

  return (
    <Marker
      tappable={false}
      onPress={onPress}
      coordinate={{
        latitude: data.coordinates.latitude,
        longitude: data.coordinates.longitude,
      }}
      title={data.name}
      description={data.address}
    >
      <View
        style={{
          backgroundColor: "#FF9A62",
          padding: 5,
          borderRadius: 50,
        }}
      >
        {icon}
      </View>
    </Marker>
  );
};

export default HomeCustomMarker;
