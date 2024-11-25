import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";
import styles from "./style";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import ListDepartment from "../../components/ListDepartment";
import ListService from "../../components/ListServices";
import ListDoctorAppointment from "../../components/ListDoctor";
import ListDate from "../../components/ListDate";

export default function BookingScreenNew({ route }) {
  const { patient_id } = route.params;
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
      keyboardVerticalOffset={Platform.OS === "ios" ? 32 : 0}
    >
      <StatusBar barStyle="default" backgroundColor="#5486c4" />
      <FlatList
        data={[]}
        ListHeaderComponent={
          <>
            <View style={styles.menuContent}>
              <Text style={styles.title}>ĐẶT LỊCH - THEO PHÒNG KHÁM</Text>
              <Text style={[styles.titleStep, styles.note]}>
                Chọn thông tin khám{" "}
                <FontAwesomeIcon
                  icon="fa-solid fa-file-waveform"
                  style={{ color: "#74C0FC" }}
                />
              </Text>

              {/* Chọn phòng khám */}
              <Text style={styles.titleStep}>
                Vui lòng chọn phòng khám chuyên khoa{" "}
                <Text style={{ color: "red" }}>(*)</Text>
              </Text>
              <ListDepartment
                onDepartmentSelect={handleDepartmentSelect}
                resetDepartments={resetDepartments}
              />

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
              {selectedDepartmentId && (
                <ListService
                  dep_id={selectedDepartmentId}
                  services={services}
                  onServiceSelect={setSelectedService}
                  setServices={setServices}
                />
              )}

              {/* Chọn bác sĩ */}
              <Text style={styles.titleStep}>
                Vui lòng chọn bác sĩ <Text style={{ color: "red" }}>(*)</Text>
              </Text>
              {selectedService && (
                <ListDoctorAppointment
                  specialty_id={selectedService.specialty_id}
                  onDoctorSelect={(doctor) => setSelectedDoctor(doctor)}
                />
              )}

              {/* Chọn ngày giờ khám */}
              <Text style={styles.titleStep}>
                Vui lòng chọn ngày và giờ khám{" "}
                <Text style={{ color: "red" }}>(*)</Text>
              </Text>
              <View style={styles.unavailableDateContainer}>
                <Icon name="square" type="font-awesome" color="#d3d3d3" />
                <Text style={styles.unavailableDateText}>
                  {"  :  "} Ngày không thể chọn{" "}
                </Text>
                <Icon name="square" type="font-awesome" color="black" />
                <Text style={styles.unavailableDateText}>
                  {"  :  "} Ngày có thể chọn
                </Text>
              </View>
            </View>
          </>
        }
        ListFooterComponent={
          <View style={styles.listDate}>
            {selectedDoctor && (
              <ListDate
                departmentId={selectedDepartmentId}
                specialtyId={
                  selectedService ? selectedService.specialty_id : null
                }
                doctorId={selectedDoctor ? selectedDoctor.doctor_id : null}
                serviceId={selectedService ? selectedService.service_id : null}
                patientId={patient_id}
                serviceFee={
                  selectedService ? selectedService.service_fee : null
                }
              />
            )}
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
      />
    </KeyboardAvoidingView>
  );
}
