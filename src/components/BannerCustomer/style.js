import { StyleSheet, Dimensions } from "react-native";

// Lấy chiều rộng và chiều cao của màn hình
const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {},
  child: {
    width: width,
    height: height * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  paginationDash: {
    fontSize: 30,
    color: "gray",
  },
  paginationActiveDash: {
    color: "black",
  },
});

export default styles;
