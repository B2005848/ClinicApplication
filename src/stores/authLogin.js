// authStore.js
import { createState, useState } from "@hookstate/core";

const initialAuthState = {
  staffId: null,
  accessToken: null,
  refreshToken: null,
  isLogged: false,
};

const authState = createState(initialAuthState);

export const useAuthStore = () => {
  const state = useState(authState);

  const login = (patientId, accessToken, refreshToken) => {
    state.merge({ patientId, accessToken, refreshToken, isLogged: true });
  };

  const logout = () => {
    state.merge(initialAuthState);
  };

  const checkAuthentication = () => {
    // Logic kiểm tra trạng thái xác thực (ví dụ, kiểm tra token từ AsyncStorage)
    // Cập nhật state.isLogged theo kết quả
  };

  return { state, login, logout, checkAuthentication };
};
