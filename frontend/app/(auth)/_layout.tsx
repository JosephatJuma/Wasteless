import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "react-native-paper";
const AuthenticationLayout = () => {
  const { colors } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerTitleStyle: { fontFamily: "OutFitBold" },
        headerStyle: { backgroundColor: colors.background },
      }}
    >
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
