import { apiClient } from "@/api/api_client";
import ItemCard from "@/components/items/ItemCard";
import { useAuth } from "@/context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  FAB,
  Text,
  useTheme,
} from "react-native-paper";

export default function GiveawayScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [items, setItems] = useState<any>([]);

  const handleFetchItems = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await apiClient.get("/items");
      setItems(data);
    } catch (error) {
      setError((error as Error)?.message ?? "Something went wrong");
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
        ListEmptyComponent={
          <View style={styles.ListEmptyContainer}>
            <View
              style={{
                alignItems: "center",
                maxWidth: 300,
              }}
            >
              {error ? (
                <>
                  <MaterialIcons name="error-outline" size={48} color="#ccc" />
                  <Text style={styles.listEmptyText}>No items found</Text>
                  <Text style={styles.listEmptySubtext}>
                    We couldn&apos;t find what you&apos;re looking for.
                  </Text>
                  <Text
                    style={[styles.listEmptySubtext, { color: colors.error }]}
                  >
                    Reason: {error}
                  </Text>
                </>
              ) : (
                <>
                  <MaterialIcons name="location-off" size={48} color="#ccc" />
                  <Text style={styles.listEmptyText}>No items near you</Text>
                  <Text style={styles.listEmptySubtext}>
                    There are currently no items posted in your area.
                  </Text>
                  <Text style={styles.listEmptySubtext}>
                    Check back later or be the first to share something!
                  </Text>
                </>
              )}
              <Button
                onPress={handleRefresh}
                contentStyle={styles.listEmptyButtonContent}
                style={{ borderRadius: 80 }}
                mode="contained"
                labelStyle={{
                  color: "#fff",
                  fontFamily: "OutFitBold",
                }}
                icon={"refresh"}
              >
                Try Again
              </Button>
            </View>
          </View>
        }
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
  ListEmptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    alignSelf: "center",
    alignContent: "center",
  },
  listEmptyText: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: "center",
    fontFamily: "OutFitBold",
  },
  listEmptySubtext: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "OutFitRegular",
  },
  listEmptyButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 24,
    borderRadius: 100,
  },
});
