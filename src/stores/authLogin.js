import { hookstate } from "@hookstate/core"; // Cập nhật import
import AsyncStorage from "@react-native-async-storage/async-storage";

// Khởi tạo state
const authState = hookstate({
  patientId: null,
  accessToken: null,
  refreshToken: null,
  isLogged: false,
});

export const useAuthStore = () => {
  const state = authState; // Sử dụng hookstate

  const login = async (
    patientId,
    accessToken,
    accessTokenExpiry,
    refreshToken,
    refreshTokenExpiry
  ) => {
    state.merge({
      patientId,
      accessToken,
      refreshToken,
      isLogged: true,
    });

    // Lưu vào AsyncStorage
    await AsyncStorage.setItem("patientId", patientId);
    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
    await AsyncStorage.setItem(
      "accessTokenExpiresAt",
      JSON.stringify(accessTokenExpiry)
    ); // Lưu thời gian hết hạn
    await AsyncStorage.setItem(
      "refreshTokenExpiresAt",
      JSON.stringify(refreshTokenExpiry)
    ); // Lưu thời gian hết hạn
    await AsyncStorage.setItem("isLogged", "true");
  };

  const logout = async () => {
    state.merge({
      patientId: null,
      accessToken: null,
      refreshToken: null,
      isLogged: false,
    });

    // Xóa AsyncStorage
    await AsyncStorage.removeItem("patientId");
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.setItem("isLogged", "false");
  };

  return { state, login, logout }; // Đảm bảo trả về state và các phương thức
};
