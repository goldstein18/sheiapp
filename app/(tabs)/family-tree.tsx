import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FAMILY_MEMBERS = [
  { id: "1", name: "María López", relation: "Madre", generation: "Gen 1" },
  { id: "2", name: "Javier Hernández", relation: "Padre", generation: "Gen 1" },
  { id: "3", name: "Ana Hernández", relation: "Hermana", generation: "Gen 2" },
  { id: "4", name: "Luis Hernández", relation: "Hermano", generation: "Gen 2" },
];

export default function FamilyTreeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Árbol genealógico</Text>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={22} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Agregar miembro</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.placeholder}>
          <Ionicons name="git-network-outline" size={48} color="#669BBB" />
          <Text style={styles.placeholderTitle}>Construye tu historia familiar</Text>
          <Text style={styles.placeholderText}>
            Conecta con tus raíces y descubre coincidencias con nuestra integración
            con MyHeritage.
          </Text>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Empezar mapeo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.membersCard}>
          <Text style={styles.membersTitle}>Miembros recientes</Text>
          {FAMILY_MEMBERS.map((member) => (
            <View key={member.id} style={styles.memberRow}>
              <View style={styles.memberAvatar}>
                <Text style={styles.memberInitial}>
                  {member.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </Text>
              </View>
              <View style={styles.memberInfo}>
                <Text style={styles.memberName}>{member.name}</Text>
                <Text style={styles.memberRelation}>{member.relation}</Text>
              </View>
              <Text style={styles.memberGeneration}>{member.generation}</Text>
            </View>
          ))}
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
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2933",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#669BBB",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  placeholder: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 24,
    alignItems: "center",
    gap: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    alignSelf: "stretch",
  },
  placeholderTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2933",
    textAlign: "center",
  },
  placeholderText: {
    fontSize: 14,
    color: "#475467",
    textAlign: "center",
    lineHeight: 20,
  },
  primaryButton: {
    marginTop: 8,
    backgroundColor: "#669BBB",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
  membersCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 24,
    gap: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    alignSelf: "stretch",
  },
  membersTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2933",
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  memberAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E4EBF4",
    alignItems: "center",
    justifyContent: "center",
  },
  memberInitial: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2933",
  },
  memberInfo: {
    flex: 1,
  },
  memberName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2933",
  },
  memberRelation: {
    fontSize: 13,
    color: "#475467",
  },
  memberGeneration: {
    fontSize: 13,
    fontWeight: "600",
    color: "#669BBB",
  },
});

