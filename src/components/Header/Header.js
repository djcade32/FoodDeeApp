import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";

const Header = ({ viewTypeHandler }) => {
  const [isMapIcon, setIsMapIcon] = useState(true);
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>
        <Text style={{ color: "#FF9A62" }}>Foo</Text>Dee
      </Text>
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
        <TouchableOpacity onPress={() => viewTypeHandler()}>
          <AntDesign name="filter" size={29} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
