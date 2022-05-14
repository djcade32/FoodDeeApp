import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headerContainer: {
    borderBottomColor: "#D6D6D6",
    borderBottomWidth: 0.5,
    marginTop: 15,
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingBottom: 10,
  },
  headerTitle: {
    fontFamily: "playfairDisplay-bold",
    fontSize: 32,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  mapIcon: {
    marginRight: 25,
  },
});
