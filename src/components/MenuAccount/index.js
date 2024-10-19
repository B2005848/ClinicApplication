import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Sử dụng FontAwesome icons
import styles from "./style";

const MenuAccount = ({ onClose }) => {
  return (
    <View style={styles.menuContainer}>
      <View style={styles.headerMenu}>
        <TouchableOpacity onPress={onClose}>
          <Icon name="times" size={24} color="white" />
          <Text style={{ color: "black" }}>Đóng</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.menuContent}>
        <Text style={{ color: "black" }}>Thông báo</Text>
        <Text style={{ color: "black" }}>Cài đặt tài khoản</Text>
        <Text style={{ color: "black" }}>Đăng xuất</Text>
      </View>
    </View>
  );
};

export default MenuAccount;
