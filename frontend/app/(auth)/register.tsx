import FormButton from "@/components/forms/FormButton";
import InputField from "@/components/forms/InputField";
import PasswordInput from "@/components/forms/PasswordInput";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";
const RegisterScreen = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { colors } = useTheme();

  const router = useRouter();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={styles.header}>Create Account</Text>
      <ScrollView>
        <TextInput
          label="Name"
          placeholder={"John Doe"}
          value={name}
          onChangeText={(text) => setName(text)}
          mode="flat"
        />

        <InputField
          placeholder="username@email.com"
          label={"Email"}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <PasswordInput
          placeholder="Password"
          value={password}
          label={"Create Password"}
          onChangeText={(text) => setPassword(text)}
        />
        <PasswordInput
          placeholder="Confirm Password"
          label={"Confirm Password"}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <FormButton onPress={() => console.log("Register Pressed")}>
          Register
        </FormButton>

        <FormButton
          mode="outlined"
          onPress={() => console.log("Google Sign-Up")}
          icon={"google"}
        >
          Sign Up with Google
        </FormButton>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Text style={styles.loginText}>Log In</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  header: {
    fontSize: 20,
    fontFamily: "OutFitBold",
    alignSelf: "center",
    marginBottom: 10,
  },
  subheader: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 20,
  },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    fontFamily: "SpaceMono",
  },
  loginText: {
    fontFamily: "SpaceMonoBold",
  },
});

export default RegisterScreen;
