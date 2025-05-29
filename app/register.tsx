import { Text, View, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Link } from "expo-router";

export default function Register() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Empecemos</Text>
      <Text style={styles.subtitle}>
        Ingresa tu número celular. Te enviaremos un código de confirmación
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Número de celular"
        placeholderTextColor="#666"
        keyboardType="phone-pad"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        placeholderTextColor="#666"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
        <Link href="/" asChild>
          <TouchableOpacity>
            <Text style={styles.loginLink}>Inicia sesión</Text>
          </TouchableOpacity>
        </Link>
      </View>
      <Link href="/name" asChild>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continuar</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    marginTop: 0,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 30,
    lineHeight: 22,
  },
  input: {
    backgroundColor: "#EDEEF2",
    borderRadius: 0,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  loginText: {
    color: "#669BBB",
    fontSize: 16,
  },
  loginLink: {
    color: "#669BBB",
    fontSize: 16,
    fontWeight: "600",
  },
  continueButton: {
    backgroundColor: "#669BBB",
    paddingVertical: 15,
    borderRadius: 0,
    alignItems: "center",
  },
  continueButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
}); 