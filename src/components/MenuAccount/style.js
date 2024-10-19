import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // MenuAccount cần bao phủ toàn bộ màn hình và có zIndex cao
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white", // Nền bán trong suốt
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // Đảm bảo menu nằm trên cùng
  },
  headerMenu: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 11, // Đảm bảo nút đóng nằm trên cùng
  },
  menuContent: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10, // Nội dung menu cũng cần có zIndex cao
  },
});

export default styles;
