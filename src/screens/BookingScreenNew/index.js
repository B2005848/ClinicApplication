import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Button,
  ScrollView,
  StatusBar,
} from "react-native";

import { Icon } from "react-native-elements";
import styles from "./style";

import ListDepartment from "../../components/ListDepartment";
import ListService from "../../components/ListServices";
import ListDoctorAppointment from "../../components/ListDoctor";
import ListDate from "../../components/ListDate";

export default function BookingScreenNew() {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [services, setServices] = useState([]);
  const [resetDepartments, setResetDepartments] = useState(false);

  const handleDepartmentSelect = (departmentId) => {
    setSelectedDepartmentId(departmentId);
    setSelectedService(null);
    setServices([]);
    setResetDepartments(false);
  };

  const handleResetDepartmentSelection = () => {
    setSelectedDepartmentId(null);
    setSelectedService(null);
    setSelectedDoctor(null);
    setServices([]);
    setResetDepartments(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 128 : 0}
    >
      <StatusBar barStyle="default" backgroundColor="#5486c4" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.menuContent}>
          <Text style={styles.title}>ĐẶT LỊCH - CHƯA TỪNG KHÁM</Text>

          {/* Chọn phòng khám */}
          <Text style={styles.titleStep}>
            Vui lòng chọn phòng khám chuyên khoa{" "}
            <Text style={{ color: "red" }}>(*)</Text>
          </Text>
          <View style={styles.listDepartment}>
            <ListDepartment
              onDepartmentSelect={handleDepartmentSelect}
              resetDepartments={resetDepartments}
            />
          </View>

          {/* Nút chọn lại phòng ban */}
          {selectedDepartmentId && (
            <Button
              title="Chọn lại phòng khám"
              onPress={handleResetDepartmentSelection}
            />
          )}

          {/* Chọn dịch vụ */}
          <Text style={styles.titleStep}>
            Vui lòng chọn dịch vụ <Text style={{ color: "red" }}>(*)</Text>
          </Text>
          <View style={styles.listService}>
            {selectedDepartmentId && (
              <ListService
                dep_id={selectedDepartmentId}
                services={services}
                onServiceSelect={setSelectedService}
                setServices={setServices}
              />
            )}
          </View>

          {/* Chọn bác sĩ */}
          <Text style={styles.titleStep}>
            Vui lòng chọn bác sĩ <Text style={{ color: "red" }}>(*)</Text>
          </Text>
          <View style={styles.listDoctor}>
            {selectedService && (
              <ListDoctorAppointment
                specialty_id={selectedService.specialty_id}
                onDoctorSelect={(doctor) => {
                  setSelectedDoctor(doctor);
                  console.log("Selected doctor:", doctor);
                }}
              />
            )}
          </View>

          {/* Chọn ngày giờ khám */}
          <Text style={styles.titleStep}>
            Vui lòng chọn ngày và giờ khám{" "}
            <Text style={{ color: "red" }}>(*)</Text>
          </Text>
          <View style={styles.unavailableDateContainer}>
            <Icon name="square" type="font-awesome" color="#d3d3d3" />
            <Text style={styles.unavailableDateText}>
              {"  :  "} Ngày không thể chọn {"   "}
            </Text>
            <Icon name="square" type="font-awesome" color="black" />
            <Text style={styles.unavailableDateText}>
              {"  :  "} Ngày có thể chọn
            </Text>
          </View>

          <View style={styles.listDate}>
            {selectedDoctor && (
              <ListDate
                departmentId={selectedDepartmentId}
                specialtyId={selectedService.specialty_id}
                doctorId={selectedDoctor.doctor_id}
              />
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
