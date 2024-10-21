import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontFamily: "Open Sans-Medium",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    top: 30,
  },
  textInput: {
    paddingHorizontal: 30,
    borderRadius: 15,
    borderColor: "#5486c4",
    borderWidth: 1,
    fontSize: 18,
  },

  bgrButton: {
    height: 40,
    width: 250,
    backgroundColor: "#5486c4",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  titleButton: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Open Sans-Bold",
  },
});

export default styles;
