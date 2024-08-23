import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen/index";
import LoginScreen from "./screens/LoginScreen/index";
import SignUpScreen from "./screens/SignUpScreen";
import CustomerScreen from "./screens/CustomerScreen";
// Import font expo
import * as Font from "expo-font";
const Stack = createNativeStackNavigator();
Font.loadAsync({
  "Open Sans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  "Open Sans-Bold-Italic": require("./assets/fonts/OpenSans_Condensed-BoldItalic.ttf"),
  "Open Sans-Italic": require("./assets/fonts/OpenSans-Italic.ttf"),
  "Open Sans-Light": require("./assets/fonts/OpenSans-Light.ttf"),
  "Open Sans-Medium": require("./assets/fonts/OpenSans-Medium.ttf"),
});
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          // headerShown to show nav
          options={{ headerShown: true }}
          name="LoginScreen"
          // name'component is part export component
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="SignUpScreen"
          // name'component is part export component
          component={SignUpScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CustomerScreen"
          // name'component is part export component
          component={CustomerScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
