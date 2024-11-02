import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import moment from "moment-timezone";
moment.locale("vi");

const { API_URL } = Constants.expoConfig.extra;

const AppointmentListOld = ({ patientId }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/appointment/getinformation/${patientId}`
      );
      if (response.data.status) {
        setAppointments(response.data.data);
      } else {
        Alert.alert("Thông báo", "Không thể lấy danh sách lịch hẹn.");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi tải dữ liệu lịch hẹn.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  // Lọc danh sách lịch hẹn để chỉ hiển thị những lịch có trạng thái "S"
  const scheduledAppointments = appointments.filter(
    (appointment) => appointment.status === "C"
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="default" backgroundColor="#5486c4" />
      <ScrollView contentContainerStyle={styles.container}>
        {scheduledAppointments.length === 0 ? (
          <Text style={styles.emptyText}>Không có lịch hẹn nào.</Text>
        ) : (
          scheduledAppointments.map((item) => (
            <View key={item.appointment_id} style={styles.appointmentCard}>
              <Text style={styles.appointmentText}>
                Mã lịch hẹn: {item.appointment_id}
              </Text>
              <Text style={styles.appointmentText}>
                Bác sĩ: {item.staff_id}
              </Text>
              <Text style={styles.appointmentText}>
                Phòng ban: {item.department_id}
              </Text>
              <Text style={styles.appointmentText}>
                Dịch vụ: {item.service_id}
              </Text>
              <Text style={styles.appointmentText}>
                Ngày hẹn:{" "}
                {new Date(item.appointment_date).toLocaleDateString("vi-VN")}
              </Text>
              <Text style={styles.appointmentText}>
                Giờ bắt đầu: {moment.utc(item.start_time).format("HH:mm")}
              </Text>
              <Text style={styles.appointmentText}>
                Giờ kết thúc: {moment.utc(item.end_time).format("HH:mm")}
              </Text>
              <Text style={styles.appointmentText}>
                Trạng thái:{" "}
                {item.status === "S" ? "Đã lên lịch" : "Đã hoàn thành"}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  appointmentCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  appointmentText: {
    fontSize: 16,
    marginBottom: 5,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "#888",
  },
});

export default AppointmentListOld;
