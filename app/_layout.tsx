import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="register"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerShadowVisible: false,
          headerTintColor: "#1F2933",
          headerTitle: "",
          headerBackTitle: "Atrás",
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerShadowVisible: false,
          headerTintColor: "#1F2933",
          headerTitle: "",
          headerBackTitle: "Atrás",
        }}
      />
      <Stack.Screen
        name="name"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerShadowVisible: false,
          headerTintColor: "#1F2933",
          headerTitle: "",
          headerBackTitle: "Atrás",
        }}
      />
      <Stack.Screen
        name="birthdate"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerShadowVisible: false,
          headerTintColor: "#1F2933",
          headerTitle: "",
          headerBackTitle: "Atrás",
        }}
      />
      <Stack.Screen
        name="gender"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerShadowVisible: false,
          headerTintColor: "#1F2933",
          headerTitle: "",
          headerBackTitle: "Atrás",
        }}
      />
      <Stack.Screen
        name="password"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerShadowVisible: false,
          headerTintColor: "#1F2933",
          headerTitle: "",
          headerBackTitle: "Atrás",
        }}
      />
      <Stack.Screen
        name="questions"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: false,
          headerTintColor: "#1F2933",
          headerTitle: "",
          headerBackTitle: "Atrás",
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="test-firebase"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: false,
          headerTintColor: "#1F2933",
          headerTitle: "Test Firebase",
          headerBackTitle: "Atrás",
        }}
      />
      <Stack.Screen
        name="colorquestions"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: false,
          headerTintColor: "#1F2933",
          headerTitle: "",
          headerBackTitle: "Atrás",
        }}
      />
      <Stack.Screen
        name="adn"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: false,
          headerTintColor: "#1F2933",
          headerTitle: "",
          headerBackTitle: "Atrás",
        }}
      />
    </Stack>
  );
}
