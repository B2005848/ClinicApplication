import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontFamily: "Open Sans-Medium",
  },
  container: {
    position: "absolute",
    width: "100%",
    backgroundColor: "#fffffe",
    zIndex: 10, // Đảm bảo menu nằm trên cùng
  },
});

export default styles;
