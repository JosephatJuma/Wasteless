import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { Button, ButtonProps, useTheme } from "react-native-paper";

type FormButtonProps = ButtonProps & {
  loading?: boolean;
  fullWidth?: boolean;
  containerStyle?: ViewStyle;
  textColor?: string;
  bold?: boolean;
};

const FormButton = ({
  mode = "contained",
  loading = false,
  fullWidth = true,
  containerStyle,
  textColor,
  bold = true,
  children,
  ...props
}: FormButtonProps) => {
  const theme = useTheme();

  return (
    <Button
      mode={mode}
      loading={loading}
      contentStyle={[styles.content, containerStyle, { paddingVertical: 5 }]}
      labelStyle={[
        styles.label,
        bold && styles.boldText,
        {
          color:
            textColor || (mode === "contained" ? "#fff" : theme.colors.primary),
        },
      ]}
      style={[
        styles.button,
        fullWidth && styles.fullWidth,
        mode === "outlined" && {
          borderWidth: 1.5,
          borderColor: theme.colors.primary,
        },
      ]}
      {...props}
    >
      {children}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    borderRadius: 30,
    width: "90%",
    marginVertical: 8,
  },
  content: {
    paddingVertical: 8,
  },
  label: {
    fontFamily: "OutFitBold",
  },
  boldText: {
    fontFamily: "OutFitBold",
  },

  fullWidth: {
    width: "100%",
  },
});

export default FormButton;
