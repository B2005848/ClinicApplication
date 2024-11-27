import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { formatDate } from "../../helpers/format-datetime";
import { formatCurrency } from "../../helpers/currencyFormatter";
import style from "./style";
const { API_URL } = Constants.expoConfig.extra;

const PaymentHistoryScreen = ({ route }) => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { patientId } = route.params;

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const currentYear = new Date().getFullYear();
        const { data } = await axios.get(
          `${API_URL}/api/statistics/revenue/payment-history-appointment/${patientId}?year=${currentYear}`
        );
        if (data) {
          setPaymentHistory(data.data); // Lưu dữ liệu vào state
        } else {
          setError("Bạn không có giao dịch nào với chúng tôi");
        }
      } catch (error) {
        setError("Bạn không có giao dịch nào với chúng tôi");
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

  const renderPaymentMethod = (method) => {
    switch (method) {
      case "TT":
        return <Text>Trực tiếp tại phòng khám</Text>;
      case "VNBANK":
        return <Text>VNPay</Text>;
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
            <Text style={{ fontFamily: "Open Sans-Bold" }}>
              Dịch vụ: {item.service_name}
            </Text>

            <Text style={[{ marginBottom: 3 }, style.text]}>
              Ngày thanh toán:{" "}
              {new Date(item.transaction_date).toLocaleString()}
            </Text>
            <Text style={[{ marginBottom: 3 }, style.text]}>
              Số tiền: {formatCurrency(item.amount)}
            </Text>
            <Text style={[{ marginBottom: 3 }, style.text]}>
              Phương thức {renderPaymentMethod(item.bankCode)}
            </Text>
            <Text style={[{ marginBottom: 3 }, style.text]}>
              Trạng thái thanh toán: {renderPaymentStatus(item.payment_status)}
            </Text>
            <Text style={[{ marginBottom: 3 }, style.text]}>
              Ngày hẹn: {new Date(item.appointment_date).toLocaleDateString()}
            </Text>
            <Text style={[{ marginBottom: 3 }, style.text]}>
              Thời gian hẹn: {new Date(item.start_time).toLocaleTimeString()} -{" "}
              {new Date(item.end_time).toLocaleTimeString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default PaymentHistoryScreen;
