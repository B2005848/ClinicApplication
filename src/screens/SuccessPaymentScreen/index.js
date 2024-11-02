// SuccessScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const SuccessPaymentScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh toán thành công!</Text>
      <Text style={styles.message}>
        Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CustomerScreen")} // Quay lại trang chính hoặc bất kỳ trang nào bạn muốn
      >
        <Text style={styles.buttonText}>Quay lại trang chủ</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0F7FA",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default SuccessPaymentScreen;
