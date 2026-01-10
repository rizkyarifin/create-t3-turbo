import { useState } from "react";
import { View, ScrollView } from "react-native";
import { Search, User, ChevronDown, Plus, ArrowUpDown } from "lucide-react-native";
import { Text } from "~/components/ui/text";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { CustomerItem } from "./CustomerItem";

// Mock data for customers
const MOCK_CUSTOMERS = [
  {
    id: "1",
    name: "Elmira Azalia",
    contact: "elmiraazaliaa@gmail.com",
  },
  {
    id: "2",
    name: "Caca",
    contact: "+62 811-1592-959",
  },
  {
    id: "3",
    name: "Norah",
    contact: "+62 813-1819-4060",
  },
  {
    id: "4",
    name: "uci utami",
    contact: "uciutami@gmail.com",
  },
  {
    id: "5",
    name: "brandzo nathacia",
    contact: "brandzonathacia@gmail.com",
  },
  {
    id: "6",
    name: "Evelyn Lu",
    contact: "lumantaevelyn@gmail.com",
  },
  {
    id: "7",
    name: "Erfan Konveksi ATM",
    contact: "+62 822-3356-6031",
  },
  {
    id: "8",
    name: "destyananda savitri",
    contact: "destyas@rocketmail.com",
  },
  {
    id: "9",
    name: "Aldilla T",
    contact: "Thehousewivesideas@gmail.com",
  },
  {
    id: "10",
    name: "Erni Mustikasari",
    contact: "mustikasarierni@gmail.com",
  },
];

// Left panel - narrow header with title
export function CustomersHeader() {
  return (
    <View className="bg-muted/30 flex-row items-center gap-2 rounded-lg px-4 py-3">
      <User size={20} className="text-foreground" />
      <Text className="text-foreground text-base font-semibold">All customers</Text>
    </View>
  );
}

interface CustomersListProps {
  onCustomerSelect?: (customerId: string) => void;
}

// Right panel - search, filters, and customer list
export function CustomersList({ onCustomerSelect }: CustomersListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = MOCK_CUSTOMERS.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.contact.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

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
          <Text className="text-foreground text-sm font-medium">Tags</Text>
          <ChevronDown size={16} className="text-foreground" />
        </Button>
        <Button variant="outline" className="rounded-full px-4">
          <ArrowUpDown size={16} className="text-foreground" />
          <Text className="text-foreground text-sm font-medium">Sort</Text>
          <ChevronDown size={16} className="text-foreground" />
        </Button>
      </View>

      {/* Customer List */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {filteredCustomers.map((customer) => (
          <CustomerItem
            key={customer.id}
            name={customer.name}
            contact={customer.contact}
            onPress={() => onCustomerSelect?.(customer.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}
