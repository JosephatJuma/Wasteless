import React, { useState } from "react";
import { Keyboard, StyleSheet, View, ViewStyle } from "react-native";
import { HelperText, TextInput, TextInputProps } from "react-native-paper";

type InputFieldProps = TextInputProps & {
  containerStyle?: ViewStyle;
  errorMessage?: string;
};
const PasswordInput = ({
  errorMessage,
  ...textInputProps
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={textInputProps.placeholder}
        label={textInputProps.label}
        contentStyle={styles.label}
        mode="flat"
        value={textInputProps.value}
        onChangeText={textInputProps.onChangeText}
        secureTextEntry={showPassword ? false : true}
        style={styles.input}
        left={<TextInput.Icon icon={"lock"} />}
        right={
          <TextInput.Icon
            icon={showPassword ? "eye-off" : "eye"}
            onPress={() => {
              Keyboard.dismiss();
              setShowPassword((value) => !value);
            }}
          />
        }
        error={!!errorMessage}
      />
      {errorMessage && (
        <HelperText type="error" visible={true}>
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
    marginBottom: 12,
    borderRadius: 10,
    fontFamily: "OutFitBold",
  },

  label: {
    fontFamily: "OutFitBold",
  },
});

export default PasswordInput;
