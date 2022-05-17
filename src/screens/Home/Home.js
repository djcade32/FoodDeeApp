import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import userData from "../../../assets/data/userData";
import MapView, { Marker } from "react-native-maps";
import CustomMarker from "../../components/CustomMarker";
import * as Location from "expo-location";

const USER = userData[0];

const Home = () => {
  const { width, height } = useWindowDimensions();
  const [isViewModeList, setIsViewModeList] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  function handleViewType() {
    setIsViewModeList(!isViewModeList);
  }

  useEffect(() => {
    async function getUserLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (!status === "granted") {
        console.log("NO");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
    getUserLocation();

    // const foregroundSubscription = Location.watchPositionAsync(
    //   {
    //     accuracy: Location.Accuracy.High,
    //     distanceInterval: 100,
    //   },
    //   (updatedLocation) => {
    //     setDriverLocation({
    //       latitude: updatedLocation.coords.latitude,
    //       longitude: updatedLocation.coords.longitude,
    //     });
    //   }
    // );
    // return foregroundSubscription;
  }, []);

  return (
    <View style={styles.homeScreenContainer}>
      <Header viewTypeHandler={handleViewType} />

      {isViewModeList ? (
        <>
          <SearchBar />
          <FlatList
            data={USER.restaurants}
            renderItem={({ item }) => <RestaurantCard restaurant={item} />}
          />
        </>
      ) : (
        <MapView
          showsCompass={false}
          mapType="mutedStandard"
          style={{
            height: height,
            width: width,
          }}
          showsUserLocation
          initialRegion={{
            latitude: userLocation?.latitude,
            longitude: userLocation?.longitude,
            latitudeDelta: 0.07,
            longitudeDelta: 0.07,
          }}
        >
          <SearchBar />
          {USER.restaurants.map((restaurant) => (
            <CustomMarker key={restaurant.id} data={restaurant} />
          ))}
        </MapView>
      )}
    </View>
  );
};

export default Home;
