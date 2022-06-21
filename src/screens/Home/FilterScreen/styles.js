import { StyleSheet } from "react-native";

export default StyleSheet.create({
  homeScreenContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  filterHeaderContainer: {
    borderBottomColor: "#D6D6D6",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  filterHeaderTitle: {
    fontFamily: "lato",
    fontSize: 16,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#D6D6D6",
    borderBottomWidth: 0.5,
    marginTop: 25,
    paddingBottom: 10,
    paddingHorizontal: 25,
  },
  sliderContainer: {
    borderBottomColor: "#D6D6D6",
    borderBottomWidth: 0.5,
    marginTop: 25,
    paddingBottom: 10,
    paddingHorizontal: 25,
  },
  inputLabel: {
    fontFamily: "lato",
    fontSize: 18,
  },
  input: {
    fontFamily: "lato",
    fontSize: 18,
  },
  dropDown: {
    backgroundColor: "white",
    height: 20,
    alignSelf: "center",
  },
  filterButtonContainer: {
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    paddingVertical: 5,
  },
  filterButtonText: {
    fontFamily: "lato",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  clearButtonContainer: {
    backgroundColor: "#D6D6D6",
    borderRadius: 10,
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    paddingVertical: 5,
  },
  clearButtonText: {
    fontFamily: "lato",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  cancelButton: {
    marginTop: 30,
    textAlign: "center",
    color: "#CCCCCC",
    fontSize: 18,
    fontFamily: "lato",
  },
});
