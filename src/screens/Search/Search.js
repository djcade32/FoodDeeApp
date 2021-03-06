import { Text, View, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useMemo, useRef, useEffect } from "react";
import SearchHeader from "../../components/Header/SearchHeader.js/SearchHeader";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import CustomMarker from "../../components/CustomMarker";
import * as Location from "expo-location";
import FilterScreen from "../Home/FilterScreen/FilterScreen";
import Map from "../../components/Map/Map";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
import { getApiCategory } from "../../helpers/helpers";
import styles from "./styles";

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
  const [isViewModeList, setIsViewModeList] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const bottomSheetRef = useRef(null);
  const flatListRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);
  const [endIsReached, setEndIsReached] = useState(false);
  const [initialRestuarantFetchDone, setInitialRestuarantFetchDone] =
    useState(false);
  const [initialRestuarantFetchList, setInitialRestuarantFetchList] = useState(
    []
  );

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
        setInitialRestuarantFetchList(json.businesses);
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
      setInitialRestuarantFetchDone(true);
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
    console.log("Search Use Effect");
    if (isSearching) {
      console.log("inside search if statemnt");
      flatListRef.current.scrollToIndex({ animated: true, index: 0 });
      setEndIsReached(false);
      const delayDebounceFn = setTimeout(() => {
        if (searchValue === "") {
          setfetchedRestaurants(initialRestuarantFetchList);
        }
        // Prevent app from crashing when restaurants are not loaded to search through
        if (!initialRestuarantFetchDone) {
          return;
        }
        fetchRestaurants(FETCH_LIMIT, 0);
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchValue]);

  // Fetch restaurants if user is filtering
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
      {fetchedRestaurants?.length === 0 && !userLocation && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "white",
          }}
        >
          <View>
            <ActivityIndicator size={35} color={"grey"} />
            <Text style={styles.loadingText}>
              Loading nearby restaurants...
            </Text>
          </View>
        </View>
      )}
      {isViewModeList ? (
        <>
          <FlatList
            ref={flatListRef}
            onEndReachedThreshold={2}
            onEndReached={fetchMoreRestaurants}
            style={{ marginBottom: 10 }}
            data={fetchedRestaurants}
            renderItem={(restaurant) => (
              <RestaurantCard restaurant={restaurant} />
            )}
          />
        </>
      ) : (
        <Map userLocation={userLocation}>
          {fetchedRestaurants.map((restaurant) => (
            <CustomMarker key={restaurant.id} data={restaurant} />
          ))}
        </Map>
      )}

      <BottomSheet reference={bottomSheetRef} index={0} snapPoints={snapPoints}>
        <FilterScreen
          closeBottomSheet={() => bottomSheetRef.current?.close()}
          setFilterConfig={setFilterConfig}
          filterTrigger={setFilterAdded}
          filterConfigRef={filterConfig}
          previousScreen={"Search"}
        />
      </BottomSheet>
    </View>
  );
}
