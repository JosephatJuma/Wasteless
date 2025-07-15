import { Image } from "expo-image";
import { useRouter } from "expo-router";
import moment from "moment";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Chip, Divider, List, useTheme } from "react-native-paper";
interface RequestItemCardProps {
  request: any;
}

const OutgoingRequestItemCard: React.FC<RequestItemCardProps> = ({
  request,
}) => {
  const imageUrl = request?.item?.images?.[0]?.url;
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <List.Item
        title={request.item.title}
        description={moment(request.createdAt).fromNow()}
        onPress={() =>
          router.push({
            pathname: "/(home)/request-details",
            params: { data: JSON.stringify(request) },
          })
        }
        left={() =>
          imageUrl ? (
            <Image
              source={request?.item?.images?.[0]?.url}
              style={styles.image}
            />
          ) : (
            <List.Icon icon="package-variant" />
          )
        }
        right={() => <Chip compact={true}>{request.status}</Chip>}
      />
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginTop: 4,
  },
  statusText: {
    fontFamily: "OutFitRegular",
    alignSelf: "center",
    paddingRight: 8,
  },
});

export default OutgoingRequestItemCard;
