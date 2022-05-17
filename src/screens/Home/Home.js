import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
  TextInput,
  Switch,
} from "react-native";
import React, { useState, useEffect, useMemo, useRef } from "react";
import styles from "./styles";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import userData from "../../../assets/data/userData";
import MapView, { Marker } from "react-native-maps";
import CustomMarker from "../../components/CustomMarker";
import * as Location from "expo-location";
import BottomSheet from "@gorhom/bottom-sheet";
import SelectDropdown from "react-native-select-dropdown";
import { Entypo } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

const USER = userData[0];

const Home = () => {
  const CUISINES = [
    "None",
    "American",
    "Italian",
    "Japanese",
    "Spanish",
    "Chinese",
    "Mediterranean",
  ];
  const { width, height } = useWindowDimensions();
  const [isViewModeList, setIsViewModeList] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

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
      <Header viewTypeHandler={handleViewType} filterHandler={filterHandler} />

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
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enableContentPanningGesture={false}
        enableHandlePanningGesture={false}
        handleIndicatorStyle={{ width: "0%" }}
      >
        <View style={styles.contentContainer}>
          <View style={styles.filterHeaderContainer}>
            <Text style={styles.filterHeaderTitle}>Filter</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Try</Text>
            <Switch
              trackColor={{
                false: "rgba(182, 182, 207, 0.62)",
                true: "#FF9A62",
              }}
              thumbColor={"white"}
              ios_backgroundColor="rgba(182, 182, 207, 0.62)"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Tried</Text>
            <Switch
              trackColor={{
                false: "rgba(182, 182, 207, 0.62)",
                true: "#FF9A62",
              }}
              thumbColor={"white"}
              ios_backgroundColor="rgba(182, 182, 207, 0.62)"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Cuisine</Text>
            <SelectDropdown
              defaultValueByIndex={0}
              renderDropdownIcon={() => (
                <Entypo name="chevron-small-down" size={24} color="black" />
              )}
              buttonTextStyle={styles.input}
              buttonStyle={styles.dropDown}
              data={CUISINES}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>
          <View style={styles.sliderContainer}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <Text style={styles.inputLabel}>Distance Radius</Text>
              <Text style={styles.inputLabel}>15 mi</Text>
            </View>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Home;
