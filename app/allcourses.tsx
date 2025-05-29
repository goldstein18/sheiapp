import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const AllCoursesScreen = () => {
  const router = useRouter();
  const courses = [
    { id: '1', title: 'Course 1', description: 'Description 1' },
    { id: '2', title: 'Course 2', description: 'Description 2' },
    { id: '3', title: 'Course 3', description: 'Description 3' },
  ];

  const renderCourse = ({ item }: { item: any }) => (
    <View style={styles.courseCard}>
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.courseDescription}>{item.description}</Text>
    </View>
  );

  return (
    
    <View style={styles.container}>
        <View style={styles.header}>
                <Text style={styles.headerText}>Aquí irá el resultado</Text>
              </View>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar cursos..."
          placeholderTextColor="#666"
        />
      </View>

      {/* Course Carousels */}
      <ScrollView style={styles.content}>
        {/* Popular Courses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cursos Populares</Text>
          <FlatList
            horizontal
            data={courses}
            renderItem={renderCourse}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            style={styles.courseList}
          />
        </View>

        {/* New Courses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nuevos Cursos</Text>
          <FlatList
            horizontal
            data={courses}
            renderItem={renderCourse}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            style={styles.courseList}
          />
        </View>

        {/* Featured Courses */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cursos Destacados</Text>
          <FlatList
            horizontal
            data={courses}
            renderItem={renderCourse}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            style={styles.courseList}
          />
        </View>

        {/* Premium Section */}
        <View style={styles.premiumSection}>
          <Text style={styles.premiumText}>Upgrade a Premium</Text>
          <Text style={styles.premiumDescription}>Desbloquea al instante el 95 % restante de los conocimientos sobre el ESTJ (Ejecutivo) y comprende a fondo cada faceta de este tipo de personalidad.</Text>
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
    backgroundColor: '#F5F5F5',
    marginTop:50,
  },
  searchContainer: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  searchInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 12,
    fontSize: 16,
    width: '100%',
  },
  content: {
    backgroundColor: '#F5F5F5',
  },
  section: {
    padding: 20,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  courseList: {
    paddingVertical: 10,
  },
  courseCard: {
    backgroundColor: '#FFFFFF',
    width: SCREEN_WIDTH * 0.8,
    padding: 15,
    borderRadius: 10,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
  },
  premiumSection: {
    backgroundColor: '#5996B1',
    padding: 20,
    alignItems: 'center',
    marginTop: 100,
    marginBottom: 100,
  },
  premiumText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  premiumDescription: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  upgradeButtonContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  upgradeButton: {
    backgroundColor: '#4A8CAB',
    padding: 12,
    borderRadius: 6,
    width: '40%',
    alignItems: 'center',
  },
  buttonTextUpgrade: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    height: '20%',
    backgroundColor: '#669BBB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AllCoursesScreen;