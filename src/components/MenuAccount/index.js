import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "react-native-elements";
import { logoutService } from "../../services/handleLogin";
import Icon from "react-native-vector-icons/FontAwesome"; // Sử dụng FontAwesome icons
import styles from "./style";
import Constants from "expo-constants";
import axios from "axios"; // Thêm axios để gọi API
import { formatCurrency } from "../../helpers/currencyFormatter";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
const { API_URL } = Constants.expoConfig.extra;

const MenuAccount = ({ patientId, full_name, imageAvt, onClose }) => {
  const navigation = useNavigation();
  const [totalRevenue, setTotalRevenue] = useState(null); // State lưu trữ tổng chi tiêu
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải dữ liệu
  const [error, setError] = useState(null); // State để theo dõi lỗi nếu có
  const currentYear = new Date().getFullYear(); // Lấy năm hiện tại

  // Hàm logout
  const handleLogout = async () => {
    const result = await logoutService();
    if (result.success) {
      navigation.navigate("HomeScreen");
    }
  };

  // Fetch tổng chi tiêu năm hiện tại từ API
  useEffect(() => {
    const fetchTotalRevenue = async () => {
      try {
        // Gọi API để lấy tổng chi tiêu của bệnh nhân cho năm hiện tại
        const { data } = await axios.get(
          `${API_URL}/api/statistics/revenue/total-revenue/${patientId}`,
          {
            params: { year: currentYear }, // Truyền year là năm hiện tại
          }
        );
        if (data.status) {
          setTotalRevenue(data.total_revenue); // Cập nhật totalRevenue với dữ liệu trả về
        } else {
          setError(data.message); // Xử lý lỗi nếu không có dữ liệu
        }
      } catch (err) {
        setError("Bạn không có khoản chi nào trong năm nay");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalRevenue();
  }, [patientId]);

  return (
    <View style={styles.menuContainer}>
      <View style={styles.headerMenu}>
        <TouchableOpacity onPress={onClose}>
          <Text style={[{ color: "#e45858", fontSize: 20 }, styles.text]}>
            Đóng
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuContent}>
        <View style={styles.menuContent1}>
          {/* ĐỔI MẬT KHẨU */}
          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ChangePasswordScreen", {
                  patient_id: patientId,
                })
              }
            >
              <FontAwesomeIcon
                icon="fa-solid fa-key"
                style={{ color: "#FFD43B" }}
              />
            </TouchableOpacity>
          </View>

          <View>
            <Avatar
              onPress={() =>
                navigation.navigate("ChageAvatar", {
                  patient_id: patientId,
                })
              }
              size={60}
              rounded
              source={{
                uri: `${API_URL}${imageAvt}`,
              }}
              onError={() => console.log("Error loading avatar")}
            />
          </View>

          <View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UpdateInfo", {
                  patient_id: patientId,
                })
              }
            >
              <Icon name="gear" type="font-awesome" size={30} color="#d1d1e9" />
            </TouchableOpacity>
          </View>
        </View>
        {/* full name and tổng chi tiêu */}
        <View style={styles.menuContent2}>
          <View>
            <Text
              style={[
                {
                  textAlign: "center",
                  top: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 25,
                  color: "#2b2c34",
                  fontWeight: "bold",
                },
                styles.text,
              ]}
            >
              {full_name ? `${full_name}` : "Đang tải thông tin"}
            </Text>
          </View>

          <View style={{ width: "100%", top: 50, marginLeft: 5 }}>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 15,
                  color: "#2b2c34",
                },
              ]}
            >
              Tổng chi tiêu năm {currentYear}
            </Text>

            <Text
              style={{
                fontSize: 12,
                color: "#2b2c34",
                marginTop: 5,
              }}
            >
              {loading
                ? "Đang tải..."
                : totalRevenue
                  ? `${formatCurrency(totalRevenue)}`
                  : error || "Chưa có dữ liệu"}
            </Text>
          </View>

          {/* menu item */}
          <View></View>

          {/* booking option */}
          <View style={{ width: "100%", top: 70, alignItems: "center" }}>
            <View style={styles.hr}></View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("BookingNewScreen", {
                  patient_id: patientId,
                })
              }
            >
              <Text style={[styles.text, styles.titlebtnBooking]}>
                ĐẶT LỊCH HẸN
              </Text>
            </TouchableOpacity>
            <View style={styles.hr}></View>
          </View>
        </View>

        {/* ĐĂNG XUẤT */}
        <View style={styles.menuContent3}>
          <TouchableOpacity
            style={styles.wapperbtnLogout}
            onPress={handleLogout}
          >
            <Text style={[styles.textbtnLogout, styles.text]}>ĐĂNG XUẤT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MenuAccount;
