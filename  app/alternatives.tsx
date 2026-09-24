import { View, Text, Linking, Pressable } from "react-native";

export default function AlternativesScreen() {
  const drug = "Paracetamol";

  return (
    <View style={{ padding: 20 }}>
      <Text>Alternative Suggestions</Text>

      <Pressable
        onPress={() =>
          Linking.openURL(
            `https://www.1mg.com/search/all?name=${drug}`
          )
        }
      >
        <Text>Open on Tata 1mg</Text>
      </Pressable>

      <Pressable
        onPress={() =>
          Linking.openURL(
            `https://www.truemeds.in/search?search=${drug}`
          )
        }
      >
        <Text>Open on Truemeds</Text>
      </Pressable>
    </View>
  );
}
