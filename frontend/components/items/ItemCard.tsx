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
const ItemCard = ({ item }: ItemCardProps) => {
  const router = useRouter();
  const { getDistanceFromLatLonInMeters } = useLocation();
  const { colors } = useTheme();
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
  const distance = getDistanceFromLatLonInMeters(
    item?.location?.latitude,
    item?.location?.longitude
  );
  console.log(item?.location?.latitude, item?.location?.longitude);
  return (
    <Card
      style={[styles.card, { backgroundColor: colors.background }]}
      mode="contained"
      onPress={() =>
        router.push({
          pathname: "/(home)/request_item",
          params: { data: JSON.stringify(item) },
        })
      }
    >
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text variant="titleMedium" style={styles.title}>
            {item.title}
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            {item.description.slice(0, 100)}
            {item.description.length > 100 ? "...." : ""}
          </Text>

          <Chip style={styles.pill} compact>
            <Text style={styles.pillText}>
              {distance == null
                ? "Calculating distance..."
                : distance < 1000
                ? `${numbro(distance).format({
                    thousandSeparated: true,
                  })} m away`
                : `${numbro(distance / 1000).format({ mantissa: 2 })} km away`}
            </Text>
          </Chip>
        </View>
        <Image
          source={item?.images[1]?.url}
          style={styles.image}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 0,
    elevation: 0,
  },
  row: {
    flexDirection: "row",
    padding: 16,
  },
  title: {
    marginBottom: 4,
    fontFamily: "OutFitBold",
  },
  description: {
    marginBottom: 8,
    fontFamily: "OutFitRegular",
  },
  pill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 50,
  },
  pillText: {
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "OutFitBold",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginLeft: 12,
  },
});

export default ItemCard;
