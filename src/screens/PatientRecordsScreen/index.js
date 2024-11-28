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
      <Text style={styles.recordText}>Bảng ghi số: {item.record_id}</Text>
      <Text style={styles.recordText}>
        Ngày tạo: {formatDate.formatDateTime(item.created_at)}
      </Text>
      <Text style={styles.recordText}>Chuẩn đoán: {item.diagnosis}</Text>
      <Text style={styles.recordText}>Điều trị: {item.treatment}</Text>
      <Text style={styles.recordText}>Nguyên nhân: {item.reason}</Text>

      <Text style={styles.recordText}>Cân nặng: {item.weight} kg</Text>
      <Text style={styles.recordText}>Chiều cao: {item.height} cm</Text>
      <Text style={styles.recordText}>
        Blood Pressure: {item.blood_pressure}
      </Text>
      <Text style={styles.recordText}>Nhịp tim: {item.heart_rate} bpm</Text>
      <Text style={styles.recordText}>Nhiệt độ: {item.temperature} °C</Text>
      <Text style={styles.recordText}>
        Hô hấp: {item.respiratory_rate} breaths/min
      </Text>
      <Text style={styles.recordText}>
        Đường huyết: {item.blood_sugar} mg/dL
      </Text>
      <Text style={styles.recordText}>
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
  },
  recordContainer: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  recordText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default PatientRecordsScreen;
