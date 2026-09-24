import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rx/Check</Text>

      <Text style={styles.subtitle}>
        AI Prescription Error Detector
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/patient")}
      >
        <Text style={styles.buttonText}>
          Scan Prescription
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
      >
        <Text>
          Upload Multiple Photos
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F2",
    alignItems: "center",
    justifyContent: "center",
    padding: 20
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#0E6E63"
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 32
  },
  button: {
    backgroundColor: "#0E6E63",
    padding: 16,
    width: "100%",
    borderRadius: 10,
    marginBottom: 12
  },
  buttonSecondary: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    width: "100%",
    borderRadius: 10
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  }
});
