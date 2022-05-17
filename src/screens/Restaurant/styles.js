import { StyleSheet } from "react-native";

export default StyleSheet.create({
  restaurantScreen: {
    flex: 1,
    backgroundColor: "white",
  },
  restaurantImageContainer: {
    height: "30%",
  },
  restaurantImage: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    flexDirection: "row",
    left: 10,
    top: 10,
  },
  iconContainer: {
    position: "absolute",
    flexDirection: "row",
    right: 10,
    top: 10,
  },
  detailsContainer: {
    padding: 15,
    flexDirection: "row",
    borderBottomColor: "#D6D6D6",
    borderBottomWidth: 0.5,
  },
  restaurantName: {
    fontFamily: "lato-bold",
    fontSize: 24,
    marginBottom: 5,
  },
  restaurantExtraDetails: {
    fontFamily: "lato",
    fontSize: 16,
    color: "#CCCCCC",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  rating: {
    fontFamily: "lato",
    fontSize: 24,
    // marginRight: 3,
    color: "#FF9A62",
  },
  itemsTriedTitle: {
    fontFamily: "lato-bold",
    fontSize: 24,
    marginTop: 25,
    marginLeft: 15,
    marginBottom: 15,
  },
  addButtonContainer: {
    backgroundColor: "rgba(182, 182, 207, 0.62)",
    height: "7%",
    justifyContent: "center",
  },
  addButtonText: {
    fontFamily: "lato-bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
});
