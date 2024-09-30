// ---------------------------------------------------------IMPORT LIBRARY NECESSARY----------------------------
import { Text, View, TouchableOpacity, Alert, StatusBar } from "react-native";
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
        const parsedInfo = JSON.parse(storedUserInfo);
        navigation.setOptions({
          header: () => (
            <HeaderCustomer
              first_name={parsedInfo.first_name}
              last_name={parsedInfo.last_name}
            />
          ),
        });
      } else if (route.params && route.params.phone) {
        const response = await getDataInfo(route.params.phone);
        if (response.success) {
          setUserInfo(response.data);
          navigation.setOptions({
            header: () => (
              <HeaderCustomer
                first_name={response.data.first_name}
                last_name={response.data.last_name}
              />
            ),
          });
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
      <StatusBar barStyle="dark-content" />
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
    </View>
  );
}
