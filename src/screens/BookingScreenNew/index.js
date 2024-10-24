import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Button,
} from "react-native";
import styles from "./style";
import ListDepartment from "../../components/ListDepartment";
import ListService from "../../components/ListServices"; // Import ListService

export default function BookingScreenNew() {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null); // Khởi tạo state cho department_id đã chọn
  const [selectedService, setSelectedService] = useState(null); // Khởi tạo state cho dịch vụ đã chọn
  const [services, setServices] = useState([]); // Khởi tạo state cho danh sách dịch vụ
  const [resetDepartments, setResetDepartments] = useState(false);

  // Hàm xử lý khi chọn phòng ban từ ListDepartment
  const handleDepartmentSelect = (departmentId) => {
    setSelectedDepartmentId(departmentId); // Cập nhật ID của phòng ban đã chọn
    setSelectedService(null); // Reset lại dịch vụ đã chọn
    setServices([]); // Reset danh sách dịch vụ thành rỗng khi chọn lại department
    setResetDepartments(false); // Dừng việc reset danh sách phòng ban sau khi chọn
  };

  // Hàm xử lý khi người dùng nhấn "Chọn lại" ở bước department (reset tất cả)
  const handleResetDepartmentSelection = () => {
    setSelectedDepartmentId(null); // Reset phòng ban đã chọn
    setSelectedService(null); // Reset dịch vụ đã chọn
    setServices([]); // Xóa danh sách dịch vụ
    setResetDepartments(true); // Bật trạng thái reset phòng ban
  };

  // Hàm xử lý khi người dùng nhấn "Chọn lại dịch vụ"
  const handleResetServiceSelection = () => {
    setSelectedService(null); // Reset dịch vụ đã chọn
  };
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 128 : 0}
    >
      <View style={styles.menuContent}>
        <Text style={styles.title}>ĐẶT LỊCH - CHƯA TỪNG KHÁM</Text>

        {/*----------------------------------------------------------------------------- Chọn phòng khám */}
        <Text style={styles.titleStep}>
          Vui lòng chọn phòng khám chuyên khoa{" "}
          <Text style={{ color: "red" }}>(*)</Text>
        </Text>
        <View style={styles.listDepartment}>
          <ListDepartment
            onDepartmentSelect={handleDepartmentSelect}
            resetDepartments={resetDepartments} // Truyền trạng thái reset vào ListDepartment
          />
        </View>

        {/* Nút chọn lại phòng ban */}
        {selectedDepartmentId && (
          <Button
            title="Chọn lại phòng khám"
            onPress={handleResetDepartmentSelection}
          />
        )}

        {/*------------------------------------------------------------------------- Chọn dịch vụ */}
        <Text style={styles.titleStep}>
          Vui lòng chọn dịch vụ <Text style={{ color: "red" }}>(*)</Text>
        </Text>
        <View style={styles.listService}>
          {selectedDepartmentId && (
            <ListService
              dep_id={selectedDepartmentId}
              services={services} // Truyền danh sách dịch vụ vào ListService
              onServiceSelect={setSelectedService} // Hàm để chọn dịch vụ
              setServices={setServices} // Truyền hàm để cập nhật danh sách dịch vụ
            />
          )}
        </View>

        {/* --------------------------------------------------------------------------Chọn bác sĩ */}
        <Text style={styles.titleStep}>
          Vui lòng chọn bác sĩ <Text style={{ color: "red" }}>(*)</Text>
        </Text>
        <View style={styles.listDoctor}></View>
      </View>
    </KeyboardAvoidingView>
  );
}
