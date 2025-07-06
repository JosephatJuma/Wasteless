import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Chip, Text, useTheme } from "react-native-paper";
type ItemCardProps = {
  item: any;
};
const ItemCard = ({ item }: ItemCardProps) => {
  const router = useRouter();
  const { colors } = useTheme();
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

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
          <Text style={styles.description}>
            {item.description.slice(0, 100)}
            {"...."}
          </Text>
          <Chip style={styles.pill} compact>
            <Text style={styles.pillText}>{item.distance}</Text>
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
    fontFamily: "SpaceMono",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginLeft: 12,
  },
});

export default ItemCard;
