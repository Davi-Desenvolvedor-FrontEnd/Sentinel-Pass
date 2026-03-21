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
import Colors from "@/colors/theme";
import AppColors from "@/colors/theme";
import globalStyles from "@/colors/global_style";

interface ButtonProps extends PressableProps {
  label: string;
  onPress: () => void;
  backColor: "Primary" | "Secondary" | "Terciary";
  icon?: React.ReactNode;
  disable?: boolean
  style?: StyleProp<ViewStyle>;
}

export default function ({
  label,
  onPress,
  backColor,
  icon,
  disable,
  style,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      {...rest}
      onPress={onPress}
      style={[
        style,
        styles.button,
        {
          justifyContent: icon ? "flex-start" : "center",
          backgroundColor: AppColors(backColor),
          opacity: disable ? 0.4 : 1
        },
      ]}
      disabled={disable}
    >
      {icon ?? <></>}
      <Text style={[styles.textButton, globalStyles.text]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "90%",
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
    fontSize: 20,
    fontWeight: "400",
  },
});