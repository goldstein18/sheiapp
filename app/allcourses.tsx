import { useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { CourseRow } from "../services/backend";
import { getCourses, isApiConfigured } from "../services/backend";

const SCREEN_WIDTH = Dimensions.get("window").width;

const AllCoursesScreen = () => {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    if (!isApiConfigured()) {
      setLoading(false);
      return;
    }
    try {
      const list = await getCourses();
      setCourses(list);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        (c.description ?? "").toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q),
    );
  }, [courses, query]);

  const renderCourse = ({ item }: { item: CourseRow }) => (
    <View style={styles.courseCard}>
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.courseMeta}>{item.category}</Text>
      <Text style={styles.courseDescription}>
        {item.description ?? "Sin descripción"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backHit}>
          <Text style={styles.backText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Cursos</Text>
      </View>
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#669BBB" />
        </View>
      ) : null}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar cursos..."
          placeholderTextColor="#666"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catálogo</Text>
          <FlatList
            horizontal
            data={filtered}
            renderItem={renderCourse}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            style={styles.courseList}
            ListEmptyComponent={
              <Text style={styles.empty}>
                {isApiConfigured()
                  ? "No hay cursos que coincidan."
                  : "Configura EXPO_PUBLIC_API_URL para ver cursos."}
              </Text>
            }
          />
        </View>

        <View style={styles.premiumSection}>
          <Text style={styles.premiumText}>Upgrade a Premium</Text>
          <Text style={styles.premiumDescription}>
            Desbloquea contenido avanzado y recomendaciones personalizadas.
          </Text>
          <View style={styles.upgradeButtonContainer}>
            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.buttonTextUpgrade}>Upgrade</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    marginTop: 50,
  },
  loading: {
    padding: 16,
    alignItems: "center",
  },
  backHit: {
    position: "absolute",
    left: 16,
    zIndex: 2,
  },
  backText: {
    color: "#fff",
    fontSize: 22,
  },
  searchContainer: {
    padding: 15,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  searchInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 20,
    padding: 12,
    fontSize: 16,
    width: "100%",
  },
  content: {
    backgroundColor: "#F5F5F5",
  },
  section: {
    padding: 20,
    backgroundColor: "white",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  courseList: {
    paddingVertical: 10,
  },
  courseCard: {
    backgroundColor: "#FFFFFF",
    width: SCREEN_WIDTH * 0.8,
    padding: 15,
    borderRadius: 10,
    marginRight: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  courseMeta: {
    fontSize: 12,
    color: "#669BBB",
    marginBottom: 6,
  },
  courseDescription: {
    fontSize: 14,
    color: "#666",
  },
  empty: {
    padding: 20,
    color: "#666",
  },
  premiumSection: {
    backgroundColor: "#5996B1",
    padding: 20,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 100,
  },
  premiumText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },
  premiumDescription: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  upgradeButtonContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  upgradeButton: {
    backgroundColor: "#4A8CAB",
    padding: 12,
    borderRadius: 6,
    width: "40%",
    alignItems: "center",
  },
  buttonTextUpgrade: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    height: 72,
    backgroundColor: "#669BBB",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AllCoursesScreen;
