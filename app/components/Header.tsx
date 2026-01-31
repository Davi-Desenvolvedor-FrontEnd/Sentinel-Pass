import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface HeaderProps {
  title: string;
  onBack: () => void;
  backColor: "#004297" | "#34934C" | "#e85d04";
}

export default function Header({ title, onBack, backColor }: HeaderProps) {
  return (
    <>
      <StatusBar backgroundColor={backColor} />
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: backColor ?? "transparent" },
        ]}
      >
        <MaterialIcons
          name="arrow-back-ios"
          size={28}
          color="#fff"
          onPress={onBack}
          style={{marginLeft: 10}}
        />
        <Text style={styles.titleHeader}>{title}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    paddingVertical: 12,
  },
  titleHeader: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    paddingRight: 20,
  },
});
