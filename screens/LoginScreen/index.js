import React from "react";
import {
  TextInput,
  KeyboardAvoidingView,
  Platform,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import styles from "./style";
export default function LoginScreen() {
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
      />
      <TextInput
        style={[styles.textInput, styles.text]}
        placeholder="Mật khẩu"
        secureTextEntry={true}
      />

      <TouchableOpacity>
        <View style={styles.bgrButton}>
          <Text style={styles.titleButton}>ĐĂNG NHẬP</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
