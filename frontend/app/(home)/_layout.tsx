import { Stack } from "expo-router";
import React from "react";
const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="profile" options={{ headerShown: false }} />
      <Stack.Screen name="share_item" options={{ headerShown: false }} />
      <Stack.Screen name="request_item" options={{ headerShown: false }} />
    </Stack>
  );
};

export default HomeLayout;
