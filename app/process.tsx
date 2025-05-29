import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Process() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.starContainer}>
        <Image 
          source={require("../assets/images/smallstart.png")}
          style={styles.smallStar}
        />
        <Image 
          source={require("../assets/images/midstart.png")}
          style={styles.midStar}
        />
        <Image 
          source={require("../assets/images/bigstar.png")}
          style={styles.bigStar}
        />
      </View>
      
      <TouchableOpacity 
        style={styles.continueButton}
        onPress={() => router.push("/results")}
      >
        <Text style={styles.continueText}>Click me to continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#669BBB",
    alignItems: "center",
    justifyContent: "center",
  },
  starContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  smallStar: {
    position: "absolute",
    top: 250,
    left: 100,
    width: 30,
    height: 30,
    tintColor: "#FCEED4",
  },
  midStar: {
    position: "absolute",
    top: 350,
    right: 30,
    width: 100,
    height: 100,
    tintColor: "#FCEED4",
  },
  bigStar: {
    position: "absolute",
    bottom: 150,
    left: 100,
    width: 180,
    height: 180,
    tintColor: "#FCEED4",
  },
  continueButton: {
    position: "absolute",
    bottom: "50%",
    color:'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  continueText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  }
});