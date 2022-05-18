import { View, Text, useWindowDimensions, FlatList } from "react-native";
import React, { useState, useMemo, useRef, useEffect } from "react";
import styles from "./styles";
import SearchHeader from "../../components/Header/SearchHeader.js/SearchHeader";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import userData from "../../../assets/data/userData";
import MapView, { Marker } from "react-native-maps";
import CustomMarker from "../../components/CustomMarker";
import * as Location from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";

import FilterScreen from "../Home/FilterScreen/FilterScreen";

const USER = userData[0];

export default function Search() {
  const { width, height } = useWindowDimensions();
  const [isViewModeList, setIsViewModeList] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["1%", "100%"], []);

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
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SearchHeader
        viewTypeHandler={handleViewType}
        filterHandler={filterHandler}
      />
      {isViewModeList ? (
        <>
          <FlatList
            style={{ marginBottom: 10 }}
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
}
