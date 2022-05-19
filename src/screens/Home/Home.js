import {
  View,
  SafeAreaView,
  FlatList,
  useWindowDimensions,
} from "react-native";
import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./styles";
import HomeHeader from "../../components/Header/HomeHeader/HomeHeader";
import SearchBar from "../../components/SearchBar/SearchBar";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import userData from "../../../assets/data/userData";
import MapView, { Marker } from "react-native-maps";
import CustomMarker from "../../components/CustomMarker";
import * as Location from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";

import FilterScreen from "./FilterScreen/FilterScreen";

const USER = userData[0];

const SEARCH_BAR_STYLES = {
  marginTop: 25,
  alignSelf: "center",
  width: "85%",
  marginBottom: 10,
};

const Home = () => {
  const { width, height } = useWindowDimensions();
  const [isViewModeList, setIsViewModeList] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["1", "100%"], []);

  function handleViewType() {
    setIsViewModeList(!isViewModeList);
  }

  function filterHandler() {
    bottomSheetRef.current?.expand();
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
      <HomeHeader
        viewTypeHandler={handleViewType}
        filterHandler={filterHandler}
      />

      {isViewModeList ? (
        <>
          <SearchBar style={SEARCH_BAR_STYLES} placeHolderText={"Search"} />
          {/* <FlatList
            style={{ marginBottom: 10 }}
            data={USER.restaurants}
            renderItem={({ item }) => <RestaurantCard restaurant={item} />}
          /> */}
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
          <SearchBar style={SEARCH_BAR_STYLES} placeHolderText={"Search"} />
          {USER.restaurants.map((restaurant) => (
            <CustomMarker key={restaurant.id} data={restaurant} />
          ))}
        </MapView>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={false}
        handleIndicatorStyle={{ width: "0%" }}
      >
        <FilterScreen
          closeBottomSheet={() => bottomSheetRef.current?.close()}
        />
      </BottomSheet>
    </View>
  );
};

export default Home;
