import { View } from "react-native";
import { Search, ScanBarcode } from "lucide-react-native";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onScanPress?: () => void;
}

export function SearchBar({ value, onChangeText, onScanPress }: SearchBarProps) {
  return (
    <View className="flex flex-row items-center gap-2">
      <View className="relative flex-1">
        <View className="absolute left-3 top-0 z-10 h-full justify-center">
          <Search size={18} className="text-muted-foreground" />
        </View>
        <Input
          placeholder="Search"
          value={value}
          onChangeText={onChangeText}
          className="h-12 pl-10"
        />
      </View>
      <Button
        variant="outline"
        size="icon"
        className="h-12 w-12"
        onPress={onScanPress}
      >
        <ScanBarcode size={20} className="text-foreground" />
      </Button>
    </View>
  );
}
