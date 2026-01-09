import { useColorScheme } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClientProvider } from "@tanstack/react-query";

import { NAV_THEME } from "~/lib/theme";
import { queryClient } from "~/utils/api";

import "../styles.css";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={NAV_THEME[isDark ? "dark" : "light"]}>
        <StatusBar style={isDark ? "light" : "dark"} />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: isDark ? "#09090B" : "#FFFFFF",
            },
            headerTintColor: isDark ? "#FAFAFA" : "#09090B",
            contentStyle: {
              backgroundColor: isDark ? "#09090B" : "#FFFFFF",
            },
          }}
        />
        <PortalHost />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
