import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StatusBar,
  SafeAreaView,
  FlatList, // Thêm FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import moment from "moment-timezone";
import styles from "./style";
import { formatCurrency } from "../../helpers/currencyFormatter";
import { useNavigation } from "@react-navigation/native";
moment.locale("vi");

const { API_URL } = Constants.expoConfig.extra;

const AppointmentListCanceled = ({ patientId, onCountChange }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/appointment/getinformation/${patientId}`
      );
      if (response.data.status) {
        setAppointments(response.data.data);

        // Đếm số lượng lịch hẹn có trạng thái "CA" và gửi lên AppTabScreen
        const canceledCount = response.data.data.filter(
          (appointment) => appointment.status === "CA"
        ).length;
        onCountChange(canceledCount); // Gửi số lượng lịch hẹn cho tab
      } else {
        console.log("Thông báo", "Không có lịch hẹn nào sắp diễn ra.");
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
  }, [patientId]); // Đảm bảo gọi lại mỗi khi patientId thay đổi

  const handleViewDetails = (appointment) => {
    navigation.navigate("AppointmentCancelDetails", { appointment });
  };

  // Lọc danh sách lịch hẹn để chỉ hiển thị những lịch có trạng thái "CA"
  const canceledAppointments = appointments.filter(
    (appointment) => appointment.status === "CA"
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
        data={canceledAppointments}
        keyExtractor={(item) => item.appointment_id.toString()} // Gán key cho mỗi item
        renderItem={({ item }) => (
          <View style={styles.appointmentCard}>
            <View style={{ flex: 2 }}>
              <Text
                style={[
                  styles.appointmentText,
                  styles.strikethroughText,
                  { fontFamily: "Open Sans-Bold" },
                ]}
              >
                Mã lịch hẹn: {item.appointment_id}
              </Text>
              <Text style={[styles.appointmentText, styles.text]}>
                Tại {item.department_name} ({item.department_id})
              </Text>
              <Text style={[styles.appointmentText, styles.text]}>
                {new Date(item.appointment_date).toLocaleDateString("vi-VN")}
              </Text>
              <Text style={[styles.appointmentText, styles.text]}>
                {moment.utc(item.start_time).format("HH:mm")} -{" "}
                {moment.utc(item.end_time).format("HH:mm")}
              </Text>
              <Text
                style={[styles.appointmentText, styles.text, styles.status]}
              >
                {item.status === "CA" ? "Đã hủy thành công" : "Đã hoàn thành"}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Text style={[styles.appointmentText, styles.fee]}>
                {formatCurrency(item.service_fee)}
              </Text>
              <TouchableOpacity onPress={() => handleViewDetails(item)}>
                <Text style={[styles.appointmentText]}>Xem chi tiết...</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không có lịch hẹn nào đã hủy.</Text>
        }
      />
    </SafeAreaView>
  );
};

export default AppointmentListCanceled;
