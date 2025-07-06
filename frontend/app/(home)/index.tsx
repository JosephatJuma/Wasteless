import ItemCard from "@/components/items/ItemCard";
import { useAuth } from "@/context/AuthContext";

import { apiCLient } from "@/api/api_client";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Appbar, Avatar, FAB, useTheme } from "react-native-paper";

export default function GiveawayScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [items, setItems] = useState<any>([]);

  const handleFetchItems = async () => {
    try {
      setLoading(true);
      const { data } = await apiCLient.get("/items");
      setItems(data);
    } catch (error) {
      throw new Error(error as string);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchItems();
  }, []);

  const handleRefresh = () => {
    handleFetchItems();
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.Content
          title="WasteLess"
          titleStyle={{ fontFamily: "OutFitBold" }}
        />
        <TouchableOpacity onPress={() => router.navigate("/(home)/profile")}>
          <Avatar.Text
            size={40}
            label={user?.user_metadata?.display_name[0].toUpperCase() ?? "U"}
            color="#fff"
          />
        </TouchableOpacity>
      </Appbar.Header>

      <FlatList
        data={items}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
        renderItem={({ item }) => <ItemCard item={item} />}
        keyExtractor={(item) => item?.id}
        contentContainerStyle={styles.container}
      />

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
