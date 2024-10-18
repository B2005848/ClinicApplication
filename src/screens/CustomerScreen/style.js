import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  hr: {
    borderBottomColor: "#cccccc", // Màu của thanh ngang
    borderBottomWidth: 1, // Độ dày của thanh ngang
    marginVertical: 10, // Khoảng cách trên và dưới của thanh ngang
    width: "100%", // Chiều rộng của thanh ngang
  },

  container: {
    flex: 1,
  },

  image: {
    flex: 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject, // Lớp phủ toàn bộ màn hình
    backgroundColor: "rgba(0, 0, 20, 0.75)", // Màu đen với độ trong suốt 50%
  },

  text: {
    fontFamily: "Open Sans",
  },

  title: {
    fontSize: 24,
    alignSelf: "center",
    fontFamily: "Open Sans-Bold",
    fontWeight: "bold",
    color: "white",
  },

  note: {
    alignSelf: "center",
    marginVertical: 10,
    color: "white",
    fontStyle: "italic",
  },

  //icon
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },

  itemBookings: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#fffffe",
    borderRadius: 10,
    paddingHorizontal: 50,
    paddingVertical: 5,
  },

  itemBookingText: {
    fontSize: 20,
    color: "#2b2c34",
  },

  wapperButtonBooking: {
    borderRadius: 5,
    alignSelf: "center",
    marginHorizontal: 15,
  },

  containerMenu: {
    height: "45%",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#fffffe",
  },

  menu: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },

  menuItem: {
    width: "30%", // Chiều rộng mỗi cột chiếm khoảng 30% để đủ 3 cột
    marginVertical: 10, // Khoảng cách dọc giữa các item
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#d1d1e9",
    borderRadius: 5,
  },

  menuText: {
    textAlign: "center", // Căn giữa văn bản
    color: "#2b2c34",
    top: 5,
  },
});
export default styles;
