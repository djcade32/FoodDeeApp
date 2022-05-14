import { View, Text, TextInput } from "react-native";
import React from "react";
import styles from "./styles";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = () => {
  return (
    <View style={styles.searchBarContainer}>
      <Ionicons
        style={styles.searchBarIcon}
        name="search"
        size={29}
        color="white"
      />
      <TextInput
        style={styles.searchBarInput}
        placeholder="Search"
        placeholderTextColor="white"
      />
    </View>
  );
};

export default SearchBar;
