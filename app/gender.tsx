import { Text, View, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

type GenderOption = "masculino" | "femenino" | "prefiero-no-decirlo";

export default function Gender() {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState<GenderOption | null>(null);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <View style={styles.content}>
        <Text style={styles.title}>¿Cuál es tu género?</Text>
        
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={[
              styles.optionButton,
              selectedGender === "masculino" && styles.optionButtonSelected
            ]}
            onPress={() => setSelectedGender("masculino")}
          >
            <Text style={[
              styles.optionText,
              selectedGender === "masculino" && styles.optionTextSelected
            ]}>
              Masculino
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.optionButton,
              selectedGender === "femenino" && styles.optionButtonSelected
            ]}
            onPress={() => setSelectedGender("femenino")}
          >
            <Text style={[
              styles.optionText,
              selectedGender === "femenino" && styles.optionTextSelected
            ]}>
              Femenino
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.optionButton,
              selectedGender === "prefiero-no-decirlo" && styles.optionButtonSelected
            ]}
            onPress={() => setSelectedGender("prefiero-no-decirlo")}
          >
            <Text style={[
              styles.optionText,
              selectedGender === "prefiero-no-decirlo" && styles.optionTextSelected
            ]}>
              Prefiero no decirlo
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            !selectedGender && styles.continueButtonDisabled
          ]}
          disabled={!selectedGender}
          onPress={() => router.push("/password")}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    marginTop: 0,
    marginBottom: 30,
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: "#EDEEF2",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  optionButtonSelected: {
    backgroundColor: "#669BBB",
  },
  optionText: {
    fontSize: 16,
    color: "#666",
  },
  optionTextSelected: {
    color: "white",
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: "white",
  },
  continueButton: {
    backgroundColor: "#669BBB",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  continueButtonDisabled: {
    backgroundColor: "#cccccc",
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
}); 