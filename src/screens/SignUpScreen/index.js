import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
// import DateTimePicker from "react-native-ui-datepicker";
// import dayjs from "dayjs";
import { Input, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

import React, { useState } from "react";
import styles from "./style";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { signUpService } from "../../services/handleSignUp";
export default function SignUpScreen() {
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (!first_name) {
      Alert.alert("Vui lòng nhập họ và tên đệm");
      return;
    }
    if (!last_name) {
      Alert.alert("Vui lòng nhập tên của bạn");
      return;
    }
    if (!birthday) {
      Alert.alert("Vui lòng nhập ngày sinh của bạn");
      return;
    }
    if (!phone) {
      Alert.alert("Vui lòng nhập số điện thoại đăng kí của bạn");
      return;
    }
    if (!password) {
      Alert.alert("Vui lòng nhập mật khẩu đăng kí");
      return;
    }
    if (!confirmPassword) {
      Alert.alert("Vui lòng nhập lại mật khẩu đăng kí");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Nhập lại mật khẩu không chính xác");
    }
    try {
      const result = await signUpService(
        phone,
        password,
        first_name,
        last_name,
        birthday,
        email
      );
      if (result.success) {
        console.log(result.message);
        Alert.alert("Đăng kí tài khoản thành công", result.data);
        navigation.navigate("LoginScreen");
      }
    } catch (error) {
      Alert.alert(
        "Lỗi",
        "Không thể kết nối tới máy chủ, vui lòng thử lại sau."
      );
      console.error("Login error: ", error);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 128 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Input
            onChangeText={setFirstName}
            style={[styles.text]}
            placeholder="Họ và tên đệm"
            // inputContainerStyle={{ borderBottomWidth: 0 }}
            rightIcon={<Text style={[styles.text, styles.noteText]}>(*)</Text>}
          />
          <Input
            onChangeText={setLastName}
            style={[styles.text]}
            placeholder="Tên"
            // inputContainerStyle={{ borderBottomWidth: 0 }}
            rightIcon={<Text style={[styles.text, styles.noteText]}>(*)</Text>}
          />
          {/* <DateTimePicker
        mode="single"
        date={date}
        onChange={(params) => setDate(params.date)}
      /> */}
          <Input
            onChangeText={setBirthday}
            style={[styles.text]}
            placeholder="Ngày sinh của bạn (ví dụ: 18/12/2002)"
            // inputContainerStyle={{ borderBottomWidth: 0 }}
            rightIcon={<Text style={[styles.text, styles.noteText]}>(*)</Text>}
            keyboardType="default"
          />
          <Input
            onChangeText={setPhone}
            style={[styles.text]}
            placeholder="Nhập số điện thoại bạn muốn đăng kí"
            // inputContainerStyle={{ borderBottomWidth: 0 }}
            rightIcon={<Text style={[styles.text, styles.noteText]}>(*)</Text>}
            keyboardType="number-pad"
          />
          <Input
            onChangeText={setEmail}
            style={[styles.text]}
            placeholder="Nhập email của bạn (nếu có)"
            keyboardType="email-address"

            // inputContainerStyle={{ borderBottomWidth: 0 }}
          />
          <Input
            onChangeText={setPassword}
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
            onChangeText={setConfirmPassword}
            style={[styles.text]}
            secureTextEntry={!showPassword}
            placeholder="Nhập lại mật khẩu"
            // inputContainerStyle={{ borderBottomWidth: 0 }}
          />
          <TouchableOpacity style={styles.bgrButton} onPress={handleSignUp}>
            <Text style={[styles.text, styles.titleButton]}>ĐĂNG KÍ</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
