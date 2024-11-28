import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import formatDate from "../../helpers/format-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const { API_URL } = Constants.expoConfig.extra;
const PatientRecordsScreen = ({ route }) => {
  const { patient_id } = route.params; // patientId từ tham số route
  const [records, setRecords] = useState([]); // State để lưu trữ danh sách hồ sơ
  const [loading, setLoading] = useState(true); // State để xử lý trạng thái tải
  const [error, setError] = useState(null); // State xử lý lỗi nếu có

  // Hàm gọi API để lấy hồ sơ bệnh án
  const fetchPatientRecords = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/handle/patient/get/${patient_id}/records`
      );
      setRecords(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Bạn chưa từng sử dụng dịch vụ ở chúng tôi, xin cảm ơn");
      setLoading(false);
    }
  };

  // Gọi API khi component được mount
  useEffect(() => {
    fetchPatientRecords();
    console.log(records);
  }, [patient_id]);

  // Hiển thị danh sách hồ sơ bệnh án
  const renderItem = ({ item }) => (
    <View style={styles.recordContainer}>
      <Text style={[styles.recordHeading, { color: "#6495ED" }]}>
        Bảng ghi số: {item.record_id}
      </Text>
      <Text style={styles.recordTextBold}>
        <FontAwesomeIcon
          icon="fa-solid fa-clock"
          style={{ color: "#6495ED" }}
        />{" "}
        Ngày tạo: {formatDate.formatDateTime(item.created_at)} với lịch hẹn số{" "}
        {item.appointment_id}
      </Text>
      <Text style={styles.recordText}>
        <FontAwesomeIcon
          icon="fa-solid fa-user-doctor"
          style={{ color: "#6495ED" }}
        />{" "}
        Bác sĩ khám:{" "}
        {item.first_name_doctor +
          " " +
          item.last_name_doctor +
          " (" +
          item.doctor_id +
          ")"}
      </Text>

      <Text style={styles.recordTextBold}>
        <FontAwesomeIcon
          style={{ color: "#6495ED" }}
          icon="fa-solid fa-pen-nib"
        />{" "}
        Chuẩn đoán: <Text style={{ color: "#DC143C" }}> {item.diagnosis}</Text>
      </Text>
      <Text style={styles.recordText}>
        <FontAwesomeIcon
          icon="fa-solid fa-hand-holding-medical"
          style={{ color: "#6495ED" }}
        />{" "}
        Điều trị: {item.treatment}
      </Text>
      <Text style={styles.recordText}>
        {" "}
        <FontAwesomeIcon
          icon="fa-solid fa-wind"
          style={{ color: "#6495ED" }}
        />{" "}
        Nguyên nhân: {item.reason}
      </Text>

      <Text style={styles.recordText}>
        <FontAwesomeIcon
          icon="fa-solid fa-weight-hanging"
          style={{ color: "#6495ED" }}
        />{" "}
        Cân nặng:
        {item.weight} kg
      </Text>
      <Text style={styles.recordText}>
        <FontAwesomeIcon
          icon="fa-solid fa-ruler-combined"
          style={{ color: "#6495ED" }}
        />{" "}
        Chiều cao: {item.height} cm
      </Text>
      <Text style={styles.recordText}>
        <FontAwesomeIcon
          icon="fa-solid fa-droplet"
          style={{ color: "#6495ED" }}
        />{" "}
        Huyết áp: {item.blood_pressure}
      </Text>
      <Text style={styles.recordText}>
        <FontAwesomeIcon
          icon="fa-solid fa-heart-pulse"
          style={{ color: "#cf2a2a" }}
        />{" "}
        Nhịp tim: {item.heart_rate} bpm
      </Text>
      <Text style={styles.recordText}>
        {" "}
        <FontAwesomeIcon
          icon="fa-solid fa-temperature-low"
          style={{ color: "#6495ED" }}
        />{" "}
        Nhiệt độ: {item.temperature} °C
      </Text>
      <Text style={styles.recordText}>
        <FontAwesomeIcon
          icon="fa-solid fa-lungs"
          style={{ color: "#6495ED" }}
        />{" "}
        Hô hấp: {item.respiratory_rate} breaths/min
      </Text>
      <Text style={styles.recordText}>
        <FontAwesomeIcon
          icon="fa-solid fa-cubes-stacked"
          style={{ color: "#6495ED" }}
        />{" "}
        Đường huyết: {item.blood_sugar} mg/dL
      </Text>
      <Text style={styles.recordText}>
        <FontAwesomeIcon
          icon="fa-solid fa-bore-hole"
          style={{ color: "#6495ED" }}
        />{" "}
        Cholesterol: {item.cholesterol} mg/dL
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={records}
      renderItem={renderItem}
      keyExtractor={(item) => item.record_id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8", // Background nhẹ để tránh giao diện quá tối
  },
  recordContainer: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    borderColor: "#ddd", // Màu sắc nhẹ nhàng cho border
    borderWidth: 1,
    shadowColor: "#000", // Tạo hiệu ứng bóng đổ
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Hiệu ứng bóng đổ cho Android
  },
  recordText: {
    fontSize: 16,
    lineHeight: 24, // Tăng lineHeight để chữ không bị chật
    marginBottom: 8,
    color: "#333", // Màu sắc chữ dễ đọc
    fontFamily: "Roboto", // Font chữ sạch sẽ, dễ đọc
  },
  recordTextBold: {
    fontSize: 16,
    fontWeight: "bold", // In đậm để làm nổi bật thông tin quan trọng
    color: "#333",
    marginBottom: 5,
  },
  recordHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50", // Màu sắc nhấn mạnh tiêu đề
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: "red", // Màu đỏ cho thông báo lỗi
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PatientRecordsScreen;
