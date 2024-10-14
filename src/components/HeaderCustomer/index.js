import React from "react";
import { Header, Text, Avatar, Icon } from "react-native-elements";
import { ImageBackground } from "react-native";
import styles from "./style";

export default function HeaderCustomer({
  first_name = "Guest",
  last_name = "",
}) {
  return (
    <ImageBackground
      resizeMode="cover"
      source={require("@assets/StartImage.png")}
      style={styles.backgroundImage}
    >
      <Header
        containerStyle={[
          styles.headerContainer,
          { justifyContent: "space-between" },
        ]}
      >
        <Avatar
          rounded
          source={{
            uri: "https://scontent.fvca1-3.fna.fbcdn.net/v/t39.30808-1/437517592_1080250323086922_2969822592833822690_n.jpg?stp=dst-jpg_s200x200&_nc_cat=103&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=J3Eeq9r22yEQ7kNvgF9KZfW&_nc_ht=scontent.fvca1-3.fna&oh=00_AYCAy4hRrsMvmHvC33pxS--CGMLi3jWdWq-EngVgUYQezw&oe=67009AF1",
          }}
        />
        <Text style={styles.headerText} h4>
          {first_name} {last_name}
        </Text>
        <Icon name="bars" type="font-awesome" color="#517fa4" />
      </Header>
    </ImageBackground>
  );
}
