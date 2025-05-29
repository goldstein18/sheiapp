import { Link } from "expo-router";
import { useRef } from "react";
import { KeyboardAvoidingView, NativeSyntheticEvent, Platform, ScrollView, StyleSheet, Text, TextInput, TextInputFocusEventData, TouchableOpacity, View } from "react-native";

export default function Questions() {
  const scrollViewRef = useRef<ScrollView>(null);

  const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    const target = event.target;
    if (target) {
      // @ts-ignore - measure exists on the target but TypeScript doesn't know about it
      target.measure((x, y, width, height, pageX, pageY) => {
        scrollViewRef.current?.scrollTo({
          y: pageY - 100, // Offset by 100 to show some space above the input
          animated: true,
        });
      });
    }
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
            <TextInput
              style={styles.input}
              placeholder="Tu respuesta"
              placeholderTextColor="#666"
              onFocus={handleFocus}
            />

            <Text style={styles.questionText}>¿Cuál es tu edad?</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu respuesta"
              placeholderTextColor="#666"
              keyboardType="numeric"
              onFocus={handleFocus}
            />

            <Text style={styles.questionText}>¿Cuál es tu ocupación actual?</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu respuesta"
              placeholderTextColor="#666"
              onFocus={handleFocus}
            />

            <Text style={styles.questionText}>¿Cuáles son tus principales intereses?</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Tu respuesta"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              onFocus={handleFocus}
            />

            <Text style={styles.questionText}>¿Qué te gustaría lograr en los próximos 6 meses?</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Tu respuesta"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              onFocus={handleFocus}
            />

            <Text style={styles.questionText}>¿Cuántas horas a la semana puedes dedicar a tu desarrollo personal?</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu respuesta"
              placeholderTextColor="#666"
              keyboardType="numeric"
              onFocus={handleFocus}
            />

            <Text style={styles.questionText}>¿Cuál es tu mayor desafío actual?</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Tu respuesta"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              onFocus={handleFocus}
            />
          </View>

          <Link href="/colorquestions" asChild>
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