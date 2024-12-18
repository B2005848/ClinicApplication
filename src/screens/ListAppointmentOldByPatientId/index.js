import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  FlatList, // Sử dụng FlatList thay vì ScrollView
  StatusBar,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import moment from "moment-timezone";
moment.locale("vi");

const { API_URL } = Constants.expoConfig.extra;

const AppointmentListOld = ({ patientId, onCountChange }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/appointment/getinformation/${patientId}`
      );
      if (response.data.status) {
        setAppointments(response.data.data);

        // Đếm số lượng lịch hẹn có trạng thái "C" và gửi lên AppTabScreen
        const completedCount = response.data.data.filter(
          (appointment) => appointment.status === "CO-P"
        ).length;
        onCountChange(completedCount); // Gửi số lượng lịch hẹn cho tab
      } else {
        console.log("Thông báo", "Bạn chưa từng đặt hẹn tại phòng khám");
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
  }, [patientId]); // Chỉ gọi lại khi patientId thay đổi

  // Lọc danh sách lịch hẹn để chỉ hiển thị những lịch có trạng thái "C"
  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "CO-P"
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="default" backgroundColor="#5486c4" />
      <FlatList
        data={completedAppointments}
        keyExtractor={(item) => item.appointment_id.toString()} // Gán key cho mỗi item
        renderItem={({ item }) => (
          <View style={styles.appointmentCard}>
            <Text style={styles.appointmentText}>
              Mã lịch hẹn: {item.appointment_id}
            </Text>
            <Text style={styles.appointmentText}>Bác sĩ: {item.staff_id}</Text>
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
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Bạn chưa từng đặt hẹn tại phòng khám.
          </Text>
        }
      />
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
