# DESIGN.md

## 1. Overview

This document defines the **mandatory UI design rules** for this repository.
All AI agents and human developers **must follow these rules** when building or modifying any UI component, page, or layout.

> **Non-negotiable rule**: Every UI element that can be built with shadcn/ui **must** use shadcn/ui. Building base components from scratch when shadcn/ui already provides one is not allowed.

---

## 2. Component Library — shadcn/ui

### 2.1 What is shadcn/ui?

shadcn/ui is the **mandatory base UI component system** for this project. It is built on top of Radix UI primitives and styled with Tailwind CSS. Components are copied directly into the project and are fully customizable.

All shadcn/ui components live in `src/components/ui/`.

### 2.2 Mandatory Usage Rule

**AI agents must use shadcn/ui components for ALL of the following:**

| UI Element | Required shadcn/ui Component |
|------------|------------------------------|
| Buttons | `Button` (`src/components/ui/button.tsx`) |
| Text inputs, textareas | `Input`, `Textarea` |
| Form labels | `Label` |
| Dropdowns / selects | `Select`, `DropdownMenu` |
| Modal / dialog | `Dialog`, `AlertDialog` |
| Tabs | `Tabs` |
| Cards | `Card`, `CardHeader`, `CardContent`, `CardFooter` |
| Tables | `Table`, `TableHeader`, `TableRow`, `TableCell` |
| Toasts / notifications | `Sonner` (via `sonner` package, wired to shadcn/ui) |
| Badges | `Badge` |
| Avatars | `Avatar` |
| Checkboxes | `Checkbox` |
| Radio buttons | `RadioGroup` |
| Tooltips | `Tooltip` |
| Popovers | `Popover` |
| Separators / dividers | `Separator` |
| Sheets / drawers | `Sheet` |
| Skeletons (loading) | `Skeleton` |
| Progress | `Progress` |
| Scroll areas | `ScrollArea` |
| Accordions | `Accordion` |
| Command palettes | `Command` |
| Calendars / date pickers | `Calendar` + `Popover` |

### 2.3 Installing shadcn/ui Components

When a new shadcn/ui component is needed, install it using the CLI:

```bash
npx shadcn@latest add <component-name>
```

Examples:
```bash
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add table
npx shadcn@latest add calendar
npx shadcn@latest add skeleton
```

**Do NOT** manually copy or recreate shadcn/ui components. Always use the CLI to add them.

### 2.4 Component Location

All shadcn/ui components after installation are stored in:

```
src/components/ui/
```

Do **not** move or rename shadcn/ui files. Import them directly from this path:

```typescript
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
```

### 2.5 Extending shadcn/ui Components

Custom components **may** be built on top of shadcn/ui, but:

- They must wrap or compose shadcn/ui primitives — not replace them.
- Custom variants must use `class-variance-authority` (CVA).
- The `cn()` utility from `src/lib/utils.ts` must be used for all class merging.

```typescript
// Correct — wrapping shadcn/ui Button
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function DangerButton({ className, ...props }) {
  return (
    <Button
      variant="destructive"
      className={cn('font-semibold', className)}
      {...props}
    />
  );
}
```

```typescript
// ❌ Wrong — building a button from scratch instead of using shadcn/ui
export function DangerButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      {children}
    </button>
  );
}
```

---

## 3. Atomic Design Structure

All components must follow the **Atomic Design** hierarchy.

```
src/components/
├─ atoms/        → Smallest reusable units, wraps/extends shadcn/ui
├─ molecules/    → Composed of atoms
├─ organisms/    → Large UI sections, composed of molecules
├─ templates/    → Page layout wrappers
└─ ui/           → shadcn/ui base components (do not modify unless necessary)
```

### 3.1 Atoms

- Wrap or lightly extend shadcn/ui components.
- Must be fully generic and reusable.
- Must not contain business logic.

Examples: `StatusBadge`, `CurrencyDisplay`, `LoadingSpinner`, `AvatarWithFallback`

### 3.2 Molecules

- Composed of atoms and shadcn/ui components.
- May contain local state (e.g. toggle, expand/collapse).
- Must not fetch server data.

Examples: `InvoiceRow`, `CompanyLogoUpload`, `SearchInput`, `FormFieldWrapper`

### 3.3 Organisms

- Composed of molecules and atoms.
- May receive server data via props (passed from React Query hooks in `features/`).
- Must not call React Query hooks directly — receive data as props.

Examples: `InvoiceTable`, `InvoiceForm`, `CompanyHeaderCard`, `DashboardSummary`, `Sidebar`

### 3.4 Templates

- Define page layout structure (grid, sidebar, content area).
- Composed of organisms and atoms.
- Must be purely structural — no business logic, no data fetching.

Examples: `DashboardLayout`, `AuthLayout`, `InvoiceDetailLayout`

---

## 4. Styling Rules

### 4.1 Tailwind CSS

- Use **Tailwind CSS v4** utility classes for all styling.
- Do **not** write custom CSS files for component styling.
- Use `cn()` from `src/lib/utils.ts` to merge class names conditionally.

```typescript
import { cn } from '@/lib/utils';

// ✅ Correct
<div className={cn('flex items-center gap-4', isActive && 'bg-primary/10')}>
```

### 4.2 Design Tokens

Use shadcn/ui CSS variables for all colors and design decisions:

| Token | Usage |
|-------|-------|
| `bg-background` | Page background |
| `bg-card` | Card backgrounds |
| `text-foreground` | Primary text |
| `text-muted-foreground` | Secondary / hint text |
| `bg-primary` | Brand / primary color |
| `bg-destructive` | Error / danger |
| `border` | Default border color |
| `ring` | Focus rings |

**Do NOT hardcode colors** (`text-red-500`, `bg-blue-600`). Use the semantic tokens above.

### 4.3 Dark Mode

- The project supports dark mode via shadcn/ui's CSS variable system.
- All components must be dark-mode compatible.
- Do not use `dark:` prefix overrides unless absolutely necessary — prefer semantic tokens.

### 4.4 Typography

- Use the **Inter** font (set globally via `src/app/layout.tsx`).
- Use Tailwind text utilities (`text-sm`, `text-base`, `text-lg`, `font-medium`, `font-semibold`).
- Never set `font-family` inline or in component CSS.

---

## 5. Form Rules

All forms **must** use:

- `react-hook-form` for form state management
- `zod` for schema validation
- `@hookform/resolvers/zod` for integration
- shadcn/ui `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage` components

```typescript
// ✅ Correct form pattern
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export function ExampleForm() {
  const form = useForm({ resolver: zodResolver(schema) });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

---

## 6. Notifications / Toast

All toast notifications **must** use `sonner` wired to the shadcn/ui `Toaster`.

```typescript
import { toast } from 'sonner';

// Success
toast.success('Invoice created successfully');

// Error
toast.error('Failed to create invoice');

// Loading (for async actions)
toast.promise(createInvoice(), {
  loading: 'Creating invoice...',
  success: 'Invoice created!',
  error: 'Failed to create invoice',
});
```

The `<Toaster />` component must be added once in `src/app/layout.tsx`.

---

## 7. Icons

All icons **must** use `lucide-react`.

```typescript
import { Plus, Trash2, Edit, FileText, ChevronDown } from 'lucide-react';

// ✅ Correct
<Button>
  <Plus className="mr-2 h-4 w-4" />
  New Invoice
</Button>
```

Do **not** install other icon libraries (e.g. `react-icons`, `heroicons`).

---

## 8. Loading States

All loading states **must** use `Skeleton` from shadcn/ui.

```typescript
import { Skeleton } from '@/components/ui/skeleton';

// Table loading state
function InvoiceTableSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full" />
      ))}
    </div>
  );
}
```

---

## 9. Prohibited Patterns

The following are **strictly prohibited**:

| Prohibited | Use Instead |
|-----------|-------------|
| Custom `<button>` elements | `Button` from shadcn/ui |
| Custom `<input>` elements | `Input` from shadcn/ui |
| Custom modal/overlay HTML | `Dialog` from shadcn/ui |
| Custom dropdown HTML | `DropdownMenu` or `Select` from shadcn/ui |
| `alert()` or `confirm()` | `AlertDialog` from shadcn/ui |
| Hardcoded hex/rgb colors | shadcn/ui CSS variable tokens |
| `console.log` in components | Remove before committing |
| Inline styles (`style={{}}`) | Tailwind utility classes |
| External CSS files for components | Tailwind + shadcn/ui only |
| Other icon libraries | `lucide-react` only |

---

## 10. Accessibility Rules

- All form inputs must have an associated `Label` (via `FormLabel` or `Label`).
- All interactive elements must be keyboard-navigable (shadcn/ui handles this by default).
- All `<img>` elements must have a meaningful `alt` attribute.
- Use semantic HTML (`<main>`, `<nav>`, `<section>`, `<article>`) in layout components.
- Color contrast must meet WCAG AA (shadcn/ui tokens are pre-validated).

---

## 11. Quick Reference — shadcn/ui CLI Commands

```bash
# Add a single component
npx shadcn@latest add button

# Add multiple components at once
npx shadcn@latest add dialog table form input label select

# Add all commonly needed components for this project
npx shadcn@latest add button input label textarea select \
  dialog alert-dialog sheet tabs card badge avatar \
  checkbox radio-group tooltip popover separator \
  skeleton progress scroll-area accordion command \
  calendar table dropdown-menu form toast
```

---

## 12. Summary Checklist for AI Agents

Before submitting any UI implementation, verify:

- [ ] All buttons use shadcn/ui `Button`
- [ ] All inputs/textareas use shadcn/ui `Input`/`Textarea`
- [ ] All forms use `react-hook-form` + `zod` + shadcn/ui `Form` components
- [ ] All modals/dialogs use shadcn/ui `Dialog` or `AlertDialog`
- [ ] All toasts use `sonner` via `toast.success/error/promise`
- [ ] All icons use `lucide-react`
- [ ] All loading states use shadcn/ui `Skeleton`
- [ ] All colors use shadcn/ui CSS variable tokens (no hardcoded colors)
- [ ] Component is placed in the correct Atomic Design folder
- [ ] `cn()` utility is used for conditional class merging
- [ ] Dark mode is supported (no hardcoded light-only colors)
- [ ] All form fields have associated labels
