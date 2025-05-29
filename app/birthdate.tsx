import { Text, View, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useRef, useEffect } from "react";
import { Link, useRouter } from "expo-router";

export default function Birthdate() {
  const firstInputRef = useRef<TextInput>(null);
  const router = useRouter();

  useEffect(() => {
    // Auto focus the first input when the screen loads
    firstInputRef.current?.focus();
  }, []);

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
              ref={firstInputRef}
              style={styles.input}
              placeholder="Día"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>
          
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Mes"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>
          
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Año"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              maxLength={2}
            />
          </View>
        </View>

        <Text style={styles.formatHint}>DD/MM/AA</Text>
      </View>
      <Link href="/gender" asChild>
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => router.push("/gender")}
        >
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
      </Link>
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
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    backgroundColor: "#EDEEF2",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    textAlign: "center",
  },
  formatHint: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
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
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
}); 