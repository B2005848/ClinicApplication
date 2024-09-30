import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "./stores/authLogin";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import HomeScreen from "./screens/HomeScreen/index";
import LoginScreen from "./screens/LoginScreen/index";
import SignUpScreen from "./screens/SignUpScreen";
import CustomerScreen from "./screens/CustomerScreen";

// Import FontAwesomeIcon
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const Stack = createNativeStackNavigator();

// Giữ màn hình splash cho đến khi font được tải
SplashScreen.preventAutoHideAsync();

// Add FontAwesomeIcon into lib
library.add(fas, fab, far);
export default function App() {
  const { state } = useAuthStore();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Open Sans-Bold": require("@assets/fonts/OpenSans-Bold.ttf"),
        "Open Sans-Bold-Italic": require("@assets/fonts/OpenSans_Condensed-BoldItalic.ttf"),
        "Open Sans-Italic": require("@assets/fonts/OpenSans-Italic.ttf"),
        "Open Sans-Light": require("@assets/fonts/OpenSans-Light.ttf"),
        "Open Sans-Medium": require("@assets/fonts/OpenSans-Medium.ttf"),
      });

      setFontsLoaded(true); // Font đã tải xong
      SplashScreen.hideAsync(); // Ẩn splash screen
    };

    // check login exist?
    const checkLogin = async () => {
      const isLogged = await AsyncStorage.getItem("isLogged");
      const refreshTokenExpiresAt = await AsyncStorage.getItem(
        "refreshTokenExpiresAt"
      );

      // now là thời điểm người dùng vừa login thành công
      const now = Math.floor(Date.now() / 1000); // Thời gian hiện tại tính bằng giây (Unix timestamp)
      /* Date.now(): Hàm này trả về số mili-giây (milliseconds) 
      tính từ ngày 1 tháng 1 năm 1970 (Unix Epoch) đến thời điểm hiện tại. Đây là một giá trị lớn tính theo mili-giây. */

      const refreshTokenExpiryTime = JSON.parse(refreshTokenExpiresAt); // Chuyển đổi chuỗi thành số

      console.log("now:", now);
      console.log("refreshTokenExpiryTime:", refreshTokenExpiryTime);

      if (isLogged === "true" && now < refreshTokenExpiryTime) {
        state.isLogged.set(true);
      } else {
        state.isLogged.set(false); // Người dùng chưa đăng nhập
      }
    };

    loadFonts();
    checkLogin();
  }, []);

  if (!fontsLoaded) {
    // Hiển thị thông báo trong khi đang load font
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Đang tải font, vui lòng đợi...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          // get value of isLogged
          state.isLogged.get() ? "CustomerScreen" : "HomeScreen"
        }
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false, title: "" }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: true,
            title: "Đăng nhập",
            headerStyle: {
              backgroundColor: "#5486c4",
              fontFamily: "Open Sans-Bold",
            },
            headerTintColor: "#fff",
            headerRight: () => (
              <FontAwesomeIcon
                icon="fas fa-house-user"
                size={32}
                color="#fff"
              />
            ),
          }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{
            headerShown: true,
            title: "Đăng Ký",
            headerStyle: {
              backgroundColor: "#5486c4",
              fontFamily: "Open Sans-Bold",
            },
            headerTintColor: "#fff",
            headerRight: () => (
              <FontAwesomeIcon
                icon="fas fa-house-user"
                size={32}
                color="#fff"
              />
            ),
          }}
        />
        <Stack.Screen
          name="CustomerScreen"
          component={CustomerScreen}
          options={{
            headerShown: true,
            title: "CTU",
            headerStyle: {
              backgroundColor: "#5486c4",
              fontFamily: "Open Sans-Bold",
            },
            headerTintColor: "#fff",
            // Hide button come back
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}