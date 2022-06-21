import { View, FlatList, ActivityIndicator, Text } from "react-native";
import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./styles";
import HomeHeader from "../../components/Header/HomeHeader/HomeHeader";
import SearchBar from "../../components/SearchBar/SearchBar";
import HomeCustomMarker from "../../components/HomeCustomMarker";
import * as Location from "expo-location";
import Map from "../../components/Map/Map";
import BottomSheet from "../../components/BottomSheet/BottomSheet";
import { useAuthContext } from "../../contexts/AuthContext";
import { User, RestaurantStatus } from "../../models";
import HomeRestaurantCard from "../../components/HomeRestaurantCard/HomeRestaurantCard";
import { calculateDistance, isEquivalent } from "../../helpers/helpers";

import FilterScreen from "./FilterScreen/FilterScreen";

const SEARCH_BAR_STYLES = {
  marginTop: 25,
  alignSelf: "center",
  width: "85%",
  marginBottom: 10,
};

const INITIAL_CONFIG_STATE = {
  categories: "",
  distanceRadius: "",
  try: false,
  tried: false,
};

const Home = () => {
  const { userRestaurantList } = useAuthContext();
  const [isViewModeList, setIsViewModeList] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchedList, setSearchedList] = useState([]);
  const [filterConfig, setFilterConfig] = useState(INITIAL_CONFIG_STATE);
  const [filterAdded, setFilterAdded] = useState(false);
  const [filterList, setFilterList] = useState([]);

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
  }, []);

  useEffect(() => {
    setSearchedList([]);
    if (searchValue !== "") {
      const delayDebounceFn = setTimeout(() => {
        (filterAdded ? filterList : userRestaurantList).map((restaurant) => {
          const name = restaurant.name.toLowerCase();
          if (name.includes(searchValue.toLowerCase())) {
            setSearchedList((oldList) => [...oldList, restaurant]);
          }
        });
      }, 1000);

      return () => clearTimeout(delayDebounceFn);
    } else {
      setIsSearching(false);
    }
  }, [searchValue]);

  useEffect(() => {
    setFilterList([]);
    if (!isEquivalent(filterConfig, INITIAL_CONFIG_STATE)) {
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

        setFilterList((oldList) => [...oldList, restaurant]);
      });
    } else {
      setFilterAdded(false);
    }
  }, [filterConfig]);

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
              <SearchBar
                style={SEARCH_BAR_STYLES}
                placeHolderText={"Search"}
                setSearchValue={setSearchValue}
                setIsSearching={setIsSearching}
              />
              <FlatList
                style={{ marginBottom: 10 }}
                data={
                  isSearching
                    ? searchedList
                    : filterAdded
                    ? filterList
                    : userRestaurantList
                }
                renderItem={({ item }) => (
                  <HomeRestaurantCard
                    userLocation={userLocation}
                    restaurant={item}
                  />
                )}
              />
            </>
          ) : (
            <>
              <SearchBar
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  width: "85%",
                  top: 80,
                  zIndex: 100,
                }}
                placeHolderText={"Search"}
              />
              <Map userLocation={userLocation}>
                {(filterAdded ? filterList : userRestaurantList).map(
                  (restaurant) => (
                    <HomeCustomMarker
                      key={restaurant.id}
                      data={restaurant}
                      userLocation={userLocation}
                    />
                  )
                )}
              </Map>
            </>
          )}
          <BottomSheet
            reference={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
          >
            <FilterScreen
              closeBottomSheet={() => bottomSheetRef.current?.close()}
              setFilterConfig={setFilterConfig}
              filterTrigger={setFilterAdded}
              filterConfigRef={filterConfig}
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
          <View>
            <ActivityIndicator size={35} color={"grey"} />
            <Text style={styles.loadingText}>Loading your restaurants...</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default Home;
