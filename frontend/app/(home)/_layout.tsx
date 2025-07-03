import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "react-native-paper";
const HomeLayout = () => {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: { fontFamily: "OutFitBold" },
        headerStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="share_item" options={{ headerShown: false }} />
      <Stack.Screen name="request_item" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings"
        options={{ headerShown: true, title: "Settings" }}
      />
    </Stack>
  );
};

export default HomeLayout;
