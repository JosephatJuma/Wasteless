import FormButton from "@/components/forms/FormButton";
import InputField from "@/components/forms/InputField";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Button, Text, TextInput, useTheme } from "react-native-paper";
const ShareItemScreen = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [location, setLocation] = React.useState("");
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content
          title="Share an item"
          titleStyle={{ fontFamily: "OutFitBold" }}
        />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <InputField
          label="Item title"
          mode="flat"
          value={title}
          onChangeText={setTitle}
        />

        <InputField
          label="Description"
          mode="flat"
          multiline
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />

        <InputField
          label="Category"
          mode="flat"
          value={category}
          onChangeText={setCategory}
        />

        <TextInput
          label="Location"
          mode="flat"
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.sectionTitle}>Add photos</Text>
        <View style={[styles.photoBox, { borderColor: colors.primary }]}>
          <Text style={styles.photoTitle}>Add photos</Text>
          <Text style={styles.photoSubtitle}>
            Add photos of the item you&apos;re giving away
          </Text>
          <Button
            mode="contained-tonal"
            onPress={() => console.log("Add photos pressed")}
            style={{}}
            labelStyle={{ fontFamily: "OutFitRegular" }}
          >
            Add photos
          </Button>
        </View>

        <FormButton mode="contained" onPress={() => console.log("Share item")}>
          Share item
        </FormButton>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 100,
  },
  sectionTitle: {
    marginTop: 10,
    marginBottom: 5,
    fontFamily: "OutFitBold",
    fontSize: 16,
  },
  photoBox: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    borderStyle: "dashed",
    justifyContent: "center",
    height: 250,
  },
  photoTitle: {
    fontFamily: "OutFitBold",
    marginBottom: 5,
  },
  photoSubtitle: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "OutFitRegular",
  },
});

export default ShareItemScreen;
