import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import SelectDropdown from "react-native-select-dropdown";
import { Entypo } from "@expo/vector-icons";
import { DataStore } from "aws-amplify";
import { User } from "../../models";
import { useAuthContext } from "../../contexts/AuthContext";

export default function OnboardScreen() {
  const GENDERS = ["Male", "Female", "Rather not say", "Other"];
  const CUISINES = [
    "American",
    "Italian",
    "Japanese",
    "Mexican",
    "Chinese",
    "Mediterranean",
    "German",
    "French",
    "Thai",
    "Vietnamese",
    "Irish",
  ];
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [birthday, setBirthday] = useState();
  const [favoriteCuisine, setFavoriteCuisine] = useState("None");
  const { sub, setDbUser } = useAuthContext();

  CUISINES.sort();

  // When user taps next button a new user is created
  async function onNext() {
    try {
      const user = await DataStore.save(
        new User({
          name,
          gender,
          birthday,
          favoriteCuisine,
          sub,
          restaurants: null,
        })
      );
      console.log(user);
      setDbUser(user);
    } catch (e) {
      console.log("Error creating user:");
      console.log(e);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.profileHeaderContainer}>
          <Text style={styles.headerText}>
            <Text style={{ color: "#FF9A62" }}>Foo</Text>Dee
          </Text>
        </View>

        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => setName(value)}
              placeholder="Name"
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Gender</Text>
            <SelectDropdown
              defaultButtonText={gender}
              renderDropdownIcon={() => (
                <Entypo name="chevron-small-down" size={24} color="black" />
              )}
              buttonTextStyle={styles.input}
              buttonStyle={styles.dropDown}
              data={GENDERS}
              onSelect={(selectedItem) => {
                setGender(selectedItem);
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Birthday</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/DD/YYYY"
              onChangeText={(value) => setBirthday(value)}
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Favorite cuisine</Text>
            <SelectDropdown
              defaultButtonText={favoriteCuisine}
              renderDropdownIcon={() => (
                <Entypo name="chevron-small-down" size={24} color="black" />
              )}
              buttonTextStyle={styles.input}
              buttonStyle={styles.dropDown}
              data={CUISINES}
              onSelect={(selectedItem) => {
                setFavoriteCuisine(selectedItem);
              }}
            />
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.5} onPress={onNext}>
          <Text style={styles.nextButton}>Next</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
