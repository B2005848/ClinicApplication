import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "./stores/authLogin";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

// Import Component
import HomeScreen from "./screens/HomeScreen/index";
import LoginScreen from "./screens/LoginScreen/index";
import SignUpScreen from "./screens/SignUpScreen";
import CustomerScreen from "./screens/CustomerScreen";
import BookingScreenByDepartment from "./screens/BookingScreenByDepartment";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PaymentWebView from "./components/PaymentWebView";
import SuccessPaymentScreen from "./screens/SuccessPaymentScreen";
import FailurePaymentScreen from "./screens/FailurePaymentScreen";
import AppointmentTabScreen from "./screens/AppointmentTabScreen";
import AppointmentNewDetails from "./components/AppointmentNewDetails";
import AppointmentCancelDetails from "./components/AppointmentCancelDetails";
import ChatScreen from "./screens/ChatScreen";
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
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#5486c4" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={
            // get value of isLogged
            state.isLogged.get() ? "CustomerScreen" : "HomeScreen"
          }
        >
          {/* START SCREEN */}
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false, title: "", gestureEnabled: false }}
          />
          {/* LOGIN SCREEN */}
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={({ navigation }) => ({
              headerShown: true,
              title: "Đăng nhập",
              headerStyle: {
                backgroundColor: "#5486c4",
                fontFamily: "Open Sans-Bold",
              },
              headerTintColor: "#fff",
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("HomeScreen")}
                >
                  <FontAwesomeIcon
                    icon={["fas", "house-user"]}
                    size={25}
                    color="#fff"
                  />
                </TouchableOpacity>
              ),
            })}
          />
          {/* SIGN UP SCREEN */}
          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={({ navigation }) => ({
              headerShown: true,
              title: "Đăng Kí Tài Khoản",
              headerStyle: {
                backgroundColor: "#48bbc6",
                fontFamily: "Open Sans-Bold",
              },
              headerTintColor: "#fff",
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("HomeScreen")}
                >
                  <FontAwesomeIcon
                    icon="fas fa-house-user"
                    size={25}
                    color="#fff"
                  />
                </TouchableOpacity>
              ),
            })}
          />
          {/* HOME SCREEN */}
          <Stack.Screen
            name="CustomerScreen"
            component={CustomerScreen}
            options={{
              title: "",
              headerShown: false,
              gestureEnabled: false,
            }}
          />
          {/* BOOKING SCREEN */}
          <Stack.Screen
            name="BookingNewScreen"
            component={BookingScreenByDepartment}
            options={{
              headerShown: false,
            }}
          />
          {/* TAB APPOINTMENT */}
          <Stack.Screen
            name="AppointmentTabScreen"
            component={AppointmentTabScreen}
            options={() => ({
              headerShown: true,
              title: "LỊCH HẸN CỦA BẠN",
              headerStyle: {
                backgroundColor: "#5486c4",
                fontFamily: "Open Sans-Bold",
              },
              headerTintColor: "#fff",
            })}
          />

          {/* CHI TIẾT LỊCH HẸN SẮP TỚI  */}
          <Stack.Screen
            name="AppointmentNewDetails"
            component={AppointmentNewDetails}
            options={() => ({
              headerShown: true,
              title: "",
              headerTintColor: "#fff",
              headerStyle: {
                backgroundColor: "#5486c4",
                fontFamily: "Open Sans-Bold",
              },
            })}
          />

          {/* CHI TIẾT LỊCH HẸN ĐÃ HỦY */}
          <Stack.Screen
            name="AppointmentCancelDetails"
            component={AppointmentCancelDetails}
            options={() => ({
              headerShown: true,
              title: "",
              headerTintColor: "#fff",
              headerStyle: {
                backgroundColor: "#5486c4",
                fontFamily: "Open Sans-Bold",
              },
            })}
          />
          {/* PAYMENT METHOD SCREEN */}
          <Stack.Screen
            name="PaymentMethodScreen"
            component={PaymentMethodScreen}
            options={{
              headerShown: false,
            }}
          />
          {/* PAYMENT WEBVIEW SCREEN */}
          <Stack.Screen
            name="PaymentWebView"
            component={PaymentWebView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SuccessPaymentScreen"
            component={SuccessPaymentScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FailurePaymentScreen"
            component={FailurePaymentScreen}
            options={{ headerShown: false }}
          />

          {/* CHAT ONLINE */}
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ title: "Chat with Admin" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
