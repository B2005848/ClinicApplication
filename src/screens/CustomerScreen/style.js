import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject, // Lớp phủ toàn bộ màn hình
    backgroundColor: "rgba(0, 0, 15, 0.5)", // Màu đen với độ trong suốt 50%
  },

  text: {
    fontFamily: "Open Sans-Bold",
    marginTop: 10,
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
  },

  title: {
    fontSize: 24,
    fontFamily: "Open Sans-Bold",
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    alignSelf: "center",
  },

  logoutButtonText: {
    color: "white",
    fontSize: 16,
  },
});
export default styles;
