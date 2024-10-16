// ---------------------------------------------------------IMPORT LIBRARY NECESSARY----------------------------
import {
  Text,
  TouchableOpacity,
  Alert,
  View,
  StatusBar,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { logoutService } from "../../services/handleLogin";
import { getDataInfo } from "../../services/handleGetInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HeaderCustomer from "../../components/HeaderCustomer/index"; // Import HeaderCustomer component

export default function CustomerScreen({ route }) {
  // ------------------------------------------------------SCRIPT SETUP----------------------------------------------
  const [userInfo, setUserInfo] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const storedUserInfo = await AsyncStorage.getItem("userInfo");
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
      } else if (route.params && route.params.phone) {
        const response = await getDataInfo(route.params.phone);
        if (response.success) {
          setUserInfo(response.data);
        } else {
          Alert.alert("Lỗi", response.message);
        }
      }
    };

    fetchData();
  }, [route.params]);

  const handleLogout = async () => {
    const result = await logoutService();
    if (result.success) {
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }], // Chuyển đến màn hình đăng nhập
      });
    }
  };

  // ---------------------------------------------TEMPLATE------------------------------------------------
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode="cover"
        source={require("@assets/StartImage.png")}
        style={styles.image}
      >
        <View style={styles.overlay} />
        <HeaderCustomer patient_id={userInfo ? userInfo.patient_id : null} />
        <StatusBar barStyle="default" />
        <Text style={[styles.text]}>Customer Screen</Text>
        {userInfo ? ( // Kiểm tra xem userInfo đã có dữ liệu hay chưa
          <>
            <Text style={[styles.title, styles.text]}>
              Hello, {userInfo.first_name} {userInfo.last_name}
            </Text>
            <Text style={[styles.title, styles.text]}>
              Phone: {userInfo.phone_number}
            </Text>
            <Text style={[styles.title, styles.text]}>
              Email: {userInfo.email}
            </Text>
            <Text style={[styles.title, styles.text]}>
              Major: {userInfo.major}
            </Text>
            <Text style={[styles.title, styles.text]}>
              Address: {userInfo.address_contact}
            </Text>
          </>
        ) : (
          <Text style={styles.title}>Đang tải thông tin...</Text>
        )}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
