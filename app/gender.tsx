import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type GenderOption = "masculino" | "femenino" | "prefiero-no-decirlo";

export default function Gender() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedGender, setSelectedGender] = useState<GenderOption | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!selectedGender) {
      setError("Por favor selecciona una opción");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Pass all collected data to the next screen
      router.push({
        pathname: "/password",
        params: { 
          phoneNumber: params.phoneNumber as string,
          email: params.email as string,
          birthdate: params.birthdate as string,
          gender: selectedGender
        }
      });
    } catch (error) {
      setError("Error al procesar la información");
      console.error("Gender error:", error);
    } finally {
      setLoading(false);
    }
  };

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

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            (!selectedGender || loading) && styles.continueButtonDisabled
          ]}
          disabled={!selectedGender || loading}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>
            {loading ? "Procesando..." : "Continuar"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#EDEDED",
    marginTop: 0,
    marginBottom: 30,
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: "#121212",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333333",
  },
  optionButtonSelected: {
    backgroundColor: "#2979FF",
    borderColor: "#2979FF",
  },
  optionText: {
    fontSize: 16,
    color: "#777777",
  },
  optionTextSelected: {
    color: "#FFFFFF",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: "#121212",
  },
  continueButton: {
    backgroundColor: "#2979FF",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  continueButtonDisabled: {
    backgroundColor: "#cccccc",
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
}); 