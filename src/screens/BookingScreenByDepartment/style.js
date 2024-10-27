import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  menuContent: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 8,
  },
  title: {
    top: 20,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#5486c4",
    marginBottom: 16,
  },

  note: { textAlign: "center", marginTop: 16, fontSize: 22, marginBottom: 16 },

  titleStep: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 8,
    color: "#333",
  },
  sectionContainer: {
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 16,
    overflow: "hidden",
  },
  listDepartment: {
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#e8f0fe",
    borderRadius: 6,
  },
  listService: {
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#e8f0fe",
    borderRadius: 6,
  },
  listDoctor: {
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#e8f0fe",
    borderRadius: 6,
  },
  listDate: {
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#e8f0fe",
    borderRadius: 6,
  },
  resetButton: {
    backgroundColor: "#e57373",
    paddingVertical: 10,
    borderRadius: 6,
    marginVertical: 10,
  },
  resetButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  unavailableDateContainer: {
    flexDirection: "row", // Hiển thị theo chiều ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    justifyContent: "center", // Căn giữa theo chiều ngang
    paddingVertical: 10, // Khoảng cách trên và dưới
  },
  unavailableDateText: {
    fontSize: 16, // Kích thước chữ cho phần mô tả
    color: "#333", // Màu chữ
  },
});

export default styles;
