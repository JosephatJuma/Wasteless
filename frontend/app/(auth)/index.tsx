import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react"; // Add useEffect
import { Image, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
const images: any = {
  "1": require("../../assets/images/1.jpg"),
  "2": require("../../assets/images/2.jpg"),
  "3": require("../../assets/images/3.jpg"),
};

const WelcomeScreen = () => {
  const [current, setCurrent] = useState<string>("1");
  const router = useRouter();
  const { session } = useAuth();

  useEffect(() => {
    if (session?.expires_at && session.expires_at * 1000 > Date.now()) {
      router.replace("/(home)");
    }
  }, [session, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev: string) =>
        prev === "1" ? "2" : prev === "2" ? "3" : "1"
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Give It Away</Text>
        <Text style={styles.subtitle}>
          Give What You Don’t Need, Get What You Do
        </Text>
      </View>

      <Image
        source={images[current]}
        style={{
          width: "96%",
          height: "70%",
          margin: 20,
          borderBottomRightRadius: 40,
          borderTopLeftRadius: 40,
          alignSelf: "center",
        }}
        resizeMode="cover"
      />

      <Button
        mode="contained"
        onPress={() => router.navigate("/login")}
        style={styles.button}
        contentStyle={styles.buttonContent}
        labelStyle={{ fontFamily: "OutFitBold", color: "#fff" }}
      >
        Get Started
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  content: {
    alignItems: "center",
    marginTop: 60,
  },
  title: {
    fontSize: 26,
    marginBottom: 8,
    fontFamily: "OutFitBold",
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "OutFitRegular",
  },
  button: {
    alignSelf: "center",
    borderRadius: 30,
    width: "90%",
  },
  buttonContent: {
    paddingVertical: 8,
  },
});

export default WelcomeScreen;
