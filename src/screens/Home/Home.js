import { View, Text, SafeAreaView, FlatList } from "react-native";
import React from "react";
import styles from "./styles";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";
import RestaurantCard from "../../components/RestaurantCard/RestaurantCard";
import userData from "../../../assets/data/userData";

const USER = userData[0];

const Home = () => {
  return (
    <View style={styles.homeScreenContainer}>
      <Header />
      <SearchBar />
      <FlatList
        data={USER.restaurants}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
      />
    </View>
  );
};

export default Home;
