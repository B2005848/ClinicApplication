import React, { useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AppointmentListNew from "../ListAppointmentNewByPatientId";
import AppointmentListOld from "../ListAppointmentOldByPatientId";

const Tab = createMaterialTopTabNavigator();

const AppointmentTabScreen = ({ route }) => {
  const { patientId } = route.params;
  const [scheduledCount, setScheduledCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#5486c4",
        tabBarIndicatorStyle: { backgroundColor: "#5486c4" },
        tabBarLabelStyle: { fontSize: 16, fontWeight: "bold" },
      }}
    >
      <Tab.Screen
        name="Lịch Sắp Khám"
        options={{ title: `Lịch Sắp Khám (${scheduledCount})` }}
      >
        {() => (
          <AppointmentListNew
            patientId={patientId}
            onCountChange={(count) => setScheduledCount(count)}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Lịch Đã Khám"
        options={{ title: `Lịch Đã Khám (${completedCount})` }}
      >
        {() => (
          <AppointmentListOld
            patientId={patientId}
            onCountChange={(count) => setCompletedCount(count)}
          />
        )}
      </Tab.Screen>

      <Tab.Screen
        name="Lịch Đã Hủy"
        options={{ title: `Lịch Đã Hủy (${completedCount})` }}
      >
        {() => (
          <AppointmentListOld
            patientId={patientId}
            onCountChange={(count) => setCompletedCount(count)}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default AppointmentTabScreen;
