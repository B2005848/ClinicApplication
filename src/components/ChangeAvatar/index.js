import React, { useState } from "react";
import { Button, Image, View, StyleSheet, Alert, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios"; // Import axios for making HTTP requests
import Constants from "expo-constants";

const { API_URL } = Constants.expoConfig.extra;

export default function ChageAvatar({ route }) {
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
      quality: 0.8, // Set maximum quality
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
        Alert.alert(
          "Thành công",
          "Đã cập nhật ảnh đại diện thành công!, vui lòng đăng nhập lại để tải ảnh mới"
        );
      } else {
        Alert.alert("Error", "Lỗi khi cập nhật ảnh đại diện.");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      Alert.alert("Error", "There was an issue uploading the avatar.");
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Chọn ảnh từ thư viện"
        onPress={pickImage}
        color="#4CAF50" // Green color
      />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button
        title="LƯU"
        onPress={uploadAvatar}
        color="#2196F3" // Blue color
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f8f8", // Soft background color
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333", // Dark text color for title
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 100, // Make the image circular
    borderWidth: 4, // Add border around the image
    borderColor: "#ddd", // Light gray border color
  },
  button: {
    marginTop: 15,
    width: "80%",
    borderRadius: 30,
    padding: 10,
    backgroundColor: "#4CAF50", // Green background color
  },
});
