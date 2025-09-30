import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";

export default function Questions() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const scrollViewRef = useRef<ScrollView>(null);
  const [error, setError] = useState("");
  
  // Form data
  const [activities, setActivities] = useState("");
  const [schoolSubjects, setSchoolSubjects] = useState("");
  const [values, setValues] = useState("");
  const [workPreference, setWorkPreference] = useState("");
  const [naturalTalents, setNaturalTalents] = useState("");
  const [personalityType, setPersonalityType] = useState("");
  const [passionateCauses, setPassionateCauses] = useState("");
  const [workStyle, setWorkStyle] = useState("");
  const [potentialProfession, setPotentialProfession] = useState("");

  const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const target = event.target;
    if (target) {
      // @ts-ignore - measure exists on the target but TypeScript doesn't know about it
      target.measure((x, y, width, height, pageX, pageY) => {
        scrollViewRef.current?.scrollTo({
          y: pageY - 100,
          animated: true,
        });
      });
    }
  };

  const handleContinue = () => {
    if (!activities || !schoolSubjects || !values) {
      setError("Por favor completa al menos los primeros tres campos");
      return;
    }

    setError("");

    // Navigate to the next screen (you can change this to any screen you want)
    router.push("/colorquestions");
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
            <Text style={styles.questionText}>¿Qué tipo de actividades disfrutas tanto que el tiempo se te pasa volando? *</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Tu respuesta"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={activities}
              onChangeText={setActivities}
              onFocus={handleFocus}
            />

            <Text style={styles.questionText}>¿Qué materias o temas te gustaban más en la escuela o de niño? *</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Tu respuesta"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={schoolSubjects}
              onChangeText={setSchoolSubjects}
              onFocus={handleFocus}
            />

            <Text style={styles.questionText}>¿Qué valores son fundamentales para ti? *</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Tu respuesta"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={values}
              onChangeText={setValues}
              onFocus={handleFocus}
            />

            <Text style={styles.questionText}>¿Prefieres trabajar con personas, ideas, sistemas, cosas físicas, animales o con tus manos?</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu respuesta"
              placeholderTextColor="#666"
              value={workPreference}
              onChangeText={setWorkPreference}
              onFocus={handleFocus}
            />

            <Text style={styles.questionText}>¿Qué te han dicho los demás que haces muy bien y sin esfuerzo?</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Tu respuesta"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={naturalTalents}
              onChangeText={setNaturalTalents}
              onFocus={handleFocus}
            />

            <Text style={styles.questionText}>¿Te consideras más lógico, creativo, sensible o estratégico?</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu respuesta"
              placeholderTextColor="#666"
              value={personalityType}
              onChangeText={setPersonalityType}
              onFocus={handleFocus}
            />

            <Text style={styles.questionText}>¿Qué causa, problema o tema en el mundo te emociona o te enfurece más?</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Tu respuesta"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={passionateCauses}
              onChangeText={setPassionateCauses}
              onFocus={handleFocus}
            />

            <Text style={styles.questionText}>¿Te gusta más crear cosas nuevas, enseñar a otros, liderar proyectos o analizar datos?</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu respuesta"
              placeholderTextColor="#666"
              value={workStyle}
              onChangeText={setWorkStyle}
              onFocus={handleFocus}
            />

            <Text style={styles.questionText}>¿Qué profesión crees que podrías hacer bien aunque nunca la hayas estudiado?</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Tu respuesta"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              value={potentialProfession}
              onChangeText={setPotentialProfession}
              onFocus={handleFocus}
            />
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity 
            style={styles.continueButton}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>
              Completar registro
            </Text>
          </TouchableOpacity>
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
    marginTop: 40,
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
  input: {
    backgroundColor: "#EDEEF2",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: "black",
    minHeight: 50,
  },
  multilineInput: {
    minHeight: 100,
    paddingTop: 15,
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 14,
    marginTop: 10,
    textAlign: "center",
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
  continueButtonDisabled: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
}); 