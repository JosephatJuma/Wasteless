import ItemCard from "@/components/items/ItemCard";
import { useAuth } from "@/context/AuthContext";
import { items } from "@/utils/items";
import { useRouter } from "expo-router";
import * as React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Appbar, Avatar, FAB, useTheme } from "react-native-paper";

export default function GiveawayScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { session, user } = useAuth();

  // if (!session) {
  //   router.replace("/login");
  // }
  // useEffect(() => {
  //   if (!session || session?.expires_at * 1000 > Date.now()) {
  //     router.replace("/login");
  //   }
  // }, [session,router]);

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
