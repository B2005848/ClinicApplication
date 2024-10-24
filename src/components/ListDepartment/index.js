import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, FlatList, Button } from "react-native";
import { ListItem } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { handleGetlistDepartments } from "../../services/handleDepartments";
import styles from "./style";

const ListDepartment = () => {
  const [departments, setDepartments] = useState([]); // Lưu danh sách đầy đủ phòng ban
  const [displayDepartments, setDisplayDepartments] = useState([]); // Danh sách hiển thị
  const [selectedDepartment, setSelectedDepartment] = useState(null); // Phòng ban đã chọn
  const [page, setPage] = useState(1); // Trang hiện tại của API
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu ban đầu
  const [loadingMore, setLoadingMore] = useState(false); // Trạng thái khi tải thêm dữ liệu
  const [collapsed, setCollapsed] = useState(false); // Trạng thái thu gọn

  // Gọi API để lấy danh sách phòng ban
  const fetchDepartments = async (page) => {
    try {
      const result = await handleGetlistDepartments(page); // Gọi API với tham số page
      if (result && result.success && result.data) {
        const { totalPages, listDepartments } = result.data;
        setDepartments((prevDepartments) => [
          ...prevDepartments,
          ...listDepartments, // Gộp dữ liệu từ trang mới với dữ liệu hiện có
        ]);
        setTotalPages(totalPages || 1); // Cập nhật tổng số trang
        setDisplayDepartments((prevDisplay) => [
          ...prevDisplay,
          ...listDepartments, // Cập nhật danh sách hiển thị
        ]);
      } else {
        console.error("Invalid response from API:", result);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  // Lấy dữ liệu khi component mount lần đầu
  useEffect(() => {
    const initialFetch = async () => {
      setLoading(true);
      await fetchDepartments(1); // Gọi API lần đầu với page = 1
      setLoading(false);
    };
    initialFetch();
  }, []);

  // Xử lý sự kiện "Xem thêm" để lấy trang tiếp theo
  const handleLoadMore = async () => {
    if (page < totalPages && !loadingMore) {
      setLoadingMore(true);
      const nextPage = page + 1; // Tăng page lên 1 để lấy trang tiếp theo
      await fetchDepartments(nextPage); // Gọi API với trang tiếp theo
      setPage(nextPage); // Cập nhật page
      setLoadingMore(false);
    }
  };

  // Xử lý sự kiện "Thu gọn" để quay lại hiển thị 10 mục đầu tiên
  const handleCollapse = () => {
    setCollapsed(true); // Đặt trạng thái thu gọn
    setDisplayDepartments(departments.slice(0, 10)); // Hiển thị lại 10 phòng ban đầu
    setPage(1); // Reset lại page về 1 khi thu gọn
  };

  // Xử lý khi người dùng chọn một phòng ban
  const handleSelectDepartment = (departmentId) => {
    const selected = departments.find(
      (dep) => dep.department_id === departmentId
    ); // Tìm phòng ban đã chọn
    setSelectedDepartment(selected); // Lưu phòng ban đã chọn
    setCollapsed(true); // Thu gọn danh sách hiển thị chỉ phòng ban đã chọn
  };

  // Xử lý sự kiện "Chọn lại" để quay lại danh sách đầy đủ
  const handleResetSelection = () => {
    setSelectedDepartment(null); // Xóa trạng thái chọn phòng ban
    setCollapsed(false); // Mở rộng danh sách
    setDisplayDepartments(departments.slice(0, 10));
    setPage(1); // Reset về 10 phòng ban đầu
  };

  // Hiển thị loading khi đang tải dữ liệu trang đầu tiên
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.flatList}
        data={
          collapsed && selectedDepartment
            ? [selectedDepartment]
            : displayDepartments
        } // Hiển thị phòng ban đã chọn hoặc toàn bộ danh sách
        keyExtractor={(item) => item.department_id} // Sử dụng ID phòng ban làm key
        renderItem={({ item }) => (
          <ListItem
            bottomDivider
            onPress={() => handleSelectDepartment(item.department_id)}
          >
            <RadioButton
              value={item.department_id}
              status={
                selectedDepartment &&
                selectedDepartment.department_id === item.department_id
                  ? "checked"
                  : "unchecked"
              }
              onPress={() => handleSelectDepartment(item.department_id)}
            />
            <ListItem.Content>
              <ListItem.Title>{item.department_name}</ListItem.Title>
              <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        )}
        scrollEnabled={true} // Cho phép cuộn danh sách
        ListFooterComponent={
          <>
            {/* Hiển thị nút "Chọn lại" nếu người dùng đã chọn một phòng ban */}
            {collapsed && selectedDepartment ? (
              <Button title="Chọn lại" onPress={handleResetSelection} />
            ) : (
              <>
                {/* Hiển thị nút "Thu gọn" nếu người dùng nhấn "Xem thêm" và chưa chọn phòng ban */}
                {!collapsed && page > 1 && (
                  <Button title="Thu gọn" onPress={handleCollapse} />
                )}
                {/* Hiển thị nút "Xem thêm" nếu còn trang chưa tải */}
                {page < totalPages && !collapsed && (
                  <Button title="Xem thêm" onPress={handleLoadMore} />
                )}
              </>
            )}
          </>
        }
      />
      {loadingMore && <ActivityIndicator size="small" color="#0000ff" />}
    </View>
  );
};

export default ListDepartment;
