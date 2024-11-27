import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import Constants from "expo-constants";
import styles from "./style"; // Import your styles

const { API_URL } = Constants.expoConfig.extra; // Assuming your API URL is set in the `extra` section of your `app.json`

const UpdatePatientInfo = ({ route }) => {
  const { patient_id } = route.params;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState(null);

  // Fetch patient data from API
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/handle/patient/getinfo/${patient_id}`
        );
        if (response.data.status === 200) {
          const data = response.data.dataInfo;
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setGender(data.gender);
          setPhoneNumber(data.phone_number);
          setEmail(data.email);
          setAddress(data.address_contact);
          setAvatar(`${API_URL}${data.image_avt}`);
        } else {
          Alert.alert("Error", "Failed to fetch patient data.");
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
        Alert.alert("Error", "There was an issue fetching the patient data.");
      }
    };

    fetchPatientData();
  }, [patient_id]); // Fetch data when patient_id changes

  // Select image for avatar
  const selectAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.photo], // Updated to use MediaType instead of MediaTypeOptions
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.uri); // Save selected avatar image URI
    }
  };

  // Update patient information
  const updatePatientInfo = async () => {
    const updatedData = {};

    if (firstName !== "") updatedData.first_name = firstName;
    if (lastName !== "") updatedData.last_name = lastName;
    if (gender !== "") updatedData.gender = gender;
    if (phoneNumber !== "") updatedData.phone_number = phoneNumber;
    if (email !== "") updatedData.email = email;
    if (address !== "") updatedData.address_contact = address;

    try {
      const response = await axios.patch(
        `${API_URL}/api/handle/patient/information/update/${patient_id}`,
        updatedData
      );

      if (response.data.success) {
        Alert.alert("Success", "Patient information updated successfully!");
      } else {
        Alert.alert("Error", "Failed to update patient information.");
      }
    } catch (error) {
      console.error("Error updating patient info:", error);
      Alert.alert("Error", "There was an issue updating the information.");
    }
  };

  // Upload avatar image
  const uploadAvatar = async () => {
    if (!avatar) {
      Alert.alert("Error", "Please select an avatar image.");
      return;
    }

    const formData = new FormData();
    formData.append("avatarPatient", {
      uri: avatar,
      name: `avatar-${patient_id}.jpg`, // Use patient_id to generate a unique filename
      type: "image/jpeg", // Specify image type
    });

    try {
      const response = await axios.post(
        `${API_URL}/api/file/uploadAvtPatient`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        Alert.alert("Success", "Avatar uploaded successfully!");
      } else {
        Alert.alert("Error", "Failed to upload avatar.");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      Alert.alert("Error", "There was an issue uploading the avatar.");
    }
  };

  // Submit form data (update patient info and upload avatar)
  const handleSubmit = async () => {
    // First, update patient info
    await updatePatientInfo();

    // Then, upload avatar if selected
    if (avatar) {
      await uploadAvatar();
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Wrap content in ScrollView */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Họ và tên đệm:</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tên của bạn:</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Giới tính:</Text>
        <TextInput
          style={styles.input}
          value={gender}
          onChangeText={setGender}
          placeholder="Enter 1 for male, 0 for female"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Số điện thoại liên hệ:</Text>
        <TextInput
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Địa chỉ liên lạc:</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Ảnh đại diện:</Text>
        <TouchableOpacity onPress={selectAvatar} style={styles.avatarPicker}>
          <Text style={styles.avatarText}>Tải ảnh</Text>
        </TouchableOpacity>

        {avatar && (
          <Image source={{ uri: avatar }} style={styles.avatarPreview} />
        )}
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>LƯU</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default UpdatePatientInfo;
