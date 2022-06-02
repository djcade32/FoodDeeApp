import {
  View,
  SafeAreaView,
  FlatList,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./styles";
import HomeHeader from "../../components/Header/HomeHeader/HomeHeader";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Marker } from "react-native-maps";
import CustomMarker from "../../components/CustomMarker";
import * as Location from "expo-location";
import Map from "../../components/Map/Map";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
import { useAuthContext } from "../../contexts/AuthContext";
import { User, RestaurantStatus } from "../../models";
import HomeRestaurantCard from "../../components/HomeRestaurantCard/HomeRestaurantCard";

import FilterScreen from "./FilterScreen/FilterScreen";

const SEARCH_BAR_STYLES = {
  marginTop: 25,
  alignSelf: "center",
  width: "85%",
  marginBottom: 10,
};

const Home = () => {
  const { setDbUser, dbUser, userRestaurantList, setUserRestaurantList } =
    useAuthContext();
  const [isViewModeList, setIsViewModeList] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["1%", "100%"], []);

  // Determines if view mode is map or list
  function handleViewType() {
    setIsViewModeList(!isViewModeList);
  }

  // Opens bottom sheet
  function filterHandler() {
    bottomSheetRef.current?.expand();
  }

  // Ask user permission for location if not already granted
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
    <>
      {userLocation ? (
        <View style={styles.homeScreenContainer}>
          <HomeHeader
            viewTypeHandler={handleViewType}
            filterHandler={filterHandler}
          />

          {isViewModeList ? (
            <>
              <SearchBar style={SEARCH_BAR_STYLES} placeHolderText={"Search"} />
              <FlatList
                style={{ marginBottom: 10 }}
                data={userRestaurantList}
                renderItem={({ item }) => (
                  <HomeRestaurantCard
                    userLocation={userLocation}
                    restaurant={item}
                  />
                )}
              />
            </>
          ) : (
            <Map userLocation={userLocation}>
              {/* <SearchBar style={SEARCH_BAR_STYLES} placeHolderText={"Search"} />
          {USER.restaurants.map((restaurant) => (
            <CustomMarker key={restaurant.id} data={restaurant} />
          ))} */}
            </Map>
          )}
          <BottomSheet
            reference={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
          >
            <FilterScreen
              closeBottomSheet={() => bottomSheetRef.current?.close()}
            />
          </BottomSheet>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <ActivityIndicator size={35} color={"grey"} />
        </View>
      )}
    </>
  );
};

export default Home;
