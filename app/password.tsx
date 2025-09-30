import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { authService } from "../services/auth";

export default function Password() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasUpperCase = /[A-Z]/.test(password);
  const hasMinLength = password.length >= 8;
  const hasNumber = /[0-9]/.test(password);
  const passwordsMatch = password === confirmPassword && password !== "";

  const isFormValid = hasUpperCase && hasMinLength && hasNumber && passwordsMatch;

  const handleContinue = async () => {
    if (!isFormValid) {
      setError("Por favor completa todos los requisitos de la contraseña");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const email = params.email as string;
      
      // Create Firebase user account
      const user = await authService.register(email, password);
      
      // Store additional user data in Firebase (you might want to use Firestore for this)
      // For now, we'll pass the data to the questions screen
      
      router.push({
        pathname: "/questions",
        params: { 
          phoneNumber: params.phoneNumber as string,
          email: params.email as string,
          birthdate: params.birthdate as string,
          gender: params.gender as string,
          userId: user.uid
        }
      });
    } catch (error: any) {
      console.error("Password error:", error);
      
      // Handle specific Firebase auth errors
      if (error.code === 'auth/email-already-in-use') {
        setError("Este correo electrónico ya está registrado");
      } else if (error.code === 'auth/weak-password') {
        setError("La contraseña es demasiado débil");
      } else if (error.code === 'auth/invalid-email') {
        setError("Correo electrónico inválido");
      } else {
        setError("Error al crear la cuenta. Intenta de nuevo.");
      }
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
        <Text style={styles.title}>Crea tu contraseña</Text>
        
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#777777"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? "eye-off" : "eye"} 
                size={24} 
                color="#777777" 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Confirmar contraseña"
              placeholderTextColor="#777777"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity 
              style={styles.eyeIcon}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons 
                name={showConfirmPassword ? "eye-off" : "eye"} 
                size={24} 
                color="#777777" 
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.requirementsContainer}>
          <View style={styles.requirement}>
            <Ionicons 
              name={hasUpperCase ? "checkmark-circle" : "checkmark-circle-outline"} 
              size={20} 
              color={hasUpperCase ? "#2979FF" : "#777777"} 
            />
            <Text style={[styles.requirementText, hasUpperCase && styles.requirementTextMet]}>
              Incluye una letra mayúscula
            </Text>
          </View>

          <View style={styles.requirement}>
            <Ionicons 
              name={hasMinLength ? "checkmark-circle" : "checkmark-circle-outline"} 
              size={20} 
              color={hasMinLength ? "#2979FF" : "#777777"} 
            />
            <Text style={[styles.requirementText, hasMinLength && styles.requirementTextMet]}>
              Mínimo 8 caracteres
            </Text>
          </View>

          <View style={styles.requirement}>
            <Ionicons 
              name={hasNumber ? "checkmark-circle" : "checkmark-circle-outline"} 
              size={20} 
              color={hasNumber ? "#2979FF" : "#777777"} 
            />
            <Text style={[styles.requirementText, hasNumber && styles.requirementTextMet]}>
              Incluye un número
            </Text>
          </View>
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[
            styles.continueButton,
            (!isFormValid || loading) && styles.continueButtonDisabled
          ]}
          disabled={!isFormValid || loading}
          onPress={handleContinue}
        >
          <Text style={styles.continueButtonText}>
            {loading ? "Creando cuenta..." : "Continuar"}
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
    gap: 15,
  },
  inputWrapper: {
    position: "relative",
  },
  input: {
    backgroundColor: "#121212",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    paddingRight: 50,
    color: "#E0E0E0",
    borderWidth: 1,
    borderColor: "#333333",
  },
  eyeIcon: {
    position: "absolute",
    right: 15,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  requirementsContainer: {
    marginTop: 20,
    gap: 12,
  },
  requirement: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  requirementText: {
    fontSize: 14,
    color: "#EDEDED",
  },
  requirementTextMet: {
    color: "#2979FF",
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