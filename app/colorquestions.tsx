import { Link } from "expo-router";
import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const colorOptions = ['#FF0000', '#FF0000', '#800080', '#008000', '#008000'];

export default function Questions() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [selectedColors, setSelectedColors] = useState<number[]>(Array(8).fill(-1)); // -1 means no selection

  const handleCircleSelect = (questionIndex: number, colorIndex: number) => {
    const newSelections = [...selectedColors];
    newSelections[questionIndex] = colorIndex;
    setSelectedColors(newSelections);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
    >
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Cuéntanos sobre ti</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.questionText}>¿Cuál es tu nombre completo?</Text>
            <View style={styles.colorOptions}>
              {colorOptions.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorCircle,
                    selectedColors[0] === index ? { backgroundColor: color } : { borderColor: color }
                  ]}
                  onPress={() => handleCircleSelect(0, index)}
                />
              ))}
            </View>

            <Text style={styles.questionText}>¿Cuál es tu edad?</Text>
            <View style={styles.colorOptions}>
              {colorOptions.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorCircle,
                    selectedColors[1] === index ? { backgroundColor: color } : { borderColor: color }
                  ]}
                  onPress={() => handleCircleSelect(1, index)}
                />
              ))}
            </View>

            <Text style={styles.questionText}>¿Cuál es tu ocupación actual?</Text>
            <View style={styles.colorOptions}>
              {colorOptions.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorCircle,
                    selectedColors[2] === index ? { backgroundColor: color } : { borderColor: color }
                  ]}
                  onPress={() => handleCircleSelect(2, index)}
                />
              ))}
            </View>

            <Text style={styles.questionText}>¿Cuáles son tus principales intereses?</Text>
            <View style={styles.colorOptions}>
              {colorOptions.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorCircle,
                    selectedColors[3] === index ? { backgroundColor: color } : { borderColor: color }
                  ]}
                  onPress={() => handleCircleSelect(3, index)}
                />
              ))}
            </View>

            <Text style={styles.questionText}>¿Qué te gustarías lograr en los próximos 6 meses?</Text>
            <View style={styles.colorOptions}>
              {colorOptions.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorCircle,
                    selectedColors[4] === index ? { backgroundColor: color } : { borderColor: color }
                  ]}
                  onPress={() => handleCircleSelect(4, index)}
                />
              ))}
            </View>

            <Text style={styles.questionText}>¿Cuántas horas a la semana puedes dedicar a tu desarrollo personal?</Text>
            <View style={styles.colorOptions}>
              {colorOptions.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorCircle,
                    selectedColors[5] === index ? { backgroundColor: color } : { borderColor: color }
                  ]}
                  onPress={() => handleCircleSelect(5, index)}
                />
              ))}
            </View>

            <Text style={styles.questionText}>¿Cuál es tu mayor desafío actual?</Text>
            <View style={styles.colorOptions}>
              {colorOptions.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorCircle,
                    selectedColors[6] === index ? { backgroundColor: color } : { borderColor: color }
                  ]}
                  onPress={() => handleCircleSelect(6, index)}
                />
              ))}
            </View>

            <Text style={styles.questionText}>¿Cuál es tu mayor desafío actual?</Text>
            <View style={styles.colorOptions}>
              {colorOptions.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorCircle,
                    selectedColors[7] === index ? { backgroundColor: color } : { borderColor: color }
                  ]}
                  onPress={() => handleCircleSelect(7, index)}
                />
              ))}
            </View>
          </View>

          <Link href="/adn" asChild>
            <TouchableOpacity style={styles.continueButton}>
              <Text style={styles.buttonText}>Continuar</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    marginTop: 0,
    marginBottom: 30,
  },
  inputContainer: {
    gap: 20,
  },
  questionText: {
    fontSize: 18,
    color: "black",
    marginBottom: 8,
  },
  colorOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  colorCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  selectedCircle: {
    backgroundColor: '#666',
  },
  continueButton: {
    backgroundColor: "#669BBB",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
    alignSelf: "center",
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
}); 