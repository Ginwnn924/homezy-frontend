# Homezy Luxury Layout Redesign Plan
**Style:** Minimalist & Elegant (Four Seasons / Aman Resorts inspired)

## Overview
Transform Header, Footer, and MainContent components into a luxury experience with premium typography, smooth animations, glass morphism effects, and enhanced spacing.

---

## 1. TYPOGRAPHY SYSTEM

### Font Selection
- **Display (Logo):** Cormorant Garamond - Elegant serif for refined luxury
- **Headings:** Playfair Display - Sophisticated serif for section titles
- **Body:** Inter - Clean sans-serif (current, properly loaded)
- **Accent:** Cinzel - Decorative serif for badges/micro-copy

### Implementation
**Add to [index.html](d:\Coding\homezy-frontend\index.html) before `</head>`:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700&family=Playfair+Display:wght@400;500;600;700;800;900&family=Inter:wght@100;200;300;400;500;600;700;800;900&family=Cinzel:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**Update [src/index.css](d:\Coding\homezy-frontend\src\index.css) @theme:**
```css
@theme {
  /* Existing colors... */

  /* Font Families */
  --font-display: "Cormorant Garamond", serif;
  --font-heading: "Playfair Display", serif;
  --font-sans: "Inter", sans-serif;
  --font-accent: "Cinzel", serif;

  /* Luxury Spacing */
  --spacing-luxury-sm: 1.5rem;
  --spacing-luxury-md: 3rem;
  --spacing-luxury-lg: 6rem;
}
```

---

## 2. ANIMATION SETUP

### Install Framer Motion
```bash
npm install framer-motion
```

### Create Animation Utilities
**New file: [src/utils/animations.ts](d:\Coding\homezy-frontend\src\utils\animations.ts)**
```typescript
import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};
```

### Create Scroll Hook
**New file: [src/hooks/useScrollPosition.ts](d:\Coding\homezy-frontend\src\hooks\useScrollPosition.ts)**
```typescript
import { useState, useEffect } from 'react';

export const useScrollPosition = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isScrolled };
};
```

---

## 3. VISUAL EFFECTS (Glass Morphism, Shadows, Gradients)

**Add to [src/index.css](d:\Coding\homezy-frontend\src\index.css) after @theme:**
```css
@layer utilities {
  /* Glass Morphism */
  .glass {
    @apply bg-white/75 backdrop-blur-md border border-white/20 shadow-lg;
  }

  .glass-gold {
    @apply bg-secondary/90 backdrop-blur-sm border border-secondary/30;
  }

  /* Luxury Shadows */
  .shadow-luxury {
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  .shadow-luxury-hover {
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08);
  }

  .shadow-gold {
    box-shadow: 0 8px 32px rgba(201, 169, 98, 0.2), 0 2px 8px rgba(201, 169, 98, 0.1);
  }

  /* Luxury Link with Underline Animation */
  .luxury-link {
    @apply relative text-text-secondary hover:text-primary transition-colors duration-300;
    @apply after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-secondary;
    @apply after:transition-all after:duration-300 hover:after:w-full;
  }
}
```

---

## 4. COMPONENT REDESIGNS

### HEADER ([src/components/common/Header.tsx](d:\Coding\homezy-frontend\src\components\common\Header.tsx))

**Key Changes:**
1. **Glass morphism background on scroll** - Transparent blur effect
2. **Cormorant Garamond logo** - Gradient hover effect
3. **Luxury navigation links** - Gold underline animation
4. **Refined user menu** - Glass effect with gradient avatar

**Pattern:**
```tsx
import { motion } from 'framer-motion';
import { useScrollPosition } from '../../hooks/useScrollPosition';

export const Header: React.FC = () => {
  const { isScrolled } = useScrollPosition();

  return (
    <motion.header
      animate={{
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 1)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
      }}
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-shadow",
        isScrolled ? "shadow-luxury" : "shadow-sm"
      )}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-[1400px]">
        {/* Logo with Cormorant Garamond */}
        <span className="text-3xl md:text-4xl font-display font-semibold text-primary
                         tracking-wide hover:bg-gradient-to-r hover:from-primary
                         hover:to-secondary hover:bg-clip-text hover:text-transparent
                         transition-all duration-500">
          Homezy
        </span>

        {/* Nav Links with luxury-link class */}
        <a className="luxury-link text-base font-medium tracking-wide">
          {t('header.home')}
        </a>

        {/* User Menu with glass effect */}
        <div className="glass rounded-full p-2 pl-4 hover:shadow-luxury">
          {/* User menu content */}
        </div>
      </div>
    </motion.header>
  );
};
```

---

### FOOTER ([src/components/common/Footer.tsx](d:\Coding\homezy-frontend\src\components\common\Footer.tsx))

**Key Changes:**
1. **Gradient background** - Subtle background to accent gradient
2. **Playfair Display headings** - Elegant section titles
3. **Circular social icons** - Hover scale effect with gold glow
4. **Scroll-triggered animation** - Stagger effect on entrance

**Pattern:**
```tsx
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../utils/animations';

export const Footer: React.FC = () => {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
      className="bg-gradient-to-b from-background to-accent/40 border-t pt-24 pb-12"
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-[1400px]">
        {/* Brand Section */}
        <span className="text-4xl font-display font-semibold text-primary mb-6 block tracking-wide">
          Homezy
        </span>

        {/* Section Headers with Playfair */}
        <h4 className="font-heading font-semibold text-primary text-lg mb-6 tracking-wide">
          {t('footer.about')}
        </h4>

        {/* Social Icons */}
        <a href="#" className="group">
          <div className="w-12 h-12 rounded-full border-2 border-gray-300
                          flex items-center justify-center
                          hover:border-secondary hover:bg-secondary/10
                          hover:shadow-gold hover:scale-110
                          transition-all duration-300">
            <FontAwesomeIcon icon={faFacebook}
                             className="text-text-secondary group-hover:text-secondary" />
          </div>
        </a>
      </div>
    </motion.footer>
  );
};
```

---

### MAINCONTENT ([src/components/common/MainContent.tsx](d:\Coding\homezy-frontend\src\components\common\MainContent.tsx))

**Key Changes:**
1. **4:5 aspect ratio cards** - More elegant proportions
2. **Glass morphism badges** - Category badges with Cinzel font
3. **Image hover effects** - Scale + gradient overlay
4. **Stagger animation** - Cards animate in sequence
5. **Gold rating badges** - Floating badges with shadow-gold

**Pattern:**
```tsx
import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../utils/animations';

export const MainContent: React.FC = () => {
  return (
    <main className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 max-w-[1400px] py-16 md:py-24">
      {/* Section Title with Playfair */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-heading font-bold text-primary mb-16 tracking-tight"
      >
        {t('home.featured_stays')}
      </motion.h2>

      {/* Cards Grid with Stagger */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
                   gap-8 md:gap-10 lg:gap-12"
      >
        {HOMESTAYS.map((stay) => (
          <motion.div
            key={stay.id}
            variants={fadeInUp}
            whileHover="hover"
            className="group cursor-pointer"
          >
            {/* Image Container - 4:5 aspect ratio */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl
                            shadow-luxury group-hover:shadow-luxury-hover
                            transition-shadow duration-500">
              {/* Image with scale effect */}
              <motion.img
                src={stay.image}
                alt={stay.title}
                className="h-full w-full object-cover"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Gradient overlay on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-black/60
                           via-black/20 to-transparent z-10"
              />

              {/* Category Badge with Cinzel */}
              <div className="absolute top-4 right-4 glass px-4 py-2 rounded-full
                              text-xs font-accent font-semibold tracking-widest uppercase
                              shadow-gold z-20">
                {stay.category}
              </div>
            </div>

            {/* Content */}
            <div className="flex justify-between items-start gap-4 mt-5">
              <div>
                <h3 className="font-heading font-bold text-xl text-text-primary
                               group-hover:text-primary transition-colors">
                  {stay.location}
                </h3>
                <p className="text-text-secondary text-base mb-2">{stay.title}</p>
                <span className="font-heading font-bold text-2xl text-primary">
                  {formatCurrency(stay.price)}
                </span>
              </div>

              {/* Rating Badge */}
              <div className="glass-gold px-3 py-1.5 rounded-full shadow-gold
                              flex items-center gap-1.5">
                <FontAwesomeIcon icon={faStar} className="text-white text-sm" />
                <span className="font-semibold text-white text-sm">{stay.rating}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
};
```

---

## 5. IMPLEMENTATION ORDER

### Phase 1: Foundation
1. Add Google Fonts to [index.html](d:\Coding\homezy-frontend\index.html)
2. Update [src/index.css](d:\Coding\homezy-frontend\src\index.css) with theme variables and utilities
3. Install framer-motion: `npm install framer-motion`
4. Create [src/utils/animations.ts](d:\Coding\homezy-frontend\src\utils\animations.ts)
5. Create [src/hooks/useScrollPosition.ts](d:\Coding\homezy-frontend\src\hooks\useScrollPosition.ts)

### Phase 2: Component Updates
1. Update [Header.tsx](d:\Coding\homezy-frontend\src\components\common\Header.tsx) - Glass morphism, luxury fonts, animations
2. Update [Footer.tsx](d:\Coding\homezy-frontend\src\components\common\Footer.tsx) - Gradient background, Playfair headings, social icons
3. Update [MainContent.tsx](d:\Coding\homezy-frontend\src\components\common\MainContent.tsx) - Card redesign, stagger animations

### Phase 3: Polish
1. Test responsive behavior across breakpoints
2. Verify animations perform smoothly
3. Check cross-browser compatibility
4. Accessibility audit (keyboard nav, ARIA labels)

---

## 6. CRITICAL FILES TO MODIFY

| File | Changes |
|------|---------|
| [index.html](d:\Coding\homezy-frontend\index.html) | Add Google Fonts links |
| [src/index.css](d:\Coding\homezy-frontend\src\index.css) | Theme variables, glass morphism utilities, shadows, gradients |
| [src/components/common/Header.tsx](d:\Coding\homezy-frontend\src\components\common\Header.tsx) | Scroll-based glass effect, Cormorant logo, luxury nav |
| [src/components/common/Footer.tsx](d:\Coding\homezy-frontend\src\components\common\Footer.tsx) | Gradient bg, Playfair headings, circular social icons |
| [src/components/common/MainContent.tsx](d:\Coding\homezy-frontend\src\components\common\MainContent.tsx) | 4:5 cards, glass badges, image effects, stagger animation |
| [package.json](d:\Coding\homezy-frontend\package.json) | Add framer-motion dependency |

---

## 7. DESIGN PRINCIPLES

- **Whitespace:** Generous spacing (py-16 md:py-24 instead of py-12)
- **Typography:** Serif headings (Playfair), serif display (Cormorant), sans body (Inter)
- **Motion:** Smooth, slow transitions (0.6-0.8s duration, ease [0.22, 1, 0.36, 1])
- **Depth:** Layer shadows (luxury, luxury-hover, gold)
- **Color:** Dark blue (#1A365D) + Gold (#C9A962) accents
- **Effects:** Glass morphism on interactive elements, gradients on hover

---

## Expected Outcome

A refined, luxury aesthetic matching high-end hotel websites with:
- Elegant serif typography (Cormorant, Playfair)
- Smooth scroll-triggered animations
- Glass morphism effects on Header and badges
- Generous spacing and breathing room
- Sophisticated hover states with gold accents
- Professional, minimalist design
