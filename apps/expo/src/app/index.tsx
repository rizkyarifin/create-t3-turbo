import { useState } from "react";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";

import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // For now, just navigate to the POS page
    router.replace("/pos");
  };

  return (
    <SafeAreaView className="bg-background flex-1">
      <Stack.Screen options={{ headerShown: false }} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 items-center justify-center px-8">
          {/* Logo/Title */}
          <View className="mb-12 items-center">
            <Text className="text-primary text-4xl font-bold">MudahPOS</Text>
            <Text className="text-muted-foreground mt-2 text-base">
              Point of Sale System
            </Text>
          </View>

          {/* Login Form */}
          <View className="w-full max-w-sm gap-4">
            {/* Email Field */}
            <View className="gap-2">
              <Text className="text-foreground text-sm font-medium">Email</Text>
              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                className="h-12"
              />
            </View>

            {/* Password Field */}
            <View className="gap-2">
              <Text className="text-foreground text-sm font-medium">Password</Text>
              <Input
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                className="h-12"
              />
            </View>

            {/* Login Button */}
            <Button onPress={handleLogin} size="lg" className="mt-4">
              <Text>Login</Text>
            </Button>

            {/* Forgot Password Link */}
            <Button variant="link" className="mt-2">
              <Text>Forgot your password?</Text>
            </Button>
          </View>
        </View>

        {/* Footer */}
        <View className="items-center pb-8">
          <Text className="text-muted-foreground text-xs">
            Version 1.0.0
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
