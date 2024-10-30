import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  text: {
    fontFamily: "Open Sans",
  },

  title: {
    fontWeight: "bold",
  },

  wrapperBtnContinute: {
    backgroundColor: "#6495ED",
    padding: 10, // Khoảng cách bên trong button
    borderRadius: 5, // Bo góc
    width: "80%", // Chiều rộng của button
    height: 50, // Chiều cao của button
    justifyContent: "center", // Căn giữa chữ theo chiều dọc
    alignItems: "center", // Căn giữa chữ theo chiều ngang
  },

  titleBtnContinute: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
});
export default styles;
