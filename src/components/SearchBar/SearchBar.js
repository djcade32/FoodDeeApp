import { View, Text, TextInput } from "react-native";
import React from "react";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = (props) => {
  return (
    // <View style={styles.searchBarContainer}>
    <View style={[styles.searchBarContainer, props.style]}>
      <Ionicons
        style={styles.searchBarIcon}
        name="search"
        size={29}
        color="white"
      />
      <TextInput
        style={styles.searchBarInput}
        placeholder={props.placeHolderText}
        placeholderTextColor="white"
        onChangeText={(value) => {
          props.setIsSearching(true);
          props.setSearchValue(value);
        }}
      />
    </View>
    // </View>
  );
};

export default SearchBar;
