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
    department_id,
    service_id,
    appointment_date,
    start_time,
    shift_id,
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

  const handleConfirmPaymentMethod = () => {
    if (!selectedPaymentMethod) {
      Alert.alert("Lỗi", "Vui lòng chọn phương thức thanh toán");
      return;
    }

    // Tiến hành xử lý logic sau khi chọn phương thức thanh toán
    Alert.alert(
      "Phương thức thanh toán đã chọn",
      `Bạn đã chọn phương thức: ${selectedPaymentMethod.method_name}`
    );
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
