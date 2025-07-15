import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider, List, useTheme } from "react-native-paper";
interface RequestItemCardProps {
  request: any;
}

const IncomingRequestItemCard: React.FC<RequestItemCardProps> = ({
  request,
}) => {
  const imageUrl = request?.item?.images?.[0]?.url;
  const requester = request?.requested_by?.display_name ?? "Unknown";
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <List.Item
        title={request.item.title}
        description={`From: ${requester}`}
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
        right={() => <Text style={styles.statusText}>{request.status}</Text>}
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

export default IncomingRequestItemCard;
