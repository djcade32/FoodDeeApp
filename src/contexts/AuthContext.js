import { createContext, useState, useEffect, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../models";

const AuthContext = createContext({});

const AuthContextProvider = (props) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [userRestaurantList, setUserRestaurantList] = useState([]);
  const sub = authUser?.attributes?.sub;

  useEffect(() => {
    console.log("Fetching auth user");
    Auth.currentAuthenticatedUser({ bypassCache: true }).then(setAuthUser);
  }, []);

  useEffect(() => {
    console.log("Finding User in DB");
    DataStore.query(User, (user) => user.sub("eq", sub)).then((users) => {
      console.log(users[0]);
      setDbUser(users[0]);
    });
  }, [sub]);

  useEffect(() => {
    if (dbUser) {
      console.log("Setting restaurants");
      setUserRestaurantList(dbUser.restaurants);
      console.log("Set Restaurant List: ", dbUser.restaurants);
    }
  }, [dbUser]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        dbUser,
        sub,
        setDbUser,
        userRestaurantList,
        setUserRestaurantList,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
