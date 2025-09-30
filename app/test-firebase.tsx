import { Text, View, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import { useState } from "react";
import { authService } from "../services/auth";
import { storageService } from "../services/storage";

export default function TestFirebase() {
  const [email, setEmail] = useState("test@example.com");
  const [password, setPassword] = useState("Test123!");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const testAuth = async () => {
    setLoading(true);
    try {
      // Test user registration
      const newUser = await authService.register(email, password, "Test User");
      setUser(newUser);
      Alert.alert("Success", "User registered successfully!");
      
      // Test storage
      const testData = {
        test: "data",
        timestamp: new Date().toISOString()
      };
      
      const downloadURL = await storageService.uploadAppData(
        newUser.uid, 
        testData, 
        'test'
      );
      
      Alert.alert("Storage Success", `File uploaded to: ${downloadURL}`);
      
    } catch (error: any) {
      console.error("Test error:", error);
      Alert.alert("Error", error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const testSignIn = async () => {
    setLoading(true);
    try {
      const signedInUser = await authService.signIn(email, password);
      setUser(signedInUser);
      Alert.alert("Success", "User signed in successfully!");
    } catch (error: any) {
      console.error("Sign in error:", error);
      Alert.alert("Error", error.message || "Sign in failed");
    } finally {
      setLoading(false);
    }
  };

  const testSignOut = async () => {
    setLoading(true);
    try {
      await authService.signOut();
      setUser(null);
      Alert.alert("Success", "User signed out successfully!");
    } catch (error: any) {
      console.error("Sign out error:", error);
      Alert.alert("Error", error.message || "Sign out failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firebase Test</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={testAuth}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Testing..." : "Test Registration"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={testSignIn}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Testing..." : "Test Sign In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={testSignOut}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Testing..." : "Test Sign Out"}
        </Text>
      </TouchableOpacity>

      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userText}>User ID: {user.uid}</Text>
          <Text style={styles.userText}>Email: {user.email}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginTop: 60,
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#EDEEF2",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#669BBB",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  userInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  userText: {
    fontSize: 14,
    color: "black",
    marginBottom: 5,
  },
}); 
