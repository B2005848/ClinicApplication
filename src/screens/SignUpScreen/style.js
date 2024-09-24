import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontFamily: "Open Sans-Medium",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  textInput: {
    height: 40,
    width: 300,
    paddingHorizontal: 30,
    borderRadius: 15,
    borderColor: "#5486c4",
    borderWidth: 1,
    marginBottom: 20,
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

  demo: {
    fontFamily: "Open Sans-Bold",
    fontSize: 50,
    color: "pink",
    marginBottom: 20,
  },
});

export default styles;
