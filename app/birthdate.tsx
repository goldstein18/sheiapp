import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Birthdate() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!day || !month || !year) {
      setError("Por favor completa todos los campos");
      return;
    }

    if (parseInt(year) < 1900 || parseInt(year) > new Date().getFullYear()) {
      setError("Por favor ingresa un año válido");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const birthdate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      
      // Pass all collected data to the next screen
      router.push({
        pathname: "/gender",
        params: { 
          phoneNumber: params.phoneNumber as string,
          email: params.email as string,
          birthdate 
        }
      });
    } catch (error) {
      setError("Error al procesar la información");
      console.error("Birthdate error:", error);
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
        <Text style={styles.title}>¿Cuál es tu fecha de nacimiento?</Text>
        
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Día"
              placeholderTextColor="#777777"
              keyboardType="number-pad"
              maxLength={2}
              value={day}
              onChangeText={setDay}
            />
          </View>
          
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Mes"
              placeholderTextColor="#777777"
              keyboardType="number-pad"
              maxLength={2}
              value={month}
              onChangeText={setMonth}
            />
          </View>
          
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Año"
              placeholderTextColor="#777777"
              keyboardType="number-pad"
              maxLength={4}
              value={year}
              onChangeText={setYear}
            />
          </View>
        </View>

        <Text style={styles.formatHint}>DD/MM/AA</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.continueButton, loading && styles.continueButtonDisabled]}
          onPress={handleContinue}
          disabled={loading}
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
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    backgroundColor: "#121212",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    textAlign: "center",
    color: "#E0E0E0",
    borderWidth: 1,
    borderColor: "#333333",
  },
  formatHint: {
    color: "#EDEDED",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
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