import { View, Text } from "react-native";

export default function ResultsScreen() {
  return (
    <View style={{ padding: 20 }}>
      <Text>
        Analysis Results
      </Text>

      <View
        style={{
          borderLeftWidth: 6,
          borderLeftColor: "#B33A2E",
          padding: 12,
          backgroundColor: "#fff"
        }}
      >
        <Text>
          Critical Interaction
        </Text>

        <Text>
          Warfarin + Aspirin
        </Text>
      </View>
    </View>
  );
}
