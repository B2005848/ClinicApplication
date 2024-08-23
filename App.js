import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import HomeScreen from "./screens/HomeScreen/index";
import LoginScreen from "./screens/LoginScreen/index";
import SignUpScreen from "./screens/SignUpScreen";
import CustomerScreen from "./screens/CustomerScreen";

const Stack = createNativeStackNavigator();

// Giữ màn hình splash cho đến khi font được tải
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Open Sans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
        "Open Sans-Bold-Italic": require("./assets/fonts/OpenSans_Condensed-BoldItalic.ttf"),
        "Open Sans-Italic": require("./assets/fonts/OpenSans-Italic.ttf"),
        "Open Sans-Light": require("./assets/fonts/OpenSans-Light.ttf"),
        "Open Sans-Medium": require("./assets/fonts/OpenSans-Medium.ttf"),
      });

      setFontsLoaded(true); // Font đã tải xong
      SplashScreen.hideAsync(); // Ẩn splash screen
    };

    loadFonts();
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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: true, title: "Đăng Nhập" }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: true, title: "Đăng Ký" }}
        />
        <Stack.Screen
          name="CustomerScreen"
          component={CustomerScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
