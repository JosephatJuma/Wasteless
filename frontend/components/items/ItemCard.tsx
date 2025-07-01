import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { Card, Chip, Text, useTheme } from "react-native-paper";
type ItemCardProps = {
  item: any;
};
const ItemCard = ({ item }: ItemCardProps) => {
  const router = useRouter();
  const { colors } = useTheme();
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
          <Text style={styles.description}>{item.description}</Text>
          <Chip style={styles.pill} compact>
            <Text style={styles.pillText}>{item.distance}</Text>
          </Chip>
        </View>
        <Image source={item.image} style={styles.image} />
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
