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
  const [fetchedTotal, setFetchedTotal] = useState(0);
  const [filterAdded, setFilterAdded] = useState(false);
  const [filterConfig, setFilterConfig] = useState({
    categories: "",
    distanceRadius: "",
    try: false,
    tried: false,
  });
  const { width, height } = useWindowDimensions();
  const [isViewModeList, setIsViewModeList] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const bottomSheetRef = useRef(null);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [endIsReached, setEndIsReached] = useState(false);

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
        "https://api.yelp.com/v3/businesses/search?term=restaurant " +
          searchValue +
          "&latitude=" +
          userLocation?.latitude +
          "&longitude=" +
          userLocation?.longitude +
          "&limit=" +
          limit +
          "&sort_by=distance&categories=" +
          filterConfig.categories +
          "&radius=" +
          filterConfig.distanceRadius +
          "&offset=" +
          offset +
          "",
        config
      );
      const json = await response.json();
      setFetchedTotal(json.total);
      if (fetchedRestaurants.length === 0 || filterAdded) {
        setfetchedRestaurants(json.businesses);
        if (filterAdded) {
          setFilterAdded(false);
        }
      } else if (isSearching && !endIsReached) {
        console.log("in correct if statement");
        setfetchedRestaurants(json.businesses);
        setIsSearching(false);
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
    }
  };

  function fetchMoreRestaurants() {
    console.log("End Reached");
    if (fetchedRestaurants.length !== fetchedTotal) {
      setEndIsReached(true);
      fetchRestaurants(FETCH_LIMIT, fetchedRestaurants.length);
    }
    return;
  }

  useEffect(() => {
    console.log("Search Use Effect");
    if (isSearching) {
      console.log("inside search if statemnt");
      setEndIsReached(false);
      const delayDebounceFn = setTimeout(() => {
        if (searchValue === "") {
          setfetchedRestaurants([]);
        }
        fetchRestaurants(FETCH_LIMIT, 0);
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchValue]);

  useEffect(() => {
    if (fetchedRestaurants.length === 0 && userLocation) {
      fetchRestaurants(FETCH_LIMIT, 0);
    }
  }, [userLocation]);

  useEffect(() => {
    console.log("Filter Added");
    if (filterAdded) {
      console.log("Inside Filter effect if statement");
      fetchRestaurants(FETCH_LIMIT, 0);
    }
  }, [filterAdded]);

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
        setSearchValue={setSearchValue}
        setIsSearching={setIsSearching}
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
          setFilterConfig={setFilterConfig}
          filterTrigger={setFilterAdded}
          filterConfigRef={filterConfig}
        />
      </BottomSheet>
    </View>
  );
}
