import { Link } from "expo-router";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Register() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nombre tal cual tu INE</Text>
      <Text style={styles.subtitle}>
      Nombre tal cual está en tus identificaciones oficiales
      </Text>
      
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        placeholderTextColor="#777777"
        keyboardType="default"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Primer Apellido"
        placeholderTextColor="#777777"
        keyboardType="default"
        autoCapitalize="characters"
      />
       <TextInput
        style={styles.input}
        placeholder="Segundo Apellido"
        placeholderTextColor="#777777"
        keyboardType="default"
        autoCapitalize="characters"
      />
  <Link href="/birthdate" asChild>
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
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1F2933",
    marginTop: 0,
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
    borderRadius: 0,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#1F2933",
    borderWidth: 1,
    borderColor: "#D0D5DD",
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
    marginTop:50,
    backgroundColor: "#669BBB",
    paddingVertical: 15,
    borderRadius: 0,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
}); 