import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { TextInput as PaperTextInput } from "react-native-paper";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [patientId, setPatientId] = useState(""); // Thêm trường nhập mã bệnh nhân
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Quản lý bước hiện tại (1: Gửi OTP, 2: Xác thực OTP, 3: Đổi mật khẩu)

  // Bước 1: Gửi OTP qua Email
  const handleSendOTP = async () => {
    if (!email || !patientId) {
      Alert.alert("Error", "Email and Patient ID are required");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/patient/email/send-otp",
        {
          email: email,
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "OTP has been sent to your email");
        setStep(2); // Chuyển sang bước 2: Xác thực OTP
      }
    } catch (error) {
      Alert.alert("Error", "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Bước 2: Xác thực OTP
  const handleVerifyOTP = async () => {
    if (!otp) {
      Alert.alert("Error", "OTP is required");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/patient/email/verify-otp",
        {
          email: email,
          otp: otp,
        }
      );

      if (response.data.status === true) {
        Alert.alert("Success", "OTP verified successfully");
        setStep(3); // Chuyển sang bước 3: Đổi mật khẩu
      } else {
        Alert.alert("Error", "Invalid OTP");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Bước 3: Đổi mật khẩu
  const handleChangePassword = async () => {
    if (!newPassword) {
      Alert.alert("Error", "New password is required");
      return;
    }

    setLoading(true);

    try {
      const patientId = "0981899709"; // Sửa lại theo thực tế

      const response = await axios.put(
        `http://localhost:3000/api/patient/account/change-password-with-old/${patientId}`,
        {
          old_password: "your-old-password", // Mật khẩu cũ
          new_password: newPassword,
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Password changed successfully");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Bước 4: Gửi lại OTP
  const handleResendOTP = async () => {
    if (!email || !patientId) {
      Alert.alert("Error", "Email and Patient ID are required");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/patient/email/send-otp",
        {
          email: email,
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "OTP has been resent to your email");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      {step === 1 && (
        <>
          <PaperTextInput
            label="Patient ID"
            value={patientId}
            onChangeText={setPatientId}
            style={styles.input}
            keyboardType="numeric"
          />
          <PaperTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          <Button
            title={loading ? "Sending..." : "Send OTP"}
            onPress={handleSendOTP}
            disabled={loading}
          />
        </>
      )}

      {step === 2 && (
        <>
          <PaperTextInput
            label="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            style={styles.input}
            keyboardType="numeric"
          />
          <Button
            title={loading ? "Verifying..." : "Verify OTP"}
            onPress={handleVerifyOTP}
            disabled={loading}
          />
          <Button
            title={loading ? "Resending..." : "Resend OTP"}
            onPress={handleResendOTP}
            disabled={loading}
          />
        </>
      )}

      {step === 3 && (
        <>
          <PaperTextInput
            label="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            style={styles.input}
          />
          <Button
            title={loading ? "Changing..." : "Change Password"}
            onPress={handleChangePassword}
            disabled={loading}
          />
        </>
      )}
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
  },
});

export default ForgotPasswordScreen;
