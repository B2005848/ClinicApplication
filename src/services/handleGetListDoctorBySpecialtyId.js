// services/authService.js
import axios from "axios";
import { Alert } from "react-native";
import Constants from "expo-constants";

// Lấy API_URL từ cấu hình của Expo
const { API_URL } = Constants.expoConfig.extra;

export const handleGetListDoctorBySpecialtyId = async (specialty_id) => {
  try {
    // In ra thông tin phòng ban (dep_id) mà bạn muốn lấy danh sách dịch vụ
    console.log(`Fetching data for doctor by specialty ID: ${specialty_id}`);

    // Gọi API bằng axios
    const response = await axios.get(
      `${API_URL}/api/handle/staff/getListDoctorBySpecialtyId/${specialty_id}`, // URL
      {
        headers: {
          "Content-Type": "application/json", // Đảm bảo định dạng là JSON
        },
      }
    );

    // Kiểm tra trạng thái phản hồi (response status)
    if (response.status === 200 && response.data.dataInfo) {
      // In ra dữ liệu nhận được từ API để kiểm tra
      console.log(
        "Data received from API:",
        JSON.stringify(response.data.dataInfo, null, 2) // Truy cập đúng vào dataInfo trong response.data
      );

      // Trả về kết quả thành công và dữ liệu từ API
      return { success: true, data: response.data.dataInfo }; // Trả về danh sách dịch vụ từ dataInfo
    } else {
      // Nếu có lỗi xảy ra từ phía server (không phải 200 OK)
      return {
        success: false,
        message: response.data.message || "Không thể lấy danh sách bác sĩ.",
      };
    }
  } catch (error) {
    // Bắt lỗi khi có sự cố với việc gọi API
    console.error("Lỗi:", error.message);

    // Hiển thị cảnh báo lỗi cho người dùng
    Alert.alert("Lỗi", "Có lỗi xảy ra. Vui lòng thử lại sau.");

    // Trả về kết quả thất bại kèm theo thông báo lỗi
    return { success: false, message: error.message || "Có lỗi xảy ra." };
  }
};
