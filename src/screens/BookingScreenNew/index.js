import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Input, Icon } from "react-native-elements";
import styles from "./style";

import ListDepartment from "../../components/ListDepartment";
export default function BookingScreenNew() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 128 : 0}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.menuContent}>
            <Text>OKOK</Text>
            <ListDepartment></ListDepartment>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
