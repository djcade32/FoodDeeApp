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
import { Marker } from "react-native-maps";
import CustomMarker from "../../components/CustomMarker";
import * as Location from "expo-location";
import FilterScreen from "../Home/FilterScreen/FilterScreen";
import Map from "../../components/Map/Map";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
import { useAuthContext } from "../../contexts/AuthContext";

import {
  getApiCategory,
  isEquivalent,
  calculateDistance,
} from "../../helpers/helpers";
import { RestaurantStatus } from "../../models";

export default function Search() {
  const { userRestaurantList } = useAuthContext();

  const FETCH_LIMIT = 50;

  const INITIAL_CONFIG_STATE = {
    categories: "",
    distanceRadius: "",
    try: false,
    tried: false,
  };

  const [fetchedRestaurants, setfetchedRestaurants] = useState([]);
  const [fetchedTotal, setFetchedTotal] = useState(0);
  const [filterAdded, setFilterAdded] = useState(false);
  const [filterConfig, setFilterConfig] = useState(INITIAL_CONFIG_STATE);
  const [filterTryTriedList, setFilterTryTriedList] = useState([]);
  const [isViewModeList, setIsViewModeList] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const bottomSheetRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);
  const [endIsReached, setEndIsReached] = useState(false);

  const snapPoints = useMemo(() => ["1%", "100%"], []);

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
  }, []);

  // Config containing API Key for Yelp API
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
          getApiCategory(filterConfig.categories) +
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

  // Fetch more restaurants if end of flat list is reached
  function fetchMoreRestaurants() {
    console.log("End Reached");
    if (fetchedRestaurants.length !== fetchedTotal) {
      setEndIsReached(true);
      fetchRestaurants(FETCH_LIMIT, fetchedRestaurants.length);
    }
    return;
  }

  // Fetch restaurants if user is filtering
  useEffect(() => {
    if (fetchedRestaurants.length === 0 && userLocation) {
      fetchRestaurants(FETCH_LIMIT, 0);
    }
  }, [userLocation]);

  // Allows restaurants to load as user is typing in search bar
  useEffect(() => {
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

  // Fetch restaurants if user is filtering
  useEffect(() => {
    setFilterTryTriedList([]);
    if (!isEquivalent(filterConfig, INITIAL_CONFIG_STATE)) {
      console.log("Inside Filter effect if statement");
      if (filterConfig.try || filterConfig.tried) {
        userRestaurantList.map((restaurant) => {
          if (filterConfig.try && restaurant.status !== RestaurantStatus.TRY) {
            return;
          }
          if (
            filterConfig.tried &&
            restaurant.status !== RestaurantStatus.TRIED
          ) {
            return;
          }
          if (
            filterConfig.categories !== "" &&
            restaurant.cuisine !== filterConfig.categories
          ) {
            return;
          }

          if (filterConfig.distanceRadius !== "") {
            let distanceInMeters =
              calculateDistance(
                userLocation.latitude,
                restaurant.coordinates.latitude,
                userLocation.longitude,
                restaurant.coordinates.longitude
              ) * 1609.344;
            if (distanceInMeters > filterConfig.distanceRadius) {
              return;
            }
          }

          setFilterTryTriedList((oldList) => [...oldList, restaurant]);
        });
      } else {
        fetchRestaurants(FETCH_LIMIT, 0);
      }
    }
  }, [filterConfig]);

  // useEffect(() => {
  //   if (!isEquivalent(filterConfig, INITIAL_CONFIG_STATE)) {
  //     console.log("Config Changed");
  //   } else {
  //     setFilterAdded(false);
  //   }
  // }, [filterConfig]);

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
            data={filterAdded ? filterTryTriedList : fetchedRestaurants}
            renderItem={(restaurant) => (
              <RestaurantCard restaurant={restaurant} />
            )}
          />
        </>
      ) : (
        <Map userLocation={userLocation}>
          {(filterAdded ? filterTryTriedList : fetchedRestaurants).map(
            (restaurant) => (
              <CustomMarker key={restaurant.id} data={restaurant} />
            )
          )}
        </Map>
      )}

      <BottomSheet reference={bottomSheetRef} index={0} snapPoints={snapPoints}>
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
