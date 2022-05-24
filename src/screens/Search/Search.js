import {
  Text,
  View,
  useWindowDimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useMemo, useRef, useEffect } from "react";
import SearchHeader from "../../components/Header/SearchHeader.js/SearchHeader";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import MapView, { Marker } from "react-native-maps";
import CustomMarker from "../../components/CustomMarker";
import * as Location from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";
import FilterScreen from "../Home/FilterScreen/FilterScreen";

export default function Search() {
  const FETCH_LIMIT = 50;

  const [fetchedRestaurants, setfetchedRestaurants] = useState([]);
  const { width, height } = useWindowDimensions();
  const [isViewModeList, setIsViewModeList] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ["1%", "100%"], []);

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
  const config = {
    headers: {
      Authorization:
        "Bearer dgXHpVg08PkfCjE9SPgWb3uzYBH9kNDn3n5NpyJonG5aMQHr5GjNayvwujkrjzJGQcxJmMCrcn4naNgxno9Zu7bARvYZ2qtMz2_6zNHEhnm7WBsayoDbJPFBe2CGYnYx",
    },
  };

  //Fetch restaurants from Yelp API
  const fetchRestaurants = async (limit, offset) => {
    console.log("Running fetch function");
    try {
      const response = await fetch(
        "https://api.yelp.com/v3/businesses/search?term=restaurants&latitude=" +
          userLocation?.latitude +
          "&longitude=" +
          userLocation?.longitude +
          "&limit=" +
          limit +
          "&sort_by=distance&offset=" +
          offset +
          "",
        config
      );
      const json = await response.json();

      if (fetchedRestaurants.length === 0) {
        setfetchedRestaurants(json.businesses);
      } else {
        setfetchedRestaurants((previousState) => [
          ...previousState,
          ...json.businesses,
        ]);
      }

      return;
    } catch (error) {
      console.error("Can't fetch restaurants: " + error);
    } finally {
      console.log("Done fetching restaurants");
      // console.log(json.businesses);
    }
  };

  function fetchMoreRestaurants() {
    console.log("End Reached");
    fetchRestaurants(FETCH_LIMIT, fetchedRestaurants.length);
    return;
  }

  useEffect(() => {
    if (fetchedRestaurants.length === 0 && userLocation) {
      fetchRestaurants(FETCH_LIMIT, 0);
    }
  }, [userLocation]);

  function handleViewType() {
    setIsViewModeList(!isViewModeList);
  }

  function filterHandler() {
    bottomSheetRef.current?.expand();
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <SearchHeader
        viewTypeHandler={handleViewType}
        filterHandler={filterHandler}
      />
      {fetchedRestaurants.length === 0 && (
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
      {isViewModeList ? (
        <>
          <FlatList
            onEndReached={fetchMoreRestaurants}
            style={{ marginBottom: 10 }}
            data={fetchedRestaurants}
            renderItem={(restaurant) => (
              <RestaurantCard restaurant={restaurant} />
            )}
          />
        </>
      ) : (
        <MapView
          showsPointsOfInterest={false}
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
          {fetchedRestaurants.map((restaurant) => (
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
        bottomInset={-50}
      >
        <FilterScreen
          closeBottomSheet={() => bottomSheetRef.current?.close()}
        />
      </BottomSheet>
    </View>
  );
}
