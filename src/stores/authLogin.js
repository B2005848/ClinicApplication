// authStore.js
import { createState, useState } from "@hookstate/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from "@env";
import { refreshAccessToken } from "../../../MyWeb/SERVER/src/Services/account.staff.service";

const State = {
  patientId: null,
  accessToken: null,
  refreshToken: null,
  isLogged: false,
};

const authState = createState(State);

export const useAuthStore = () => {
  const state = useState(authState);

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

    //Lưu vào AsyncStorage
    await AsyncStorage.setItem("patientId", patientId, {
      expiresIn: accessTokenExpiry,
    });
    await AsyncStorage.setItem("accessToken", accessToken, {
      expiresIn: accessTokenExpiry,
    });
    await AsyncStorage.setItem("refreshToken", refreshToken, {
      expiresIn: refreshTokenExpiry,
    });
    await AsyncStorage.setItem("isLogged", true, {
      expiresIn: accessTokenExpiry,
    });
  };

  const logout = async () => {
    state.merge(State);

    // Remove khỏi AsyncStorage
    await AsyncStorage.removeItem("patientId");
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.setItem("isLogged", false);
  };

  const isAccessTokenExpired = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/`);
    } catch (e) {}
  };
  return { state, login, logout };
};
