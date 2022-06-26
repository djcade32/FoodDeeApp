import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import SelectDropdown from "react-native-select-dropdown";
import { Entypo } from "@expo/vector-icons";
import { Auth, DataStore } from "aws-amplify";
import { useAuthContext } from "../../contexts/AuthContext";
import { User } from "../../models";

export default function Profile() {
  const { dbUser, setDbUser, setUserRestaurantList } = useAuthContext();
  const [editEnabled, setEditEnabled] = useState(false);
  const [name, setName] = useState(dbUser.name);
  const [gender, setGender] = useState(dbUser.gender);
  const [birthday, setBirthday] = useState(dbUser.birthday);
  const [favoriteCuisine, setFavoriteCuisine] = useState(
    dbUser.favoriteCuisine
  );

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
  CUISINES.sort();

  // Determines if user is trying to edit profile or save profile
  async function handleButtonPress() {
    if (editEnabled) {
      await updateUser();
    }
    setEditEnabled(!editEnabled);
  }

  async function updateUser() {
    try {
      const user = await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          updated.name = name;
          updated.gender = gender;
          updated.birthday = birthday;
          updated.favoriteCuisine = favoriteCuisine;
        })
      );
      console.log(user);
      setDbUser(user);
    } catch (e) {
      console.log(e);
    }
  }

  // A work around that is used to update and sync Amplify's Cloud DB
  useEffect(() => {
    const subscription = DataStore.observe(User).subscribe(({ element }) => {
      setDbUser(element);
    });
    return () => subscription.unsubscribe();
  }, []);

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
              onChangeText={(value) => setName(value)}
              style={
                editEnabled ? [styles.input, { color: "black" }] : styles.input
              }
              placeholder="Name"
            >
              {name}
            </TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Gender</Text>
            <SelectDropdown
              defaultButtonText={gender}
              renderDropdownIcon={() => (
                <Entypo name="chevron-small-down" size={24} color="black" />
              )}
              buttonTextStyle={
                editEnabled ? [styles.input, { color: "black" }] : styles.input
              }
              disabled={!editEnabled}
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
              editable={editEnabled}
              onChangeText={(value) => setBirthday(value)}
              style={
                editEnabled ? [styles.input, { color: "black" }] : styles.input
              }
              placeholder="MM/DD/YYYY"
            >
              {birthday}
            </TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Favorite cuisine</Text>
            <SelectDropdown
              defaultButtonText={favoriteCuisine}
              renderDropdownIcon={() => (
                <Entypo name="chevron-small-down" size={24} color="black" />
              )}
              buttonTextStyle={
                editEnabled ? [styles.input, { color: "black" }] : styles.input
              }
              disabled={!editEnabled}
              buttonStyle={styles.dropDown}
              data={CUISINES}
              onSelect={(selectedItem) => {
                setFavoriteCuisine(selectedItem);
                console.log(selectedItem);
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
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            Auth.signOut();
            setUserRestaurantList([]);
            setDbUser(null);
          }}
        >
          <Text style={styles.signOutButton}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}
