import { ListItem } from "react-native-elements";
import React from "react";
import styles from "./style";

export default listDepartment = () => {
  const list = [
    {
      title: "Appointments",
      icon: "av-timer",
    },
    {
      title: "Trips",
      icon: "flight-takeoff",
    },
  ];
  return (
    <View>
      {list.map((item, i) => (
        <ListItem
          key={i}
          title={item.title}
          leftIcon={{ name: item.icon }}
          bottomDivider
          chevron
        />
      ))}
    </View>
  );
};
