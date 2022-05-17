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
import userData from "../../../assets/data/userData";

const USER = userData[0];

export default function Profile() {
  const [editEnabled, setEditEnabled] = useState(false);
  const GENDERS = ["Male", "Female"];
  const CUISINES = [
    "American",
    "Italian",
    "Japanese",
    "Spanish",
    "Chinese",
    "Mediterranean",
  ];

  function handleButtonPress() {
    setEditEnabled(!editEnabled);
  }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.profileHeaderContainer}>
          <Text style={styles.headerText}>Profile</Text>
        </View>

        <View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              editable={editEnabled}
              style={
                editEnabled ? [styles.input, { color: "black" }] : styles.input
              }
              placeholder="Name"
            >
              {USER.name}
            </TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Gender</Text>
            <SelectDropdown
              defaultButtonText={USER.gender}
              renderDropdownIcon={() => (
                <Entypo name="chevron-small-down" size={24} color="black" />
              )}
              buttonTextStyle={
                editEnabled ? [styles.input, { color: "black" }] : styles.input
              }
              disabled={!editEnabled}
              buttonStyle={styles.dropDown}
              data={GENDERS}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Birthday</Text>
            <TextInput
              editable={editEnabled}
              style={
                editEnabled ? [styles.input, { color: "black" }] : styles.input
              }
              placeholder="MM/DD/YYYY"
            >
              {USER.birthday}
            </TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Favorite cuisine</Text>
            <SelectDropdown
              defaultButtonText={USER.favoriteCuisine}
              renderDropdownIcon={() => (
                <Entypo name="chevron-small-down" size={24} color="black" />
              )}
              buttonTextStyle={
                editEnabled ? [styles.input, { color: "black" }] : styles.input
              }
              disabled={!editEnabled}
              buttonStyle={styles.dropDown}
              data={CUISINES}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item;
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleButtonPress}
          style={
            editEnabled
              ? [styles.buttonContainer, { backgroundColor: "black" }]
              : styles.buttonContainer
          }
        >
          <Text style={styles.buttonText}>
            {editEnabled ? "Save profile" : "Edit profile"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
