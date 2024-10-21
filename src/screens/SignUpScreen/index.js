import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Input, Icon } from "react-native-elements";
import React, { useState } from "react";
import styles from "./style";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
export default function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Input
        style={[styles.text]}
        placeholder="Họ và tên đệm"
        // inputContainerStyle={{ borderBottomWidth: 0 }}
        rightIcon={<Text style={[styles.text, styles.noteText]}>(*)</Text>}
      />
      <Input
        style={[styles.text]}
        placeholder="Tên"
        // inputContainerStyle={{ borderBottomWidth: 0 }}
        rightIcon={<Text style={[styles.text, styles.noteText]}>(*)</Text>}
      />
      <Input
        style={[styles.text]}
        placeholder="Ngày sinh của bạn"
        // inputContainerStyle={{ borderBottomWidth: 0 }}
        rightIcon={<Text style={[styles.text, styles.noteText]}>(*)</Text>}
        keyboardType="default"
      />
      <Input
        style={[styles.text]}
        placeholder="Nhập số điện thoại bạn muốn đăng kí"
        // inputContainerStyle={{ borderBottomWidth: 0 }}
        rightIcon={<Text style={[styles.text, styles.noteText]}>(*)</Text>}
        keyboardType="number-pad"
      />
      <Input
        style={[styles.text]}
        placeholder="Nhập email của bạn (nếu có)"
        keyboardType="email-address"

        // inputContainerStyle={{ borderBottomWidth: 0 }}
      />
      <Input
        style={[styles.text]}
        secureTextEntry={!showPassword}
        placeholder="Mật khẩu"
        // inputContainerStyle={{ borderBottomWidth: 0 }}
        rightIcon={
          <Icon
            name={showPassword ? "eye" : "eye-slash"}
            type="font-awesome"
            onPress={() => setShowPassword(!showPassword)} // Thay đổi state khi bấm vào icon
          />
        }
      />
      <Input
        style={[styles.text]}
        secureTextEntry={!showPassword}
        placeholder="Nhập lại mật khẩu"
        // inputContainerStyle={{ borderBottomWidth: 0 }}
      />

      <TouchableOpacity style={styles.bgrButton}>
        <Text style={[styles.text, styles.titleButton]}>ĐĂNG KÍ</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
