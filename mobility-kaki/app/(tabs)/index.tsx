import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function App() {
  const [count, setCount] = React.useState(0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.emoji}>🚇</Text>
      <Text style={styles.title}>MobilityKaki</Text>
      <Text style={styles.subtitle}>
        Test page — if you can see this, web rendering works!
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardText}>Tap counter: {count}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.buttonText}>Tap me</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardText}>Sample destination list</Text>
        {["Ang Mo Kio MRT", "Toa Payoh Bus Interchange", "Bishan MRT"].map(
          (place) => (
            <Text key={place} style={styles.listItem}>
              • {place}
            </Text>
          ),
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 80,
    paddingHorizontal: 24,
    backgroundColor: "#FFF8F0",
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D2D2D",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 32,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 400,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#2D2D2D",
  },
  button: {
    backgroundColor: "#FF6B35",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  listItem: {
    fontSize: 15,
    color: "#444",
    marginBottom: 6,
  },
});
