import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

// ⚠️ Replace with your laptop's local IP (run `ipconfig getifaddr en0` to find it)
// Must match the port your backend is running on (default 3001 in our setup)
const API_BASE_URL = "http://192.168.1.70:3001";

export default function App() {
  const [count, setCount] = React.useState(0);

  // Backend connection state
  const [backendStatus, setBackendStatus] = useState<
    "loading" | "connected" | "error"
  >("loading");
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    checkBackend();
  }, []);

  const checkBackend = async () => {
    setBackendStatus("loading");
    try {
      const response = await fetch(`${API_BASE_URL}/api/health`);
      if (!response.ok)
        throw new Error(`Server responded with ${response.status}`);
      const data = await response.json();
      setBackendStatus("connected");
      setBackendMessage(data.status ?? "ok");
    } catch (err: any) {
      setBackendStatus("error");
      setBackendMessage(err.message ?? "Could not reach backend");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.emoji}>🚇</Text>
      <Text style={styles.title}>MobilityKaki</Text>
      <Text style={styles.subtitle}>
        Test page — if you can see this, web rendering works!
      </Text>

      {/* Backend connection card */}
      <View style={styles.card}>
        <Text style={styles.cardText}>Backend connection</Text>
        <View style={styles.statusRow}>
          <View
            style={[
              styles.statusDot,
              backendStatus === "connected" && styles.statusDotConnected,
              backendStatus === "error" && styles.statusDotError,
            ]}
          />
          <Text style={styles.statusText}>
            {backendStatus === "loading" && "Checking..."}
            {backendStatus === "connected" && `Connected — "${backendMessage}"`}
            {backendStatus === "error" && `Not reachable — ${backendMessage}`}
          </Text>
        </View>
        <TouchableOpacity style={styles.buttonSecondary} onPress={checkBackend}>
          <Text style={styles.buttonSecondaryText}>Retry</Text>
        </TouchableOpacity>
      </View>

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
  buttonSecondary: {
    borderWidth: 1,
    borderColor: "#FF6B35",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  buttonSecondaryText: {
    color: "#FF6B35",
    fontWeight: "600",
    fontSize: 14,
  },
  listItem: {
    fontSize: 15,
    color: "#444",
    marginBottom: 6,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#CCC",
    marginRight: 8,
  },
  statusDotConnected: {
    backgroundColor: "#4CAF50",
  },
  statusDotError: {
    backgroundColor: "#E53935",
  },
  statusText: {
    fontSize: 14,
    color: "#444",
    flexShrink: 1,
  },
});
