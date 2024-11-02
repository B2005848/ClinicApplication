import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AppointmentListNew from "../ListAppointmentNewByPatientId";
import AppointmentListOld from "../ListAppointmentOldByPatientId";

const Tab = createMaterialTopTabNavigator();

const AppointmentTabScreen = ({ route }) => {
  const { patientId } = route.params;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#5486c4", // Màu chữ tab được chọn
        tabBarIndicatorStyle: { backgroundColor: "#5486c4" }, // Màu chỉ báo tab được chọn
        tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
      }}
    >
      <Tab.Screen name="Lịch Sắp Khám" options={{ title: "Lịch Sắp Khám" }}>
        {() => <AppointmentListNew patientId={patientId} />}
      </Tab.Screen>
      <Tab.Screen name="Lịch Đã Khám" options={{ title: "Lịch Đã Khám" }}>
        {() => <AppointmentListOld patientId={patientId} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default AppointmentTabScreen;
