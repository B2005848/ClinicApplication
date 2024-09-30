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
import { useNavigation } from "@react-navigation/native";
import { loginService } from "../../services/handleLogin";
import styles from "./style";

export default function LoginScreen() {
  // -----------------------------------------------------SCRIPT SETUP---------------------------------
  const navigation = useNavigation();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    const result = await loginService(phone, password);
    if (result.success) {
      navigation.navigate("CustomerScreen", { phone });
    } else {
      Alert.alert("Lỗi", result.message);
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
