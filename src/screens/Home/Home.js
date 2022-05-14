import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";

const Home = () => {
  return (
    <View style={styles.homeScreenContainer}>
      <Header />
      <SearchBar />
      <RestaurantCard />
    </View>
  );
};

export default Home;
