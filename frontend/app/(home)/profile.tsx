import { apiCLient } from "@/api/api_client";
import ErrorBanner from "@/components/alerts/ErrorBanner";
import ItemCard from "@/components/items/ItemCard";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Avatar,
  Button,
  Dialog,
  Divider,
  Icon,
  List,
  Portal,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
const tabs = ["Profile", "My Items", "My Requests"];

const ProfileScreen = () => {
  const [selectedTab, setSelectedTab] = useState<string>("Profile");
  const [loggingOut, setLoggingOut] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showLogoutDialog, setShowLogoutDialog] = useState<boolean>(false);
  const router = useRouter();
  const { colors } = useTheme();
  const { user } = useAuth();

  const [myItems, setMyItems] = useState<any>([]);

  const handleFetchItems = async () => {
    try {
      const response = await apiCLient.get(`/items/${user?.id}/my-items`);
      setMyItems(response.data);
    } catch (error) {
      throw new Error(error as string);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      } else {
        router.replace("/login");
      }
    } catch (error) {
      setError((error as Error)?.message ?? "Something went wrong");
    } finally {
      setLoggingOut(false);
    }
  };

  useEffect(() => {
    handleFetchItems();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content
          title="Profile"
          titleStyle={{ fontFamily: "OutFitBold" }}
        />
        <Appbar.Action icon="cog" onPress={() => router.push("/settings")} />
        <Appbar.Action
          icon="logout"
          onPress={() => setShowLogoutDialog(true)}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Avatar.Image
              size={100}
              source={require("@/assets/images/samples/1.jpg")}
            />
            <View style={styles.verificationBadge}>
              {user?.user_metadata?.email_verified ? (
                <Icon
                  source="check-decagram"
                  size={20}
                  color={colors.primary}
                />
              ) : (
                <Icon source="alert-circle" size={20} color={colors.error} />
              )}
            </View>
          </View>

          <Text variant="titleLarge" style={styles.name}>
            {user?.user_metadata?.display_name || "No name provided"}
          </Text>
          <Text style={styles.handle}>
            @{user?.user_metadata?.username || "username"}
          </Text>
        </View>

        <View style={[styles.tabs, { borderBottomColor: colors.outline }]}>
          {tabs.map((tab) => (
            <TouchableRipple
              key={tab}
              onPress={() => setSelectedTab(tab)}
              borderless
              style={styles.tabButton}
            >
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && {
                    color: colors.primary,
                    fontFamily: "OutFitBold",
                  },
                ]}
              >
                {tab}
              </Text>
            </TouchableRipple>
          ))}
        </View>

        {selectedTab === "My Items" && (
          <View>
            {myItems.map((item: any, index: number) => (
              <ItemCard key={index} item={item} />
            ))}
          </View>
        )}
        {selectedTab === "Profile" && (
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Account Information
            </Text>
            <View
              style={[
                styles.infoCard,
                { backgroundColor: colors.elevation.level1 },
              ]}
            >
              <List.Item
                title="Email"
                description={user?.user_metadata?.email || "Not provided"}
                titleStyle={styles.titleStyle}
                descriptionStyle={styles.descriptionStyle}
                left={(props) => <List.Icon {...props} icon="email" />}
                descriptionNumberOfLines={2}
              />
              <Divider />
              <List.Item
                title="Account Created"
                description={moment(user?.created_at).format(
                  "DD, MMMM YYYY HH:mm A"
                )}
                titleStyle={styles.titleStyle}
                descriptionStyle={styles.descriptionStyle}
                left={(props) => <List.Icon {...props} icon="calendar" />}
              />
              <Divider />
              <List.Item
                title="Last Sign In"
                description={moment(user?.last_sign_in_at).fromNow()}
                titleStyle={styles.titleStyle}
                descriptionStyle={styles.descriptionStyle}
                left={(props) => <List.Icon {...props} icon="clock" />}
              />
              <Divider />
              <List.Item
                title="Authentication Provider"
                description={
                  user?.app_metadata?.provider?.toLocaleUpperCase() || "Email"
                }
                titleStyle={styles.titleStyle}
                descriptionStyle={styles.descriptionStyle}
                left={(props) => <List.Icon {...props} icon="shield-account" />}
              />
            </View>
          </View>
        )}
      </ScrollView>

      {/* Logout Dialog */}
      <Portal>
        <Dialog
          visible={showLogoutDialog}
          onDismiss={() => !loggingOut && setShowLogoutDialog(false)}
          style={{ borderRadius: 12 }}
        >
          <Dialog.Icon icon="logout-variant" size={36} color={colors.error} />
          <Dialog.Title style={{ textAlign: "center", fontWeight: "bold" }}>
            Log out
          </Dialog.Title>
          <Dialog.Content>
            {loggingOut ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator animating size="small" />
                <Text variant="bodyMedium">Signing you out…</Text>
              </View>
            ) : (
              <Text variant="bodyMedium">
                Are you sure you want to log out?
              </Text>
            )}
          </Dialog.Content>
          <Dialog.Actions
            style={{ justifyContent: "flex-end", paddingBottom: 8 }}
          >
            <Button
              onPress={() => setShowLogoutDialog(false)}
              disabled={loggingOut}
              mode="text"
            >
              Cancel
            </Button>
            <Button
              onPress={handleLogout}
              loading={loggingOut}
              disabled={loggingOut}
              mode="text"
              labelStyle={{ color: colors.error }}
            >
              Log out
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <ErrorBanner error={error} setError={setError} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 10,
  },
  verificationBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 2,
  },
  name: {
    marginTop: 8,
    fontFamily: "OutFitBold",
    fontSize: 22,
  },
  handle: {
    fontSize: 16,
    fontFamily: "OutFitRegular",
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontFamily: "OutFitBold",
    marginBottom: 8,
    paddingLeft: 8,
  },
  infoCard: {
    borderRadius: 12,
    elevation: 2,
    overflow: "hidden",
  },
  titleStyle: { fontFamily: "OutFitBold" },
  descriptionStyle: { fontFamily: "OutFitRegular" },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
    borderBottomWidth: 0.5,
    paddingBottom: 8,
  },
  tabButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tabText: {
    fontSize: 14,
    fontFamily: "OutFitRegular",
  },

  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 4,
  },
});

export default ProfileScreen;
