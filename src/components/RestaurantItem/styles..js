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
    // borderColor: "red",
    // borderWidth: 1,
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
    color: "#FF9A62",
    fontFamily: "lato",
    fontSize: 18,
    marginRight: 10,
    alignSelf: "center",
    textAlign: "center",
    width: 75,
  },
});
