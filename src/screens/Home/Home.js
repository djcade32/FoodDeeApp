import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  useWindowDimensions,
} from "react-native";
import React from "react";
import styles from "./styles";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import userData from "../../../assets/data/userData";
import MapView, { Marker } from "react-native-maps";
import CustomMarker from "../../components/CustomMarker";

const USER = userData[0];

const Home = () => {
  const { width, height } = useWindowDimensions();

  function handleViewType() {
    console.log("View Switched");
  }

  return (
    <View style={styles.homeScreenContainer}>
      <Header viewTypeHandler={handleViewType} />
      {/* <SearchBar /> */}
      {/* <FlatList
        data={USER.restaurants}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
      /> */}

      <MapView
        showsCompass={false}
        mapType="mutedStandard"
        style={{
          height: height,
          width: width,
        }}
        // showsUserLocation={true}
        // followsUserLocation
      >
        <SearchBar />
        {USER.restaurants.map((restaurant) => (
          <CustomMarker key={restaurant.id} data={restaurant} />
        ))}
      </MapView>
    </View>
  );
};

export default Home;
