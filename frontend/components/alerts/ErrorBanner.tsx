import React from "react";
import { Banner, Icon, Text, useTheme } from "react-native-paper";
type Props = {
  error: string;
};

const ErrorBanner = ({ error, setError }: Props & { setError: any }) => {
  const { colors } = useTheme();
  return (
    <Banner
      visible={!!error}
      actions={[
        {
          label: "Dismiss",
          onPress: () => setError(""),
          labelStyle: { fontFamily: "OutFitBold" },
        },
      ]}
      style={{ backgroundColor: colors.error }}
    >
      <Icon source="alert-circle" color={colors.onError} size={24} />
      <Text
        style={{
          fontFamily: "OutFitRegular",
          fontSize: 16,
          color: colors.onError,
        }}
      >
        {error}
      </Text>
    </Banner>
  );
};

export default ErrorBanner;
