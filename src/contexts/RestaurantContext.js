import { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { User } from "../models";
import { useAuthContext } from "./AuthContext";

const RestaurantContext = createContext({});

const RestaurantContextProvider = (props) => {
  const { setDbUser, dbUser, userRestaurantList } = useAuthContext();

  // Adds given restaurant and its status to DB
  async function addRestaurant(status, restaurantData) {
    try {
      const user = await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          updated.restaurants =
            // For some reason this conditional is needed because AWS Amplify does not like
            // using the spread operator on an empty list
            updated.restaurants === null
              ? [
                  {
                    id: restaurantData.id,
                    name: restaurantData.name,
                    address: restaurantData.address,
                    cuisine: restaurantData.cuisine,
                    status: status,
                    image: restaurantData.image,
                    cost: restaurantData.cost,
                    rating: restaurantData.rating,
                    coordinates: {
                      latitude: restaurantData.coordinates.latitude,
                      longitude: restaurantData.coordinates.longitude,
                    },
                  },
                ]
              : [
                  ...updated.restaurants,
                  {
                    id: restaurantData.id,
                    name: restaurantData.name,
                    address: restaurantData.address,
                    cuisine: restaurantData.cuisine,
                    status: status,
                    image: restaurantData.image,
                    cost: restaurantData.cost,
                    rating: restaurantData.rating,
                    coordinates: {
                      latitude: restaurantData.coordinates.latitude,
                      longitude: restaurantData.coordinates.longitude,
                    },
                  },
                ];
        })
      );
      setDbUser(user);
    } catch (e) {
      console.log(e);
    }
  }

  // Remove restaurant from DB with given restaurantId
  async function removeRestaurant(restaurantId) {
    const filteredList = userRestaurantList.filter(
      (restaurant) => restaurant.id !== restaurantId
    );
    try {
      const user = await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          updated.restaurants = filteredList;
        })
      );
      setDbUser(user);
    } catch (e) {
      console.log(e);
    }
  }

  // Switch restaurant status with given status
  async function switchRestaurantStatus(status, restaurantData) {
    const updatedRestaurantList = userRestaurantList.map((restaurant) => {
      if (restaurantData.id === restaurant.id) {
        return { ...restaurant, status: status };
      }
      return restaurant;
    });
    try {
      const user = await DataStore.save(
        User.copyOf(dbUser, (updated) => {
          updated.restaurants = updatedRestaurantList;
        })
      );
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
  }, [User]);

  return (
    <RestaurantContext.Provider
      value={{
        addRestaurant,
        removeRestaurant,
        switchRestaurantStatus,
      }}
    >
      {props.children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContextProvider;

export const useRestaurantContext = () => useContext(RestaurantContext);
