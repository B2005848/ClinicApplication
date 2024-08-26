// ---------------------------------------------------------IMPORT LIBARY NECCESSARY----------------------------
import { Text, View, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
//
export default function CustomerScreen({ route }) {
  // ------------------------------------------------------SCRIPT SETUP----------------------------------------------
  const [username, setUsername] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    if (route.params && route.params.username) {
      setUsername(route.params.username);
    }
  }, [route.params]);

  // Handle  "Log Out"
  const handleLogout = async () => {
    try {
      // Delate token and username, password get out AsyncStorage
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("username");
      await AsyncStorage.removeItem("password");
      Alert.alert("Đã đăng xuất", "Bạn đã đăng xuất thành công.");
      navigation.navigate("LoginScreen"); // Navigate to LoginScreen
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      Alert.alert("Lỗi", "Có lỗi xảy ra khi đăng xuất. Vui lòng thử lại.");
    }
  };
  // ---------------------------------------------TEMPLATE------------------------------------------------
  return (
    <View style={styles.container}>
      <Text style={[styles.text]}>Customer Screen</Text>
      <Text style={[styles.title, styles.text]}>Hello, {username}</Text>
      <Text style={[styles.title, styles.text]}>Home Page CUSTOMER</Text>
      <Text style={[styles.title, styles.text]}>
        Contact me: 0962092609, Thanh Nam
      </Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}
