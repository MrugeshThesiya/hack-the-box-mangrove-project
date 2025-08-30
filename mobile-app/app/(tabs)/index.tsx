import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { ActivityIndicator } from "react-native";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const colorScheme = useColorScheme();

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Camera access is needed to capture mangrove photos."
      );
      return false;
    }
    return true;
  };

  const capturePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setCapturedImage(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to capture photo. Please try again.");
    }
  };

  const requestLocationPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Location access is needed to send your coordinates."
      );
      return false;
    }
    return true;
  };

  const sendLocation = async () => {
    setLocationLoading(true);
    const hasPermission = await requestLocationPermissions();
    if (!hasPermission) {
      setLocationLoading(false);
      return;
    }

    try {
      const loc = await Location.getCurrentPositionAsync({});
      // Defensive check for coords
      if (
        loc &&
        loc.coords &&
        typeof loc.coords.latitude === "number" &&
        typeof loc.coords.longitude === "number"
      ) {
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
      } else {
        Alert.alert("Error", "Location data is unavailable.");
        setLocation(null);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to get location. Please try again.");
      setLocation(null);
    } finally {
      setLocationLoading(false);
    }
  };

  const isDark = colorScheme === "dark";

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "transparent", dark: "transparent" }}
      headerImage={
        <Image
          source={
            "https://images.unsplash.com/photo-1589556183130-530470785fab?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          style={{
            height: 250, // matches HEADER_HEIGHT in ParallaxScrollView
            width: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            resizeMode: "cover",
            opacity: 1,
          }}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={[styles.title, { color: isDark ? "#81C784" : "#2E7D32" }]}
        >
          Mangrove Guardian
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Help protect and monitor mangrove forests
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.captureContainer}>
        <ThemedText
          type="subtitle"
          style={[
            styles.sectionTitle,
            { color: isDark ? "#81C784" : "#2E7D32" },
          ]}
        >
          Document Mangroves
        </ThemedText>
        <TouchableOpacity
          style={[
            styles.captureButton,
            { backgroundColor: isDark ? "#388E3C" : "#4CAF50" },
          ]}
          onPress={capturePhoto}
        >
          <ThemedText style={styles.captureButtonText}>
            📸 Capture a Mangrove
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.captureButton,
            { backgroundColor: isDark ? "#1565C0" : "#1976D2" },
          ]}
          onPress={sendLocation}
        >
          <ThemedText style={styles.captureButtonText}>
            📍 Show Location
          </ThemedText>
        </TouchableOpacity>

        {/* Loader while fetching location */}
        {locationLoading && (
          <View style={{ marginTop: 12, alignItems: "center" }}>
            <ActivityIndicator
              size="large"
              color={isDark ? "#81C784" : "#2E7D32"}
            />
            <ThemedText>Fetching coordinates...</ThemedText>
          </View>
        )}

        {/* Display location if available */}
        {location && !locationLoading && (
          <View
            style={{ marginTop: 12, alignItems: "center", marginBottom: 20 }}
          >
            <ThemedText
              style={{
                color: isDark ? "#81C784" : "#2E7D32",
                fontWeight: "bold",
              }}
            >
              Your Coordinates:
            </ThemedText>
            <ThemedText>{location.latitude}</ThemedText>
            <ThemedText>{location.longitude}</ThemedText>
          </View>
        )}

        {capturedImage && (
          <View style={styles.imageContainer}>
            <ThemedText
              style={[
                styles.imageLabel,
                { color: isDark ? "#81C784" : "#2E7D32" },
              ]}
            >
              Your Latest Capture:
            </ThemedText>
            <Image
              source={{ uri: capturedImage }}
              style={styles.capturedImage}
            />
            <ThemedText style={styles.imageNote}>
              Great shot! This image will help in our conservation efforts.
            </ThemedText>
          </View>
        )}
      </ThemedView>

      <ThemedView
        style={[
          styles.missionContainer,
          { backgroundColor: isDark ? "#2E4B34" : "#E8F5E8" },
        ]}
      >
        <ThemedText
          type="subtitle"
          style={[
            styles.sectionTitle,
            { color: isDark ? "#81C784" : "#2E7D32" },
          ]}
        >
          Our Mission
        </ThemedText>
        <ThemedText style={styles.missionText}>
          Join us in documenting and preserving mangrove ecosystems. Every photo
          you capture helps scientists track the health and changes in these
          vital coastal forests.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.8,
  },
  missionContainer: {
    marginVertical: 20,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    marginBottom: 12,
    textAlign: "center",
  },
  missionText: {
    lineHeight: 22,
    opacity: 0.9,
    textAlign: "center",
  },
  captureContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  captureButton: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 25,
    marginVertical: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  captureButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  imageLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  capturedImage: {
    width: 280,
    height: 210,
    borderRadius: 12,
    marginBottom: 12,
  },
  imageNote: {
    textAlign: "center",
    fontStyle: "italic",
    opacity: 0.8,
    paddingHorizontal: 20,
  },
  statsContainer: {
    marginVertical: 20,
    padding: 16,
    borderRadius: 12,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.8,
    marginTop: 4,
  },
  headerImage: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
    opacity: 0.3,
  },
});
