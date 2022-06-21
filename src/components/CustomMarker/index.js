import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { useAuthContext } from "../../contexts/AuthContext";
import { getCuisine, getCuisineIcon } from "../../helpers/helpers";

const CustomMarker = ({ data }) => {
  const navigation = useNavigation();
  const { userRestaurantList } = useAuthContext();
  const [badgeStatus, setBadgeStatus] = useState(null);

  const restaurantDistance = (data.distance * 0.000621371192).toFixed(1);

  const restaurantData = {
    id: data.id,
    name: data.name,
    image: data.image_url,
    address:
      data.location.display_address.length > 1
        ? data.location.display_address[0] +
          " " +
          data.location.display_address[1]
        : data.location.display_address[0],
    distance: restaurantDistance,
    cuisine: getCuisine(data.categories),
    rating: data.rating,
    cost: data.price,
    coordinates: data.coordinates,
    status: badgeStatus,
  };

  useEffect(() => {
    const foundRestaurant = userRestaurantList?.find(
      (restaurant) => restaurant.id === data.id
    );
    setBadgeStatus(foundRestaurant?.status);
  }, [userRestaurantList]);

  function onPress() {
    navigation.navigate("RestaurantScreen", restaurantData);
  }

  const icon = getCuisineIcon(data.categories);

  return (
    <Marker
      tappable={false}
      onPress={onPress}
      coordinate={{
        latitude: data.coordinates.latitude,
        longitude: data.coordinates.longitude,
      }}
      title={data.name}
      description={
        data.location.display_address[0] +
        " " +
        data.location.display_address[1]
      }
    >
      <View
        style={{ backgroundColor: "#FF9A62", padding: 5, borderRadius: 50 }}
      >
        {icon}
      </View>
    </Marker>
  );
};

export default CustomMarker;
