import { View, Text, TextInput } from "react-native";

export default function PatientScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Patient Details</Text>

      <TextInput
        placeholder="Patient Name"
      />

      <TextInput
        placeholder="Age"
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Weight"
        keyboardType="numeric"
      />
    </View>
  );
}
