import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/colors/theme";
import AppColors from "@/colors/theme";
import globalStyles from "@/colors/global_style";

interface HeaderProps {
  title: string;
  onBack: () => void;
  backColor: "Primary" | "Secondary" | "Terciary";
}

export default function Header({ title, onBack, backColor }: HeaderProps) {
  return (
    <>
      <StatusBar backgroundColor={AppColors(backColor)} />
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: AppColors(backColor) ?? "transparent" },
        ]}
      >
        <MaterialIcons
          name="arrow-back-ios"
          size={28}
          color="#fff"
          onPress={onBack}
          style={{marginLeft: 10}}
        />
        <Text style={[styles.titleHeader, globalStyles.text]}>{title}</Text>
        <View style={{padding: 12}}></View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    height: 100,
    padding: 6
  },
  titleHeader: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
