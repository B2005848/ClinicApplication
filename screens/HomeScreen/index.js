import { StatusBar } from "expo-status-bar";
import { Text, View, Image } from "react-native";
import React from "react";
import styles from "../../App.css.styles";
// Import font expo
import * as Font from "expo-font";
// Import components
import ButtonSignUp from "../../components/ButtonSignUp/index";
import ButtonLogin from "../../components/ButtonLogin";
// Import FontAwesomeIcon
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

// Add FontAwesomeIcon into lib
library.add(fas, fab, far);
// Load Font
Font.loadAsync({
  "Hammersmith One": require("../../assets/fonts/HammersmithOne-Regular.ttf"),
});

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* example for using FontAwesomeIcon */}
      {/* <FontAwesomeIcon icon="coffee" size={32} color="#900" /> */}
      {/* <FontAwesomeIcon icon="square-check" size={32} color="#900" /> */}

      {/* --------------HEADER--------------------- */}
      <View style={styles.header}>
        <FontAwesomeIcon icon="home" size={32} color="#5486c4" />
      </View>
      {/* ----------------BODY------------------ */}
      <View style={styles.body}>
        <Text style={[styles.title, styles.text]}>Welcome to</Text>
        <Image
          source={require("../../assets/HealthFirst.png")}
          style={{ width: 300, height: 300 }}
        />
        <StatusBar style="auto" />
      </View>
      <View style={styles.footer}>
        {/* button sign up */}
        <ButtonSignUp />

        {/* button login */}
        <ButtonLogin />
      </View>
    </View>
  );
}
