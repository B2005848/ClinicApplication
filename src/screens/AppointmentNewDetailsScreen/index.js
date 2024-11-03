// AppointmentDetails.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import moment from "moment-timezone";
import { formatCurrency } from "../../helpers/currencyFormatter";
import styles from "./style";
const AppointmentNewDetails = ({ route }) => {
  const { appointment } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Chi tiết Lịch Hẹn</Text>

        <View style={styles.detailCard}>
          <Text style={styles.label}>Mã Lịch Hẹn:</Text>
          <Text style={styles.value}>{appointment.appointment_id}</Text>

          <Text style={styles.label}>Bác Sĩ:</Text>
          <Text style={styles.value}>
            {appointment.first_name} {appointment.last_name}
            {" - "}
            {appointment.staff_id}
          </Text>

          <Text style={styles.label}>Khám Tại:</Text>
          <Text style={styles.value}>
            {appointment.department_name} ({appointment.department_id})
          </Text>

          <Text style={styles.label}>Dịch Vụ:</Text>
          <Text style={styles.value}>
            {appointment.service_name}
            {" - "}
            {appointment.service_id}
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
            {appointment.status === "S"
              ? "Đặt hẹn thành công"
              : "Đã hoàn thành"}
          </Text>

          <Text style={styles.label}>Phí Dịch Vụ:</Text>
          <Text style={[styles.value, styles.fee]}>
            {formatCurrency(appointment.service_fee)}
          </Text>

          <TouchableOpacity style={styles.wrapperBtn}>
            <Text style={styles.btnText}>HỦY LỊCH HẸN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentNewDetails;
