import { StyleSheet } from "react-native";

export default StyleSheet.create({
  restaurantCardContainer: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    height: 250,
    overflow: "hidden",
    borderRadius: 20,
    marginTop: 25,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  distanceContainer: {
    flexDirection: "row",
    position: "absolute",
    backgroundColor: "rgba(182, 182, 207, 0.62)",
    marginLeft: 10,
    marginTop: 10,
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
  },
  distanceContainerText: {
    fontFamily: "lato",
    fontSize: 16,
    color: "white",
    marginLeft: 5,
  },
  iconContainer: {
    position: "absolute",
    flexDirection: "row",
    right: 10,
    top: 10,
  },
  restaurantNameContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  restaurantName: {
    color: "white",
    fontFamily: "lato-bold",
    fontSize: 24,
  },
  cuisine: {
    color: "white",
    fontFamily: "lato",
    fontSize: 16,
  },
});
