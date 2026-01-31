import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

interface CardProps {
  namePassword: string;
  password: string;
  onDelete?: () => void;
  eyes: React.ReactNode;
}

export default function Card({
  namePassword,
  password,
  onDelete,
  eyes,
}: CardProps) {
  return (
    <View style={cardStyles.card}>
      <View style={cardStyles.cardContent}>
        <Text style={cardStyles.cardName}>{namePassword}</Text>
        <Text style={cardStyles.cardPassword}>{password}</Text>
      </View>
      <View style={cardStyles.cardIcons}> 
        {eyes}
        <AntDesign name="delete" size={28} color="red" onPress={onDelete} />
      </View>
    </View>
  );
}

const cardStyles = StyleSheet.create({
  card: {
    width: "90%",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    elevation: 5,
    alignSelf: "center"
  },
  cardContent: {
    flexDirection: "column",
    gap: 10
  },
  cardIcons: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center"
  },
  cardName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#002c6e"
  },
  cardPassword: {
    color: "#002c6e"
  }
});
