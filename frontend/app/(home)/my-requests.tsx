import { apiClient } from "@/api/api_client";
import ErrorBanner from "@/components/alerts/ErrorBanner";
import OutgoingRequestItemCard from "@/components/items/OutgoingItemRequest";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Button,
  Divider,
  List,
  Text,
  useTheme,
} from "react-native-paper";
const tabs = ["Incoming", "Outgoing"];

const MyRequestsScreen = () => {
  const { user } = useAuth();
  const { colors } = useTheme();
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("Outgoing");
  const [incomingRequests, setIncomingRequests] = useState<any[]>([]);
  const [outgoingRequests, setOutgoingRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const [incomingRes, outgoingRes] = await Promise.all([
        apiClient.get(`/requests/incoming/${user?.id}`),
        apiClient.get(`/requests/outgoing/${user?.id}`),
      ]);
      setIncomingRequests(incomingRes.data);
      setOutgoingRequests(outgoingRes.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const renderRequestItem = (request: any) => (
    <View key={request.id}>
      <List.Item
        title={request?.item?.title}
        description={`From: ${request.requested_by?.display_name ?? "Unknown"}`}
        left={() => <List.Icon icon="package-variant" />}
        right={() => (
          <Text style={{ fontFamily: "OutFitRegular", color: colors.primary }}>
            {request.status}
          </Text>
        )}
      />
      <Divider />
    </View>
  );

  const requestsToShow =
    selectedTab === "Incoming" ? incomingRequests : outgoingRequests;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content
          title="My Requests"
          titleStyle={{ fontFamily: "OutFitBold" }}
        />
      </Appbar.Header>

      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <Button
            key={tab}
            onPress={() => setSelectedTab(tab)}
            mode={selectedTab === tab ? "contained" : "text"}
            style={styles.tabButton}
            labelStyle={{ fontFamily: "OutFitBold", color: "#fff" }}
          >
            {tab}
          </Button>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea}>
        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="small" />
            <Text style={{ marginTop: 8 }}>
              Loading {selectedTab.toLowerCase()} requests…
            </Text>
          </View>
        ) : requestsToShow.length === 0 ? (
          <Text style={styles.emptyText}>
            No {selectedTab.toLowerCase()} requests found.
          </Text>
        ) : (
          requestsToShow.map((item, index) => (
            <OutgoingRequestItemCard key={index} request={item} />
          ))
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
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    gap: 10,
  },
  tabButton: {
    borderRadius: 20,
  },
  scrollArea: {
    paddingHorizontal: 16,
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

export default MyRequestsScreen;
