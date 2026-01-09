import { View, ScrollView } from "react-native";
import { MoreHorizontal, Trash2, UserPlus } from "lucide-react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderPanelProps {
  items?: OrderItem[];
  total?: number;
  onAddCustomer?: () => void;
  onCheckout?: () => void;
  onMoreOptions?: () => void;
  onClearOrder?: () => void;
}

export function OrderPanel({
  items = [],
  total = 0,
  onAddCustomer,
  onCheckout,
  onMoreOptions,
  onClearOrder,
}: OrderPanelProps) {
  const formatCurrency = (amount: number) => {
    return `Rp ${amount.toLocaleString("id-ID", { minimumFractionDigits: 2 })}`;
  };

  return (
    <View className="bg-background border-border flex h-full flex-col border-l">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-4 py-4">
        <View>
          <Text className="text-foreground text-lg font-semibold">New order</Text>
          <Text className="text-muted-foreground text-sm">Add items</Text>
        </View>
        <View className="flex flex-row items-center gap-2">
          <Button variant="ghost" size="icon" onPress={onMoreOptions}>
            <MoreHorizontal size={20} className="text-foreground" />
          </Button>
          <Button variant="ghost" size="icon" onPress={onClearOrder}>
            <Trash2 size={20} className="text-muted-foreground" />
          </Button>
        </View>
      </View>

      <Separator />

      {/* Add Customer */}
      <View className="px-4 py-3">
        <Button
          variant="ghost"
          className="h-auto justify-start gap-3 px-0"
          onPress={onAddCustomer}
        >
          <View className="bg-muted rounded-full p-2">
            <UserPlus size={18} className="text-muted-foreground" />
          </View>
          <Text className="text-muted-foreground">Add customer</Text>
        </Button>
      </View>

      <Separator />

      {/* Order Items */}
      <ScrollView className="flex-1 px-4">
        {items.length === 0 ? (
          <View className="flex-1 items-center justify-center py-8">
            <Text className="text-muted-foreground text-sm">No items added yet</Text>
          </View>
        ) : (
          items.map((item) => (
            <View key={item.id} className="flex flex-row items-center justify-between py-3">
              <View className="flex-1">
                <Text className="text-foreground font-medium">{item.name}</Text>
                <Text className="text-muted-foreground text-sm">x{item.quantity}</Text>
              </View>
              <Text className="text-foreground">{formatCurrency(item.price)}</Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* Footer - Checkout */}
      <View className="mt-auto px-4 py-4">
        <Button
          variant="secondary"
          className="h-14 w-full flex-row justify-between"
          onPress={onCheckout}
        >
          <Text className="text-secondary-foreground font-medium">Offline checkout</Text>
          <Text className="text-secondary-foreground font-semibold">
            {formatCurrency(total)}
          </Text>
        </Button>
      </View>
    </View>
  );
}
