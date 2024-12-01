import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import { TextInput as PaperTextInput } from "react-native-paper";
import Constants from "expo-constants";

const { API_URL } = Constants.expoConfig.extra;
const ChangePasswordScreen = ({ route, navigation }) => {
  const { patient_id } = route.params; // Lấy patient_id từ route params
  useEffect(() => {
    // Gọi API khi component được mount
    console.log(patient_id);
  }, []); // Chỉ gọi một lần khi component load

  // State lưu trữ giá trị các input
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      Alert.alert("Lưu ý", "Vui lòng nhập đầy đủ mật khẩu cũ và mới");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.put(
        `${API_URL}/api/patient/account/change-password-with-old/${patient_id}`,
        {
          old_password: oldPassword,
          new_password: newPassword,
        }
      );

      if (response.status === 200) {
        console.log("Đổi mật khẩu thành công!");
        Alert.alert("Thành công", "Đổi mật khẩu thành công!");
        navigation.goBack(); // Quay lại màn hình
      }
    } catch (error) {
      Alert.alert(
        "Lỗi",
        error.response?.data?.message || "Lỗi server, vui lòng thử lại sau!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đổi mật khẩu</Text>

      <PaperTextInput
        label="Nhập mật khẩu cũ"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
        style={styles.input}
      />

      <PaperTextInput
        label="Nhập mật khẩu mới"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        title={loading ? "Đang thay đổi..." : "LƯU"}
        onPress={handleChangePassword}
        disabled={loading}
      />
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

export default ChangePasswordScreen;
