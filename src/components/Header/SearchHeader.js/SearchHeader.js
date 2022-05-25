import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import SearchBar from "../../SearchBar/SearchBar";

const SEARCH_BAR_STYLES = {
  width: "70%",
};

const SearchHeader = ({
  viewTypeHandler,
  filterHandler,
  placeHolderText,
  setSearchValue,
}) => {
  const [isMapIcon, setIsMapIcon] = useState(true);
  return (
    <View style={styles.headerContainer}>
      <SearchBar
        style={SEARCH_BAR_STYLES}
        placeHolderText={"Search on FooDee"}
        setSearchValue={setSearchValue}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            setIsMapIcon(!isMapIcon);
            viewTypeHandler();
          }}
        >
          {isMapIcon ? (
            <Entypo style={styles.mapIcon} name="map" size={29} color="black" />
          ) : (
            <Feather
              style={styles.mapIcon}
              name="menu"
              size={29}
              color="black"
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterHandler()}>
          <AntDesign name="filter" size={29} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchHeader;
