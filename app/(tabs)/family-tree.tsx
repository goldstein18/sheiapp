import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { FamilyMemberRow } from "../../services/backend";
import {
  createFamilyMember,
  deleteFamilyMember,
  isApiConfigured,
  listFamilyMembers,
} from "../../services/backend";

export default function FamilyTreeScreen() {
  const [members, setMembers] = useState<FamilyMemberRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [generation, setGeneration] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!isApiConfigured()) {
      setMembers([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const list = await listFamilyMembers();
      setMembers(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void load();
    }, [load]),
  );

  const openAdd = () => {
    setName("");
    setRelation("");
    setGeneration("");
    setError("");
    setModalOpen(true);
  };

  const submitAdd = async () => {
    if (!name.trim() || !relation.trim()) {
      setError("Nombre y parentesco son obligatorios");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await createFamilyMember({
        name: name.trim(),
        relation: relation.trim(),
        generation_label: generation.trim() || undefined,
      });
      setModalOpen(false);
      await load();
    } catch (e) {
      console.error(e);
      setError("No se pudo guardar. Revisa la API.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteFamilyMember(id);
      await load();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Árbol genealógico</Text>
          <TouchableOpacity style={styles.addButton} onPress={openAdd}>
            <Ionicons name="add" size={22} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Agregar miembro</Text>
          </TouchableOpacity>
        </View>

        {!isApiConfigured() ? (
          <Text style={styles.hint}>
            Configura EXPO_PUBLIC_API_URL para sincronizar tu árbol.
          </Text>
        ) : null}

        {loading ? (
          <ActivityIndicator color="#669BBB" style={{ marginVertical: 20 }} />
        ) : null}

        <View style={styles.placeholder}>
          <Ionicons name="git-network-outline" size={48} color="#669BBB" />
          <Text style={styles.placeholderTitle}>Construye tu historia familiar</Text>
          <Text style={styles.placeholderText}>
            Conecta con tus raíces y descubre coincidencias con nuestra integración
            con MyHeritage.
          </Text>
          <TouchableOpacity style={styles.primaryButton} onPress={openAdd}>
            <Text style={styles.primaryButtonText}>Empezar mapeo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.membersCard}>
          <Text style={styles.membersTitle}>Miembros</Text>
          {members.length === 0 && !loading ? (
            <Text style={styles.empty}>Aún no hay miembros registrados.</Text>
          ) : null}
          {members.map((member) => (
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
              <Text style={styles.memberGeneration}>
                {member.generation_label ?? "—"}
              </Text>
              <TouchableOpacity
                onPress={() => remove(member.id)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Ionicons name="trash-outline" size={20} color="#D92D20" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal visible={modalOpen} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Nuevo miembro</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre completo"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Parentesco (ej. Madre, Padre)"
              value={relation}
              onChangeText={setRelation}
            />
            <TextInput
              style={styles.input}
              placeholder="Generación (opcional, ej. Gen 1)"
              value={generation}
              onChangeText={setGeneration}
            />
            {error ? <Text style={styles.modalError}>{error}</Text> : null}
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.modalCancel}
                onPress={() => setModalOpen(false)}
              >
                <Text style={styles.modalCancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalSave, saving && { opacity: 0.7 }]}
                onPress={submitAdd}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.modalSaveText}>Guardar</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1F2933",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    backgroundColor: "#669BBB",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },
  hint: {
    color: "#475467",
    fontSize: 14,
  },
  placeholder: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    gap: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
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
    borderRadius: 999,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  membersCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    gap: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  membersTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2933",
    marginBottom: 4,
  },
  empty: {
    color: "#98A2B3",
    fontSize: 14,
  },
  memberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E4EBF4",
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
    fontWeight: "700",
    color: "#1F2933",
  },
  memberInfo: {
    flex: 1,
    gap: 2,
  },
  memberName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2933",
  },
  memberRelation: {
    fontSize: 13,
    color: "#475467",
  },
  memberGeneration: {
    fontSize: 12,
    color: "#98A2B3",
    width: 56,
    textAlign: "right",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 24,
  },
  modalCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    gap: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D0D5DD",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  modalError: {
    color: "#D92D20",
    fontSize: 13,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 8,
  },
  modalCancel: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  modalCancelText: {
    color: "#475467",
    fontWeight: "600",
  },
  modalSave: {
    backgroundColor: "#669BBB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  modalSaveText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
