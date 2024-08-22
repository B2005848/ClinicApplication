import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  text: {
    fontFamily: "Open Sans-Bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
  },

  header: {
    flex: 1,
    marginTop: 50,
    alignItems: "flex-end",
    marginRight: 20,
  },

  body: {
    flex: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 70,
    color: "#48bbc6",
  },

  footer: {
    flex: 1,
    marginHorizontal: 50,
    marginVertical: 50,
  },
});

export default styles;
