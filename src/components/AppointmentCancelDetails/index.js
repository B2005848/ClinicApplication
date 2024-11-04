// AppointmentDetails.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios"; // Ensure axios is installed
import moment from "moment-timezone";
import { formatCurrency } from "../../helpers/currencyFormatter";
import styles from "./style";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

const { API_URL } = Constants.expoConfig.extra;

const AppointmentCancelDetails = ({ route }) => {
  const { appointment } = route.params;
  const navigation = useNavigation();

  const handleCancelAppointment = () => {
    // Show a confirmation alert
    Alert.alert(
      "Xác nhận xóa lịch hẹn",
      "Bạn có chắc chắn muốn xóa lịch hẹn này không?",
      [
        {
          text: "Không",
          style: "cancel",
        },
        {
          text: "Có",
          onPress: async () => {
            try {
              // Make the API call to cancel the appointment
              const response = await axios.delete(
                `${API_URL}/api/appointment/delete/${appointment.appointment_id}`
              );

              if (response.status === 200) {
                Alert.alert("Thông báo", "Lịch hẹn đã được xóa thành công.");
                // Optionally navigate back or refresh the list of appointments
                navigation.navigate("AppointmentTabScreen", {
                  patientId: appointment.appointment_id,
                });
              } else {
                Alert.alert("Lỗi", "Không thể xóa lịch hẹn. Vui lòng thử lại.");
              }
            } catch (error) {
              console.error("Error deletting appointment:", error);
              Alert.alert("Lỗi", "Đã xảy ra lỗi khi xóa lịch hẹn.");
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Chi tiết Lịch Hẹn</Text>

        <View style={styles.detailCard}>
          <Text style={styles.label}>Mã Lịch Hẹn:</Text>
          <Text style={styles.value}>{appointment.appointment_id}</Text>

          <Text style={styles.label}>Bác Sĩ:</Text>
          <Text style={styles.value}>
            {appointment.first_name} {appointment.last_name} -{" "}
            {appointment.staff_id}
          </Text>

          <Text style={styles.label}>Khám Tại:</Text>
          <Text style={styles.value}>
            {appointment.department_name} ({appointment.department_id})
          </Text>

          <Text style={styles.label}>Dịch Vụ:</Text>
          <Text style={styles.value}>
            {appointment.service_name} - {appointment.service_id}
          </Text>

          <Text style={styles.label}>Ngày Hẹn:</Text>
          <Text style={styles.value}>
            {new Date(appointment.appointment_date).toLocaleDateString("vi-VN")}
          </Text>

          <Text style={styles.label}>Thời Gian Hẹn:</Text>
          <Text style={styles.value}>
            {moment.utc(appointment.start_time).format("HH:mm")} -{" "}
            {moment.utc(appointment.end_time).format("HH:mm")}
          </Text>

          <Text style={styles.label}>Đặt lịch hẹn lúc</Text>
          <Text style={styles.value}>
            {new Date(appointment.created_at).toLocaleDateString("vi-VN")}
          </Text>

          <Text style={styles.label}>Trạng Thái:</Text>
          <Text style={[styles.value, styles.status]}>
            {appointment.status === "H" ? "Đã hủy thành công" : "Đã hoàn thành"}
          </Text>

          <Text style={styles.label}>Phí Dịch Vụ:</Text>
          <Text style={[styles.value, styles.fee]}>
            {formatCurrency(appointment.service_fee)}
          </Text>

          <TouchableOpacity
            style={styles.wrapperBtn}
            onPress={handleCancelAppointment}
          >
            <Text style={styles.btnText}>XÓA LỊCH HẸN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentCancelDetails;
