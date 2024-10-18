import React from "react";
import { Header, Text, Avatar, Icon } from "react-native-elements";
import styles from "./style";

const HeaderCustomer = ({ patient_id }) => {
  return (
    <Header
      containerStyle={[
        styles.headerInnerContainer,
        {
          justifyContent: "space-between",
          borderBottomWidth: 0, // Loại bỏ đường viền dưới cùng
          elevation: 0, // Loại bỏ bóng trên Android
          shadowOpacity: 0, // Loại bỏ bóng trên iOS
        },
      ]}
    >
      <Avatar
        rounded
        source={{
          uri: "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg",
        }}
      />
      <Text style={styles.headerText} h4>
        {patient_id ? ` ${patient_id}` : "No ID Available"}
      </Text>
      <Icon name="bars" type="font-awesome" color="#F9FAFB" />
    </Header>
  );
};
export default HeaderCustomer;
