import { Text, View } from "react-native";
import React from "react";
import styles from "./style";

export default function CustomerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Screen</Text>
      <Text>Hello ....</Text>
      <Text style={styles.text}>Home Page CUSTOMER</Text>
    </View>
  );
}
