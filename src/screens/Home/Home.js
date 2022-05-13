import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";
import Header from "../../component/Header/Header";
import SearchBar from "../../component/SearchBar/SearchBar";

const Home = () => {
  return (
    <View>
      <Header />
      <SearchBar />
    </View>
  );
};

export default Home;
