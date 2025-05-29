import * as DocumentPicker from 'expo-document-picker';
import { Link } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Adn() {
  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/zip'],
        copyToCacheDirectory: true,
      });
      if (result.type === 'success') {
        console.log('Selected file:', result);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profundiza en tu ADN</Text>
        
        <Text style={styles.description}>
          Sube tus resultados genealógicos, en caso de tenerlos
        </Text>

        <View style={styles.inputContainer}>
          <TouchableOpacity 
            style={styles.uploadButton}
            onPress={handleFileUpload}
          >
            <Text style={styles.uploadButtonText}>Subir archivo</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.noAdnText}>
          ¿No tienes estudios de ADN? Con MyHeritage puedes obtenerlos
        </Text>

        <Image 
          source={require("../assets/images/adn.png")}
          style={styles.image}
          resizeMode="contain"
        />

        <Link href="/process" asChild>
          <TouchableOpacity style={styles.continueButton}>
            <Text style={styles.buttonText}>Descubre mi potencial</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "black",
    marginTop: 0,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 30,
  },
  uploadButton: {
    backgroundColor: "#669BBB",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
  },
  uploadButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  noAdnText: {
    color: "#E47242",
    textAlign: "center",
    marginBottom: 20,
  },
  image: {
    width: "95%",
    height: 500,
    alignSelf: "center",
    resizeMode: "contain",
  },
  continueButton: {
    backgroundColor: "#669BBB",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 30,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  }
});