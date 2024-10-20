import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  hr: {
    borderBottomColor: "#cccccc", // Màu của thanh ngang
    borderBottomWidth: 1, // Độ dày của thanh ngang
    marginVertical: 10, // Khoảng cách trên và dưới của thanh ngang
    width: "100%", // Chiều rộng của thanh ngang
  },

  text: {
    fontFamily: "Open Sans",
  },
  // MenuAccount cần bao phủ toàn bộ màn hình và có zIndex cao
  menuContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    backgroundColor: "#fffffe",
    zIndex: 10, // Đảm bảo menu nằm trên cùng
  },

  // nút đóng menu
  headerMenu: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 11, // Đảm bảo nút đóng nằm trên cùng
  },

  menuContent: {
    position: "absolute",
    width: "100%",
    top: 100,
    alignItems: "center",
    zIndex: 10, // Nội dung menu cũng cần có zIndex cao
  },

  menuContent1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
  },

  menuContent2: {
    flex: 1,
    width: "100%",
    display: "flex",
    marginBottom: 100,
  },

  menuContent3: {
    display: "flex",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },

  // title button booking
  titlebtnBooking: {
    fontSize: 20,
  },

  // text button logout
  textbtnLogout: {
    fontSize: 20,
  },
});

export default styles;
