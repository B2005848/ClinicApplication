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
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { loginService } from "../../services/handleLogin";
import styles from "./style";

export default function LoginScreen() {
  // -----------------------------------------------------SCRIPT SETUP---------------------------------
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!phone || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập số điện thoại và mật khẩu.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await loginService(phone, password);
      if (result.success) {
        console.log(result.message);
        navigation.navigate("CustomerScreen", { phone });
      } else {
        Alert.alert("Lỗi", result.message);
      }
    } catch (error) {
      Alert.alert(
        "Lỗi",
        "Không thể kết nối tới máy chủ, vui lòng thử lại sau."
      );
      console.error("Login error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // -----------------------------------------------------TEMPLATE---------------------------------------
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 128 : 0}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#5486c4" />
      <Image
        source={require("@assets/CTU_logo.png")}
        style={{ width: 250, height: 250 }}
      />
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

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity style={{ top: 20 }} onPress={handleLogin}>
          <View style={styles.bgrButton}>
            <Text style={styles.titleButton}>ĐĂNG NHẬP</Text>
          </View>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
}
