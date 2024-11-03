import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  detailCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },

  status: {
    color: "#059212",
  },

  fee: {
    color: "red",
  },

  wrapperBtn: {
    backgroundColor: "#ff4d4d", // Red color for cancel
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8, // Rounded corners
    alignItems: "center", // Center text
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5, // Shadow for Android
  },
  btnText: {
    color: "#fff", // White text color
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default styles;
