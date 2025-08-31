import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from "react-native";
import { Colors } from "@/constants/Colors";

export default function GameStatsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  // Replace with actual points logic as needed
  const userPoints = 1250;
  const totalReports = 47;
  const verifiedReports = 42;
  const currentStreak = 12;
  const rank = "Conservation Hero";

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section */}
      <View
        style={[styles.header, { backgroundColor: colors.mangrove.background }]}
      >
        <Text style={[styles.title, { color: colors.text }]}>Game Stats</Text>
      </View>

      {/* Points Card */}
      <View
        style={[
          styles.pointsCard,
          { backgroundColor: colors.mangrove.statsBackground },
        ]}
      >
        <View style={styles.pointsHeader}>
          <Text style={[styles.pointsLabel, { color: colors.icon }]}>
            Total Points Earned
          </Text>
          <Text style={styles.pointsBadge}>🏆</Text>
        </View>
        <Text style={[styles.points, { color: colors.mangrove.primary }]}>
          {userPoints.toLocaleString()}
        </Text>
        <Text style={[styles.rankText, { color: colors.mangrove.secondary }]}>
          Current Rank: {rank}
        </Text>
      </View>

      {/* Stats Grid */}
      <View style={styles.statsSection}>
        <Text style={[styles.sectionTitle, { color: colors.mangrove.primary }]}>
          Detailed Statistics
        </Text>
        <View style={styles.statsGrid}>
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.mangrove.background },
            ]}
          >
            <Text style={styles.statIcon}>📋</Text>
            <Text
              style={[styles.statNumber, { color: colors.mangrove.primary }]}
            >
              {totalReports}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>
              Reports Submitted
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.mangrove.background },
            ]}
          >
            <Text style={styles.statIcon}>✅</Text>
            <Text
              style={[styles.statNumber, { color: colors.mangrove.primary }]}
            >
              {verifiedReports}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>
              Verified Reports
            </Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.mangrove.background },
            ]}
          >
            <Text style={styles.statIcon}>🔥</Text>
            <Text
              style={[styles.statNumber, { color: colors.mangrove.primary }]}
            >
              {currentStreak}
            </Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>
              Day Streak
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              { backgroundColor: colors.mangrove.background },
            ]}
          >
            <Text style={styles.statIcon}>🎯</Text>
            <Text
              style={[styles.statNumber, { color: colors.mangrove.primary }]}
            >
              {Math.round((verifiedReports / totalReports) * 100)}%
            </Text>
            <Text style={[styles.statLabel, { color: colors.text }]}>
              Accuracy Rate
            </Text>
          </View>
        </View>
      </View>

      {/* Achievements Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.mangrove.primary }]}>
          Recent Achievements
        </Text>
        <View style={styles.achievementsList}>
          <View
            style={[
              styles.achievementItem,
              { backgroundColor: colors.mangrove.background },
            ]}
          >
            <Text style={styles.achievementIcon}>🥇</Text>
            <View style={styles.achievementContent}>
              <Text style={[styles.achievementTitle, { color: colors.text }]}>
                Conservation Hero
              </Text>
              <Text style={[styles.achievementDesc, { color: colors.icon }]}>
                Reached 1,000 points milestone
              </Text>
            </View>
            <Text
              style={[
                styles.achievementPoints,
                { color: colors.mangrove.primary },
              ]}
            >
              +200
            </Text>
          </View>

          <View
            style={[
              styles.achievementItem,
              { backgroundColor: colors.mangrove.background },
            ]}
          >
            <Text style={styles.achievementIcon}>📸</Text>
            <View style={styles.achievementContent}>
              <Text style={[styles.achievementTitle, { color: colors.text }]}>
                Photo Expert
              </Text>
              <Text style={[styles.achievementDesc, { color: colors.icon }]}>
                Submitted 25 high-quality photos
              </Text>
            </View>
            <Text
              style={[
                styles.achievementPoints,
                { color: colors.mangrove.primary },
              ]}
            >
              +150
            </Text>
          </View>

          <View
            style={[
              styles.achievementItem,
              { backgroundColor: colors.mangrove.background },
            ]}
          >
            <Text style={styles.achievementIcon}>⚡</Text>
            <View style={styles.achievementContent}>
              <Text style={[styles.achievementTitle, { color: colors.text }]}>
                Speed Reporter
              </Text>
              <Text style={[styles.achievementDesc, { color: colors.icon }]}>
                10 reports submitted in one day
              </Text>
            </View>
            <Text
              style={[
                styles.achievementPoints,
                { color: colors.mangrove.primary },
              ]}
            >
              +100
            </Text>
          </View>
        </View>
      </View>

      {/* Impact Section */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={[styles.sectionTitle, { color: colors.mangrove.primary }]}>
          Your Conservation Impact
        </Text>
        <View
          style={[
            styles.impactCard,
            { backgroundColor: colors.mangrove.statsBackground },
          ]}
        >
          <Text style={[styles.impactText, { color: colors.text }]}>
            🌿 {`You've helped protect`}{" "}
            <Text
              style={{ fontWeight: "bold", color: colors.mangrove.primary }}
            >
              {Math.round(userPoints / 10)} hectares
            </Text>{" "}
            of mangrove ecosystems
          </Text>
          <Text style={[styles.impactSubtext, { color: colors.icon }]}>
            Every report contributes to conservation efforts and helps protect
            vital coastal ecosystems for future generations.
          </Text>
        </View>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  pointsCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
  },
  pointsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  pointsLabel: {
    fontSize: 16,
    marginRight: 8,
  },
  pointsBadge: {
    fontSize: 20,
  },
  points: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 8,
  },
  rankText: {
    fontSize: 18,
    fontWeight: "600",
  },
  statsSection: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  section: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  lastSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
  },
  statIcon: {
    fontSize: 28,
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
  },
  achievementsList: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 14,
    opacity: 0.8,
  },
  achievementPoints: {
    fontSize: 16,
    fontWeight: "bold",
  },
  impactCard: {
    padding: 20,
    borderRadius: 16,
  },
  impactText: {
    fontSize: 18,
    lineHeight: 26,
    marginBottom: 12,
    textAlign: "center",
  },
  impactSubtext: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    opacity: 0.8,
  },
});
