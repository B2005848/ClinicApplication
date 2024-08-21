import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "./style";

export default ButtonLogin = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      // onPress to name of Stack ex. "LoginSreen"
      onPress={() => navigation.navigate("LoginScreen")}
    >
      <View style={styles.backgroundButton}>
        <Text style={[styles.text, styles.titleButton]}>Đăng nhập</Text>
      </View>
    </TouchableOpacity>
  );
};
