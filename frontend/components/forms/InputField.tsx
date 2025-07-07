import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";

type InputFieldProps = TextInputProps & {
  leftIcon?: string;
  rightIcon?: string;
  containerStyle?: ViewStyle;
  errorMessage?: string;
};

const InputField = ({
  leftIcon,
  rightIcon,
  errorMessage,
  ...textInputProps
}: InputFieldProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        mode="flat"
        value={textInputProps.value}
        onChangeText={textInputProps.onChangeText}
        outlineColor="#e0e0e0"
        activeOutlineColor="#6200ee"
        style={styles.input}
        contentStyle={styles.label}
        left={leftIcon && <TextInput.Icon icon={leftIcon} />}
        right={rightIcon && <TextInput.Icon icon={rightIcon} />}
        error={textInputProps.error}
        {...textInputProps}
      />
      {errorMessage && (
        <HelperText
          type="error"
          visible={true}
          style={{ fontFamily: "OutFitRegular", margin: 0 }}
        >
          {errorMessage}
        </HelperText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: "100%",
  },

  input: {
    fontFamily: "OutFitBold",
  },

  label: {
    fontFamily: "OutFitMedium",
  },
});

export default InputField;
