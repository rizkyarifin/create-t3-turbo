import { useState } from "react";
import { View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import {
  UserPlus,
  FileText,
  Truck,
  LockKeyhole,
  Archive,
} from "lucide-react-native";

import { Sidebar } from "~/components/pos/Sidebar";
import { SearchBar } from "~/components/pos/SearchBar";
import { ActionTile } from "~/components/pos/ActionTile";
import { OrderPanel } from "~/components/pos/OrderPanel";
import { Text } from "~/components/ui/text";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SafeAreaView className="bg-background flex-1" edges={["top"]}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Layout: Sidebar (8%) + Main (flex) + OrderPanel (37.5%) */}
      <View className="flex h-full flex-row">
        {/* Sidebar - ~0.6 column in 8-col grid */}
        <Sidebar />

        {/* Main Content - flexible */}
        <View className="flex-1 flex-col p-4">
          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onScanPress={() => console.log("Scan pressed")}
          />

          {/* Action Tiles Grid */}
          <ScrollView
            className="mt-4 flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View className="flex flex-1 flex-row flex-wrap content-start gap-3">
              {/* Row 1 */}
              <View className="w-[48%]">
                <ActionTile
                  icon={UserPlus}
                  iconColor="text-muted-foreground"
                  label="Add customer"
                  onPress={() => console.log("Add customer")}
                />
              </View>
              <View className="w-[48%]">
                <ActionTile
                  icon={FileText}
                  iconColor="text-muted-foreground"
                  label="Add note"
                  onPress={() => console.log("Add note")}
                />
              </View>

              {/* Row 2 */}
              <View className="w-[48%]">
                <ActionTile
                  icon={Truck}
                  iconColor="text-primary"
                  label="Bandung (Ongkir)"
                  subtitle="Rp 15,000.00"
                  onPress={() => console.log("Shipping")}
                />
              </View>
              <View className="w-[48%]">
                <ActionTile
                  icon={LockKeyhole}
                  iconColor="text-destructive"
                  label="Lock screen"
                  onPress={() => console.log("Lock screen")}
                />
              </View>

              {/* Row 3 */}
              <View className="w-[48%]">
                <ActionTile
                  icon={Archive}
                  iconColor="text-pink-500"
                  label="Open drawer"
                  onPress={() => console.log("Open drawer")}
                />
              </View>
              <View className="w-[48%]">
                <ActionTile
                  variant="add"
                  label="Add tile"
                  onPress={() => console.log("Add tile")}
                />
              </View>
            </View>
          </ScrollView>

          {/* Page Indicator - fixed at bottom */}
          <View className="flex flex-row items-center justify-center gap-2 py-4">
            <View className="bg-foreground h-2 w-2 rounded-full" />
            <Text className="text-muted-foreground text-lg">+</Text>
          </View>
        </View>

        {/* Order Panel - 3 columns */}
        <View className="w-[37.5%]">
          <OrderPanel
            items={[]}
            total={0}
            onAddCustomer={() => console.log("Add customer")}
            onCheckout={() => console.log("Checkout")}
            onMoreOptions={() => console.log("More options")}
            onClearOrder={() => console.log("Clear order")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
