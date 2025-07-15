import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Chip,
  Divider,
  Icon,
  Text,
  useTheme,
} from "react-native-paper";

const IncomingRequestDetailScreen = () => {
  const { colors } = useTheme();
  const { data } = useLocalSearchParams();

  const request: any = useMemo(() => {
    try {
      return data ? JSON.parse(data.toString()) : {};
    } catch (err: any) {
      console.log(err);
      return {};
    }
  }, [data]);
  const handleCancelRequest = () => {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={[styles.card, { backgroundColor: colors.surface }]}>
        <Card.Content>
          {/* Header with requester info */}
          <View style={styles.header}>
            <View style={styles.headerText}>
              {/* <Text variant="titleMedium">
                {request.requested_by.display_name}
              </Text> */}
              <Text variant="bodySmall">
                Requested {new Date(request.createdAt).toLocaleDateString()}
              </Text>
            </View>
            <Chip mode="outlined" style={[styles.statusChip, {}]}>
              {request.status}
            </Chip>
          </View>

          <Divider
            style={[styles.divider, { backgroundColor: colors.outline }]}
          />

          {/* Item details */}
          <Text variant="titleLarge" style={[styles.sectionTitle]}>
            {request.item.title}
          </Text>

          {request.item.images?.[0]?.url && (
            <Image
              source={{ uri: request.item.images[0].url }}
              style={styles.itemImage}
              contentFit="cover"
              transition={300}
            />
          )}

          <View style={styles.detailRow}>
            <Icon source="tag-outline" size={20} />
            <Text variant="bodyMedium" style={[styles.detailText]}>
              {request.item.category.replace(/_/g, " ")}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Icon source="cube-outline" size={20} />
            <Text variant="bodyMedium" style={[styles.detailText]}>
              {request.item.condition.replace(/_/g, " ")}
            </Text>
          </View>

          {request.item.location?.address && (
            <View style={styles.detailRow}>
              <Icon source="map-marker-outline" size={20} />
              <Text variant="bodyMedium" style={[styles.detailText]}>
                {request.item.location.address}
              </Text>
            </View>
          )}

          <Divider
            style={[styles.divider, { backgroundColor: colors.outline }]}
          />

          {/* Description */}
          <Text variant="titleSmall" style={[styles.sectionTitle]}>
            Description
          </Text>
          <Text
            variant="bodyMedium"
            style={{ marginBottom: 16, fontFamily: "OutFitRegular" }}
          >
            {request.item.description}
          </Text>

          {/* Notes */}
          {request.notes && (
            <>
              <Text variant="titleSmall" style={[styles.sectionTitle]}>
                Requester&apos;s Notes
              </Text>
              <Text variant="bodyMedium">{request?.notes}</Text>
            </>
          )}
        </Card.Content>
      </Card>

      {/* Action buttons */}
      <View style={styles.buttonContainer}>
        <Button
          mode="contained-tonal"
          icon="close-circle-outline"
          onPress={handleCancelRequest}
          style={[styles.button, { backgroundColor: colors.errorContainer }]}
          labelStyle={{ color: colors.onErrorContainer }}
          disabled={request.status !== "PENDING"}
        >
          Cancel Request
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    marginBottom: 16,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    marginRight: 12,
    backgroundColor: "transparent",
  },
  headerText: {
    flex: 1,
  },
  statusChip: {
    backgroundColor: "transparent",
  },
  divider: {
    marginVertical: 12,
  },
  sectionTitle: {
    marginBottom: 8,
    fontFamily: "OutFitBold",
  },
  itemImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginVertical: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    flexShrink: 1,
    fontFamily: "OutFitMedium",
  },
  buttonContainer: {
    paddingHorizontal: 8,
  },
  button: {
    borderRadius: 8,
    marginTop: 8,
  },
});

export default IncomingRequestDetailScreen;
