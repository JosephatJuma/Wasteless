import React, { useEffect } from "react";
import { Banner, Icon, Text, useTheme } from "react-native-paper";
type Props = {
  success: string | null;
};

const SuccessBanner = ({
  success,
  setSuccess,
}: Props & { setSuccess: any }) => {
  const { colors } = useTheme();
  useEffect(() => {
    if (!success) return;

    const timeout = setTimeout(() => {
      setSuccess("");
    }, 3000);

    return () => clearTimeout(timeout); // cleanup on unmount or before next effect
  }, [success, setSuccess]);
  return (
    <Banner
      visible={!!success}
      actions={[
        {
          label: "Ok",
          onPress: () => setSuccess(""),
          labelStyle: { fontFamily: "OutFitBold", color: "#fff" },
        },
      ]}
      style={{ backgroundColor: colors.primary }}
    >
      <Icon source="check-circle" color={"#fff"} size={24} />
      <Text
        style={{
          fontFamily: "OutFitRegular",
          fontSize: 16,
          color: "#fff",
        }}
      >
        {success}
      </Text>
    </Banner>
  );
};

export default SuccessBanner;
