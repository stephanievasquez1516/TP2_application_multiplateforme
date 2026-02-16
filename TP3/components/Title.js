import React from "react";
import { Text, StyleSheet } from "react-native";

export default function Title({ children, size = "medium" }) {
  return (
    <Text style={styles[size]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  small: { fontSize: 16, fontWeight: "600" },
  medium: { fontSize: 22, fontWeight: "700" },
  large: { fontSize: 28, fontWeight: "800" },
});
