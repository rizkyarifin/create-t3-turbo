import { View, Pressable } from "react-native";
import {
  Home,
  CalendarDays,
  Tag,
  User,
  MoreHorizontal,
  MonitorSmartphone,
  Wifi,
  Lock,
} from "lucide-react-native";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import type { LucideIcon } from "lucide-react-native";

interface SidebarItemProps {
  icon: LucideIcon;
  isActive?: boolean;
  onPress?: () => void;
}

function SidebarItem({ icon: Icon, isActive, onPress }: SidebarItemProps) {
  return (
    <View className="relative w-full flex-row items-center">
      {/* Active indicator - tall blue bar at left edge */}
      {isActive && (
        <View className="bg-primary absolute left-0 top-1/2 h-10 w-1.5 -translate-y-1/2 rounded-r-full" />
      )}
      <View className="flex-1 items-center">
        <Button
          variant="ghost"
          size="icon"
          onPress={onPress}
          className="h-12 w-12"
        >
          <Icon
            size={24}
            className={isActive ? "text-foreground" : "text-muted-foreground"}
          />
        </Button>
      </View>
    </View>
  );
}

interface BottomItemProps {
  icon: LucideIcon;
  variant?: "default" | "warning";
  hasNotification?: boolean;
  onPress?: () => void;
}

function BottomItem({ icon: Icon, variant = "default", hasNotification, onPress }: BottomItemProps) {
  const isWarning = variant === "warning";

  return (
    <View className="relative">
      <Pressable
        onPress={onPress}
        className={cn(
          "h-12 w-12 items-center justify-center rounded-xl active:opacity-80",
          isWarning ? "bg-red-50" : "bg-muted"
        )}
      >
        <Icon
          size={24}
          className={isWarning ? "text-destructive" : "text-foreground"}
        />
      </Pressable>
      {hasNotification && (
        <View className="bg-destructive absolute -right-1 -top-1 h-4 w-4 items-center justify-center rounded-full border-2 border-white">
          <View className="h-1.5 w-1.5 rounded-full bg-white" />
        </View>
      )}
    </View>
  );
}

export type NavItem = "home" | "calendar" | "products" | "customers" | "more";

interface SidebarProps {
  activeItem: NavItem;
  onActiveItemChange: (item: NavItem) => void;
}

export function Sidebar({ activeItem, onActiveItemChange }: SidebarProps) {
  return (
    <View className="bg-background flex h-full w-[6%] flex-col items-center py-4">
      {/* Top navigation items */}
      <View className="flex flex-1 flex-col items-center gap-10">
        <SidebarItem
          icon={Home}
          isActive={activeItem === "home"}
          onPress={() => onActiveItemChange("home")}
        />
        <SidebarItem
          icon={CalendarDays}
          isActive={activeItem === "calendar"}
          onPress={() => onActiveItemChange("calendar")}
        />
        <SidebarItem
          icon={Tag}
          isActive={activeItem === "products"}
          onPress={() => onActiveItemChange("products")}
        />
        <SidebarItem
          icon={User}
          isActive={activeItem === "customers"}
          onPress={() => onActiveItemChange("customers")}
        />
        <SidebarItem
          icon={MoreHorizontal}
          isActive={activeItem === "more"}
          onPress={() => onActiveItemChange("more")}
        />
      </View>

      {/* Bottom items */}
      <View className="flex flex-col items-center gap-3">
        <BottomItem icon={MonitorSmartphone} />
        <BottomItem icon={Wifi} variant="warning" hasNotification />
        <BottomItem icon={Lock} />
      </View>
    </View>
  );
}
