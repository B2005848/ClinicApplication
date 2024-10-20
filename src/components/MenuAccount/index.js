import React from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { Avatar } from "react-native-elements";

import Icon from "react-native-vector-icons/FontAwesome"; // Sử dụng FontAwesome icons
import styles from "./style";

const MenuAccount = ({ full_name, onClose }) => {
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
          <View>
            <TouchableOpacity>
              <Icon name="bell" type="font-awesome" size={25} color="#6246ea" />
            </TouchableOpacity>
          </View>

          <View>
            <Avatar
              size={60}
              rounded
              source={{
                uri: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
              }}
              onError={
                () => console.log("Error loading avatar") // Log hoặc xử lý khi ảnh không load
              }
            />
          </View>

          <View>
            <TouchableOpacity>
              <Icon name="gear" type="font-awesome" size={30} color="#d1d1e9" />
            </TouchableOpacity>
          </View>
        </View>

        {/* full name and tổng chi tiêu  */}
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
              Tổng chi tiêu năm 2024
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#2b2c34",
                marginTop: 5,
              }}
            >
              2.000.000đ
            </Text>
          </View>

          {/* menu item */}
          <View></View>

          {/* booking option */}
          <View
            style={{
              width: "100%",
              top: 70,
              alignItems: "center",
            }}
          >
            <View style={styles.hr}></View>
            <TouchableOpacity>
              <Text style={[styles.text, styles.titlebtnBooking]}>
                ĐẶT LỊCH - TÁI KHÁM
              </Text>
            </TouchableOpacity>
            <View style={styles.hr}></View>
            <TouchableOpacity>
              <Text style={[styles.text, styles.titlebtnBooking]}>
                ĐẶT LỊCH - CHƯA TỪNG KHÁM
              </Text>
            </TouchableOpacity>
            <View style={styles.hr}></View>
          </View>
        </View>

        <View style={styles.menuContent3}>
          <TouchableOpacity style={styles.wapperbtnLogout}>
            <Text style={[styles.textbtnLogout, styles.text]}>ĐĂNG XUẤT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MenuAccount;
