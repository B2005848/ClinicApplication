import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Button,
  Text,
  ScrollView,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { RadioButton } from "react-native-paper";
import { handleGetListDoctorBySpecialtyId } from "../../services/handleGetListDoctorBySpecialtyId";
import styles from "./style";
import Constants from "expo-constants";

const ListDoctorAppointment = ({ specialty_id, onDoctorSelect }) => {
  const { API_URL } = Constants.expoConfig.extra;

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchDoctors = async (specialty_id) => {
    try {
      const result = await handleGetListDoctorBySpecialtyId(specialty_id);
      if (result && result.success && result.data && result.data.length > 0) {
        setDoctors(result.data);
        setError(false);
      } else {
        setDoctors([]);
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching doctors by specialty_id:", error);
      setDoctors([]);
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (specialty_id) {
      setLoading(true);
      fetchDoctors(specialty_id);
    }
  }, [specialty_id]);

  const handleSelectDoctor = (doctorId) => {
    const selected = doctors.find((doc) => doc.doctor_id === doctorId);
    setSelectedDoctor(selected);
    onDoctorSelect(selected);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.noDoctorContainer}>
        <Text style={styles.noDoctorText}>
          Không có bác sĩ nào cho chuyên khoa này. Phòng khám sẽ cập nhật sớm
          nhất. Vui lòng quay lại sau.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingVertical: 10 }}
    >
      <View
        style={
          selectedDoctor
            ? [styles.flatList, { height: 120 }]
            : [styles.flatList, { height: 350 }]
        }
      >
        {selectedDoctor ? (
          <ListItem
            bottomDivider
            onPress={() => handleSelectDoctor(selectedDoctor.doctor_id)}
          >
            <RadioButton
              value={selectedDoctor.doctor_id}
              status="checked"
              onPress={() => handleSelectDoctor(selectedDoctor.doctor_id)}
            />
            <Avatar
              size={100}
              source={{ uri: `${API_URL}${selectedDoctor.image_avt}` }}
              onError={() => console.log("Error loading avatar")}
            />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>
                Bác sĩ: {selectedDoctor.first_name} {selectedDoctor.last_name}
              </ListItem.Title>
              <ListItem.Subtitle>
                Ca làm việc: {selectedDoctor.shifts.join(", ")}.
              </ListItem.Subtitle>
              <ListItem.Subtitle>
                Chuyên khoa: {selectedDoctor.specialty.join(", ")}.
              </ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ) : (
          doctors.map((item) => (
            <ListItem
              key={item.doctor_id}
              bottomDivider
              onPress={() => handleSelectDoctor(item.doctor_id)}
            >
              <RadioButton
                value={item.doctor_id}
                status={
                  selectedDoctor && selectedDoctor.doctor_id === item.doctor_id
                    ? "checked"
                    : "unchecked"
                }
                onPress={() => handleSelectDoctor(item.doctor_id)}
              />
              <Avatar
                size={100}
                source={{ uri: `${API_URL}${item.image_avt}` }}
                onError={() => console.log("Error loading avatar")}
              />
              <ListItem.Content>
                <ListItem.Title style={styles.title}>
                  Bác sĩ: {item.first_name} {item.last_name}
                </ListItem.Title>
                <ListItem.Subtitle>
                  Ca làm việc: {item.shifts.join(", ")}.
                </ListItem.Subtitle>
                <ListItem.Subtitle>
                  Chuyên khoa: {item.specialty.join(", ")}.
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))
        )}
        {selectedDoctor && (
          <Button
            title="Chọn lại bác sĩ"
            onPress={() => setSelectedDoctor(null)}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default ListDoctorAppointment;
