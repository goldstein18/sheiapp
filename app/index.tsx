import { Link, useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Descubre tu potencial</Text>
          <Text style={styles.subtitle}>
            Una experiencia personalizada para construir tu trayectoria.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <Link href="/register" asChild>
            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerButtonText}>Crear cuenta</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 40,
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },
  header: {
    gap: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#1F2933",
    textAlign: "left",
  },
  subtitle: {
    fontSize: 16,
    color: "#475467",
    lineHeight: 22,
  },
  buttonContainer: {
    gap: 16,
    justifyContent: "flex-end",
  },
  loginButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "#669BBB",
    alignItems: "center",
  },
  registerButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: "#669BBB",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#1F2933",
    fontSize: 16,
    fontWeight: "600",
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
