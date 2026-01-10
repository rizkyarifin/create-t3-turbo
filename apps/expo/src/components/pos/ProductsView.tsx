import { useState } from "react";
import { View, ScrollView } from "react-native";
import { Search, Tag, ChevronDown, Plus } from "lucide-react-native";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Toggle } from "~/components/ui/toggle";
import { ProductItem } from "./ProductItem";
import { ProductDetailDialog, createProductDetail } from "./ProductDetailDialog";

// Mock data for products
const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "White 01",
    availability: "sold_out" as const,
    price: 160000,
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=100&h=100&fit=crop",
  },
  {
    id: "2",
    name: "Black 05",
    availability: 2,
    price: 160000,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=100&h=100&fit=crop",
  },
  {
    id: "3",
    name: "Bone",
    availability: 182,
    price: 160000,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=100&h=100&fit=crop",
  },
  {
    id: "4",
    name: "Mocca",
    availability: 180,
    price: 160000,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100&h=100&fit=crop",
  },
  {
    id: "5",
    name: "Navy Blue",
    availability: 45,
    price: 160000,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=100&h=100&fit=crop",
  },
  {
    id: "6",
    name: "Gravel",
    availability: 4,
    price: 160000,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=100&h=100&fit=crop",
  },
];

// Left panel - narrow header with title
export function ProductsHeader() {
  return (
    <View className="bg-muted/30 flex-row items-center gap-2 rounded-lg px-4 py-3">
      <Tag size={20} className="text-foreground" />
      <Text className="text-foreground text-base font-semibold">All products</Text>
    </View>
  );
}

interface ProductsListProps {
  onProductSelect?: (productId: string) => void;
}

// Right panel - search, filters, and product list
export function ProductsList({ onProductSelect }: ProductsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "available">("all");
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cartItemCount] = useState(1); // Mock cart count

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "available" && product.availability !== "sold_out" && product.availability > 0);
    return matchesSearch && matchesFilter;
  });

  const selectedProduct = selectedProductId
    ? MOCK_PRODUCTS.find((p) => p.id === selectedProductId)
    : null;

  const handleProductPress = (productId: string) => {
    setSelectedProductId(productId);
    onProductSelect?.(productId);
  };

  const handleCloseDialog = () => {
    setSelectedProductId(null);
  };

  return (
    <View className="flex-1">
      {/* Search Bar with Add Button */}
      <View className="flex-row items-center gap-3 px-4 py-3">
        <View className="bg-muted flex-1 flex-row items-center rounded-lg px-3">
          <Search size={18} className="text-muted-foreground" />
          <Input
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search"
            className="flex-1 border-0 bg-transparent"
          />
        </View>
        <Button variant="ghost" size="icon">
          <Plus size={24} className="text-foreground" />
        </Button>
      </View>

      {/* Filter Chips */}
      <View className="flex-row gap-2 px-4 pb-3">
        <Button variant="outline" className="rounded-full px-4">
          <Text className="text-foreground text-sm font-medium">Color</Text>
          <ChevronDown size={16} className="text-foreground" />
        </Button>
        <Toggle
          pressed={activeFilter === "available"}
          onPressedChange={(pressed) =>
            setActiveFilter(pressed ? "available" : "all")
          }
          variant="outline"
          className="rounded-full px-4"
        >
          <Text>Available</Text>
        </Toggle>
      </View>

      {/* Product List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {filteredProducts.map((product) => (
          <ProductItem
            key={product.id}
            name={product.name}
            availability={product.availability}
            price={product.price}
            image={product.image}
            onPress={() => handleProductPress(product.id)}
          />
        ))}
      </ScrollView>

      {/* Product Detail Dialog */}
      <ProductDetailDialog
        visible={!!selectedProduct}
        product={selectedProduct ? createProductDetail(selectedProduct) : null}
        cartItemCount={cartItemCount}
        onClose={handleCloseDialog}
        onBack={handleCloseDialog}
        onAddToCart={() => console.log("Add to cart")}
        onGoToCart={() => console.log("Go to cart")}
        onViewVariants={() => console.log("View variants")}
        onViewOnlineStore={() => console.log("View online store")}
      />
    </View>
  );
}
