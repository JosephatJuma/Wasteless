import { apiCLient } from "@/api/api_client";
import ErrorBanner from "@/components/alerts/ErrorBanner";
import SuccessBanner from "@/components/alerts/SuccessBanner";
import FormButton from "@/components/forms/FormButton";
import InputField from "@/components/forms/InputField";
import InputSelect from "@/components/forms/InputSelect";
import LocationDisplay from "@/components/location/LocationDisplay";
import { categories, conditions } from "@/constants/options/items";
import { useAuth } from "@/context/AuthContext";
import { shareItemSchema } from "@/validations/share_item";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Button,
  Icon,
  Modal,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
const ShareItemScreen = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { user } = useAuth();
  const [images, setImages] = useState<string[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [locationError, setLocationError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [gettingLocation, setGettingLocation] = useState<boolean>(false);

  const handleCreateItem = async (values: any): Promise<void> => {
    const formData = new FormData();

    // Append files
    for (let i = 0; i < images.length; i++) {
      formData.append("files", {
        uri: images[i],
        name: `image${i}.jpg`,
        type: "image/jpeg",
      } as any);
    }

    formData.append(
      "metadata",
      JSON.stringify({
        ...values,
        userId: user?.id,
      })
    );
    console.log(formData);

    setLoading(true);

    try {
      const response = await apiCLient.post("/items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        transformRequest: () => formData, // Important for React Native
      });

      if (response.status === 200 || response.status === 201) {
        console.log("✅ Item shared successfully:", response.data);
        setSuccess("Item shared successfully");
        formik.resetForm();
        setImages([]);
      } else {
        const message = response.data?.message ?? "Something went wrong";
        console.warn("⚠️ Unexpected status code:", response.status, message);
        setError(message);
      }
    } catch (error: unknown) {
      const message =
        (error as any)?.response?.data?.message ??
        (error as Error)?.message ??
        "Something went wrong";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      userId: user?.id,
      title: "",
      description: "",
      category: "",
      condition: "",
      tags: "",
    },
    validationSchema: shareItemSchema,
    onSubmit: (values) => {
      console.log(values);
      handleCreateItem(values);
    },
  });

  useEffect(() => {
    getCurrentLocation();
  }, []);

  let text = "Waiting for Location...";
  if (locationError) {
    text = locationError;
  } else if (location) {
    text = "Location:";
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 3,
    });

    if (!result.canceled) {
      setImages(result.assets.map((asset) => asset.uri));
    }
  };

  async function getCurrentLocation() {
    setGettingLocation(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocationError("Permission to access location was denied");
      setGettingLocation(false);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setGettingLocation(false);
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content
          title="Share an item"
          titleStyle={{ fontFamily: "OutFitBold", fontSize: 18 }}
        />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <InputField
            label="Item title *"
            mode="flat"
            value={formik.values.title}
            onChangeText={(value) => formik.setFieldValue("title", value)}
            accessibilityLabel="Item title"
            errorMessage={formik.errors.title}
            error={formik.touched.title && !!formik.errors.title}
            leftIcon="label"
          />

          <InputField
            label="Description *"
            mode="flat"
            multiline
            numberOfLines={4}
            value={formik.values.description}
            accessibilityLabel="Description"
            onChangeText={(value) => formik.setFieldValue("description", value)}
            errorMessage={formik.errors.description}
            error={formik.touched.description && !!formik.errors.description}
            style={[styles.descriptionInput]}
            leftIcon="comment-text-outline"
          />

          <InputSelect
            data={categories}
            label="Select Category *"
            value={formik.values.category}
            onChange={(value) => formik.setFieldValue("category", value)}
            errorMessage={formik.errors.category}
            error={!!locationError}
            leftIcon="bookmark-box-multiple"
          />
          <InputSelect
            data={conditions}
            label="Condition"
            value={formik.values.condition}
            onChange={(value) => formik.setFieldValue("condition", value)}
            leftIcon="flag"
            errorMessage={formik.errors.condition}
            error={formik.touched.condition && !!formik.errors.condition}
          />

          <Text style={styles.sectionTitle}>Photos</Text>
          <View
            style={[
              styles.photoBox,
              {
                borderColor: images.length > 0 ? colors.primary : colors.error,
              },
            ]}
          >
            {images.length > 0 ? (
              <View style={styles.imageGrid}>
                {images.map((image, index) => (
                  <Image
                    key={index}
                    source={{ uri: image }}
                    style={styles.imageThumbnail}
                  />
                ))}
              </View>
            ) : (
              <>
                <Text style={styles.photoTitle}>Add photos</Text>
                <Text style={styles.photoSubtitle}>
                  Upload clear photos of the item you&apos;re giving away,
                  atleas one is required
                </Text>
              </>
            )}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Button
                mode="contained-tonal"
                onPress={pickImage}
                style={styles.addPhotoButton}
                labelStyle={styles.buttonLabel}
                icon={images.length > 0 ? "plus" : "camera"}
              >
                {images.length > 0 ? "Replace photos" : "Add photos"}
              </Button>
              <Button
                mode="contained-tonal"
                onPress={() => setShowDetails(!showDetails)}
                style={styles.addPhotoButton}
                labelStyle={styles.buttonLabel}
                icon="information"
              >
                {showDetails ? "Hide details" : "Show details"}
              </Button>
            </View>
          </View>

          {showDetails && (
            <>
              <Text style={styles.sectionTitle}>Details</Text>
              <LocationDisplay location={location} />
              <InputField
                label="Tags  Seperated by a comma (e.g. size, color)"
                mode="flat"
                multiline
                numberOfLines={4}
                value={formik.values.tags}
                accessibilityLabel="Tags"
                onChangeText={(value) => formik.setFieldValue("tags", value)}
                // style={[styles.descriptionInput]}
                leftIcon="tag-multiple"
              />
            </>
          )}
          <FormButton
            mode="contained"
            onPress={() => formik.handleSubmit()}
            style={styles.submitButton}
            loading={loading}
            disabled={images.length === 0 || !formik.isValid || loading}
          >
            Post item
          </FormButton>
        </View>
      </ScrollView>
      <Portal>
        <Modal
          visible={!location}
          onDismiss={() => {}}
          contentContainerStyle={{
            backgroundColor: colors.background,
            maxHeight: "50%",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: 20,
          }}
        >
          {gettingLocation ? (
            <View>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text
                style={{
                  marginTop: 16,
                  textAlign: "center",
                  fontFamily: "OutFitRegular",
                }}
              >
                {text}
              </Text>
            </View>
          ) : (
            <>
              {locationError ? (
                <View style={{ alignItems: "center" }}>
                  <Icon source="alert-circle" color={colors.error} size={48} />
                  <Text
                    style={{ color: colors.error, fontFamily: "OutFitRegular" }}
                  >
                    {locationError}
                  </Text>
                  <FormButton onPress={getCurrentLocation}>
                    Enable Location
                  </FormButton>
                </View>
              ) : (
                <View style={{ alignItems: "center" }}>
                  <Icon
                    source="check-circle"
                    color={colors.primary}
                    size={48}
                  />
                  <Text
                    style={{
                      color: colors.primary,
                      fontFamily: "OutFitRegular",
                    }}
                  >
                    Location enabled
                  </Text>
                  <FormButton onPress={getCurrentLocation}>
                    Get Current Location
                  </FormButton>
                </View>
              )}
            </>
          )}
        </Modal>
      </Portal>
      <ErrorBanner error={error} setError={setError} />
      <SuccessBanner success={success} setSuccess={setSuccess} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  formContainer: {
    marginTop: 8,
  },

  descriptionInput: {
    minHeight: 100,
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 12,
    fontFamily: "OutFitBold",
    fontSize: 16,
  },
  photoBox: {
    borderWidth: 1,
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 24,
    borderStyle: "dashed",
    justifyContent: "center",
    minHeight: 200,
  },
  photoTitle: {
    fontFamily: "OutFitBold",
    fontSize: 16,
    marginBottom: 8,
  },
  photoSubtitle: {
    fontSize: 14,
    marginBottom: 16,
    textAlign: "center",
    fontFamily: "OutFitRegular",
    opacity: 0.7,
  },
  addPhotoButton: {
    marginTop: 16,
    width: "50%",
    borderRadius: 8,
    margin: 5,
  },
  buttonLabel: {
    fontFamily: "OutFitRegular",
    fontSize: 14,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 16,
  },
  imageThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 4,
  },
  submitButton: {
    marginTop: 8,
    borderRadius: 8,
  },
});

export default ShareItemScreen;
