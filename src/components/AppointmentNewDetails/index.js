// AppointmentDetails.js
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Animated, Easing } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";

import axios from "axios"; // Ensure axios is installed
import moment from "moment-timezone";
import { formatCurrency } from "../../helpers/currencyFormatter";
import styles from "./style";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

const { API_URL } = Constants.expoConfig.extra;
const AnimatedIcon = ({ icon, color }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 2000, // Thời gian hoàn thành 1 vòng xoay (ms)
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };
    startRotation();
  }, [rotateAnim]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View style={{ transform: [{ rotate: rotation }] }}>
      <FontAwesomeIcon icon={icon} color={color} />
    </Animated.View>
  );
};

const AppointmentNewDetails = ({ route }) => {
  const { appointment } = route.params;
  const navigation = useNavigation();

  const handleCancelAppointment = () => {
    // Show a confirmation alert
    Alert.alert(
      "Xác nhận hủy lịch hẹn",
      "Bạn có chắc chắn muốn hủy lịch hẹn này không?",
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
              const response = await axios.put(
                `${API_URL}/api/appointment/modifyStatus/${appointment.appointment_id}`,
                { status: "CA" }
              );

              if (response.data.status) {
                Alert.alert("Thông báo", "Lịch hẹn đã được hủy thành công.");
                // Optionally navigate back or refresh the list of appointments
                navigation.navigate("CustomerScreen", {
                  patientId: appointment.appointment_id,
                });
              } else {
                Alert.alert("Lỗi", "Không thể hủy lịch hẹn. Vui lòng thử lại.");
              }
            } catch (error) {
              console.error("Error cancelling appointment:", error);
              Alert.alert("Lỗi", "Đã xảy ra lỗi khi hủy lịch hẹn.");
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
        <Text
          style={{
            fontFamily: "Open Sans-Italic",
            marginVertical: 15,
            textAlign: "center",
          }}
        >
          "Vui lòng đưa thông tin này đến quầy lễ tân Phòng Khám để được tiếp
          nhận khám bệnh"
        </Text>
        <View style={styles.detailCard}>
          <Text style={styles.label}>
            <FontAwesomeIcon
              icon="fa-solid fa-qrcode"
              style={{ color: "#262626" }}
            />
            {"  "}
            Mã Lịch Hẹn:{" "}
            <Text style={styles.value}>{appointment.appointment_id}</Text>
          </Text>

          <Text style={styles.label}>
            <FontAwesomeIcon
              icon="fa-solid fa-user-doctor"
              style={{ color: "#262626" }}
            />
            {"  "}
            Bác Sĩ:{" "}
            <Text style={styles.value}>
              {appointment.first_name} {appointment.last_name} -{" "}
              {appointment.staff_id}
            </Text>
          </Text>

          <Text style={styles.label}>
            <FontAwesomeIcon
              icon="fa-solid fa-door-open"
              style={{ color: "#262626" }}
            />
            {"  "}
            Khám Tại:{" "}
            <Text style={styles.value}>
              {appointment.department_name} ({appointment.department_id})
            </Text>
          </Text>

          <Text style={styles.label}>
            <FontAwesomeIcon
              icon="fa-solid fa-car-battery"
              style={{ color: "#262626" }}
            />
            {"  "}
            Dịch Vụ:{" "}
            <Text style={styles.value}>
              {appointment.service_name} - {appointment.service_id}
            </Text>
          </Text>

          <Text style={styles.label}>
            <FontAwesomeIcon
              icon="fa-solid fa-calendar-days"
              style={{ color: "#262626" }}
            />
            {"  "}
            Ngày Hẹn:{" "}
            <Text style={styles.value}>
              {new Date(appointment.appointment_date).toLocaleDateString(
                "vi-VN"
              )}
            </Text>
          </Text>

          <Text style={styles.label}>
            <FontAwesomeIcon
              icon="fa-solid fa-clock"
              style={{ color: "#262626" }}
            />
            {"  "}
            Thời Gian Hẹn:{" "}
            <Text style={styles.value}>
              {moment.utc(appointment.start_time).format("HH:mm")} -{" "}
              {moment.utc(appointment.end_time).format("HH:mm")}
            </Text>{" "}
          </Text>

          <Text style={styles.label}>
            <FontAwesomeIcon
              icon="fa-solid fa-stopwatch"
              style={{ color: "#262626" }}
            />
            {"  "}
            Đặt lịch hẹn lúc:{" "}
            <Text style={styles.value}>
              {moment.utc(appointment.end_time).format("HH:mm")} vào ngày{" "}
              {new Date(appointment.created_at).toLocaleDateString("vi-VN")}
            </Text>{" "}
          </Text>

          <View>
            <Text style={styles.label}>
              <FontAwesomeIcon
                icon="fa-solid fa-signal"
                style={{ color: "#262626" }}
              />
              {"  "}
              Trạng Thái:{" "}
              <Text style={[styles.value, styles.status]}>
                {appointment.status === "S" ? "Chờ xác nhận" : "Đã xác nhận"}
              </Text>
            </Text>

            <Text style={styles.label}>
              <FontAwesomeIcon
                icon="fa-solid fa-coins"
                style={{ color: "#262626" }}
              />
              {"  "}
              Phí Dịch Vụ:{" "}
              <Text style={[styles.value, styles.fee]}>
                {formatCurrency(appointment.service_fee)}
              </Text>
            </Text>

            <Text style={styles.label}>
              Phương thức:{" "}
              <Text style={[styles.value]}>
                {appointment.bankCode === "VNBANK" ||
                appointment.bankCode === "VNPAY"
                  ? "Thanh toán bằng ví điện tử VNPAY"
                  : "Thanh toán tại phòng khám"}
              </Text>
            </Text>

            <Text style={styles.label}>
              Trạng thái thanh toán:{" "}
              <Text
                style={[
                  styles.value,
                  appointment.payment_status === "P" && {
                    color: "orange",
                    fontFamily: "Open Sans-Medium",
                  },
                  appointment.payment_status === "C" && {
                    color: "green",
                    fontFamily: "Open Sans-Medium",
                  },
                ]}
              >
                {appointment.payment_status === "C" ? (
                  <>
                    Giao dịch thành công{" "}
                    <FontAwesomeIcon icon={faCircleCheck} color="green" />
                  </>
                ) : appointment.payment_status === "P" ? (
                  <>
                    Giao dịch đang được xử lí{" "}
                    <AnimatedIcon icon={faSpinner} color="#FFD43B" />
                  </>
                ) : (
                  "Giao dịch đã hủy"
                )}
              </Text>
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Open Sans-Italic",
              marginVertical: 10,
              textAlign: "center",
            }}
          >
            "Lưu ý xin đến khám từ khung giờ mà bạn đã hẹn để được sắp xếp khám
            nhanh chóng, cảm ơn bạn đã sử dụng dịch vụ của chúng tôi"
          </Text>
          <TouchableOpacity
            style={styles.wrapperBtn}
            onPress={handleCancelAppointment}
          >
            <Text style={styles.btnText}>HỦY LỊCH HẸN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentNewDetails;
