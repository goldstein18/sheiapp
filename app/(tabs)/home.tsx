import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BENEFITS = [
  "Acceso ilimitado a reportes profundos sobre tu perfil",
  "Planes de acción personalizados y talleres en vivo",
  "Analítica avanzada sobre tus cuestionarios y progreso",
];

export default function PremiumUpsellScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.badge}>Shei Premium</Text>
          <Text style={styles.title}>
            Potencia tu evolución profesional con insights exclusivos
          </Text>
          <Text style={styles.subtitle}>
            Desbloquea el resto de tu perfil y obtén recomendaciones guiadas por
            IA para cada etapa de tu carrera.
          </Text>
        </View>

        <View style={styles.benefitsCard}>
          {BENEFITS.map((benefit) => (
            <View key={benefit} style={styles.benefitRow}>
              <Ionicons name="checkmark-circle" size={22} color="#4F9BB5" />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        <View style={styles.planCard}>
          <View style={styles.planHeader}>
            <Text style={styles.planTitle}>Plan anual</Text>
            <Text style={styles.planPrice}>
              $149 <Text style={styles.planPriceSuffix}>USD</Text>
            </Text>
          </View>
          <Text style={styles.planDescription}>
            2 meses gratis y acceso prioritario a nuevas funcionalidades.
          </Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Upgrade ahora</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Ver todos los beneficios</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  content: {
    paddingVertical: 28,
    paddingHorizontal: 24,
    gap: 24,
    flexGrow: 1,
    paddingBottom: 40,
  },
  hero: {
    backgroundColor: "#0F1F2C",
    borderRadius: 18,
    padding: 24,
    gap: 16,
    alignSelf: "stretch",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#4F9BB5",
    color: "#FFFFFF",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 15,
    color: "#C5D9E6",
    lineHeight: 22,
  },
  benefitsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 24,
    gap: 18,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    alignSelf: "stretch",
  },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  benefitText: {
    fontSize: 15,
    color: "#1F2933",
    flex: 1,
    lineHeight: 22,
  },
  planCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 24,
    gap: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    alignSelf: "stretch",
  },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2933",
  },
  planPrice: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1F2933",
  },
  planPriceSuffix: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475467",
  },
  planDescription: {
    fontSize: 15,
    lineHeight: 22,
    color: "#475467",
  },
  primaryButton: {
    backgroundColor: "#669BBB",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#4F9BB5",
    fontSize: 15,
    fontWeight: "600",
  },
});

