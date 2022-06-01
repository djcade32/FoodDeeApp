import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React from "react";
import styles from "./styles";
import SelectDropdown from "react-native-select-dropdown";
import { Entypo } from "@expo/vector-icons";
import { AirbnbRating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";

export default function AddItem() {
  const navigation = useNavigation();

  const ITEM_TYPE = ["Food", "Drink"];

  function handleDonePress() {
    navigation.goBack();
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput style={styles.input} placeholder="Name" />
        </View>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, { alignSelf: "center" }]}>
            Rating
          </Text>
          <AirbnbRating
            ratingContainerStyle={{
              flexDirection: "row-reverse",
            }}
            starContainerStyle={{ marginRight: 10 }}
            count={5}
            reviews={["Terrible", "Bad", "OK", "Good", "Amazing"]}
            defaultRating={3}
            size={24}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Item type</Text>
          <SelectDropdown
            defaultValueByIndex={0}
            renderDropdownIcon={() => (
              <Entypo name="chevron-small-down" size={24} color="black" />
            )}
            buttonTextStyle={styles.input}
            buttonStyle={styles.dropDown}
            data={ITEM_TYPE}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
          />
        </View>

        <TouchableOpacity
          onPress={handleDonePress}
          activeOpacity={0.5}
          style={styles.buttonContainer}
        >
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
