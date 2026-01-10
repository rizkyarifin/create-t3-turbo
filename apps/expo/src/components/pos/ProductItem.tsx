import { View, Pressable, Image } from "react-native";
import { Text } from "~/components/ui/text";
import { Badge } from "~/components/ui/badge";

interface ProductItemProps {
  image?: string;
  name: string;
  availability: number | "sold_out";
  price: number;
  onPress?: () => void;
}

export function ProductItem({
  image,
  name,
  availability,
  price,
  onPress,
}: ProductItemProps) {
  const isSoldOut = availability === "sold_out" || availability === 0;

  const formatPrice = (value: number) => {
    return `Rp ${value.toLocaleString("id-ID")}.00`;
  };

  const formatAvailability = () => {
    if (isSoldOut) {
      return "Sold out";
    }
    return `${availability} available`;
  };

  return (
    <Pressable
      onPress={onPress}
      className="active:bg-muted/50 flex-row items-center px-4 py-3"
    >
      {/* Product Image */}
      <View className="bg-muted h-14 w-14 overflow-hidden rounded-lg">
        {image ? (
          <Image
            source={{ uri: image }}
            className="h-full w-full"
            resizeMode="cover"
          />
        ) : (
          <View className="bg-muted h-full w-full" />
        )}
      </View>

      {/* Product Info */}
      <View className="ml-4 flex-1">
        <Text className="text-foreground text-base font-medium">{name}</Text>
        <Badge variant={isSoldOut ? "destructive" : "secondary"} className="mt-1 self-start">
          <Text>{formatAvailability()}</Text>
        </Badge>
      </View>

      {/* Price */}
      <Text className="text-foreground text-base font-medium">
        {formatPrice(price)}
      </Text>
    </Pressable>
  );
}
