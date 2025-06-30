import { useRouter } from "expo-router";
import * as React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Appbar,
  Avatar,
  Card,
  Chip,
  FAB,
  Text,
  useTheme,
} from "react-native-paper";

const items = [
  {
    title: "Vintage Books",
    description: "A collection of classic novels in good condition.",
    distance: "2km away",
    image: require("@/assets/images/samples/1.jpg"),
    category: "Books",
  },
  {
    title: "Desk Lamp",
    description: "Adjustable desk lamp, perfect for studying or reading.",
    distance: "1.5km away",
    image: require("@/assets/images/samples/2.jpg"),
    category: "Furniture",
  },
  {
    title: "Board Games",
    description:
      "Assortment of board games, including strategy and party games.",
    distance: "3km away",
    image: require("@/assets/images/samples/3.jpg"),
    category: "Games",
  },
  {
    title: "Kitchen Utensils",
    description:
      "Set of kitchen utensils, including spatulas, spoons, and ladles.",
    distance: "1km away",
    image: require("@/assets/images/samples/1.jpg"),
    category: "Kitchen",
  },
  {
    title: "Vintage Books",
    description: "A collection of classic novels in good condition.",
    distance: "2km away",
    image: require("@/assets/images/samples/2.jpg"),
    category: "Books",
  },
  {
    title: "Vintage Books",
    description: "A collection of classic novels in good condition.",
    distance: "2km away",
    image: require("@/assets/images/samples/3.jpg"),
    category: "Books",
  },
  {
    title: "Vintage Books",
    description: "A collection of classic novels in good condition.",
    distance: "2km away",
    image: require("@/assets/images/samples/1.jpg"),
    category: "Books",
  },
  {
    title: "Vintage Books",
    description: "A collection of classic novels in good condition.",
    distance: "2km away",
    image: require("@/assets/images/samples/2.jpg"),
    category: "Books",
  },
];

export default function GiveawayScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.Content
          title="WasteLess"
          titleStyle={{ fontFamily: "OutFitBold" }}
        />
        <TouchableOpacity onPress={() => router.navigate("/(home)/profile")}>
          <Avatar.Text size={40} label="J" color="#fff" />
        </TouchableOpacity>
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        {items.map((item, index) => (
          <Card
            key={index}
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
        ))}
      </ScrollView>

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => router.navigate("/(home)/share_item")}
        color="white"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingBottom: 100,
  },
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
  fab: {
    position: "absolute",
    right: 16,
    bottom: 24,
    borderRadius: 100,
  },
});
