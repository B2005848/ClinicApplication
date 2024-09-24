import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  text: {
    fontFamily: "Open Sans-Bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flex: 1,
    flexDirection: "row",
    marginTop: 50,
    justifyContent: "flex-start",
    width: "100%",
    marginLeft: 20,
  },

  body: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  footer: {
    flex: 1,
    marginHorizontal: 50,
    marginVertical: 50,
  },
});

export default styles;
