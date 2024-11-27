import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Alert, StyleSheet, Text } from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { RadioButton } from "react-native-paper"; // Import RadioButton from react-native-paper
import formatDate from "../../helpers/format-datetime";
const { API_URL } = Constants.expoConfig.extra;

export default function UpdatePatientInfo({ route }) {
  const { patient_id } = route.params; // Lấy patient_id từ route.params

  // State để lưu thông tin của người bệnh
  const [patientInfo, setPatientInfo] = useState({
    first_name: "",
    last_name: "",
    birthday: "",
    citizen_id: "",
    gender: "", // Giá trị mặc định là ""
    phone_number: "",
    major: "",
    email: "",
    address_contact: "",
    health_insurance_id: "",
  });

  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái tải dữ liệu

  // Hàm gọi API lấy thông tin bệnh nhân
  const getPatientInfo = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/handle/patient/getinfo/${patient_id}`
      );
      if (response.data) {
        const data = response.data.dataInfo;
        // Cập nhật thông tin bệnh nhân vào state
        const formattedBirthday = formatDate.formatDateBirth(data.birthday);
        setPatientInfo({
          first_name: data.first_name,
          last_name: data.last_name,
          citizen_id: data.citizen_id,
          gender: data.gender,
          phone_number: data.phone_number,
          major: data.major,
          email: data.email,
          address_contact: data.address_contact,
          health_insurance_id: data.health_insurance_id,
          birthday: formattedBirthday,
        });
        setLoading(false); // Dữ liệu đã được tải xong
      }
    } catch (error) {
      console.error("Error fetching patient info:", error);
      Alert.alert("Lỗi", "Không thể tải thông tin bệnh nhân.");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Gọi API khi component được mount
    getPatientInfo();
  }, []); // Chỉ gọi một lần khi component load

  // Hàm cập nhật thông tin người bệnh
  const handleChange = (field, value) => {
    setPatientInfo({ ...patientInfo, [field]: value });
  };

  const updatePatientInfo = async () => {
    // Kiểm tra xem tất cả các trường đều có dữ liệu
    const {
      first_name,
      last_name,
      birthday,
      citizen_id,
      gender,
      phone_number,
      major,
      email,
      address_contact,
      health_insurance_id,
    } = patientInfo;
    if (
      !first_name ||
      !last_name ||
      !birthday ||
      !citizen_id ||
      !gender ||
      !phone_number ||
      !major ||
      !email ||
      !address_contact ||
      !health_insurance_id
    ) {
      Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      // Gửi API yêu cầu cập nhật thông tin
      const response = await axios.patch(
        `${API_URL}/api/handle/patient/information/update/${patient_id}`,
        patientInfo
      );

      // Kiểm tra kết quả trả về từ API
      if (response.status === 200) {
        Alert.alert("Thành công", "Cập nhật thông tin thành công.");
      } else {
        Alert.alert("Lỗi", "Cập nhật thông tin không thành công.");
      }
    } catch (error) {
      console.error("Error updating patient info:", error);
      Alert.alert("Lỗi", "Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Đang tải thông tin bệnh nhân...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cập nhật thông tin cá nhân</Text>

      <TextInput
        style={styles.input}
        placeholder="Họ"
        value={patientInfo.first_name}
        onChangeText={(value) => handleChange("first_name", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tên"
        value={patientInfo.last_name}
        onChangeText={(value) => handleChange("last_name", value)}
      />

      {/* Format ngày sinh sử dụng hàm formatDateBirth */}
      <TextInput
        style={styles.input}
        placeholder="Ngày sinh (YYYY-MM-DD)"
        value={patientInfo.birthday} // Sử dụng formatDate.formatDateBirth để format ngày sinh
        onChangeText={(value) => handleChange("birthday", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="CMND/CCCD"
        value={patientInfo.citizen_id}
        onChangeText={(value) => handleChange("citizen_id", value)}
      />

      {/* Giới tính */}
      <Text style={styles.inputLabel}>Giới tính</Text>
      <RadioButton.Group
        onValueChange={(value) => handleChange("gender", value)}
        value={patientInfo.gender}
      >
        <View style={styles.radioButtonContainer}>
          <View style={styles.radioButtonOption}>
            <Text>Nam</Text>
            <RadioButton value="1" />
          </View>
          <View style={styles.radioButtonOption}>
            <Text>Nữ</Text>
            <RadioButton value="0" />
          </View>
        </View>
      </RadioButton.Group>

      <TextInput
        style={styles.input}
        placeholder="Số điện thoại"
        value={patientInfo.phone_number}
        onChangeText={(value) => handleChange("phone_number", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Ngành học"
        value={patientInfo.major}
        onChangeText={(value) => handleChange("major", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={patientInfo.email}
        onChangeText={(value) => handleChange("email", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ liên hệ"
        value={patientInfo.address_contact}
        onChangeText={(value) => handleChange("address_contact", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Số bảo hiểm y tế"
        value={patientInfo.health_insurance_id}
        onChangeText={(value) => handleChange("health_insurance_id", value)}
      />

      <Button title="Cập nhật thông tin" onPress={updatePatientInfo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    borderRadius: 5,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  radioButtonOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 20,
  },
});
