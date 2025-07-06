import FormButton from "@/components/forms/FormButton";
import { useAuth } from "@/context/AuthContext";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import {
  Appbar,
  IconButton,
  Surface,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

const { width } = Dimensions.get("window");

const RequestItemScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { user } = useAuth();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const { data } = useLocalSearchParams();

  const item: any = useMemo(() => {
    try {
      return data ? JSON.parse(data.toString()) : {};
    } catch (err: any) {
      console.log(err);
      return {};
    }
  }, [data]);
  console.log(data.location);

  const handleImageSwipe = (direction: "left" | "right") => {
    if (!item.images || item.images.length <= 1) return;

    if (direction === "left") {
      setActiveImageIndex((prev) =>
        prev === item.images.length - 1 ? 0 : prev + 1
      );
    } else {
      setActiveImageIndex((prev) =>
        prev === 0 ? item.images.length - 1 : prev - 1
      );
    }
  };

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

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={item?.images?.[activeImageIndex]?.url}
            style={styles.image}
            placeholder={{ blurhash }}
            contentFit="cover"
            transition={1000}
          />

          {item.images?.length > 1 && (
            <>
              <View style={styles.imageNavigation}>
                <TouchableRipple
                  style={styles.navButton}
                  onPress={() => handleImageSwipe("right")}
                  borderless
                >
                  <IconButton icon="chevron-left" size={24} />
                </TouchableRipple>
                <TouchableRipple
                  style={styles.navButton}
                  onPress={() => handleImageSwipe("left")}
                  borderless
                >
                  <IconButton icon="chevron-right" size={24} />
                </TouchableRipple>
              </View>

              {/* <View style={styles.dotIndicatorContainer}>
                {item.images.map((_, index) => (
                  <DotIndicator
                    key={index}
                    size={8}
                    selected={index === activeImageIndex}
                    selectedColor={colors.primary}
                    unselectedColor={colors.onSurfaceDisabled}
                  />
                ))}
              </View> */}
            </>
          )}
        </View>

        <Surface
          style={[styles.details, { backgroundColor: colors.background }]}
          elevation={2}
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

            {item.userId === user?.id ? (
              <FormButton
                mode="outlined"
                icon={"pencil"}
                onPress={() => {
                  // router.push({
                  //   pathname: "/(home)/edit_item",
                  //   params: { data: JSON.stringify(item) },
                  // });
                }}
                style={styles.button}
              >
                Edit Item
              </FormButton>
            ) : (
              <FormButton
                mode="contained"
                onPress={() => console.log("Request This Item")}
                style={styles.button}
              >
                Request This Item
              </FormButton>
            )}
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
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 300,
  },
  imageNavigation: {
    position: "absolute",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  navButton: {
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  dotIndicatorContainer: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
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
  button: {
    marginTop: 16,
  },
});

export default RequestItemScreen;
