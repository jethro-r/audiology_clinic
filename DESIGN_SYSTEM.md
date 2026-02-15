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

---

## Page Layout Patterns

### Homepage Layout Structure

The homepage uses a specific structure different from inner pages:

```tsx
// Homepage structure
<>
  <Hero />                                    {/* Custom Hero, NOT PageHero */}
  <Section variant="cream">...</Section>      {/* Services Overview */}
  <Section variant="primary">...</Section>    {/* Promise/Features */}
  <Section variant="white">...</Section>      {/* FAQ or Content */}
  <CTASection variant="primary" />            {/* Bottom CTA */}
</>
```

**Section Background Order:** Hero (primary) → cream → primary → white → CTA (primary)

### Inner Page Layout Structure

All inner pages follow this pattern:

```tsx
// Inner page structure
<>
  <PageHero badge="..." title="..." description="..." />
  <Section variant="white">...</Section>      {/* Main content */}
  <Section variant="cream">...</Section>      {/* Optional alternating */}
  <CTASection variant="primary" />            {/* Bottom CTA */}
</>
```

**Section Background Order:** PageHero (primary) → white → [cream → white] → CTA (primary)

---

## Homepage Components

### Hero Component (Homepage Only)

The homepage uses a custom `Hero` component, NOT the `PageHero` component.

```tsx
import Hero from "@/components/Hero";

<Hero />
```

**Structure:**
- Two-column grid: `grid lg:grid-cols-2 gap-8 lg:gap-12`
- Left: Content (title, description, CTA button)
- Right: Image with `aspect-[4/3] rounded-2xl`
- Background: `bg-primary` (forest green)
- Spacing: `pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-12 lg:pb-24`

**Title Pattern:**
```tsx
<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4 sm:mb-6">
  Independent hearing care, <br className="hidden sm:block" />
  <span className="text-secondary">delivered with integrity</span>
</h1>
```

**Description Pattern:**
```tsx
<p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-xl">
  {/* Description text */}
</p>
```

**Animation:**
- Content: `initial={{ opacity: 0, x: -20 }}` (slide from left)
- Image: `initial={{ opacity: 0, x: 20 }}` (slide from right)
- Duration: `0.6s` with `0.2s` delay for image

### Services Grid (Homepage)

The homepage displays services in a 4-column grid:

```tsx
<Section variant="cream">
  <SectionHeader
    label="Our Services"
    title="Comprehensive Hearing Care"
    description="From diagnostic evaluations to advanced hearing solutions..."
  />
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
    {services.map((service, index) => (
      <ServiceCard
        key={service.id}
        title={service.title}
        description={service.shortDescription}
        iconName={service.iconName}
        href={`/services#${service.slug}`}
        index={index}
      />
    ))}
  </div>
</Section>
```

**Grid Breakpoints:**
- Mobile (default): 1 column
- Tablet (`sm:`): 2 columns
- Desktop (`lg:`): 4 columns

**Gap Spacing:** `gap-4 sm:gap-6` (16px → 24px)

**View All Button Pattern:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
  className="text-center mt-10"
>
  <Link href="/services">
    <Button variant="outline">
      View All Services
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </Link>
</motion.div>
```

### ServiceCard Component

```tsx
import ServiceCard from "@/components/ServiceCard";

<ServiceCard
  title="Hearing Assessment"
  description="Comprehensive evaluation..."
  iconName="Ear"              // String name for icon lookup
  href="/services#hearing-assessment"
  index={0}                   // For stagger animation
/>
```

**Card Styling:**
```tsx
className="group bg-white rounded-xl border border-border p-5 sm:p-6 
           hover:shadow-lg hover:border-primary/30 transition-all duration-300"
```

**Icon Container:**
```tsx
<div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-lg 
     flex items-center justify-center mb-4 
     group-hover:bg-primary transition-colors duration-300">
  <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary 
       group-hover:text-white transition-colors duration-300" />
</div>
```

**Hover Behavior:**
- Icon background: `bg-primary/10` → `bg-primary`
- Icon color: `text-primary` → `text-white`
- Card: adds shadow and primary border tint

**Available Icons:** `Ear`, `Headphones`, `Volume2`, `Shield`, `Wrench`

### Promise/Features Section (Primary Background)

A three-column feature section on dark green background:

```tsx
<Section variant="primary" className="border-y border-white/10">
  <SectionHeader title="Our Promise" variant="dark" />
  <div className="grid md:grid-cols-3 gap-6 md:gap-12">
    {/* Feature items */}
  </div>
</Section>
```

**Feature Item Pattern:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.1 }}  // Stagger: 0, 0.1, 0.2
  viewport={{ once: true }}
  className="text-center"
>
  {/* Icon Circle */}
  <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white/10 
       flex items-center justify-center">
    <Shield className="w-7 h-7 text-secondary" />
  </div>
  
  {/* Title */}
  <h3 className="text-xl font-semibold text-white mb-3">
    Independent Guidance
  </h3>
  
  {/* Description */}
  <p className="text-white/70 text-sm leading-relaxed">
    Advice you can trust — we work for your hearing, not brands.
  </p>
</motion.div>
```

**Key Styling:**
- Section border: `border-y border-white/10` (subtle top/bottom dividers)
- Icon circle: `w-16 h-16 rounded-full bg-white/10`
- Icon color: `text-secondary` (gold)
- Title: `text-xl font-semibold text-white`
- Description: `text-white/70 text-sm leading-relaxed`
- Grid gap: `gap-6 md:gap-12`

**Animation Delays:** First item (0), second (0.1), third (0.2)

### FAQ Accordion Section

```tsx
<Section variant="white" containerClassName="max-w-3xl">
  <SectionHeader
    label=""
    title="Frequently Asked Questions"
    description="Find answers to common questions..."
  />
  <div className="space-y-4">
    {faqs.map((faq, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        viewport={{ once: true }}
        className="border border-border rounded-lg overflow-hidden"
      >
        {/* Question Button */}
        <button
          onClick={() => setOpenFaq(openFaq === index ? null : index)}
          className="w-full flex items-center justify-between p-4 sm:p-5 
                     text-left bg-white hover:bg-card transition-colors gap-4"
        >
          <span className="font-medium text-foreground text-sm sm:text-base">
            {faq.question}
          </span>
          <ChevronDown
            className={`h-5 w-5 text-muted transition-transform duration-200 ${
              openFaq === index ? "rotate-180" : ""
            }`}
          />
        </button>
        
        {/* Answer */}
        {openFaq === index && (
          <div className="px-4 sm:px-5 pb-4 text-muted text-sm sm:text-base">
            {faq.answer}
          </div>
        )}
      </motion.div>
    ))}
  </div>
</Section>
```

**Key Styling:**
- Container: `max-w-3xl` (narrower for readability)
- Accordion items: `border border-border rounded-lg overflow-hidden`
- Button padding: `p-4 sm:p-5`
- Chevron rotation: `rotate-180` when open
- Animation delay: `index * 0.05` (subtle stagger)

---

## Services Page Patterns

### Services Page Layout Structure

```tsx
<>
  <PageHero
    badge="Our Services"
    title="Comprehensive Hearing Care Services"
    description="From diagnostic evaluations..."
  />
  <Section variant="white">
    {/* Service detail cards */}
  </Section>
  <CTASection
    title="Not sure which service you need?"
    description="We can help you find the right option."
    primaryButton={{ text: "Book Assessment", href: "/booking" }}
    variant="primary"
  />
</>
```

### Loading State Pattern

```tsx
const [services, setServices] = useState<Service[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchServices() {
    try {
      const res = await fetch('/api/services');
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  }
  fetchServices();
}, []);

// In render:
{loading ? (
  <div className="text-center py-12">
    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
) : (
  // Content
)}
```

### Service Detail Card (Alternating Layout)

Each service displays in a two-column grid with alternating image position:

```tsx
<div className="space-y-16">
  {services.map((service, index) => (
    <motion.div
      key={service.id}
      id={service.slug}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`grid lg:grid-cols-2 gap-6 lg:gap-12 items-center ${
        index % 2 === 1 ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Content */}
      <div className={index % 2 === 1 ? "lg:order-2" : ""}>
        {/* ... */}
      </div>
      
      {/* Image */}
      <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${
        index % 2 === 1 ? "lg:order-1" : ""
      }`}>
        {/* ... */}
      </div>
    </motion.div>
  ))}
</div>
```

**Alternating Pattern:**
- Even index (0, 2, 4...): Content left, Image right
- Odd index (1, 3, 5...): Content right, Image left
- Use `lg:order-1` and `lg:order-2` to swap positions

### Service Title Pattern

```tsx
<h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
  {service.title}
</h2>
<p className="text-muted mb-6">
  {service.fullDescription}
</p>
```

### "Ideal If" Subsection

```tsx
{service.idealFor && (
  <div className="mb-6">
    <h3 className="font-semibold text-foreground mb-1">
      Ideal if:
    </h3>
    <p className="text-muted text-sm">
      {service.idealFor}
    </p>
  </div>
)}
```

### "Includes" Feature List

```tsx
{service.features && service.features.length > 0 && (
  <div className="mb-6">
    <h3 className="font-semibold text-foreground mb-3">
      Includes:
    </h3>
    <ul className="space-y-2">
      {service.features.map((item) => {
        const tooltip = service.featureTooltips?.[item];
        return (
          <li key={item} className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <span
              className={tooltip 
                ? "text-primary border-b border-dotted border-muted cursor-help" 
                : "text-primary"}
              title={tooltip || ""}
            >
              {item}
            </span>
          </li>
        );
      })}
    </ul>
  </div>
)}
```

**Feature Item Styling:**
- CheckCircle icon: `h-5 w-5 text-primary flex-shrink-0 mt-0.5`
- Text: `text-primary` (matches icon color)
- Tooltip indicator: `border-b border-dotted border-muted cursor-help`

### Service Note Pattern

```tsx
{service.note && (
  <div className="mb-6 text-sm text-muted">
    {service.note}
  </div>
)}
```

### Service CTA Button

```tsx
<Link href="/booking">
  <Button>
    {service.buttonText || "Book Assessment"}
    <ArrowRight className="ml-2 h-4 w-4" />
  </Button>
</Link>
```

### Service Image/Placeholder

```tsx
<div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
  {service.image ? (
    <img
      src={service.image}
      alt={service.title}
      className="absolute inset-0 w-full h-full object-cover"
    />
  ) : (
    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
      <IconComponent className="w-24 h-24 text-primary/30" />
    </div>
  )}
</div>
```

**Image Placeholder Styling:**
- Background: `bg-primary/10`
- Icon size: `w-24 h-24`
- Icon color: `text-primary/30`

---

## Icon System

### Dynamic Icon Mapping

For services and features that use database-stored icon names:

```tsx
import {
  Ear,
  Headphones,
  Volume2,
  Shield,
  Wrench,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Ear,
  Headphones,
  Volume2,
  Shield,
  Wrench,
};

// Usage
const IconComponent = iconMap[service.iconName] || Ear;
```

### Icon Usage by Context

| Icon | Name | Usage |
|------|------|-------|
| 👂 | `Ear` | Hearing assessments, audiology |
| 🎧 | `Headphones` | Hearing aids, devices |
| 🔊 | `Volume2` | Sound testing, audio |
| 🛡️ | `Shield` | Protection, warranty, guarantee |
| 🔧 | `Wrench` | Repairs, maintenance, servicing |
| ✓ | `CheckCircle` | Feature lists, included items |
| → | `ArrowRight` | Buttons, links, CTAs |
| ↓ | `ChevronDown` | Accordions, dropdowns |

---

## Complete Page Examples

### Complete Homepage Structure

```tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronDown, Shield, Clock, Award } from "lucide-react";
import Hero from "@/components/Hero";
import ServiceCard from "@/components/ServiceCard";
import Button from "@/components/Button";
import { Section, SectionHeader, CTASection } from "@/components/sections";

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  // ... data fetching ...

  return (
    <>
      {/* Hero Section - Custom, not PageHero */}
      <Hero />

      {/* Services Overview - Cream background */}
      <Section variant="cream">
        <SectionHeader
          label="Our Services"
          title="Comprehensive Hearing Care"
          description="..."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.id} {...service} index={index} />
          ))}
        </div>
        <motion.div className="text-center mt-10">
          <Link href="/services">
            <Button variant="outline">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </Section>

      {/* Promise Section - Primary background with border */}
      <Section variant="primary" className="border-y border-white/10">
        <SectionHeader title="Our Promise" variant="dark" />
        <div className="grid md:grid-cols-3 gap-6 md:gap-12">
          {/* Feature items with icon circles */}
        </div>
      </Section>

      {/* FAQ Section - White background, narrow container */}
      <Section variant="white" containerClassName="max-w-3xl">
        <SectionHeader
          title="Frequently Asked Questions"
          description="..."
        />
        {/* Accordion items */}
      </Section>

      {/* CTA Section */}
      <CTASection
        title="Start your hearing journey with confidence"
        description="..."
        primaryButton={{ text: "Book Assessment", href: "/booking" }}
        variant="primary"
      />
    </>
  );
}
```

### Complete Services Page Structure

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Ear, Headphones, Volume2, Shield, Wrench, ArrowRight, CheckCircle, LucideIcon } from "lucide-react";
import Button from "@/components/Button";
import { PageHero, Section, CTASection } from "@/components/sections";

const iconMap: Record<string, LucideIcon> = {
  Ear, Headphones, Volume2, Shield, Wrench,
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch('/api/services');
        if (res.ok) setServices(await res.json());
      } catch (error) {
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, []);

  return (
    <>
      <PageHero
        badge="Our Services"
        title="Comprehensive Hearing Care Services"
        description="..."
      />

      <Section variant="white">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="space-y-16">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.iconName] || Ear;
              return (
                <motion.div
                  key={service.id}
                  id={service.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`grid lg:grid-cols-2 gap-6 lg:gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted mb-6">{service.fullDescription}</p>
                    {service.idealFor && (
                      <div className="mb-6">
                        <h3 className="font-semibold text-foreground mb-1">Ideal if:</h3>
                        <p className="text-muted text-sm">{service.idealFor}</p>
                      </div>
                    )}
                    {service.features && service.features.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-semibold text-foreground mb-3">Includes:</h3>
                        <ul className="space-y-2">
                          {service.features.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                              <span className="text-primary">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <Link href="/booking">
                      <Button>
                        {service.buttonText || "Book Assessment"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}>
                    {service.image ? (
                      <img src={service.image} alt={service.title} 
                           className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                        <IconComponent className="w-24 h-24 text-primary/30" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </Section>

      <CTASection
        title="Not sure which service you need?"
        description="We can help you find the right option."
        primaryButton={{ text: "Book Assessment", href: "/booking" }}
        variant="primary"
      />
    </>
  );
}
```

---

## Responsive Design Patterns

### Breakpoint Reference

| Breakpoint | Prefix | Min Width |
|------------|--------|-----------|
| Mobile | (default) | 0px |
| Small tablet | `sm:` | 640px |
| Tablet | `md:` | 768px |
| Desktop | `lg:` | 1024px |
| Large desktop | `xl:` | 1280px |

### Typography Scaling

```tsx
// Hero titles
"text-2xl sm:text-3xl lg:text-4xl"

// Section titles (H2)
"text-2xl sm:text-3xl md:text-4xl"

// Card titles (H3)
"text-lg sm:text-xl"

// Body text
"text-base sm:text-lg"

// Small text
"text-sm sm:text-base"
```

### Grid Patterns

```tsx
// 4-column services grid
"grid sm:grid-cols-2 lg:grid-cols-4"

// 3-column features
"grid md:grid-cols-3"

// 2-column alternating layout
"grid lg:grid-cols-2"

// Gap scaling
"gap-4 sm:gap-6"        // Small gaps
"gap-6 md:gap-12"       // Large gaps
```

### Padding/Spacing Scaling

```tsx
// Section padding
"py-16 lg:py-24"

// Hero padding
"pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-12 lg:pb-24"

// Card padding
"p-5 sm:p-6"

// Button padding
"p-4 sm:p-5"
```

### Container Widths

```tsx
// Default container
"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"

// Narrow container (FAQ, forms)
"max-w-3xl mx-auto"

// CTA container
"max-w-4xl mx-auto"
```

---

## Quick Reference

### Section Background Order by Page

| Page | Section 1 | Section 2 | Section 3 | Section 4 |
|------|-----------|-----------|-----------|-----------|
| Homepage | Hero (primary) | cream | primary | white |
| Services | PageHero (primary) | white | - | - |
| About | PageHero (primary) | white | cream | white |
| Contact | PageHero (primary) | white | - | - |
| Team | PageHero (primary) | white | - | - |

### Component Import Quick Reference

```tsx
// Section components (most pages need these)
import { PageHero, Section, SectionHeader, CTASection } from "@/components/sections";

// Homepage only
import Hero from "@/components/Hero";

// Common components
import Button from "@/components/Button";
import Badge from "@/components/Badge";
import ServiceCard from "@/components/ServiceCard";
import TeamMember from "@/components/TeamMember";

// Icons
import { Ear, Headphones, Volume2, Shield, Wrench, ArrowRight, CheckCircle, ChevronDown } from "lucide-react";
```

### Animation Quick Reference

```tsx
// Standard fade-in
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
viewport={{ once: true }}

// Staggered items (in map)
transition={{ duration: 0.5, delay: index * 0.1 }}

// Slide from left
initial={{ opacity: 0, x: -20 }}

// Slide from right
initial={{ opacity: 0, x: 20 }}
transition={{ duration: 0.6, delay: 0.2 }}
```

### Aspect Ratios

| Use Case | Ratio | Class |
|----------|-------|-------|
| Hero image | 4:3 | `aspect-[4/3]` |
| Service image | 4:3 | `aspect-[4/3]` |
| Team photo | 1:1 | `aspect-square` |
| Card image | 16:9 | `aspect-video` |
