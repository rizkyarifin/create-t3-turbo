import { View, ScrollView, Image, Pressable, Modal } from "react-native";
import {
  ChevronLeft,
  Plus,
  ShoppingCart,
  LayoutGrid,
  Link,
} from "lucide-react-native";
import { Text } from "~/components/ui/text";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

interface ProductDetail {
  id: string;
  name: string;
  variant: string;
  sku: string;
  barcode: string;
  price: number;
  image?: string;
  inventory: {
    onHand: number;
    available: number;
    committed: number;
    unavailable: number;
    incoming: number;
  };
  lastUpdated: string;
}

interface ProductDetailDialogProps {
  visible: boolean;
  product: ProductDetail | null;
  cartItemCount?: number;
  onClose: () => void;
  onBack: () => void;
  onAddToCart: () => void;
  onGoToCart: () => void;
  onViewVariants: () => void;
  onViewOnlineStore: () => void;
}

function ActionButton({
  icon: Icon,
  label,
  onPress,
}: {
  icon: typeof Plus;
  label: string;
  onPress: () => void;
}) {
  return (
    <Button
      variant="secondary"
      size="none"
      onPress={onPress}
      className="justify-start gap-2 rounded-lg px-4 py-3"
    >
      <Icon size={18} className="text-foreground" />
      <Text className="text-secondary-foreground text-sm font-medium">{label}</Text>
    </Button>
  );
}

function DetailRow({
  label,
  value,
  isIndented = false,
}: {
  label: string;
  value: string | number;
  isIndented?: boolean;
}) {
  return (
    <View className={`flex-row items-center justify-between py-2 ${isIndented ? "pl-4" : ""}`}>
      <Text className="text-foreground text-sm">{label}</Text>
      <Text className="text-foreground text-sm">{value}</Text>
    </View>
  );
}

function StackedDetail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View className="py-2">
      <Text className="text-foreground text-sm font-medium">{label}</Text>
      <Text className="text-foreground mt-1 text-sm">{value}</Text>
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View className="border-border mt-4 border-b pb-2">
      <Text className="text-foreground text-sm">{title}</Text>
    </View>
  );
}

export function ProductDetailDialog({
  visible,
  product,
  cartItemCount = 0,
  onClose,
  onBack,
  onAddToCart,
  onGoToCart,
  onViewVariants,
  onViewOnlineStore,
}: ProductDetailDialogProps) {
  if (!product) return null;

  const formatPrice = (value: number) => {
    return `Rp ${value.toLocaleString("id-ID")}.00`;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 items-center justify-center bg-black/50 p-4"
        onPress={onClose}
      >
        <Pressable
          className="bg-background border-border w-full max-w-[700px] rounded-lg border shadow-lg"
          onPress={(e) => e.stopPropagation()}
        >
          {/* Header - Back button */}
          <View className="p-4">
            <Button
              variant="ghost"
              size="icon"
              onPress={onBack}
              className="h-10 w-10"
            >
              <ChevronLeft size={24} className="text-foreground" />
            </Button>
          </View>

          <Separator />

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Two Column Layout */}
            <View className="flex-row p-6">
              {/* Left Column - Image, Title, and Details */}
              <View className="flex-1 pr-8">
                {/* Product Header - Image and Title */}
                <View className="flex-row gap-4">
                  {/* Product Image */}
                  <View className="bg-muted h-24 w-24 overflow-hidden rounded-xl">
                    {product.image ? (
                      <Image
                        source={{ uri: product.image }}
                        className="h-full w-full"
                        resizeMode="cover"
                      />
                    ) : (
                      <View className="h-full w-full" />
                    )}
                  </View>

                  {/* Product Title - aligned to top */}
                  <View className="flex-1">
                    <Text className="text-foreground text-xl font-semibold">
                      Lyco Poplin Embroidery | {product.variant}
                    </Text>
                  </View>
                </View>

                {/* Product Details */}
                <View className="mt-6">
                  {/* Variant */}
                  <StackedDetail label="Variant" value={product.variant} />

                  {/* SKU */}
                  <StackedDetail label="SKU" value={product.sku} />

                  {/* Barcode */}
                  <StackedDetail label="Barcode" value={product.barcode} />

                  {/* Inventory Section */}
                  <SectionHeader title="Inventory" />
                  <DetailRow label="On hand" value={product.inventory.onHand} />
                  <DetailRow label="Available" value={product.inventory.available} isIndented />
                  <DetailRow label="Committed" value={product.inventory.committed} isIndented />
                  <DetailRow label="Unavailable" value={product.inventory.unavailable} isIndented />
                  <DetailRow label="Incoming" value={product.inventory.incoming} />

                  {/* Last Updated */}
                  <View className="py-3">
                    <Text className="text-foreground text-sm">
                      Last updated {product.lastUpdated}
                    </Text>
                  </View>

                  {/* More Details Section */}
                  <SectionHeader title="More details" />
                  <DetailRow label="Price" value={formatPrice(product.price)} />

                  {/* Images */}
                  <View className="py-2">
                    <Text className="text-foreground text-sm font-medium">Images</Text>
                  </View>
                </View>
              </View>

              {/* Right Column - Action Buttons */}
              <View className="gap-2">
                <ActionButton icon={Plus} label="Add to cart" onPress={onAddToCart} />
                <ActionButton
                  icon={ShoppingCart}
                  label={`Go to cart${cartItemCount > 0 ? ` (${cartItemCount} item)` : ""}`}
                  onPress={onGoToCart}
                />
                <ActionButton icon={LayoutGrid} label="View all variants" onPress={onViewVariants} />
                <ActionButton icon={Link} label="View on online store" onPress={onViewOnlineStore} />
              </View>
            </View>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// Helper function to create product detail from basic product info
export function createProductDetail(product: {
  id: string;
  name: string;
  availability: number | "sold_out";
  price: number;
  image?: string;
}): ProductDetail {
  const available = product.availability === "sold_out" ? 0 : product.availability;
  return {
    id: product.id,
    name: product.name,
    variant: product.name.split(" ").pop() ?? "Default",
    sku: `724A4-EBR-EMBRO-A020-${product.id.padStart(2, "0")}`,
    barcode: `9573381${product.id}`,
    price: product.price,
    image: product.image,
    inventory: {
      onHand: available,
      available: available,
      committed: 0,
      unavailable: 0,
      incoming: 0,
    },
    lastUpdated: "Just now",
  };
}
