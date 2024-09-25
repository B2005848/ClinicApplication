import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Image } from "react-native";
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
// Import FontAwesomeIcon
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

// Add FontAwesomeIcon into lib
library.add(fas, fab, far);
export default function App() {
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

    const checkLogin = async () => {
      const refreshTokenExpiry = await AsyncStorage.getItem(
        "refreshTokenExpiresAt"
      );

      const now = Math.floor(Date.now() / 1000); // get now day

      if (refreshTokenExpiry && now < parseInt(refreshTokenExpiry)) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
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
        initialRouteName={isLogged ? "CustomerScreen" : "HomeScreen"}
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
            title: "CTU",
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
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
