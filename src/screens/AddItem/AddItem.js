import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useState, useEffect } from "react";
import styles from "./styles";
import SelectDropdown from "react-native-select-dropdown";
import { Entypo } from "@expo/vector-icons";
import { AirbnbRating } from "react-native-ratings";
import { useNavigation, useRoute } from "@react-navigation/native";
import { User, RestaurantStatus, ItemType } from "../../models";
import { DataStore } from "aws-amplify";
import { useAuthContext } from "../../contexts/AuthContext";
import uuid from "react-native-uuid";

export default function AddItem() {
  const REVIEW_OPTIONS = ["Terrible", "Bad", "OK", "Good", "Amazing"];
  const ITEM_TYPE = [ItemType.FOOD, ItemType.DRINK];

  const navigation = useNavigation();
  const route = useRoute();
  const restaurant = route.params;
  const { setDbUser, dbUser, userRestaurantList, setUserRestaurantList } =
    useAuthContext();
  const [itemName, setItemName] = useState("");
  const [review, setReview] = useState(3);
  const [itemType, setItemType] = useState(ITEM_TYPE[0]);

  function handleDonePress() {
    addItem();
    navigation.goBack();
  }

  async function addItem() {
    let int = 0;
    const updatedRestaurantList = userRestaurantList.map((place) => {
      console.log("Number: ", ++int);
      if (
        place.id === restaurant.id &&
        place.status === RestaurantStatus.TRIED
      ) {
        return {
          id: place.id,
          name: place.name,
          address: place.address,
          cuisine: place.cuisine,
          status: place.status,
          image: place.image,
          cost: place.cost,
          rating: place.rating,
          coordinates: {
            latitude: place.coordinates.latitude,
            longitude: place.coordinates.longitude,
          },
          items:
            place.items === null
              ? [
                  {
                    id: uuid.v4(),
                    name: itemName,
                    rating: REVIEW_OPTIONS[review - 1],
                    type: itemType,
                  },
                ]
              : [
                  ...place.items,
                  {
                    id: uuid.v4(),
                    name: itemName,
                    rating: REVIEW_OPTIONS[review - 1],
                    type: itemType,
                  },
                ],
        };
      }
      return place;
    });
    // console.log("Restaurants", updatedRestaurantList);
    try {
      const user = await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          updated.restaurants = updatedRestaurantList;
        })
      );
      setDbUser(user);
      // setUserRestaurantList((oldList) => [...oldList, ...user.restaurants]);
    } catch (e) {
      console.log(e);
    }
  }

  // // A work around that is used to update and sync Amplify's Cloud DB
  // useEffect(() => {
  //   const subscription = DataStore.observe(User).subscribe(({ element }) => {
  //     console.log("Element To Change: ", element);
  //     setDbUser(element);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [User]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(text) => setItemName(text)}
          />
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
            reviews={REVIEW_OPTIONS}
            defaultRating={review}
            size={24}
            onFinishRating={(number) => setReview(number)}
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
              setItemType(selectedItem);
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
