import React from 'react';
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

const SCREEN_WIDTH = Dimensions.get('window').width;

const ResultsScreen = () => {
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
      {/* Blue Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Aquí irá el resultado</Text>
      </View>

      {/* White Content Area */}
      <ScrollView style={styles.content}>
        {/* Lorem Ipsum */}
        <Text style={styles.loremText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>

        {/* Courses Section */}
        <View style={styles.coursesSection}>
          <Text style={styles.sectionTitle}>Conoce algunos cursos para ti</Text>
          <FlatList
            horizontal
            data={courses}
            renderItem={renderCourse}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            style={styles.courseList}
          />
        </View>

        {/* Premium Upgrade */}
        <View style={styles.premiumSection}>
          <Text style={styles.premiumText}>Upgrade a Premium</Text>
          <Text style={styles.premiumDescription}>Desbloquea al instante el 95 % restante de los conocimientos sobre el ESTJ (Ejecutivo) y comprende a fondo cada faceta de este tipo de personalidad.</Text>
          <View style={styles.upgradeButtonContainer}>
            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.buttonTextUpgrade}>Upgrade</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* See All Courses Button */}
        <TouchableOpacity 
          style={styles.seeAllButton}
          onPress={() => router.push('/allcourses')}
        >
          <Text style={styles.buttonText}>Ver todos los cursos</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  content: {
    backgroundColor: 'white',
  },
  loremText: {
    padding: 20,
    fontSize: 16,
    lineHeight: 24,
    marginBottom:50,
    marginTop:50,
  },
  coursesSection: {
    backgroundColor: '#F5F5F5',
    padding: 20,
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
    backgroundColor: 'white',
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
    marginTop:100,
    marginBottom:100,
  },
  upgradeButtonContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  upgradeButton: {
    backgroundColor: '#4A8CAB',
    padding: 12,
    borderRadius: 6,
    width: '40%',
    alignItems: 'center',
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
  seeAllButton: {
    backgroundColor: '#669BBB',
    padding: 15,
    margin: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextUpgrade: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'center'
  },
});

export default ResultsScreen;