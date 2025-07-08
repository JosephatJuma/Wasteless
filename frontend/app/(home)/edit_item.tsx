import { apiClient } from "@/api/api_client";
import ErrorBanner from "@/components/alerts/ErrorBanner";
import SuccessBanner from "@/components/alerts/SuccessBanner";
import FormButton from "@/components/forms/FormButton";
import InputField from "@/components/forms/InputField";
import InputSelect from "@/components/forms/InputSelect";
import { categories, conditions } from "@/constants/options/items";
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "@/context/LocationContext";
import { shareItemSchema } from "@/validations/share_item";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useFormik } from "formik";
import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Text, useTheme } from "react-native-paper";
const EditItem = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { user } = useAuth();
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { currentLocation, locationError } = useLocation();
  const { data } = useLocalSearchParams();

  const item: any = useMemo(() => {
    try {
      return data ? JSON.parse(data.toString()) : {};
    } catch (err: any) {
      console.log(err);
      return {};
    }
  }, [data]);

  const handleCreateItem = async (values: any): Promise<void> => {
    const data = {
      ...values,
      userId: user?.id,
      location: {
        latitude: currentLocation?.coords?.latitude,
        longitude: currentLocation?.coords?.longitude,
        accuracy: currentLocation?.coords?.accuracy,
        address: "",
        city: "",
      },
    };

    setLoading(true);

    try {
      const response = await apiClient.put(`/items/${item?.id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess("Item shared successfully");
        formik.resetForm();
        setImages([]);
        router.dismissTo("/(home)");
      } else {
        const message = response.data?.message ?? "Something went wrong";
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
      title: item?.title,
      description: item?.description,
      category: item?.category,
      condition: item?.condition,
      tags: item?.tags,
    },
    validationSchema: shareItemSchema,
    onSubmit: (values) => {
      handleCreateItem(values);
    },
  });
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content
          title={"Edit Item"}
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
            //errorMessage={formik.errors.title}
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
            //errorMessage={formik.errors.description}
            error={formik.touched.description && !!formik.errors.description}
            style={[styles.descriptionInput]}
            leftIcon="comment-text-outline"
          />

          <InputSelect
            data={categories}
            label="Select Category *"
            value={formik.values.category}
            onChange={(value) => formik.setFieldValue("category", value)}
            //errorMessage={formik.errors.category}
            error={!!locationError}
            leftIcon="bookmark-box-multiple"
          />
          <InputSelect
            data={conditions}
            label="Condition *"
            value={formik.values.condition}
            onChange={(value) => formik.setFieldValue("condition", value)}
            leftIcon="flag"
            //errorMessage={formik.errors.condition}
            error={formik.touched.condition && !!formik.errors.condition}
          />

          <Text style={styles.sectionTitle}>Photos</Text>
          <View
            style={[
              styles.photoBox,
              {
                borderColor: colors.primary,
              },
            ]}
          >
            <View style={styles.imageGrid}>
              {item?.images.map((image: any, index: number) => (
                <Image
                  key={index}
                  source={image?.url}
                  style={styles.imageThumbnail}
                  placeholder={{ blurhash }}
                  contentFit="cover"
                  transition={1000}
                />
              ))}
            </View>
          </View>

          <FormButton
            mode="contained"
            onPress={() => formik.handleSubmit()}
            style={styles.submitButton}
            loading={loading}
            disabled={!formik.isValid || loading}
            icon="pencil"
          >
            Edit item
          </FormButton>
        </View>
      </ScrollView>

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

export default EditItem;
