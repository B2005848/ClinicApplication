import React, { useState } from "react";
import { Button, Image, View, StyleSheet, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios"; // Import axios for making HTTP requests
import Constants from "expo-constants";

const { API_URL } = Constants.expoConfig.extra;

export default function UpdatePatientInfo({ route }) {
  const [image, setImage] = useState(null); // State to store the selected image URI
  const { patient_id } = route.params; // Destructure patient_id from route.params

  // Function to pick an image from the library
  const pickImage = async () => {
    // Request permissions if not already granted
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "You need to grant permission to access the media library."
      );
      return;
    }

    // Launch image picker to select an image
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Only allow images
      allowsEditing: true,
      aspect: [1, 1], // Aspect ratio for image editing
      quality: 1, // Set maximum quality
    });

    console.log(result); // Log the result to check the response

    // If the user selects an image, set it in the state
    if (!result.canceled) {
      setImage(result.assets[0].uri); // Get the URI of the selected image
    }
  };

  // Function to upload the image to the server
  const uploadAvatar = async () => {
    if (!image) {
      Alert.alert("Error", "Please select an image first.");
      return;
    }

    // Prepare the FormData for the image upload
    const formData = new FormData();
    formData.append("avatarPatient", {
      uri: image, // URI of the selected image
      name: "avatar.jpg", // You can generate a unique name or use a fixed name
      type: "image/jpeg", // MIME type of the image
    });
    formData.append("patientId", patient_id); // Make sure you're using `patient_id` here

    try {
      // Make a POST request to upload the image
      const response = await axios.post(
        `${API_URL}/api/file/uploadAvtPatient`, // Replace with your actual API URL
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure the correct content type is set
          },
        }
      );

      // Check the response from the server
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

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Upload Avatar" onPress={uploadAvatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
