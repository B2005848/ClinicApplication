// FailureScreen.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const FailurePaymentScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thanh toán thất bại</Text>
      <Text style={styles.message}>
        Rất tiếc, giao dịch không thành công. Vui lòng thử lại sau.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CustomerScreen")} // Quay lại trang chính hoặc trang bạn muốn
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
    backgroundColor: "#FFEBEE",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F44336",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#F44336",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default FailurePaymentScreen;
