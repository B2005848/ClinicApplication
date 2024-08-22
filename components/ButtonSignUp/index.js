import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";

export default ButtonSignUp = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
      <View style={styles.backgroundButton}>
        <Text style={[styles.titleButton, styles.text]}>Đăng kí tài khoản</Text>
      </View>
    </TouchableOpacity>
  );
};
