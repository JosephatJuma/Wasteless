import FormButton from "@/components/forms/FormButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo } from "react";

import { Image, ScrollView, StyleSheet, View } from "react-native";
import {
  Appbar,
  IconButton,
  Surface,
  Text,
  useTheme,
} from "react-native-paper";

const RequestItemScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();

  const { data } = useLocalSearchParams();

  const item: any = useMemo(() => {
    try {
      return data ? JSON.parse(data.toString()) : {};
    } catch (err: any) {
      console.log(err);
      return {};
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content
          title={item.title}
          titleStyle={{ fontFamily: "OutFitBold" }}
        />
        <Appbar.Action icon="share-variant" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.content}>
        <Image source={item.image} style={styles.image} resizeMode="cover" />

        <Surface
          style={[styles.details, { backgroundColor: colors.background }]}
        >
          <View style={styles.detailsContent}>
            <Text variant="titleMedium" style={styles.title}>
              {item.title}
            </Text>
            <Text style={styles.description}>{item.description}</Text>

            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <IconButton icon="map-marker" size={16} disabled />
                <Text style={styles.metaText}>{item.distance}</Text>
              </View>
              <View style={styles.metaItem}>
                <IconButton icon="tag" size={16} disabled />
                <Text style={styles.metaText}>{item.category}</Text>
              </View>
            </View>

            <FormButton
              mode="contained"
              onPress={() => console.log("Request This Item")}
            >
              Request This Item
            </FormButton>
          </View>
        </Surface>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 24,
  },
  image: {
    width: "100%",
    height: 300,
  },
  details: {
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    elevation: 0,
    minHeight: "100%",
  },
  detailsContent: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontFamily: "OutFitBold",
    marginBottom: 16,
    fontSize: 22,
    lineHeight: 28,
  },
  description: {
    marginBottom: 24,
    fontFamily: "OutFitRegular",
    lineHeight: 22,
    fontSize: 16,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 32,
    marginBottom: 32,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  metaText: {
    marginLeft: -8,
    fontFamily: "OutFitMedium",
    lineHeight: 22,
    fontSize: 16,
  },
});

export default RequestItemScreen;
