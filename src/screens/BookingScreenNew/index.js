import { View, Text, KeyboardAvoidingView, Platform } from "react-native";
import styles from "./style";

import ListDepartment from "../../components/ListDepartment";
export default function BookingScreenNew() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 128 : 0}
    >
      <View style={styles.menuContent}>
        <Text style={styles.title}>ĐẶT LỊCH - CHƯA TỪNG KHÁM</Text>
        <Text style={styles.titleStep}>
          Vui lòng chọn phòng khám chuyên khoa{" "}
          <Text style={{ color: "red" }}>(*)</Text>
        </Text>
        <View style={styles.listDepartment}>
          <ListDepartment />
        </View>

        {/* List Service */}
        <Text style={styles.titleStep}>
          Vui lòng chọn dịch vụ <Text style={{ color: "red" }}>(*)</Text>
        </Text>
        <View style={styles.listDoctor}></View>

        {/* List Doctor */}
        <Text style={styles.titleStep}>
          Vui lòng chọn bác sĩ <Text style={{ color: "red" }}>(*)</Text>
        </Text>
        <View style={styles.listDoctor}></View>
      </View>
    </KeyboardAvoidingView>
  );
}
