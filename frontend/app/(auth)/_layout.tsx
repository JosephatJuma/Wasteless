import { Stack } from "expo-router";
import React from "react";
const AuthenticationLayout = () => {
  return (
    <Stack screenOptions={{ headerTitleStyle: { fontFamily: "OutFitBold" } }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="register"
        options={{
          title: "Register",
        }}
      />
      <Stack.Screen name="login" options={{ title: "Login" }} />
    </Stack>
  );
};

export default AuthenticationLayout;
