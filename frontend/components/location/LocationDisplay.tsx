import { MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import moment from "moment";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text, TouchableRipple, useTheme } from "react-native-paper";
export type LocationDisplayProps = {
  location: Location.LocationObject | null;
};

const LocationDisplay = ({ location }: LocationDisplayProps) => {
  const { colors } = useTheme();
  const [showDetails, setShowDetails] = useState(false);

  if (!location) return null;

  const { coords } = location;

  const formatCoordinate = (coord: number) => coord.toFixed(6);
  const formatAccuracy = (accuracy?: number | null) =>
    accuracy ? `±${accuracy.toFixed(0)}m` : "N/A";
  const formatDate = (timestamp: number | null) => {
    return moment(timestamp).fromNow();
  };

  const toggleDetails = () => setShowDetails(!showDetails);

  return (
    <View
      style={[styles.container, { backgroundColor: colors.surfaceVariant }]}
    >
      <TouchableRipple onPress={toggleDetails} style={styles.header}>
        <View style={styles.headerContent}>
          <Icon source="map-marker" size={24} color={colors.primary} />
          <Text variant="titleMedium" style={styles.title}>
            Current Location
          </Text>
          <MaterialIcons
            name={showDetails ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={24}
            color={colors.onSurface}
            style={styles.toggleIcon}
          />
        </View>
      </TouchableRipple>

      <View style={styles.detailRow}>
        <MaterialIcons name="my-location" size={20} color={colors.onSurface} />
        <Text style={styles.detailText}>
          {formatCoordinate(coords.latitude)},{" "}
          {formatCoordinate(coords.longitude)}
        </Text>
      </View>

      {showDetails && (
        <>
          <View style={styles.detailRow}>
            <MaterialIcons
              name="check-circle"
              size={20}
              color={colors.onSurface}
            />
            <Text style={styles.detailText}>
              Accuracy: {formatAccuracy(coords.accuracy)}
            </Text>
          </View>

          {coords.altitude && (
            <View style={styles.detailRow}>
              <MaterialIcons
                name="terrain"
                size={20}
                color={colors.onSurface}
              />
              <Text style={styles.detailText}>
                Altitude: {coords.altitude.toFixed(1)}m (
                {formatAccuracy(coords.altitudeAccuracy)})
              </Text>
            </View>
          )}

          <View style={styles.detailRow}>
            <MaterialIcons
              name="access-time"
              size={20}
              color={colors.onSurface}
            />
            <Text style={styles.detailText}>
              Updated: {formatDate(location.timestamp)}
            </Text>
          </View>

          {location.mocked && (
            <View
              style={[
                styles.warning,
                { backgroundColor: colors.errorContainer },
              ]}
            >
              <MaterialIcons
                name="warning"
                size={16}
                color={colors.onErrorContainer}
              />
              <Text
                variant="labelSmall"
                style={{ color: colors.onErrorContainer }}
              >
                Mock location detected
              </Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  header: {
    marginBottom: 12,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    marginLeft: 8,
    flex: 1,
  },
  toggleIcon: {
    marginLeft: "auto",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
  },
  warning: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    marginTop: 12,
  },
});

export default LocationDisplay;
