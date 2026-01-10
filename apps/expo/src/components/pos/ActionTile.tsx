import { View, Pressable } from "react-native";
import { Plus } from "lucide-react-native";
import { Text } from "~/components/ui/text";
import { cn } from "~/lib/utils";
import type { LucideIcon } from "lucide-react-native";

interface ActionTileProps {
  icon?: LucideIcon;
  iconColor?: string;
  label: string;
  subtitle?: string;
  variant?: "default" | "add";
  onPress?: () => void;
}

export function ActionTile({
  icon: Icon,
  iconColor = "text-muted-foreground",
  label,
  subtitle,
  variant = "default",
  onPress,
}: ActionTileProps) {
  if (variant === "add") {
    return (
      <Pressable
        onPress={onPress}
        className={cn(
          "bg-card border-border h-32 flex-col items-start justify-between rounded-xl border border-dashed p-4 active:opacity-80"
        )}
      >
        <View className="bg-muted rounded-lg p-2">
          <Plus size={20} className="text-muted-foreground" />
        </View>
        <Text className="text-muted-foreground text-sm font-medium">{label}</Text>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "bg-muted/50 h-32 flex-col items-start justify-between rounded-xl p-4 active:opacity-80"
      )}
    >
      {Icon && (
        <View className="rounded-lg">
          <Icon size={20} className={iconColor} />
        </View>
      )}
      <View>
        <Text className="text-foreground text-sm font-medium">{label}</Text>
        {subtitle && (
          <Text className="text-muted-foreground text-xs">{subtitle}</Text>
        )}
      </View>
    </Pressable>
  );
}
