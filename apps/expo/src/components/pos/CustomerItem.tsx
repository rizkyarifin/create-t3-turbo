import { View, Pressable } from "react-native";
import { Text } from "~/components/ui/text";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";

interface CustomerItemProps {
  name: string;
  contact: string; // email or phone
  onPress?: () => void;
}

function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) {
    return (words[0] ?? "").substring(0, 2).toUpperCase();
  }
  const firstInitial = words[0]?.[0] ?? "";
  const lastInitial = words[words.length - 1]?.[0] ?? "";
  return (firstInitial + lastInitial).toUpperCase();
}

export function CustomerItem({ name, contact, onPress }: CustomerItemProps) {
  const initials = getInitials(name);

  return (
    <Pressable
      onPress={onPress}
      className="active:bg-muted/50 flex-row items-center px-4 py-3"
    >
      {/* Avatar with Initials */}
      <Avatar alt={name} className="h-12 w-12">
        <AvatarFallback>
          <Text className="text-muted-foreground text-sm font-medium">
            {initials}
          </Text>
        </AvatarFallback>
      </Avatar>

      {/* Customer Info */}
      <View className="ml-4 flex-1">
        <Text className="text-foreground text-base font-medium">{name}</Text>
        <Text className="text-muted-foreground text-sm">{contact}</Text>
      </View>
    </Pressable>
  );
}
