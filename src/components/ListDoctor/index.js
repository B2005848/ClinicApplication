import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList, Button, Text } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { handleGetListDoctorBySpecialtyId } from "../../services/handleGetListDoctorBySpecialtyId"; // Import API để lấy danh sách bác sĩ
import styles from "./style";
import Constants from "expo-constants";

const ListDoctorAppointment = ({ specialty_id, onDoctorSelect }) => {
  const { API_URL } = Constants.expoConfig.extra;

  const [doctors, setDoctors] = useState([]); // Lưu danh sách bác sĩ
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Bác sĩ đã chọn
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu ban đầu
  const [error, setError] = useState(false); // Trạng thái khi không có bác sĩ hoặc lỗi API

  // Gọi API để lấy danh sách bác sĩ theo chuyên khoa
  const fetchDoctors = async (specialty_id) => {
    try {
      const result = await handleGetListDoctorBySpecialtyId(specialty_id); // Gọi API
      if (result && result.success && result.data && result.data.length > 0) {
        setDoctors(result.data); // Cập nhật danh sách bác sĩ nếu có dữ liệu
        setError(false); // Không có lỗi
      } else {
        setDoctors([]); // Reset danh sách bác sĩ
        setError(true); // Đặt trạng thái lỗi nếu không có bác sĩ
      }
    } catch (error) {
      console.error("Error fetching doctors by specialty_id:", error);
      setDoctors([]); // Reset danh sách bác sĩ khi có lỗi
      setError(true); // Đặt trạng thái lỗi
    }
    setLoading(false); // Dừng trạng thái loading
  };

  // Lấy dữ liệu khi component mount lần đầu
  useEffect(() => {
    if (specialty_id) {
      // Chỉ gọi API nếu có specialty_id
      setLoading(true);
      fetchDoctors(specialty_id);
    }
  }, [specialty_id]); // Chỉ gọi lại API khi specialty_id thay đổi

  // Xử lý khi người dùng chọn một bác sĩ
  const handleSelectDoctor = (doctorId) => {
    const selected = doctors.find((doc) => doc.doctor_id === doctorId); // Tìm bác sĩ đã chọn
    setSelectedDoctor(selected); // Lưu bác sĩ đã chọn
    onDoctorSelect(selected); // Gọi hàm từ cha để lưu bác sĩ đã chọn
  };

  // Hiển thị loading khi đang tải dữ liệu
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Hiển thị thông báo khi không có bác sĩ hoặc API trả về lỗi
  if (error) {
    return (
      <View style={styles.noDoctorContainer}>
        <Text style={styles.noDoctorText}>
          Không có bác sĩ nào cho chuyên khoa này. Phòng khám sẽ cập nhật sớm
          nhất. Vui lòng quay lại sau.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={
          selectedDoctor
            ? [styles.flatList, { height: 100 }]
            : [styles.flatList, { height: 350 }]
        } // Rút gọn khi chỉ hiển thị một bác sĩ
        data={selectedDoctor ? [selectedDoctor] : doctors} // Hiển thị bác sĩ đã chọn hoặc toàn bộ danh sách
        keyExtractor={(item) => item.doctor_id} // Sử dụng doctor_id làm key
        renderItem={({ item }) => (
          <ListItem
            bottomDivider
            onPress={() => handleSelectDoctor(item.doctor_id)}
          >
            <RadioButton
              value={item.doctor_id}
              status={
                selectedDoctor && selectedDoctor.doctor_id === item.doctor_id
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => handleSelectDoctor(item.doctor_id)}
            />
            <Avatar
              size={100}
              source={{
                uri: `${API_URL}${item.image_avt}`,
              }}
              onError={
                () => console.log("Error loading avatar") // Log hoặc xử lý khi ảnh không load
              }
            />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                Bác sĩ: {item.first_name} {item.last_name}
              </ListItem.Title>
              <ListItem.Subtitle>
                Ca làm việc: {item.shifts.join(", ")}.
              </ListItem.Subtitle>
              <ListItem.Subtitle>
                Chuyên khoa: {item.specialty.join(", ")}.
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
        scrollEnabled={true} // Cho phép cuộn danh sách
        ListFooterComponent={
          selectedDoctor ? (
            <Button
              title="Chọn lại bác sĩ"
              onPress={() => setSelectedDoctor(null)}
            />
          ) : null
        }
      />
    </View>
  );
};

export default ListDoctorAppointment;
