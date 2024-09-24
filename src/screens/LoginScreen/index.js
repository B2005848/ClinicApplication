import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextInput,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { isTokenValid } from "../../stores/auth-token";
import { API_URL } from "@env";
console.log(API_URL);
import styles from "./style";

export default function LoginScreen() {
  // -----------------------------------------------------SCRIPT SETUP---------------------------------
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Load the stored token when the component mounts to add value information when login
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token && isTokenValid(token)) {
        setPhone(await AsyncStorage.getItem("username"));
        setPassword(await AsyncStorage.getItem("password"));
        // token is true, navigate to customerScreen
        navigation.navigate("CustomerScreen");
      } else {
        // Token out of date or not exits
        await AsyncStorage.removeItem("token"); // Delete old token
        await AsyncStorage.removeItem("username"); // Delete old username
        await AsyncStorage.removeItem("password");
        // No token, navigate to loginScreen
        navigation.navigate("LoginScreen");
      }
    };
    checkToken();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        // `${API_URL}/api/patient/account/login`,
        `${API_URL}/api/patient/account/login`,
        {
          username: phone,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );
      if (response.status === 200) {
        const token = response.data.token;
        console.log("Token nhận được từ server:", token);
        if (token && isTokenValid(token)) {
          await AsyncStorage.setItem("token", token);
          // Save username into AsyncStorage
          await AsyncStorage.setItem("username", phone);
          // Save password into AsyncStorage
          await AsyncStorage.setItem("password", password);
          // Save username into params
          navigation.navigate("CustomerScreen", { username: phone });
          console.log(response.data);
          Alert.alert("Đăng nhập thành công");
        } else {
          Alert.alert("Lỗi", "Token không hợp lệ. Vui lòng thử lại.");
        }
      }
    } catch (error) {
      if (error.response) {
        console.error("Đăng nhập không thành công:", error.response.data);
        Alert.alert(
          "Lỗi",
          "Đăng nhập không thành công: " + error.response.data.message
        );
      } else if (error.request) {
        console.error("Không nhận được phản hồi từ server:", error.request);
        Alert.alert(
          "Lỗi",
          "Không thể kết nối đến server. Vui lòng kiểm tra lại kết nối mạng của bạn."
        );
      } else {
        console.error("Lỗi:", error.message);
        Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    }
  };
  // -----------------------------------------------------TEMPLATE---------------------------------------
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 128 : 0}
    >
      <View>
        <Image
          source={require("@assets/CTU_logo.png")}
          style={{ width: 250, height: 250 }}
        />
      </View>
      <TextInput
        style={[styles.textInput, styles.text]}
        placeholder="Nhập số điện thoại của bạn"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={[styles.textInput, styles.text]}
        placeholder="Mật khẩu"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={{ top: 20 }} onPress={handleLogin}>
        <View style={styles.bgrButton}>
          <Text style={styles.titleButton}>ĐĂNG NHẬP</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
