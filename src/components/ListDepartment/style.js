import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  text: {
    fontFamily: "Open Sans-Bold",
  },

  container: {
    backgroundColor: "#fff", // Nền trắng cho danh sách
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // Hiệu ứng bóng cho Android
    padding: 10,
  },

  flatList: {
    flexGrow: 0,
  },

  title: {
    fontWeight: "bold",
  },
});
export default styles;
