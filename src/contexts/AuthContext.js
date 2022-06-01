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
    DataStore.query(User, (user) => user.sub("eq", sub)).then((users) => {
      console.log(users[0]);
      setDbUser(users[0]);
      if (dbUser) {
        setUserRestaurantList(users[0].restaurants);
      }
    });
  }, [sub]);

  useEffect(() => {
    if (userRestaurantList) {
      console.log("List found:", userRestaurantList);
    }
  }, [userRestaurantList]);

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
