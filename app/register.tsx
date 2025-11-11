import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Register() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!phoneNumber || !email) {
      setError("Por favor completa todos los campos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Store phone number and email in global state or context
      // For now, we'll pass them as URL parameters
      router.push({
        pathname: "/birthdate",
        params: { phoneNumber, email }
      });
    } catch (error) {
      setError("Error al procesar la información");
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empecemos</Text>
      <Text style={styles.subtitle}>
        Ingresa tu número celular. Te enviaremos un código de confirmación
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Número de celular"
        placeholderTextColor="#777777"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#777777"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </TouchableOpacity>
        </Link>
      </View>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1F2933",
    marginTop: 60,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#1F2933",
    marginBottom: 30,
    lineHeight: 22,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#1F2933",
    borderWidth: 1,
    borderColor: "#D0D5DD",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    marginBottom: 15,
    textAlign: "center",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  loginText: {
    color: "#1F2933",
    fontSize: 16,
  },
  loginLink: {
    color: "#669BBB",
    color: "#669BBB",
    fontSize: 16,
    fontWeight: "600",
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
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
}); 