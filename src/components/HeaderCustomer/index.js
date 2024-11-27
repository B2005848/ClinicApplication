import React, { useState, useEffect } from "react";
import { Header, Text, Avatar, Icon } from "react-native-elements";
import axios from "axios"; // Thêm axios để gọi API
import styles from "./style";
import Constants from "expo-constants";

const { API_URL } = Constants.expoConfig.extra;
const HeaderCustomer = ({ patient_id, onMenuPress }) => {
  const [patientInfo, setPatientInfo] = useState(null); // Lưu thông tin bệnh nhân
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(null); // Lỗi nếu có

  // Lấy thông tin bệnh nhân từ API
  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/handle/patient/getinfo/${patient_id}`
        );
        if (response.data.status === 200) {
          setPatientInfo(response.data.dataInfo); // Cập nhật thông tin bệnh nhân
        } else {
          setError("Không thể lấy thông tin bệnh nhân");
        }
      } catch (err) {
        setError("Lỗi kết nối với API");
      } finally {
        setLoading(false);
      }
    };

    fetchPatientInfo();
  }, [patient_id]); // Khi patient_id thay đổi, gọi lại API

  // Nếu dữ liệu đang được tải hoặc có lỗi
  if (loading) {
    return <Text>Đang tải dữ liệu...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <Header
      containerStyle={[
        styles.headerInnerContainer,
        {
          justifyContent: "space-between",
          borderBottomWidth: 0, // Loại bỏ đường viền dưới cùng
          elevation: 0, // Loại bỏ bóng trên Android
          shadowOpacity: 0, // Loại bỏ bóng trên iOS
        },
      ]}
    >
      <Avatar
        rounded
        source={{
          uri: patientInfo
            ? `${API_URL}${patientInfo.image_avt}`
            : `${API_URL}/uploads/avtStaffs/CTU_logo.png`, // Sử dụng URL ảnh từ API
        }}
        onError={() => console.log("Error loading avatar")}
      />
      <Text style={styles.headerText} h4>
        {patient_id ? ` ${patient_id}` : "No ID Available"}
      </Text>
      <Icon
        name="bars"
        type="font-awesome"
        color="#F9FAFB"
        onPress={onMenuPress}
      />
    </Header>
  );
};

export default HeaderCustomer;
