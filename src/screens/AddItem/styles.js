import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
  },
  dropDown: {
    backgroundColor: "white",
    height: 20,
    alignSelf: "center",
  },
  buttonContainer: {
    backgroundColor: "black",
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
});
