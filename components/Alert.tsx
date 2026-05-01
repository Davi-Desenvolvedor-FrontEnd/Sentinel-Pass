import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Vibration,
  StyleProp,
  ViewProps,
  ViewStyle,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

interface AlertProps {
  message: string;
  visible: boolean;
  onClose: () => void;
  style: StyleProp<ViewStyle>;
}

export default function Alert({
  message,
  visible,
  onClose,
  style,
}: AlertProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(-40)).current;

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      Vibration.vibrate();
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: -20,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShouldRender(false);
      });
    }
  }, [visible]);

  if (!shouldRender) return null;
  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{ translateY: translateYAnim }],
          opacity: opacityAnim,
          position: "absolute",
          alignItems: "center",
          zIndex: 1000,
          marginTop: 10,
        },
      ]}
    >
      <View style={alertStyles.triangule}></View>
      <View style={alertStyles.alertContainer}>
        <View style={alertStyles.alert}>
          <Ionicons name="alert-circle-outline" size={30} color="#e85d04" />
          <Text style={alertStyles.message}>{message}</Text>
          <TouchableOpacity style={alertStyles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
}

const alertStyles = StyleSheet.create({
  alertContainer: {
    position: "relative",
    width: "100%",
    alignItems: "center",
  },
  triangule: {
    position: "absolute",
    backgroundColor: "#fff",
    top: -10,
    right: 0,
    bottom: 50,
    left: 20,
    width: 20,
    height: 20,
    zIndex: 1,
    transform: [{ rotate: "45deg" }],
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: "#e85d04",
  },
  alert: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e85d04",
  },
  message: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
    marginRight: 8,
  },
  closeButton: {
    padding: 4,
    marginLeft: 4,
  },
});
