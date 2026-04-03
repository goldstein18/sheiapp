import { useCallback, useEffect, useMemo, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { getHomeDashboard, isApiConfigured, type HomeDashboard } from "../../services/backend";

const FALLBACK_SEGMENTS = ["Todos", "Negocios", "Tecnología", "Creatividad"];

const DEFAULT_GOALS = [
  { id: "profile", title: "Perfil inicial completo", completed: false },
  { id: "quiz", title: "Cuestionario AS-27", completed: false },
  { id: "plan", title: "Define tu plan de acción", completed: false },
];

const DEFAULT_PROMOS: HomeDashboard["promo_cards"] = [
  {
    id: "p1",
    title: "Tu ruta personalizada",
    description: "Descubre el siguiente paso recomendado para tu perfil.",
    card_type: "video",
  },
  {
    id: "p2",
    title: "Impulsa tu carrera",
    description: "Historias de usuarios que cambiaron su futuro con Shei.",
    card_type: "story",
  },
  {
    id: "p3",
    title: "Aliado del mes",
    description: "Conoce la beca exclusiva con nuestros partners.",
    card_type: "ad",
  },
];

export default function InicioScreen() {
  const [selectedSegment, setSelectedSegment] = useState(FALLBACK_SEGMENTS[0]);
  const [dashboard, setDashboard] = useState<HomeDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!isApiConfigured()) {
      setLoading(false);
      return;
    }
    setLoadError(null);
    try {
      const d = await getHomeDashboard();
      setDashboard(d);
      if (d.course_segments?.length) {
        setSelectedSegment(d.course_segments[0]);
      }
    } catch (e) {
      console.error(e);
      setLoadError("No se pudo cargar el inicio. Revisa la API.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const segments = dashboard?.course_segments?.length
    ? dashboard.course_segments
    : FALLBACK_SEGMENTS;

  const filteredCourses = useMemo(() => {
    const list = dashboard?.featured_courses ?? [];
    if (selectedSegment === "Todos") return list;
    return list.filter((c) => c.category === selectedSegment);
  }, [dashboard?.featured_courses, selectedSegment]);

  const promoCards =
    dashboard?.promo_cards?.length ? dashboard.promo_cards : DEFAULT_PROMOS;
  const goals = dashboard?.goals?.length ? dashboard.goals : DEFAULT_GOALS;
  const heroTitle = dashboard?.hero.title ?? "Hola, bienvenido de vuelta";
  const heroSubtitle =
    dashboard?.hero.subtitle ??
    "Continúa construyendo tu perfil y desbloquea nuevas oportunidades.";
  const progressPercent = dashboard?.progress_percent ?? 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#669BBB" />
        </View>
      ) : null}
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {loadError ? <Text style={styles.bannerError}>{loadError}</Text> : null}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoDot} />
            <Text style={styles.logoText}>shei</Text>
          </View>
          <TouchableOpacity style={styles.hamburgerButton}>
            <Ionicons name="menu-outline" size={24} color="#1F2933" />
          </TouchableOpacity>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroTextGroup}>
            <Text style={styles.heroTitle}>{heroTitle}</Text>
            <Text style={styles.heroSubtitle}>{heroSubtitle}</Text>
          </View>
          <Image
            source={require("../../assets/images/react-logo.png")}
            style={styles.heroImage}
          />
        </View>

        <View style={styles.segmentContainer}>
          <Text style={styles.segmentLabel}>Cursos</Text>
          <View style={styles.segmentControl}>
            {segments.map((segment) => {
              const isActive = selectedSegment === segment;
              return (
                <TouchableOpacity
                  key={segment}
                  style={[
                    styles.segmentButton,
                    isActive && styles.segmentButtonActive,
                  ]}
                  onPress={() => setSelectedSegment(segment)}
                >
                  <Text
                    style={[
                      styles.segmentButtonText,
                      isActive && styles.segmentButtonTextActive,
                    ]}
                  >
                    {segment}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {filteredCourses.length > 0 ? (
          <View style={styles.coursesRow}>
            <Text style={styles.coursesRowTitle}>Cursos</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.courseChipRow}
            >
              {filteredCourses.map((c) => (
                <View key={c.id} style={styles.courseChip}>
                  <Text style={styles.courseChipTitle} numberOfLines={2}>
                    {c.title}
                  </Text>
                  <Text style={styles.courseChipCat}>{c.category}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        ) : null}

        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Tu progreso</Text>
            <Text style={styles.progressPercent}>{progressPercent}%</Text>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min(100, Math.max(0, progressPercent))}%` },
              ]}
            />
          </View>
          <Text style={styles.progressDescription}>
            Completa las próximas actividades para desbloquear recomendaciones
            avanzadas.
          </Text>
        </View>

        <View style={styles.goalsContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Metas cumplidas</Text>
            <TouchableOpacity>
              <Text style={styles.sectionAction}>Ver todo</Text>
            </TouchableOpacity>
          </View>
          {goals.map((goal) => (
            <View key={goal.id} style={styles.goalRow}>
              <View
                style={[
                  styles.goalStatus,
                  goal.completed
                    ? styles.goalStatusCompleted
                    : styles.goalStatusPending,
                ]}
              >
                <Ionicons
                  name={goal.completed ? "checkmark" : "time-outline"}
                  size={16}
                  color={goal.completed ? "#0B6E4F" : "#1F2933"}
                />
              </View>
              <Text
                style={[
                  styles.goalText,
                  goal.completed ? styles.goalTextCompleted : undefined,
                ]}
              >
                {goal.title}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.promoContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Inspírate</Text>
            <TouchableOpacity>
              <Text style={styles.sectionAction}>Explorar más</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promoList}
          >
            {promoCards.map((card) => (
              <View key={card.id} style={styles.promoCard}>
                <View style={styles.promoIcon}>
                  <Ionicons
                    name={
                      card.card_type === "video"
                        ? "play-circle"
                        : card.card_type === "story"
                        ? "book-outline"
                        : "megaphone-outline"
                    }
                    size={28}
                    color="#669BBB"
                  />
                </View>
                <Text style={styles.promoTitle}>{card.title}</Text>
                <Text style={styles.promoDescription}>{card.description}</Text>
                <TouchableOpacity style={styles.promoButton}>
                  <Text style={styles.promoButtonText}>Ver ahora</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.secondaryActions}>
          <TouchableOpacity style={styles.secondaryCard}>
            <Ionicons name="document-text-outline" size={24} color="#669BBB" />
            <Text style={styles.secondaryTitle}>Cuestionario inicial</Text>
            <Text style={styles.secondaryDescription}>
              Puedes retomar las 27 preguntas cuando quieras.
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryCard}>
            <Ionicons name="analytics-outline" size={24} color="#669BBB" />
            <Text style={styles.secondaryTitle}>Perfil profesional</Text>
            <Text style={styles.secondaryDescription}>
              Revisa tus fortalezas y recomendaciones personalizadas.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingWrap: {
    paddingVertical: 12,
    alignItems: "center",
  },
  bannerError: {
    color: "#B42318",
    marginBottom: 8,
    fontSize: 14,
  },
  coursesRow: {
    gap: 12,
    alignSelf: "stretch",
  },
  coursesRowTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2933",
  },
  courseChipRow: {
    gap: 12,
    paddingRight: 8,
  },
  courseChip: {
    width: 160,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  courseChipTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2933",
  },
  courseChipCat: {
    fontSize: 12,
    color: "#669BBB",
    marginTop: 6,
  },
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#669BBB",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2933",
    textTransform: "uppercase",
  },
  hamburgerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  heroCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    alignSelf: "stretch",
  },
  heroTextGroup: {
    flex: 1,
    paddingRight: 12,
    gap: 8,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2933",
  },
  heroSubtitle: {
    fontSize: 14,
    color: "#475467",
    lineHeight: 20,
  },
  heroImage: {
    width: 72,
    height: 72,
    resizeMode: "contain",
  },
  segmentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  segmentLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2933",
  },
  segmentControl: {
    flexDirection: "row",
    backgroundColor: "#E4EBF4",
    borderRadius: 999,
    padding: 4,
  },
  segmentButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
  },
  segmentButtonActive: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  segmentButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475467",
  },
  segmentButtonTextActive: {
    color: "#1F2933",
  },
  progressCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    gap: 12,
    alignSelf: "stretch",
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2933",
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: "700",
    color: "#669BBB",
  },
  progressBar: {
    height: 10,
    borderRadius: 999,
    backgroundColor: "#E4EBF4",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#669BBB",
  },
  progressDescription: {
    fontSize: 14,
    color: "#475467",
    lineHeight: 20,
  },
  goalsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
    gap: 16,
    alignSelf: "stretch",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2933",
  },
  sectionAction: {
    fontSize: 14,
    fontWeight: "600",
    color: "#669BBB",
  },
  goalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  goalStatus: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  goalStatusCompleted: {
    backgroundColor: "#D1FADF",
  },
  goalStatusPending: {
    backgroundColor: "#E4EBF4",
  },
  goalText: {
    fontSize: 15,
    color: "#344054",
    flex: 1,
  },
  goalTextCompleted: {
    textDecorationLine: "line-through",
    color: "#98A2B3",
  },
  promoContainer: {
    gap: 16,
    alignSelf: "stretch",
  },
  promoList: {
    gap: 16,
    paddingRight: 4,
  },
  promoCard: {
    width: 220,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    gap: 12,
  },
  promoIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E4EBF4",
    alignItems: "center",
    justifyContent: "center",
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2933",
  },
  promoDescription: {
    fontSize: 13,
    color: "#475467",
    lineHeight: 18,
  },
  promoButton: {
    marginTop: "auto",
    alignSelf: "flex-start",
    backgroundColor: "#669BBB",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  promoButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  secondaryActions: {
    flexDirection: "column",
    gap: 16,
    marginBottom: 32,
    alignSelf: "stretch",
  },
  secondaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    gap: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    alignSelf: "stretch",
  },
  secondaryTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2933",
  },
  secondaryDescription: {
    fontSize: 14,
    color: "#475467",
    lineHeight: 20,
  },
});

