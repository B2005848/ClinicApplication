import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

const { API_URL } = Constants.expoConfig.extra;
const ResetPasswordScreen = () => {
  const [email, setemail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/patient/email/send-otp`,
        {
          email: email, // Assume email is email
        }
      );
      if (response.status === 200) {
        setOtpSent(true);
        setError("");
      } else {
        setError("Lỗi gửi OTP. Vui lòng thử lại sau");
        console.log(response);
      }
    } catch (error) {
      console.log(response);
      setError(
        "Có lỗi xảy ra trong quá trình gửi OTP, vui lòng kiểm tra email"
      );
    }
  };

  const handleVerifyOtpAndChangePassword = async () => {
    if (!email || !otp || !newPassword) {
      setError("Vui lòng điền thông tin đầy đủ của bạn");
      return;
    }
    try {
      const verifyOtpResponse = await axios.post(
        `${API_URL}/api/patient/email/verify-otp`,
        {
          email: email,
          otp: otp,
        }
      );

      if (verifyOtpResponse.status === 200) {
        const changePasswordResponse = await axios.put(
          `${API_URL}/api/patient/account/change-password/${email}`,
          { new_password: newPassword }
        );

        if (changePasswordResponse.status === 200) {
          setError("");
          Alert.alert("Thành công", "Đổi mật khẩu thành công!");
          navigation.navigate("LoginScreen");
        } else {
          setError(
            "Có lỗi trong quá trình đổi mật khẩu. Vui lòng thử lại sau."
          );
          console.log("LỖI1", changePasswordResponse);
        }
      } else {
        setError("OTP không chính xác.");
      }
    } catch (error) {
      setError("Có lỗi trong quá trình đổi mật khẩu. Vui lòng thử lại sau.");
      console.log("LỖI2", changePasswordResponse);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 128 : 0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1 }}>
        <View style={styles.container}>
          <Text style={styles.header}>Khôi phục tài khoản</Text>

          <TextInput
            style={styles.input}
            placeholder="Nhập email khôi phục"
            value={email}
            onChangeText={setemail}
          />

          {otpSent && (
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              value={otp}
              onChangeText={setOtp}
            />
          )}

          <TouchableOpacity onPress={handleSendOtp} style={styles.button}>
            <Text style={styles.buttonText}>
              {otpSent ? "Gửi lại OTP" : "Gửi mã OTP"}
            </Text>
          </TouchableOpacity>

          {otpSent && (
            <TextInput
              style={styles.input}
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
          )}

          <TouchableOpacity
            onPress={handleVerifyOtpAndChangePassword}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    textAlign: "center",
  },
});

export default ResetPasswordScreen;
