import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";

const { API_URL } = Constants.expoConfig.extra;
const ResetPasswordScreen = () => {
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/patient/email/send-otp`,
        {
          email: username, // Assume username is email
        }
      );
      console.log(response);
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
    if (!username || !otp || !newPassword) {
      setError("Vui lòng điền email của bạn");
      return;
    }
    try {
      const verifyOtpResponse = await axios.post(
        `${API_URL}/api/patient/email/verify-otp`,
        {
          otp: otp,
          patient_id: username,
        }
      );

      if (verifyOtpResponse.data.status) {
        const changePasswordResponse = await axios.put(
          `${API_URL}/api/patient/account/change-password/${username}`,
          { new_password: newPassword }
        );

        if (changePasswordResponse.data.status) {
          setError("");
          alert("Mật khẩu đã thay đổi thành công!");
        } else {
          setError(
            "Có lỗi trong quá trình đổi mật khẩu. Vui lòng thử lại sau."
          );
        }
      } else {
        setError("OTP không chính xác.");
      }
    } catch (error) {
      setError("Có lỗi trong quá trình đổi mật khẩu. Vui lòng thử lại sau.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Khôi phục tài khoản</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập email khôi phục"
        value={username}
        onChangeText={setUsername}
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
