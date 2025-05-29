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
            backgroundColor: "white",
          },
          headerShadowVisible: false,
          headerTintColor: "black",
          headerTitle: "",
          headerBackTitle: "Atrás",
        }}
      />
      <Stack.Screen
        name="name"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: false,
          headerTintColor: "black",
          headerTitle: "",
          headerBackTitle: "Atrás",
        }}
      />
      <Stack.Screen
        name="birthdate"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: false,
          headerTintColor: "black",
          headerTitle: "",
          headerBackTitle: "Atrás",
        }}
      />
      <Stack.Screen
        name="gender"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: false,
          headerTintColor: "black",
          headerTitle: "",
          headerBackTitle: "Atrás",
        }}
      />
      <Stack.Screen
        name="password"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: false,
          headerTintColor: "black",
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
          headerTintColor: "black",
          headerTitle: "",
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
          headerTintColor: "black",
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
          headerTintColor: "black",
          headerTitle: "",
          headerBackTitle: "Atrás",
        }}
      />
    </Stack>
    
  );
}
