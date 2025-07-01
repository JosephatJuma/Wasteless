import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  Appbar,
  Avatar,
  Button,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
const tabs = ["My Items", "My Requests", "Settings"];

const ProfileScreen = () => {
  const [selectedTab, setSelectedTab] = useState("My Requests");
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content
          title="Profile"
          titleStyle={{ fontFamily: "OutFitBold" }}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profile}>
          <Avatar.Image
            size={100}
            source={require("@/assets/images/samples/1.jpg")}
          />
          <Text variant="titleMedium" style={styles.name}>
            Sophia Carter
          </Text>
          <Text style={styles.handle}>@sophiac</Text>
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

        <View style={styles.logoutWrapper}>
          <Button
            mode="contained-tonal"
            onPress={() => console.log("Log out")}
            style={styles.logoutButton}
            compact
          >
            Log Out
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  content: {
    padding: 10,
    paddingBottom: 40,
  },
  profile: {
    alignItems: "center",
    marginTop: 10,
  },
  name: {
    marginTop: 10,
    fontFamily: "OutFitBold",
    fontSize: 20,
  },
  handle: {
    fontSize: 16,
    fontFamily: "OutFitRegular",
  },
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

  logoutWrapper: {
    marginTop: 40,
    alignItems: "center",
  },
  logoutButton: {
    width: "80%",
    borderRadius: 30,
  },
});

export default ProfileScreen;
