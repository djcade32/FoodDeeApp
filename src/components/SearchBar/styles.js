import { StyleSheet } from "react-native";

export default StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(182, 182, 207, 0.62)",
    alignItems: "center",
    marginTop: 25,
    width: "85%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  searchBarInput: {
    fontFamily: "lato",
    fontSize: 18,
    color: "white",
    width: "85%",
  },
  searchBarIcon: {
    marginRight: 12,
  },
});
