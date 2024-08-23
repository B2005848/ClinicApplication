import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  Animated,
  Easing,
  ImageBackground,
} from "react-native";
import React, { useRef, useEffect } from "react";
import styles from "./style";

// Import components
import ButtonSignUp from "../../components/ButtonSignUp/index";
import ButtonLogin from "../../components/ButtonLogin";
// Import FontAwesomeIcon
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function HomeScreen() {
  // create Animation
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(-100)).current;
  useEffect(() => {
    // excute all animation by parallel
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: 0,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateAnim]);
  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateX: translateAnim,
            },
          ],
        },
      ]}
    >
      <ImageBackground
        source={require("../../assets/StartImage.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <FontAwesomeIcon icon="question-circle" size={20} color="#4e4b4e" />
        </View>
        {/* example for using FontAwesomeIcon */}
        {/* <FontAwesomeIcon icon="coffee" size={32} color="#900" /> */}
        {/* <FontAwesomeIcon icon="square-check" size={32} color="#900" /> */}

        {/* --------------HEADER--------------------- */}
        {/* ----------------BODY------------------ */}
        <View style={styles.body}></View>

        {/* ----------------FOOTER------------------ */}
        <View style={styles.footer}>
          {/* button sign up */}
          <ButtonSignUp />

          {/* button login */}
          <ButtonLogin />
        </View>
      </ImageBackground>
    </Animated.View>
  );
}
