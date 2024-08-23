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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import styles from "./style";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Load the stored username when the component mounts
    const loadUsername = async () => {
      const savedPhone = await AsyncStorage.getItem("username");
      if (savedPhone) {
        setPhone(savedPhone);
      }
    };
    loadUsername();
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.249:3000/api/patient/account/login",
        {
          username: phone,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // Save username into AsyncStorage
        await AsyncStorage.setItem("username", phone);
        // Save username into params
        navigation.navigate("CustomerScreen", { username: phone });
        console.log(response.data);
        Alert.alert("Đăng nhập thành công");
      }
    } catch (error) {
      console.error(
        "Đăng nhập không thành công:",
        error.response ? error.response.data : error.message
      );
      Alert.alert(
        "Lỗi",
        "Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin của bạn."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
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

      <TouchableOpacity onPress={handleLogin}>
        <View style={styles.bgrButton}>
          <Text style={styles.titleButton}>ĐĂNG NHẬP</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
