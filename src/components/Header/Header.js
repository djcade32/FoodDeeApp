import { View, Text } from "react-native";
import React from "react";
import styles from "./styles";
import { Entypo, AntDesign } from "@expo/vector-icons";

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>
        <Text style={{ color: "#FF9A62" }}>Foo</Text>Dee
      </Text>
      <View style={styles.iconContainer}>
        <Entypo style={styles.mapIcon} name="map" size={29} color="black" />
        <AntDesign name="filter" size={29} color="black" />
      </View>
    </View>
  );
};

export default Header;
