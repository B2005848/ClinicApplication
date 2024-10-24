import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList, Button, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { handleGetlistServiceByDepId } from "../../services/handleServices"; // Import API để lấy danh sách dịch vụ
import styles from "./style";

const ListService = ({ dep_id, services, onServiceSelect, setServices }) => {
  // Lấy dep_id từ props
  const [selectedService, setSelectedService] = useState(null); // Dịch vụ đã chọn
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu ban đầu
  const [loadingMore, setLoadingMore] = useState(false); // Trạng thái khi tải thêm dữ liệu

  // Gọi API để lấy danh sách dịch vụ theo dep_id
  const fetchServices = async (dep_id) => {
    try {
      const result = await handleGetlistServiceByDepId(dep_id); // Gọi API
      if (result && result.success && result.data) {
        setServices(result.data); // Cập nhật danh sách dịch vụ
      } else {
        console.error("Invalid response from API:", result);
      }
    } catch (error) {
      console.error("Error fetching services by department_id:", error);
    }
  };

  // Lấy dữ liệu khi component mount lần đầu
  useEffect(() => {
    const initialFetch = async () => {
      setLoading(true);
      await fetchServices(dep_id); // Gọi API với dep_id
      setLoading(false);
    };
    initialFetch();
  }, [dep_id]); // Chỉ gọi lại API khi dep_id thay đổi

  // Xử lý khi người dùng chọn một dịch vụ
  const handleSelectService = (serviceId) => {
    const selected = services.find((srv) => srv.service_id === serviceId); // Tìm dịch vụ đã chọn
    setSelectedService(selected); // Lưu dịch vụ đã chọn

    // Gọi onServiceSelect với dịch vụ đã chọn và specialty_id
    onServiceSelect({
      ...selected,
      specialty_id: selected.specialty_id, // Thêm specialty_id vào đối tượng
    });
  };

  // Xử lý sự kiện "Chọn lại" để quay lại danh sách đầy đủ
  const handleResetSelection = () => {
    setSelectedService(null); // Xóa trạng thái chọn dịch vụ
  };

  // Hiển thị loading khi đang tải dữ liệu
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={
          selectedService
            ? [styles.flatList, { height: 100 }] // Rút gọn chiều cao khi chỉ hiển thị một dịch vụ
            : [styles.flatList, { height: 350 }] // Chiều cao đầy đủ khi hiển thị toàn bộ danh sách
        }
        data={selectedService ? [selectedService] : services} // Hiển thị dịch vụ đã chọn hoặc toàn bộ danh sách
        keyExtractor={(item) => item.service_id} // Sử dụng service_id làm key
        renderItem={({ item }) => (
          <ListItem
            bottomDivider
            onPress={() => handleSelectService(item.service_id)}
          >
            <RadioButton
              value={item.service_id}
              status={
                selectedService &&
                selectedService.service_id === item.service_id
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => handleSelectService(item.service_id)}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                {item.service_name} - {item.service_fee} VND
              </ListItem.Title>
              <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
        scrollEnabled={true} // Cho phép cuộn danh sách
        ListFooterComponent={
          selectedService ? (
            <Button title="Chọn lại" onPress={handleResetSelection} />
          ) : null
        }
      />
      {loadingMore && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  );
};

export default ListService;
