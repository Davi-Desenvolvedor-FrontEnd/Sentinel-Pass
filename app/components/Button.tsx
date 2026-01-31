import {
  Text,
  Pressable,
  StyleSheet,
  View,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";

interface ButtonProps extends PressableProps {
  label: string;
  onPress: () => void;
  backColor: "#004297" | "#34934C" | "#e85d04";
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function ({
  label,
  onPress,
  backColor,
  icon,
  style,
  ...rest
}: ButtonProps) {
  const styles = theme(backColor);
  return (
    <Pressable
      {...rest}
      onPress={onPress}
      style={[
        style,
        styles.button,
        {
          justifyContent: icon ? "flex-start" : "center",
        },
      ]}
    >
      {icon ?? <></>}
      <Text style={styles.textButton}>{label}</Text>
    </Pressable>
  );
}

function theme(color: string) {
  return StyleSheet.create({
    button: {
      width: "90%",
      backgroundColor: color,
      height: 60,
      borderRadius: 6,
      alignItems: "center",
      paddingHorizontal: 20,
      paddingVertical: 10,
      gap: 10,
      elevation: 5,
      flexDirection: "row",
    },
    textButton: {
      color: "#fff",
      fontSize: 20,
      fontWeight: "600",
    },
  });
}
