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
  itemName: {
    fontFamily: "lato",
    fontSize: 18,
  },
  itemType: {
    fontFamily: "lato",
    fontSize: 18,
    color: "#CCCC",
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
