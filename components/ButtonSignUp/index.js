import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./style";

export default ButtonSignUp = () => {
  return (
    <TouchableOpacity>
      <View style={styles.backgroundButton}>
        <Text style={[styles.titleButton, styles.text]}>Đăng kí tài khoản</Text>
      </View>
    </TouchableOpacity>
  );
};
