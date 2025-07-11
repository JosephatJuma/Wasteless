import { apiClient } from "@/api/api_client";
import ErrorBanner from "@/components/alerts/ErrorBanner";
import ItemCard from "@/components/items/ItemCard";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Appbar, Text, useTheme } from "react-native-paper";

const MyItemsScreen = () => {
  const { user } = useAuth();
  const { colors } = useTheme();
  const router = useRouter();

  const [myItems, setMyItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMyItems = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/items/${user?.id}/my-items`);
      setMyItems(res.data || []);
    } catch (err) {
      setError("Failed to load your items.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyItems();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content
          title="My Items"
          titleStyle={{ fontFamily: "OutFitBold" }}
        />
        <Appbar.Action icon="refresh" onPress={fetchMyItems} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="small" />
            <Text style={{ marginTop: 8 }}>Loading your items…</Text>
          </View>
        ) : myItems.length === 0 ? (
          <Text style={styles.emptyText}>
            You haven&apos;t posted any items yet.
          </Text>
        ) : (
          myItems.map((item, idx) => <ItemCard key={idx} item={item} />)
        )}
      </ScrollView>

      <ErrorBanner error={error} setError={setError} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  loading: {
    alignItems: "center",
    marginTop: 40,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontFamily: "OutFitRegular",
    fontSize: 14,
  },
});

export default MyItemsScreen;
