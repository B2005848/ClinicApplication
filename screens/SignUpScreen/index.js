import { Text, View, Image } from "react-native";
import React from "react";
import styles from "./style";

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 300, height: 300 }}
        source={require("../../assets/HZIP9288.png")}
      ></Image>
      <Text style={styles.demo}>Mai Thị Ngọc Trân</Text>
      <Text>Đáng iu dị tèn</Text>
    </View>
  );
}
