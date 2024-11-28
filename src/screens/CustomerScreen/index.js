import {
  Text,
  TouchableOpacity,
  Alert,
  View,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Image, Icon } from "react-native-elements";
import React, { useEffect, useState } from "react";
import styles from "./style";
import { useNavigation } from "@react-navigation/native";
import { logoutService } from "../../services/handleLogin";
import { getDataInfo } from "../../services/handleGetInfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import HeaderCustomer from "../../components/HeaderCustomer";
import BannerCustomer from "../../components/BannerCustomer";
import MenuAccount from "../../components/MenuAccount";
const CustomerScreen = ({ route }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [isMenuVisiable, setIsMenuVisible] = useState(false); // Trạng thái menu
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const patient_id = await AsyncStorage.getItem("patientId");

      if (patient_id) {
        setUserInfo(patient_id);
        console.log(patient_id);
        const response = await getDataInfo(patient_id);
        console.log(response);
        if (response.success) {
          setUserInfo(response.data);
        } else {
          Alert.alert("Lỗi", response.message);
        }
      }
    };

    fetchData();
  }, [route.params]);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisiable);
  };

  const navigateToChat = () => {
    navigation.navigate("ChatScreen", {
      senderId: userInfo.patient_id,
      receiverId: "Admin",
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <ImageBackground
          resizeMode="cover"
          source={require("@assets/backgroundHome.png")}
          style={styles.image}
        >
          <View style={styles.overlay} />

          {/* kiểm tra menu account có được ấn chưa */}
          {isMenuVisiable && (
            <MenuAccount
              patientId={userInfo.patient_id}
              full_name={
                userInfo
                  ? userInfo.first_name + " " + userInfo.last_name
                  : "Đang tải thông tin..."
              }
              imageAvt={userInfo.image_avt}
              onClose={toggleMenu}
            />
          )}

          <HeaderCustomer
            patient_id={
              userInfo ? userInfo.patient_id : "Đang tải thông tin..."
            }
            onMenuPress={toggleMenu}
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
              "Ấn để bắt đầu đặt lịch hẹn"
            </Text>

            <View style={[styles.itemBookings]}>
              <View>
                <TouchableOpacity
                  style={styles.wapperButtonBooking}
                  onPress={() =>
                    navigation.navigate("BookingNewScreen", {
                      patient_id: userInfo?.patient_id,
                    })
                  }
                >
                  <Text style={[styles.text, styles.itemBookingText]}>
                    ĐẶT LỊCH HẸN
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.hr} />

          <View style={styles.containerMenu}>
            <View style={styles.menu}>
              {/* -----------------NÚT CHUYỂN ĐẾN TRANG HỒ SƠ BỆNH ÁN------------------- */}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() =>
                  navigation.navigate("PatientRecordScreen", {
                    patient_id: userInfo?.patient_id,
                  })
                }
              >
                <Image
                  source={require("@assets/medicalRecord.png")}
                  style={{ width: 100, height: 100 }}
                />
                <Text style={[styles.menuText, styles.text]}>
                  Quá trình điều trị
                </Text>
              </TouchableOpacity>

              {/* ---------------NÚT CHUYỂN ĐẾN TRANG QUẢN LÍ LỊCH HẸN ĐÃ ĐẶT ---------------*/}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() =>
                  navigation.navigate("AppointmentTabScreen", {
                    patientId: userInfo?.patient_id,
                  })
                }
              >
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

              {/* ---------------NÚT CHUYỂN ĐẾN TRANG XEM LỊCH SỬ THANH TOÁN ---------------*/}
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() =>
                  navigation.navigate("PaymentHistoryScreen", {
                    patientId: userInfo?.patient_id,
                  })
                }
              >
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

            <View
              style={[
                {
                  display: "flex",
                  backgroundColor: "#fffffe",
                },
              ]}
            >
              {/* Icon Chat */}
              <TouchableOpacity
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  padding: 10,
                }}
                onPress={navigateToChat}
              >
                <Text style={[styles.chatText, { marginRight: 10 }]}>
                  Hỗ trợ khách hàng
                </Text>
                <FontAwesomeIcon
                  icon={["fas", "comment-dots"]}
                  size={40}
                  color="#00BFFF"
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default CustomerScreen;
