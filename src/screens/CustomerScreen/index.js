// ---------------------------------------------------------IMPORT LIBRARY NECESSARY----------------------------
import {
  Text,
  TouchableOpacity,
  Alert,
  View,
  StatusBar,
  ImageBackground,
} from "react-native";
import { Image } from "react-native-elements";
import React, { useEffect, useState } from "react";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { logoutService } from "../../services/handleLogin";
import { getDataInfo } from "../../services/handleGetInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

import HeaderCustomer from "../../components/HeaderCustomer/index"; // Import HeaderCustomer component
import BannerCustomer from "../../components/BannerCustomer";
const CustomerScreen = ({ route }) => {
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
      <StatusBar barStyle="default" />
      <ImageBackground
        resizeMode="cover"
        source={require("@assets/backgroundHome.png")}
        style={styles.image}
      >
        <View style={styles.overlay} />
        <HeaderCustomer
          patient_id={userInfo ? userInfo.patient_id : "Đang tải thông tin..."}
        />

        <BannerCustomer />

        <View>
          <Text style={[styles.text, styles.title]}>
            <Image
              source={require("@assets/icons/iconCanlendar.png")}
              style={styles.icon}
            />
            ĐẶT LỊCH KHÁM
          </Text>

          <Text style={[styles.text, styles.note]}>
            "Vui lòng chọn cách thức đặt lịch khám bệnh"
          </Text>

          <View style={[styles.itemBookings]}>
            <View>
              <TouchableOpacity style={styles.wapperButtonBooking}>
                <Text style={[styles.text, styles.itemBookingText]}>
                  TÁI KHÁM
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity style={styles.wapperButtonBooking}>
                <Text style={[styles.text, styles.itemBookingText]}>
                  CHƯA TỪNG KHÁM
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.hr} />

        <View style={styles.containerMenu}>
          <View style={styles.menu}>
            <TouchableOpacity style={styles.menuItem}>
              <Image
                source={require("@assets/medicalRecord.png")}
                style={{ width: 100, height: 100 }}
              />
              <Text style={[styles.menuText, styles.text]}>Hồ sơ bệnh án</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Image
                source={require("@assets/booking.png")}
                style={{ width: 100, height: 100 }}
              />
              <Text style={[styles.menuText, styles.text]}>
                Quản lí lịch hẹn
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Image
                source={require("@assets/tutorial.png")}
                style={{ width: 100, height: 100 }}
              />
              <Text style={[styles.menuText, styles.text]}>
                Hướng dẫn đặt lịch
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Image
                source={require("@assets/paymentHistory.png")}
                style={{ width: 100, height: 100 }}
              />
              <Text style={[styles.menuText, styles.text]}>
                Lịch sử thanh toán
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Image
                source={require("@assets/news.png")}
                style={{ width: 100, height: 100 }}
              />
              <Text style={[styles.menuText, styles.text]}>Tin tức</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Image
                source={require("@assets/aboutUs.gif")}
                style={{ width: 100, height: 100 }}
              />
              <Text style={[styles.menuText, styles.text]}>Về chúng tôi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};
export default CustomerScreen;
