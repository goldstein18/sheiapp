import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

const MENU_ITEMS = [
  { id: "profile", icon: "person-outline", label: "Editar perfil" },
  { id: "language", icon: "globe-outline", label: "Cambiar idioma" },
  { id: "ai-info", icon: "sparkles-outline", label: "Información de la IA" },
  { id: "privacy", icon: "shield-checkmark-outline", label: "Política de privacidad" },
  { id: "terms", icon: "document-text-outline", label: "Términos y condiciones" },
];

export default function AccountSettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>ML</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Mariana López</Text>
            <Text style={styles.profileEmail}>mariana.lopez@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editBadge}>
            <Text style={styles.editBadgeText}>Editar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferencias</Text>
          <View style={styles.preferenceRow}>
            <View style={styles.preferenceInfo}>
              <Ionicons name="notifications-outline" size={22} color="#4F9BB5" />
              <Text style={styles.preferenceLabel}>Notificaciones push</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#CBD5E1", true: "#669BBB" }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuración</Text>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuRow}>
              <View style={styles.menuLeft}>
                <Ionicons name={item.icon as any} size={22} color="#4F9BB5" />
                <Text style={styles.menuLabel}>{item.label}</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#98A2B3" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#D92D20" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
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
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#E4EBF4",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2933",
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2933",
  },
  profileEmail: {
    fontSize: 14,
    color: "#475467",
  },
  editBadge: {
    backgroundColor: "#669BBB",
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  editBadgeText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    gap: 18,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2933",
  },
  preferenceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  preferenceInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  preferenceLabel: {
    fontSize: 15,
    color: "#1F2933",
  },
  menuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuLabel: {
    fontSize: 15,
    color: "#1F2933",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "center",
  },
  logoutText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#D92D20",
  },
});

