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
      <Text style={[styles.text]}>Customer Screen</Text>
      <Text style={[styles.title, styles.text]}>Hello, {username}</Text>
      <Text style={[styles.title, styles.text]}>Home Page CUSTOMER</Text>
      <Text style={[styles.title, styles.text]}>
        Contact me: 0962092609, Thanh Nam
      </Text>
    </View>
  );
}
