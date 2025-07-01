import ItemCard from "@/components/items/ItemCard";
import { useRouter } from "expo-router";
import * as React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Appbar, Avatar, FAB, useTheme } from "react-native-paper";

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
          <ItemCard key={index} item={item} />
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

  fab: {
    position: "absolute",
    right: 16,
    bottom: 24,
    borderRadius: 100,
  },
});
