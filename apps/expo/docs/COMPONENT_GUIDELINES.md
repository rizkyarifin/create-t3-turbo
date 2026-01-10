# React Native Reusables Component Guidelines

This document provides guidelines for using react-native-reusables components in the POS app to ensure consistency and proper usage patterns.

## What is react-native-reusables?

react-native-reusables = @rn-primitives + CVA (class-variance-authority) + NativeWind

It provides pre-built, accessible UI components styled with Tailwind CSS classes.

## Available Components

### From `~/components/ui/`

| Component | Import Path | Usage |
|-----------|------------|-------|
| Button | `~/components/ui/button` | Interactive buttons with variants |
| Text | `~/components/ui/text` | Styled text with theme support |
| Input | `~/components/ui/input` | Text input fields |
| Separator | `~/components/ui/separator` | Visual dividers |
| Badge | `~/components/ui/badge` | Status indicators |
| Avatar | `~/components/ui/avatar` | User profile images |
| Toggle | `~/components/ui/toggle` | Toggle buttons |
| Card | `~/components/ui/card` | Card containers |
| Dialog | `~/components/ui/dialog` | Modal dialogs (triggered) |

## Button Component

### Variants

```tsx
<Button variant="default" />   // Primary action
<Button variant="secondary" /> // Secondary action
<Button variant="outline" />   // Bordered button
<Button variant="ghost" />     // Minimal button
<Button variant="destructive" /> // Destructive action
<Button variant="link" />      // Link-style button
```

### Sizes

```tsx
<Button size="default" /> // h-10 px-4 py-2
<Button size="sm" />      // h-9 px-3
<Button size="lg" />      // h-11 px-6
<Button size="icon" />    // h-10 w-10 (square)
<Button size="none" />    // No size constraints (custom sizing)
```

### When to Use `size="none"`

Use `size="none"` when you need:
- Custom height/width that differs from presets
- Custom padding that differs from presets
- Flexible height based on content

```tsx
// Example: Custom button with icon and text
<Button
  variant="secondary"
  size="none"
  className="justify-start gap-2 rounded-lg px-4 py-3"
>
  <Icon size={18} className="text-foreground" />
  <Text>Label</Text>
</Button>
```

## When to Use Pressable vs Button

### Use Button When:

1. Standard button layouts (centered content)
2. Icon-only buttons with `size="icon"`
3. Text-only buttons
4. Horizontal icon + text layouts with `size="none"`

### Use Pressable When:

1. **Vertical layouts (`flex-col`)** - Button uses `flex-row` by default
2. **Custom justify** - `justify-between`, `justify-start` with complex content
3. **Custom dimensions** - When `size="none"` + className still doesn't work
4. **Complex nested layouts** - Multiple rows/columns inside

## Component Analysis

### Components Using react-native-reusables Correctly

| Component | RN-Reusables Used |
|-----------|-------------------|
| ProductDetailDialog | Button, Text, Separator |
| Sidebar (SidebarItem) | Button |
| OrderPanel | Button, Text, Separator |
| ProductItem | Text, Badge |
| CustomerItem | Text, Avatar, AvatarFallback |
| ProductsView | Text, Input, Button, Toggle |
| CustomersView | Text, Input, Button |
| SearchBar | Input, Button |

### Components Using Pressable (With Justification)

| Component | Location | Why Pressable is Needed |
|-----------|----------|------------------------|
| Sidebar | BottomItem | Custom `h-12 w-12` sizing with background - Button's `size="icon"` overrides className |
| OrderPanel | Add Customer button | `flex-row justify-between` layout - Button forces `justify-center` |
| OrderPanel | Checkout button | `flex-row justify-between` layout with price on right |
| ActionTile | Entire component | `flex-col` layout with `h-32` fixed height - Button uses `flex-row` |

## Best Practices

### 1. Always Use Text Component

```tsx
// Good
import { Text } from "~/components/ui/text";
<Text className="text-foreground">Hello</Text>

// Bad - loses theme support
import { Text } from "react-native";
<Text>Hello</Text>
```

### 2. Use Separator for Dividers

```tsx
// Good
import { Separator } from "~/components/ui/separator";
<Separator />

// Bad
<View className="h-px bg-border" />
```

### 3. Button with Icons

```tsx
// Icon only
<Button variant="ghost" size="icon">
  <Icon size={20} className="text-foreground" />
</Button>

// Icon + Text (use size="none" for custom layout)
<Button variant="secondary" size="none" className="gap-2 px-4 py-3">
  <Icon size={18} className="text-foreground" />
  <Text>Label</Text>
</Button>
```

### 4. Modal vs Dialog

- **Modal** (from react-native): Use for programmatic dialogs controlled by state
- **Dialog** (from react-native-reusables): Use for trigger-based dialogs with `DialogTrigger`

```tsx
// Programmatic control - use Modal
const [visible, setVisible] = useState(false);
<Modal visible={visible} onRequestClose={() => setVisible(false)}>
  ...
</Modal>

// Trigger-based - use Dialog
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>...</DialogContent>
</Dialog>
```

## Common Patterns

### Card-like Pressable

```tsx
<Pressable className="bg-card border-border rounded-xl border p-4 active:opacity-80">
  <Text>Content</Text>
</Pressable>
```

### List Item with Avatar

```tsx
<Pressable className="flex-row items-center gap-3 p-3 active:bg-muted">
  <Avatar>
    <AvatarFallback>
      <Text>JD</Text>
    </AvatarFallback>
  </Avatar>
  <View className="flex-1">
    <Text className="font-medium">Name</Text>
    <Text className="text-muted-foreground text-sm">Subtitle</Text>
  </View>
</Pressable>
```

### Action Button with Custom Layout

```tsx
<Button
  variant="secondary"
  size="none"
  className="justify-start gap-2 rounded-lg px-4 py-3"
>
  <Icon size={18} className="text-foreground" />
  <Text className="text-secondary-foreground text-sm font-medium">
    Action Label
  </Text>
</Button>
```

## Checklist for New Components

When creating a new component, verify:

- [ ] Using `Text` from `~/components/ui/text` (not react-native)
- [ ] Using `Button` for interactive buttons where layout allows
- [ ] Using `Separator` for dividers
- [ ] Using `Input` for text inputs
- [ ] Using `Badge` for status indicators
- [ ] Using `Avatar` for user images
- [ ] Pressable is only used when Button constraints conflict with design
- [ ] If using Pressable, document why in comments

## Troubleshooting

### Button size not changing with className

**Problem**: Button's size variants override className
**Solution**: Use `size="none"` to remove all size constraints

```tsx
// This won't work
<Button size="icon" className="h-14 w-14">...</Button>

// This will work
<Button size="none" className="h-14 w-14 items-center justify-center">...</Button>
```

### Text getting cropped in Button

**Problem**: Button's default height (`h-10`) crops content
**Solution**: Use `size="none"` for flexible height

```tsx
<Button variant="secondary" size="none" className="px-4 py-3">
  <Text>This text won't be cropped</Text>
</Button>
```

### Need vertical layout in button

**Problem**: Button uses `flex-row`, can't do `flex-col`
**Solution**: Use Pressable for vertical layouts

```tsx
<Pressable className="flex-col items-start p-4 active:opacity-80">
  <Icon />
  <Text>Label</Text>
</Pressable>
```
