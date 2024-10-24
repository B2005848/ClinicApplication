import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontFamily: "Open Sans-Medium",
  },
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7", // Nền nhạt tạo cảm giác sạch sẽ
  },
  menuContent: {
    flex: 1,
    paddingHorizontal: 20, // Khoảng trống ngang
    paddingVertical: 30, // Khoảng trống dọc
    justifyContent: "center",
    alignItems: "center", // Canh giữa nội dung
  },
  title: {
    fontSize: 24,
    fontWeight: "bold", // Làm nổi bật tiêu đề
    color: "#333", // Màu chữ đậm
    marginBottom: 20, // Khoảng cách dưới tiêu đề
    textAlign: "center", // Canh giữa tiêu đề
  },
  listDepartment: {
    width: "100%", // Chiếm toàn bộ chiều rộng
    backgroundColor: "#fff", // Màu nền trắng cho danh sách
    borderRadius: 10, // Làm tròn các góc
    shadowColor: "#000", // Bóng đổ
    shadowOffset: { width: 0, height: 2 }, // Tạo bóng phía dưới
    shadowOpacity: 0.1, // Độ mờ của bóng
    shadowRadius: 6,
    elevation: 5, // Hiệu ứng bóng cho Android
    padding: 10, // Khoảng cách trong danh sách
  },

  titleStep: {
    marginVertical: 10,
    alignSelf: "flex-start",
  },
});

export default styles;
