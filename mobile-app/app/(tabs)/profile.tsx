import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors";

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const colors = Colors[colorScheme ?? "light"];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View
        style={[styles.header, { backgroundColor: colors.mangrove.background }]}
      >
        <Image
          source={{ uri: "https://i.pravatar.cc/150?img=68" }}
          style={styles.avatar}
        />
        <Text style={[styles.name, { color: colors.text }]}>Arjun Patel</Text>
        <Text style={[styles.email, { color: colors.icon }]}>
          arjun.patel@gmail.com
        </Text>
        <Text style={[styles.location, { color: colors.mangrove.primary }]}>
          📍 Mumbai, Maharashtra
        </Text>
      </View>

      {/* Stats Section */}
      <View
        style={[
          styles.statsContainer,
          { backgroundColor: colors.mangrove.statsBackground },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.mangrove.primary }]}>
          Conservation Stats
        </Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text
              style={[styles.statNumber, { color: colors.mangrove.primary }]}
            >
              47
            </Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>
              Photos Captured
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text
              style={[styles.statNumber, { color: colors.mangrove.primary }]}
            >
              12
            </Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>
              Regions Visited
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text
              style={[styles.statNumber, { color: colors.mangrove.primary }]}
            >
              156
            </Text>
            <Text style={[styles.statLabel, { color: colors.icon }]}>
              Trees Docu-mented
            </Text>
          </View>
        </View>
      </View>

      {/* Bio Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.mangrove.primary }]}>
          About Me
        </Text>
        <Text style={[styles.bioText, { color: colors.text }]}>
          Marine biologist passionate about coastal conservation. Working with
          local communities in the Sundarbans and Konkan coast to protect
          mangrove ecosystems. Believer in citizen science and sustainable
          development.
        </Text>
      </View>

      {/* Recent Activity */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.mangrove.primary }]}>
          Recent Activity
        </Text>
        <View style={styles.activityList}>
          <View
            style={[
              styles.activityItem,
              { backgroundColor: colors.mangrove.background },
            ]}
          >
            <Text style={styles.activityIcon}>🌿</Text>
            <View style={styles.activityContent}>
              <Text style={[styles.activityTitle, { color: colors.text }]}>
                Documented Rhizophora in Goa
              </Text>
              <Text style={[styles.activityTime, { color: colors.icon }]}>
                2 days ago
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.activityItem,
              { backgroundColor: colors.mangrove.background },
            ]}
          >
            <Text style={styles.activityIcon}>📸</Text>
            <View style={styles.activityContent}>
              <Text style={[styles.activityTitle, { color: colors.text }]}>
                Captured 15 new mangrove photos
              </Text>
              <Text style={[styles.activityTime, { color: colors.icon }]}>
                1 week ago
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.activityItem,
              { backgroundColor: colors.mangrove.background },
            ]}
          >
            <Text style={styles.activityIcon}>🏆</Text>
            <View style={styles.activityContent}>
              <Text style={[styles.activityTitle, { color: colors.text }]}>
                Achieved Conservation Hero badge
              </Text>
              <Text style={[styles.activityTime, { color: colors.icon }]}>
                2 weeks ago
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Favorite Locations */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.mangrove.primary }]}>
          Favorite Mangrove Locations
        </Text>
        <View style={styles.locationsList}>
          <TouchableOpacity
            style={[
              styles.locationCard,
              { backgroundColor: colors.mangrove.background },
            ]}
          >
            <Text style={styles.locationEmoji}>🌊</Text>
            <View style={styles.locationInfo}>
              <Text style={[styles.locationName, { color: colors.text }]}>
                Sundarbans, West Bengal
              </Text>
              <Text style={[styles.locationDesc, { color: colors.icon }]}>
                {`World's largest mangrove forest`}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.locationCard,
              { backgroundColor: colors.mangrove.background },
            ]}
          >
            <Text style={styles.locationEmoji}>🏝️</Text>
            <View style={styles.locationInfo}>
              <Text style={[styles.locationName, { color: colors.text }]}>
                Pichavaram, Tamil Nadu
              </Text>
              <Text style={[styles.locationDesc, { color: colors.icon }]}>
                Beautiful backwater mangroves
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.locationCard,
              { backgroundColor: colors.mangrove.background },
            ]}
          >
            <Text style={styles.locationEmoji}>🌴</Text>
            <View style={styles.locationInfo}>
              <Text style={[styles.locationName, { color: colors.text }]}>
                Bhitarkanika, Odisha
              </Text>
              <Text style={[styles.locationDesc, { color: colors.icon }]}>
                Rich biodiversity hotspot
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            { backgroundColor: colors.mangrove.primary },
          ]}
        >
          <Text style={styles.actionButtonText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: "transparent",
              borderWidth: 2,
              borderColor: colors.mangrove.primary,
            },
          ]}
        >
          <Text
            style={[
              styles.actionButtonText,
              { color: colors.mangrove.primary },
            ]}
          >
            Share Profile
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 4,
    borderColor: "#fff",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    fontWeight: "600",
  },
  statsContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
    borderRadius: 16,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    paddingHorizontal: 10,
  },
  statItem: {
    alignItems: "center",
    flex: 1,
    maxWidth: "30%",
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
    lineHeight: 16,
  },
  section: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  bioText: {
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.8,
  },
  activityList: {
    gap: 12,
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 14,
  },
  locationsList: {
    gap: 12,
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  locationEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  locationInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  locationDesc: {
    fontSize: 14,
  },
  actionsContainer: {
    marginHorizontal: 20,
    marginVertical: 20,
    gap: 12,
  },
  actionButton: {
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
