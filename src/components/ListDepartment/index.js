import { ListItem } from "react-native-elements";
import { View } from "react-native";
import React from "react";
import styles from "./style";

export default listDepartment = () => {
  const list = [
    {
      title: "Appointments",
    },
    {
      title: "Trips",
    },
  ];
  return (
    <View>
      {list.map((item, i) => (
        <ListItem key={i} title={item.title} bottomDivider />
      ))}
    </View>
  );
};
