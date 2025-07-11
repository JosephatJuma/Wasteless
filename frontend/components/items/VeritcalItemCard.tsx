import { useLocation } from "@/context/LocationContext";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import numbro from "numbro";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Chip, Text, useTheme } from "react-native-paper";

type ItemCardProps = {
  item: any;
};

const VerticalItemCard = ({ item }: ItemCardProps) => {
  const router = useRouter();
  const { getDistanceFromLatLonInMeters } = useLocation();
  const { colors } = useTheme();
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const distance = getDistanceFromLatLonInMeters(
    item?.location?.latitude,
    item?.location?.longitude
  );

  return (
    <Card
      style={[styles.card, { backgroundColor: colors.background }]}
      mode="elevated"
      elevation={5}
      onPress={() =>
        router.push({
          pathname: "/(home)/request_item",
          params: { data: JSON.stringify(item) },
        })
      }
    >
      <View style={styles.cardContent}>
        <Image
          source={item?.images[0]?.url}
          style={styles.image}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />

        <View style={styles.textContainer}>
          <Text variant="titleMedium" style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>

          <Text
            variant="bodyMedium"
            style={styles.description}
            numberOfLines={3}
          >
            {item.description}
          </Text>

          <View style={styles.footer}>
            <Chip
              style={[styles.pill, { backgroundColor: colors.surfaceVariant }]}
              compact
              icon="map-marker"
            >
              <Text style={styles.pillText}>
                {distance == null
                  ? "Calculating distance..."
                  : distance < 1000
                  ? `${numbro(distance).format({
                      thousandSeparated: true,
                    })} m away`
                  : `${numbro(distance / 1000).format({
                      mantissa: 2,
                    })} km away`}
              </Text>
            </Chip>

            {/* {item.category && (
              <Chip
                style={[
                  styles.categoryPill,
                  { backgroundColor: colors.primaryContainer },
                ]}
                compact
                textStyle={{ color: colors.onPrimaryContainer }}
              >
                {item.category.replace("_", " ")}
              </Chip>
            )} */}
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    margin: 5,
    overflow: "hidden",
    width: "48%",
  },
  cardContent: {
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: 180,
  },
  textContainer: {
    padding: 16,
  },
  title: {
    marginBottom: 8,
    fontFamily: "OutFitBold",
    fontSize: 16,
  },
  description: {
    marginBottom: 12,
    fontFamily: "OutFitRegular",
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  pill: {
    borderRadius: 16,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  pillText: {
    fontSize: 12,
    fontFamily: "OutFitMedium",
  },
  categoryPill: {
    borderRadius: 16,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default VerticalItemCard;
