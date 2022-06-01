import { View, Text, TouchableOpacity, TextInput, Switch } from "react-native";
import React, { useState, useRef } from "react";
import styles from "./styles";
import SelectDropdown from "react-native-select-dropdown";
import { Entypo } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { getApiCategory } from "../../../helpers/helpers";

export default function FilterScreen({
  closeBottomSheet,
  setFilterConfig,
  filterTrigger,
  filterConfigRef,
}) {
  const selectDropdownRef = useRef(null);
  const CUISINES = [
    "None",
    "American",
    "Italian",
    "Japanese",
    "Mexican",
    "Chinese",
    "Mediterranean",
    "Irish",
    "Vietnamese",
    "French",
    "Bakery",
    "German",
    "Thai",
    "Cafe",
  ];
  CUISINES.sort();

  let filterConfig = {
    categories: filterConfigRef?.categories,
    distanceRadius: filterConfigRef?.distanceRadius,
    try: filterConfigRef?.try,
    tried: filterConfigRef?.tried,
  };

  const [isTryEnabled, setIsTryEnabled] = useState(false);
  const [isTriedEnabled, setIsTriedEnabled] = useState(false);
  const [filterConfigCopy, setFilterConfigCopy] = useState(filterConfig);

  function toggleSwitch(e) {
    if (e === "Try") {
      if (isTriedEnabled && !isTryEnabled) {
        setFilterConfigCopy((prevState) => ({
          ...prevState,
          ...{ try: true, tried: false },
        }));
        setIsTryEnabled(true);
        setIsTriedEnabled(false);
      } else {
        setFilterConfigCopy((prevState) => ({
          ...prevState,
          ...{ try: !isTryEnabled },
        }));
        // filterConfig.try = !isTryEnabled;
        setIsTryEnabled(!isTryEnabled);
      }
    } else {
      if (isTryEnabled && !isTriedEnabled) {
        setFilterConfigCopy((prevState) => ({
          ...prevState,
          ...{ tried: true, try: false },
        }));
        // filterConfig.tried = true;
        setIsTriedEnabled(true);
        setIsTryEnabled(false);
      } else {
        setFilterConfigCopy((prevState) => ({
          ...prevState,
          ...{ tried: !isTriedEnabled },
        }));
        // filterConfig.tried = !isTriedEnabled;
        setIsTriedEnabled(!isTriedEnabled);
      }
    }
  }

  const [sliderValue, setSliderValue] = useState(25);

  function handleClearFiltersPress() {
    filterConfig = {
      categories: "",
      distanceRadius: "",
      try: false,
      tried: false,
    };
    setFilterConfigCopy(filterConfig);
    setIsTryEnabled(false);
    setIsTriedEnabled(false);
    selectDropdownRef.current?.reset();
    setSliderValue(25);
  }
  return (
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
          onValueChange={() => toggleSwitch("Try")}
          value={isTryEnabled}
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
          onValueChange={() => toggleSwitch("Tried")}
          value={isTriedEnabled}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Cuisine</Text>
        <SelectDropdown
          ref={selectDropdownRef}
          defaultButtonText={"None"}
          renderDropdownIcon={() => (
            <Entypo name="chevron-small-down" size={24} color="black" />
          )}
          buttonTextStyle={styles.input}
          buttonStyle={styles.dropDown}
          data={CUISINES}
          onSelect={(selectedItem, index) => {
            // console.log(getApiCategory(selectedItem));
            // filterConfig.categories = getApiCategory(selectedItem);
            setFilterConfigCopy((prevState) => ({
              ...prevState,
              ...{ categories: getApiCategory(selectedItem) },
            }));
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
          <Text style={styles.inputLabel}>{sliderValue} mi</Text>
        </View>
        <Slider
          style={{ width: 250, height: 40, alignSelf: "center" }}
          minimumValue={0}
          maximumValue={25}
          value={sliderValue}
          onValueChange={(value) => {
            setSliderValue(value);
          }}
          onSlidingComplete={(value) => {
            console.log(value + " is chosen");
            let milesToMeters = (value * 1609.344).toFixed(0);
            if (milesToMeters > 40000) {
              milesToMeters = 40000;
            }
            // filterConfig.distanceRadius = milesToMeters;
            setFilterConfigCopy((prevState) => ({
              ...prevState,
              ...{ distanceRadius: milesToMeters },
            }));
          }}
          step={1}
          minimumTrackTintColor="#FF9A62"
          maximumTrackTintColor="#D6D6D6"
        />
      </View>
      <TouchableOpacity
        onPress={handleClearFiltersPress}
        activeOpacity={0.5}
        style={styles.clearButtonContainer}
      >
        <Text style={styles.clearButtonText}>Clear filters</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setFilterConfig(filterConfigCopy);
          filterTrigger(true);
          closeBottomSheet();
        }}
        activeOpacity={0.5}
        style={styles.filterButtonContainer}
      >
        <Text style={styles.filterButtonText}>Filter</Text>
      </TouchableOpacity>
    </View>
  );
}
