import FormButton from "@/components/forms/FormButton";
import InputField from "@/components/forms/InputField";
import PasswordInput from "@/components/forms/PasswordInput";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={{ width: "100%", height: "100%" }}>
        <Text style={styles.title}>Welcome, Enter Your Details to Login</Text>
        <InputField
          label="Email"
          placeholder="username@email.com"
          value={email}
          onChangeText={setEmail}
        />
        <PasswordInput
          mode="flat"
          value={password}
          onChangeText={setPassword}
        />
        <FormButton onPress={() => router.navigate("/(home)")}>
          Login
        </FormButton>
        <FormButton
          onPress={() => console.log("Login with Google Pressed")}
          icon={"google"}
          mode="outlined"
        >
          Login with Google
        </FormButton>
        <TouchableOpacity onPress={() => router.navigate("/register")}>
          <Text style={[styles.signupText, styles.text]}>
            Don&#39;t have an account?{" "}
            <Text style={{ fontFamily: "SpaceMonoBold" }}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    marginBottom: 8,
    fontFamily: "OutFitBold",
  },

  input: {
    marginBottom: 12,
    borderRadius: 10,
    fontFamily: "SpaceMono",
  },
  loginButton: {
    marginTop: 10,
    borderRadius: 25,
  },
  loginButtonContent: {
    paddingVertical: 8,
  },
  googleButton: {
    marginTop: 12,
    borderRadius: 25,
  },
  googleButtonContent: {
    paddingVertical: 8,
  },
  btnLabel: {
    fontFamily: "SpaceMonoBold",
  },
  signupText: {
    marginTop: 18,
    textAlign: "center",
    fontFamily: "SpaceMono",
  },
  text: {
    fontFamily: "SpaceMono",
  },
});

export default LoginScreen;
