import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./style";

export default function CustomerScreen({ route }) {
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (route.params && route.params.username) {
      setUsername(route.params.username);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Screen</Text>
      <Text>Hello, {username}</Text>
      <Text style={styles.text}>Home Page CUSTOMER</Text>
    </View>
  );
}
