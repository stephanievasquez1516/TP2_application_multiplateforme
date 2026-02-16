import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function AppButton({
  title,
  onPress,
  disabled = false,
  variant = "primary",
}) {
  const buttonStyle =
    variant === "primary" ? styles.primary : styles.secondary;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.button,
        buttonStyle,
        disabled && styles.disabled,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#3498db",
  },
  secondary: {
    backgroundColor: "#95a5a6",
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: "#fff",
    fontWeight: "600",
  },
});
