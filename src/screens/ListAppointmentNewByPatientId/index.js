import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import moment from "moment-timezone";
import styles from "./style";
moment.locale("vi");

const { API_URL } = Constants.expoConfig.extra;

const AppointmentListNew = ({ patientId }) => {
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
    (appointment) => appointment.status === "S"
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="default" backgroundColor="#5486c4" />
      <Text style={styles.note}>
        Xin lưu ý lịch hẹn của bạn có giá trị từ thời gian bắt đầu và kết thúc,
        nếu bạn đến phòng khám vào thời gian này thì lịch hẹn sẽ hợp lệ. Mọi
        thắc mắc xin vui lòng liên hệ hotline:{" "}
        <Text style={{ color: "red", fontFamily: "Open Sans-Bold" }}>
          1800xxxx
        </Text>
      </Text>
      <ScrollView contentContainerStyle={styles.container}>
        {scheduledAppointments.length === 0 ? (
          <Text style={styles.emptyText}>Không có lịch hẹn nào.</Text>
        ) : (
          scheduledAppointments.map((item) => (
            <View key={item.appointment_id} style={styles.appointmentCard}>
              <Text style={[styles.appointmentText, styles.text]}>
                Mã lịch hẹn: {item.appointment_id}
              </Text>
              <Text style={[styles.appointmentText, styles.text]}>
                Bác sĩ: {item.staff_id}
              </Text>
              <Text style={[styles.appointmentText, styles.text]}>
                Phòng ban: {item.department_id}
              </Text>
              <Text style={[styles.appointmentText, styles.text]}>
                Dịch vụ: {item.service_id}
              </Text>
              <Text style={[styles.appointmentText, styles.text]}>
                Ngày hẹn:{" "}
                {new Date(item.appointment_date).toLocaleDateString("vi-VN")}
              </Text>
              <Text style={[styles.appointmentText, styles.text]}>
                Giờ bắt đầu: {moment.utc(item.start_time).format("HH:mm")}
              </Text>
              <Text style={[styles.appointmentText, styles.text]}>
                Giờ kết thúc: {moment.utc(item.end_time).format("HH:mm")}
              </Text>
              <Text style={[styles.appointmentText, styles.text]}>
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

export default AppointmentListNew;
