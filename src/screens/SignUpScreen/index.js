import { Text, View, Image } from "react-native";
import { Input, Icon } from "react-native-elements";
import React, { useState } from "react";
import styles from "./style";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
export default function SignUpScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <Input
        style={[styles.text, styles.textInput]}
        placeholder="Họ"
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />
      <Input
        style={[styles.text, styles.textInput]}
        placeholder="Tên"
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />
      <Input
        style={[styles.text, styles.textInput]}
        placeholder="Nhập số điện thoại bạn muốn đăng kí"
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />
      <Input
        style={[styles.text, styles.textInput]}
        placeholder="Nhập email của bạn (nếu có)"
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />
      <Input
        style={[styles.text, styles.textInput]}
        secureTextEntry={!showPassword}
        placeholder="Mật khẩu"
        inputContainerStyle={{ borderBottomWidth: 0 }}
        rightIcon={
          <Icon
            name={showPassword ? "eye" : "eye-slash"}
            type="font-awesome"
            onPress={() => setShowPassword(!showPassword)} // Thay đổi state khi bấm vào icon
          />
        }
      />
      <Input
        style={[styles.text, styles.textInput]}
        secureTextEntry={true}
        placeholder="Nhập lại mật khẩu"
        inputContainerStyle={{ borderBottomWidth: 0 }}
      />
    </View>
  );
}
