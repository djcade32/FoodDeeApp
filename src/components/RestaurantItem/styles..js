import { StyleSheet } from "react-native";

export default StyleSheet.create({
  restaurantItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomColor: "#D6D6D6",
    borderBottomWidth: 0.5,
  },
  itemText: {
    fontFamily: "lato",
    fontSize: 18,
  },
  ratingContainer: {
    flexDirection: "row",
    marginLeft: "auto",
  },
  rating: {
    fontFamily: "lato",
    fontSize: 24,
    marginRight: 3,
  },
});
