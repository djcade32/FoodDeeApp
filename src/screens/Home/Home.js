import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";
import Header from "../../components/Header/Header";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
  return (
    <View>
      <Header />
      <SearchBar />
    </View>
  );
};

export default Home;
