import { StyleSheet } from "react-native";

export default StyleSheet.create({
  profileHeaderContainer: {
    borderBottomColor: "#D6D6D6",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  headerText: {
    fontFamily: "playfairDisplay-bold",
    fontSize: 32,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    borderBottomColor: "#D6D6D6",
    borderBottomWidth: 0.5,
    marginTop: 25,
    paddingBottom: 10,
  },
  inputLabel: {
    fontFamily: "lato",
    fontSize: 18,
    marginHorizontal: 25,
  },
  input: {
    fontFamily: "lato",
    fontSize: 18,
    color: "#D6D6D6",
  },
  dropDown: {
    backgroundColor: "white",
    height: 20,
    alignSelf: "center",
  },
  buttonContainer: {
    backgroundColor: "#D6D6D6",
    borderRadius: 10,
    marginTop: 50,
    marginLeft: "auto",
    marginRight: "auto",
    width: "80%",
    paddingVertical: 5,
  },
  buttonText: {
    fontFamily: "lato",
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  signOutButton: {
    marginTop: 30,
    textAlign: "center",
    color: "#CCCCCC",
    fontSize: 18,
    fontFamily: "lato",
  },
});
