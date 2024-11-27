// PaymentWebView.js
import React, { useState } from "react";
import { WebView } from "react-native-webview";
import { View, ActivityIndicator, Alert } from "react-native";
import axios from "axios";
import Constants from "expo-constants";

const { API_URL } = Constants.expoConfig.extra;
const PaymentWebView = ({ route, navigation }) => {
  const { paymentUrl } = route.params;
  const [isCallbackHandled, setIsCallbackHandled] = useState(false);

  // Theo dõi thay đổi URL
  const handleNavigationStateChange = async (navState) => {
    const { url } = navState;
    console.log("Current URL:", url);

    // Kiểm tra nếu URL chứa "vnpay-return" và đảm bảo rằng callback chỉ được xử lý một lần
    if (
      // Nhớ thay đổi giống server
      url.includes(`${API_URL}/api/VNPay/payment/vnpay-return`) &&
      !isCallbackHandled
    ) {
      setIsCallbackHandled(true);

      try {
        const response = await axios.get(url); // Sử dụng URL đầy đủ để gửi yêu cầu GET
        console.log("Response from server:", response.data);
        if (response.data.code === "00") {
          Alert.alert("Thông báo", "Thanh toán thành công!");
          navigation.navigate("SuccessPaymentScreen");
        } else {
          Alert.alert("Thông báo", "Thanh toán thất bại.");
          navigation.navigate("FailurePaymentScreen");
        }
      } catch (error) {
        console.error("Error fetching payment status:", error);
        Alert.alert(
          "Thông báo",
          "Có lỗi xảy ra khi kiểm tra trạng thái thanh toán."
        );
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: paymentUrl }}
        onNavigationStateChange={handleNavigationStateChange}
        startInLoadingState={true}
        renderLoading={() => (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="36" color="#0000ff" />
          </View>
        )}
      />
    </View>
  );
};

export default PaymentWebView;
