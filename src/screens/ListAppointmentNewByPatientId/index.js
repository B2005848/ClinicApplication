import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  SafeAreaView,
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

const AppointmentListNew = ({ patientId, onCountChange }) => {
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

        // Đếm số lượng lịch hẹn có trạng thái "S" và gửi lên AppTabScreen
        const scheduledCount = response.data.data.filter(
          (appointment) => appointment.status === "S"
        ).length;
        onCountChange(scheduledCount); // Gửi số lượng lịch hẹn cho tab
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
  }, [appointments]);

  const handleViewDetails = (appointment) => {
    navigation.navigate("AppointmentNewDetails", { appointment });
  };

  // Lọc danh sách lịch hẹn để chỉ hiển thị những lịch có trạng thái "S"
  const scheduledAppointments = appointments.filter(
    (appointment) => appointment.status === "S"
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
      <Text style={styles.note}>
        Xin lưu ý lịch hẹn của bạn có giá trị từ thời gian{" "}
        <Text style={{ textDecorationLine: "underline" }}>
          bắt đầu và kết thúc
        </Text>
        , nếu bạn đến phòng khám vào thời gian này thì lịch hẹn sẽ hợp lệ. Mọi
        thắc mắc xin vui lòng liên hệ hotline:{" "}
        <Text style={{ color: "red", fontFamily: "Open Sans-Bold" }}>
          1800xxxx
        </Text>
      </Text>
      <ScrollView contentContainerStyle={styles.container}>
        {scheduledAppointments.length === 0 ? (
          <Text style={styles.emptyText}>
            Không có lịch hẹn nào sắp diễn ra.
          </Text>
        ) : (
          scheduledAppointments.map((item) => (
            <View key={item.appointment_id} style={styles.appointmentCard}>
              <View style={{ flex: 2 }}>
                <Text
                  style={[
                    styles.appointmentText,
                    { fontFamily: "Open Sans-Bold" },
                  ]}
                >
                  Mã lịch hẹn: {item.appointment_id}
                </Text>
                <Text style={[styles.appointmentText, styles.text]}>
                  Tại {item.department_name} ({item.department_id})
                </Text>
                <Text style={[styles.appointmentText, styles.text]}>
                  Vào ngày{" "}
                  {new Date(item.appointment_date).toLocaleDateString("vi-VN")}
                </Text>
                <Text style={[styles.appointmentText, styles.text]}>
                  Từ {moment.utc(item.start_time).format("HH:mm")} đến{" "}
                  {moment.utc(item.end_time).format("HH:mm")}
                </Text>
                <Text
                  style={[styles.appointmentText, styles.text, styles.status]}
                >
                  {item.status === "S" ? "Đặt hẹn thành công" : "Đã hoàn thành"}
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
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentListNew;
