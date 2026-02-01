# Veritas Hearing Design System

This document defines the design standards and patterns for the Veritas Hearing website.

## Colors

### Primary Palette
| Color | CSS Variable | Usage |
|-------|--------------|-------|
| Forest Green | `--primary` (183D2D) | Primary actions, hero backgrounds, links |
| Forest Dark | `--primary-dark` (0f2a1e) | Footer background, hover states |
| Forest Light | `--primary-light` (2a5c44) | Accents, overlays |

### Secondary Palette
| Color | CSS Variable | Usage |
|-------|--------------|-------|
| Gold | `--secondary` (C6A667) | Accents, CTAs, highlights |
| Gold Dark | `--secondary-dark` (a88b4a) | Hover states |
| Gold Light | `--secondary-light` (d4bc8a) | Text on dark backgrounds |

### Neutrals
| Color | CSS Variable | Usage |
|-------|--------------|-------|
| Cream | `--background` (F7F5EF) | Alternating section backgrounds |
| Dark Gray | `--foreground` (1f2937) | Body text, headings |
| Medium Gray | `--muted` (6b7280) | Secondary text |
| Light Gray | `--muted-light` (9ca3af) | Tertiary text |
| Border Gray | `--border` (e5e7eb) | Borders, dividers |
| White | `--card` (ffffff) | Card backgrounds, primary sections |

### Feedback Colors
| Color | CSS Variable | Usage |
|-------|--------------|-------|
| Green | `--success` (10b981) | Success states |
| Red | `--error` (ef4444) | Error states |

## Typography

### Font Families
- **Sans-serif**: `Geist` (with system fallbacks)
- **Mono**: `Geist Mono` (for code/data)

### Heading Scale
| Level | Size | Usage |
|-------|------|-------|
| H1 (Hero) | `text-4xl sm:text-5xl` | Page titles in hero sections |
| H2 (Section) | `text-3xl sm:text-4xl` | Section headings |
| H3 (Card) | `text-xl sm:text-2xl` | Card titles, subsections |
| H4 (Small) | `text-lg` | Small headings |

### Body Text
| Size | Class | Usage |
|------|-------|-------|
| Large | `text-lg` | Lead paragraphs, descriptions |
| Base | `text-base` | Body text |
| Small | `text-sm` | Secondary information |
| XSmall | `text-xs` | Metadata, badges |

**IMPORTANT:** Never use `<strong>` or `<b>` tags within body text or paragraphs. Body text should always have uniform weight without random bolded words or phrases. Only headings should use `font-bold`.

## Reusable Section Components

**Always use these components** instead of writing custom section markup. They ensure consistency across the site.

### PageHero

Standard page hero for inner pages (not homepage).

```tsx
import { PageHero } from "@/components/sections";

<PageHero
  badge="About Us"
  title="Your Partners in Hearing Health"
  description="Based in Hamilton, Veritas Hearing is dedicated to helping our community..."
/>
```

**Props:**
- `badge`: Small label above title (uses Badge with `outline-primary`)
- `title`: Main heading (H1, `text-4xl sm:text-5xl`, white text)
- `description`: Optional description text (`text-white/70`)
- `className`: Optional additional classes

**Pattern:** Always `pt-12 pb-20 bg-primary`
**Note:** With sticky header, no large offset needed on page load

### Section

Standard section wrapper with consistent spacing.

```tsx
import { Section } from "@/components/sections";

<Section variant="white">
  {/* Content */}
</Section>

<Section variant="cream" containerClassName="max-w-5xl">
  {/* Content */}
</Section>

<Section variant="primary" className="py-16">
  {/* Content */}
</Section>
```

**Props:**
- `variant`: `"white"` (default), `"cream"`, or `"primary"`
- `containerClassName`: Optional classes for the inner container
- `className`: Optional classes for the section element
- `id`: Optional ID for anchor links

**Spacing:** Always `py-16 lg:py-24` (can override with `className`)

### SectionHeader

Standard section heading with optional label and description.

```tsx
import { Section, SectionHeader } from "@/components/sections";

<Section variant="white">
  <SectionHeader
    label="Our Services"
    title="Comprehensive Hearing Care"
    description="From diagnostic evaluations to advanced hearing solutions..."
  />
  {/* Rest of content */}
</Section>
```

**Props:**
- `label`: Optional small label above heading (`text-primary font-medium`)
- `title`: Main heading (H2, `text-3xl sm:text-4xl`)
- `description`: Optional description text (`text-lg text-muted`)
- `centered`: Whether to center text (default: `true`)

### CTASection

Standard call-to-action section for page bottoms.

```tsx
import { CTASection } from "@/components/sections";

<CTASection
  title="Not sure which service you need?"
  description="We can help you find the right option."
  primaryButton={{ text: "Book Assessment", href: "/contact" }}
  variant="cream"
/>
```

**Props:**
- `title`: Heading text
- `description`: Description text
- `primaryButton`: Object with `text` and `href`
- `secondaryButton`: Optional object with `text` and `href`
- `variant`: `"primary"` (default, dark green), `"cream"`, or `"white"`

## Other Components

### Badge Component

A reusable badge component with consistent variants:

```tsx
import Badge from "@/components/Badge";

// Variants
<Badge variant="default">Default badge</Badge>
<Badge variant="primary">Primary badge</Badge>
<Badge variant="secondary">Secondary badge</Badge>
<Badge variant="outline">Outline badge</Badge>
<Badge variant="outline-primary">Gold outline (for heroes)</Badge>
```

**Usage Guidelines:**
- `outline-primary`: Use in hero sections on dark backgrounds
- `primary`: Use for categories and tags on light backgrounds
- `secondary`: Use for special highlights
- `default/outline`: Use for generic labels

### Button Component

```tsx
import Button from "@/components/Button";

<Button variant="primary" size="lg">Primary Action</Button>
<Button variant="secondary" size="md">Secondary</Button>
<Button variant="outline" size="sm">Outline</Button>
```

**Variants:**
- `primary`: Main CTA, forest green background
- `secondary`: Secondary CTA, gold background
- `outline`: Tertiary actions, outlined style
- `ghost`: Minimal actions

**Sizes:**
- `sm`: Compact buttons
- `md`: Default size
- `lg`: Prominent CTAs

## Card Patterns

**Standard Card (on White):**
```tsx
<div className="bg-white rounded-xl p-6 shadow-sm border border-border">
  {/* Content */}
</div>
```

**Card on Cream:**
```tsx
<div className="bg-card rounded-xl p-6 shadow-sm border border-border">
  {/* Content */}
</div>
```

**Service Card:**
Use the `ServiceCard` component with icon, title, description, and link.

**Team Card:**
Use the `TeamMember` component with name, title, bio, and specialisations.

## Spacing Scale

| Name | Class | Usage |
|------|-------|-------|
| XS | `gap-2` | Tight spacing |
| SM | `gap-4` | Default element spacing |
| MD | `gap-6` | Section padding, card spacing |
| LG | `gap-8` | Large gaps |
| XL | `py-16` | Section padding (small) |
| XXL | `py-24` | Section padding (large) |

## Animation Patterns

**Fade In (for sections):**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  {/* Content */}
</motion.div>
```

**Staggered Items:**
```tsx
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
  >
    {/* Item */}
  </motion.div>
))}
```

## What to Avoid

1. **No gradients in backgrounds** - Use solid colors from the palette
2. **No SVG wave transitions** - Use clean section breaks
3. **Don't mix dark green and gold heavily** - Use them strategically
4. **Don't overuse cream backgrounds** - Mostly white with strategic cream accents
5. **No hardcoded colors** - Always use CSS variables
6. **No inline badge styles** - Use the Badge component
7. **NO bold text in body copy** - Never use `<strong>` or `<b>` tags in paragraphs. Only headings should be bold. Body text must have uniform weight throughout.
8. **Don't write custom section markup** - Always use `PageHero`, `Section`, `SectionHeader`, and `CTASection` components from `@/components/sections`
