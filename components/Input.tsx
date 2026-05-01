import {
  View,
  Text,
  TextInput,
  TextInputProps,
  StyleSheet,
  StyleProp,
  TextStyle,
} from "react-native";
import React from "react";

interface InputProps extends TextInputProps {
  label: string;
  style?: StyleProp<TextStyle>
}

export default function Input({ label, style, ...rest }: InputProps) {
  return (
    <View style={inputStyles.inputContainer}>
      <Text style={inputStyles.label}>{label}</Text>
      <TextInput {...rest} style={[style, inputStyles.input]} />
    </View>
  );
}

const inputStyles = StyleSheet.create({
  inputContainer: {
    width: "90%",
    padding: 4,
    alignSelf: "center",
    gap: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#002c6e",
    marginLeft: 2,
  },
  input: {
    width: "100%",
    borderRadius: 6,
    height: 50,
    backgroundColor: "#fff",
    elevation: 3,
    paddingLeft: 16,
  },
});
