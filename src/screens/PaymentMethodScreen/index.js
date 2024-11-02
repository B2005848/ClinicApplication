import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
  SafeAreaView,
} from "react-native";
import axios from "axios"; // Sử dụng axios để gọi API
import Constants from "expo-constants";
import styles from "./style"; // Import file styles.js

const { API_URL } = Constants.expoConfig.extra;

const PaymentMethodScreen = ({ route, navigation }) => {
  const {
    doctor_id,
    patient_id,
    department_id,
    service_id,
    appointment_date,
    start_time,
    end_time,
    shift_id,
    service_fee,
    reason,
  } = route.params; // Lấy thông tin cuộc hẹn từ route.params

  const [paymentMethods, setPaymentMethods] = useState([]); // Danh sách phương thức thanh toán
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null); // Phương thức thanh toán đã chọn

  useEffect(() => {
    // Gọi API để lấy danh sách phương thức thanh toán
    const fetchPaymentMethods = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/payment-method/`);
        const activePaymentMethods = response.data.data.filter(
          (method) => method.is_active === true
        ); // Lọc những phương thức active
        setPaymentMethods(activePaymentMethods);
      } catch (error) {
        console.error("Error fetching payment methods:", error);
        Alert.alert("Lỗi", "Không thể tải danh sách phương thức thanh toán");
      }
    };

    fetchPaymentMethods();
  }, []);

  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleConfirmPaymentMethod = async () => {
    if (!selectedPaymentMethod) {
      Alert.alert("Lỗi", "Vui lòng chọn phương thức thanh toán");
      return;
    }

    if (selectedPaymentMethod.payment_method_id === 2) {
      try {
        // Step 1: Send booking data to create an appointment
        const responseBooking = await axios.post(
          `${API_URL}/api/appointment/booking/${patient_id}`,
          {
            staff_id: doctor_id,
            department_id: department_id,
            appointment_date: appointment_date,
            start_time: start_time,
            end_time: end_time,
            shift_id: shift_id,
            service_id: service_id,
            reason: reason,
          }
        );

        // Check if booking was successful and retrieve the appointment_id
        if (responseBooking.status === 200 && responseBooking.data.data) {
          const appointment_id = responseBooking.data.data.appointment_id;

          // Step 2: Proceed with VNPay payment using the appointment_id
          const responsePayment = await axios.post(
            `${API_URL}/api/VNPay/payment/appointment-payment`,
            {
              amount: service_fee,
              bankCode: "VNBANK",
              ipAddr: API_URL,
              patient_id: patient_id,
              appointment_id: appointment_id, // Pass the retrieved appointment_id here
            }
          );

          // Handle VNPay response
          if (responsePayment.data.code === "00") {
            navigation.navigate("PaymentWebView", {
              paymentUrl: responsePayment.data.paymentUrl,
            });
          } else {
            Alert.alert(
              "Thông báo lỗi",
              "Hệ thống thanh toán VNPay đang bảo trì, vui lòng chọn phương thức thanh toán khác"
            );
          }
        } else {
          Alert.alert("Lỗi", "Đặt lịch thất bại, vui lòng thử lại sau");
        }
      } catch (error) {
        console.error("Error processing payment:", error);
        Alert.alert("Lỗi", "Không thể thực hiện thanh toán");
      }
    } else {
      // Handle other payment methods if needed
      Alert.alert(
        "Phương thức thanh toán đã chọn",
        `Bạn đã chọn phương thức: ${selectedPaymentMethod.method_name}`
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Cấu hình thanh trạng thái */}
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Chọn phương thức thanh toán</Text>

        {paymentMethods.length > 0 ? (
          paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.payment_method_id}
              style={[
                styles.paymentMethodButton,
                selectedPaymentMethod?.payment_method_id ===
                  method.payment_method_id &&
                  styles.paymentMethodButtonSelected, // Áp dụng style khác nếu được chọn
              ]}
              onPress={() => handleSelectPaymentMethod(method)}
            >
              <Text style={styles.methodTitle}>{method.method_name}</Text>
              <Text style={styles.methodDescription}>{method.description}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Không có phương thức thanh toán khả dụng.</Text>
        )}

        {selectedPaymentMethod && (
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              onPress={handleConfirmPaymentMethod}
              style={styles.confirmButton}
            >
              <Text style={styles.confirmButtonText}>
                Xác nhận phương thức thanh toán
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentMethodScreen;
