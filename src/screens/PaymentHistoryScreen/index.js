import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { formatDate } from "../../helpers/format-datetime";
import { formatCurrency } from "../../helpers/currencyFormatter";

const { API_URL } = Constants.expoConfig.extra;

const PaymentHistoryScreen = ({ route }) => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { patientId } = route.params;

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const { data } = await axios.get(
          `${API_URL}/api/statistics/revenue/payment-history-appointment/${patientId}`
        );
        setPaymentHistory(data.data); // Lưu dữ liệu vào state
      } catch (error) {
        setError("Failed to load payment history");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, [patientId]);

  const renderPaymentStatus = (status) => {
    switch (status) {
      case "P":
        return <Text style={{ color: "orange" }}>Đang xử lý</Text>;
      case "C":
        return <Text style={{ color: "green" }}>Hoàn thành</Text>;
      case "F":
        return <Text style={{ color: "red" }}>Thất bại</Text>;
      default:
        return <Text>Không xác định</Text>;
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        LỊCH SỬ THANH TOÁN
      </Text>
      <FlatList
        data={paymentHistory}
        keyExtractor={(item) => item.transaction_id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              Dịch vụ: {item.service_name}
            </Text>
            <Text>
              Ngày thanh toán:{" "}
              {new Date(item.transaction_date).toLocaleString()}
            </Text>
            <Text>Số tiền: {formatCurrency(item.amount)}</Text>
            <Text>
              Trạng thái thanh toán: {renderPaymentStatus(item.payment_status)}
            </Text>
            <Text>
              Ngày hẹn: {new Date(item.appointment_date).toLocaleDateString()}
            </Text>
            <Text>
              Thời gian: {new Date(item.start_time).toLocaleTimeString()} -{" "}
              {new Date(item.end_time).toLocaleTimeString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default PaymentHistoryScreen;
