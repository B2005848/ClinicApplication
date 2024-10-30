import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff", // Màu nền của SafeAreaView
  },
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff", // Màu nền của màn hình
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center", // Căn giữa tiêu đề
    color: "#333", // Màu chữ của tiêu đề
  },
  paymentMethodButton: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc", // Đường viền nhẹ xung quanh phương thức thanh toán
  },
  paymentMethodButtonSelected: {
    backgroundColor: "#4CAF50", // Màu nền khi được chọn
    borderWidth: 1,
    borderColor: "#388E3C",
  },
  methodTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333", // Màu chữ của tên phương thức
  },
  methodDescription: {
    fontSize: 14,
    color: "#666", // Màu chữ cho phần mô tả phương thức thanh toán
  },
  confirmButton: {
    backgroundColor: "#007BFF", // Màu nền của nút xác nhận
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
