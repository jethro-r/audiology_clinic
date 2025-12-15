# UI/UX Audit Checklist - Paul Hsu Hearing Limited

## Overview
This checklist ensures consistent styling, branding, user experience, and functionality across all pages of the website.

---

## 1. GLOBAL ELEMENTS

### 1.1 Header/Navigation
- [ ] Logo displays correctly on all pages
- [ ] Company name is consistent (Paul Hsu Hearing Limited)
- [ ] Phone number in top bar is correct (07 838 9888)
- [ ] Business hours display correctly
- [ ] Navigation links work on all pages
- [ ] Active page indication works
- [ ] Mobile menu functions properly
- [ ] Header remains sticky on scroll
- [ ] Header background/shadow transitions smoothly
- [ ] CTA button is visible and functional
- [ ] All links have proper hover states

### 1.2 Footer
- [ ] Company name and logo match header
- [ ] Address is complete and correct (42a Hillcrest Road, Hillcrest, Hamilton 3216, NZ)
- [ ] Phone number matches (07 838 9888)
- [ ] Email is correct (info@paulhsuhearing.co.nz)
- [ ] Business hours match header
- [ ] All footer links work
- [ ] Social media icons present (even if placeholder)
- [ ] Company number displayed (9374293)
- [ ] Copyright year is dynamic
- [ ] Footer columns align properly on mobile
- [ ] All links have hover states

### 1.3 Color Scheme & Theming
- [ ] Primary color is consistent across all components
- [ ] Secondary colors are consistent
- [ ] Text colors meet accessibility standards (contrast)
- [ ] CSS variables are properly defined
- [ ] Dark mode (if implemented) works consistently
- [ ] Gradient backgrounds are consistent
- [ ] Border colors are consistent
- [ ] Hover states use consistent colors

### 1.4 Typography
- [ ] Font families are consistent
- [ ] Heading hierarchy is logical (h1 > h2 > h3)
- [ ] Font sizes are consistent across similar elements
- [ ] Line heights are readable
- [ ] Letter spacing is appropriate
- [ ] Font weights are used consistently
- [ ] Mobile font sizes scale appropriately

### 1.5 Spacing & Layout
- [ ] Consistent padding/margin throughout
- [ ] Grid layouts align properly
- [ ] Max-width containers are consistent
- [ ] Section spacing is uniform
- [ ] Mobile spacing adapts appropriately
- [ ] Content doesn't touch screen edges on mobile

---

## 2. PAGE-SPECIFIC CHECKS

### 2.1 Home Page (`/`)
- [ ] Hero section displays correctly
- [ ] Hero text is readable and compelling
- [ ] CTA buttons are prominent and functional
- [ ] Services section loads and displays properly
- [ ] Service cards are aligned and consistent
- [ ] Testimonials section (if present) displays correctly
- [ ] Stats/numbers section displays correctly
- [ ] FAQ accordion works properly
- [ ] All animations are smooth
- [ ] Images/placeholders display correctly
- [ ] Final CTA section is compelling
- [ ] Mobile layout stacks properly
- [ ] All internal links work

### 2.2 About Page (`/about`)
- [ ] Hero section displays correctly
- [ ] Company story section is readable
- [ ] "Our Story" content reflects Paul Hsu Hearing
- [ ] Mission statement is prominent
- [ ] Values section displays with icons
- [ ] Certifications section displays correctly
- [ ] "Why Choose Us" list displays properly
- [ ] Images/placeholders are appropriate
- [ ] CTA buttons work
- [ ] Mobile layout is readable
- [ ] All animations work

### 2.3 Services Page (`/services`)
- [ ] Hero section displays correctly
- [ ] All service cards display consistently
- [ ] Service descriptions are complete
- [ ] Icons display properly
- [ ] Duration/timing information is clear
- [ ] Pricing (if shown) is clear
- [ ] CTA buttons link to booking/contact
- [ ] Service categories are organized
- [ ] Mobile cards stack properly
- [ ] Hover states work on cards

### 2.4 Team Page (`/team`)
- [ ] Hero section displays correctly
- [ ] Team member cards display consistently
- [ ] Paul Hsu information is accurate
- [ ] Credentials display properly
- [ ] Bio text is readable
- [ ] Specializations are listed
- [ ] Images/placeholders are uniform size
- [ ] "Join Our Team" section (if present) displays
- [ ] Mobile layout works properly
- [ ] Cards align in grid

### 2.5 Contact Page (`/contact`)
- [ ] Hero section displays correctly
- [ ] Contact form displays properly
- [ ] All form fields are functional
- [ ] Form validation works
- [ ] Contact information is accurate:
  - [ ] Phone: 07 838 9888
  - [ ] Email: info@paulhsuhearing.co.nz
  - [ ] Address: 42a Hillcrest Road, Hillcrest, Hamilton 3216
- [ ] Business hours display correctly
- [ ] Map placeholder/embed displays
- [ ] Parking instructions are relevant
- [ ] Contact info cards are consistent
- [ ] Icons display correctly
- [ ] Form submission feedback works
- [ ] Mobile form layout is usable

### 2.6 Resources Page (`/resources`)
- [ ] Hero section displays correctly
- [ ] Resource cards/articles display consistently
- [ ] Links work properly
- [ ] Categories are organized
- [ ] Search/filter (if present) works
- [ ] Mobile layout is readable

### 2.7 Portal Pages (`/portal/*`)
- [ ] Authentication required/works properly
- [ ] Dashboard displays correctly
- [ ] Navigation is clear
- [ ] Appointments section works
- [ ] Profile section works
- [ ] Data displays correctly
- [ ] Forms are functional
- [ ] Mobile layout is usable

### 2.8 Admin Pages (`/admin/*`)
- [ ] Authentication/authorization works
- [ ] Dashboard displays correctly
- [ ] Patients management works
- [ ] Appointments management works
- [ ] Availability management works
- [ ] Tables are responsive
- [ ] Forms are functional
- [ ] Mobile layout works (or is disabled appropriately)

### 2.9 Auth Pages (`/login`, `/register`)
- [ ] Forms display correctly
- [ ] Validation works
- [ ] Error messages are clear
- [ ] Success redirects work
- [ ] Social login (if implemented) works
- [ ] "Forgot password" link works
- [ ] Mobile layout is usable
- [ ] Branding is consistent

---

## 3. COMPONENT CHECKS

### 3.1 Button Component
- [ ] Primary variant looks correct
- [ ] Secondary variant looks correct
- [ ] Outline variant looks correct
- [ ] Size variants (sm, md, lg) work
- [ ] Hover states work
- [ ] Active/pressed states work
- [ ] Disabled state looks correct
- [ ] Icons in buttons align properly
- [ ] Loading state (if implemented) works

### 3.2 ServiceCard Component
- [ ] Icon displays correctly
- [ ] Title is prominent
- [ ] Description is readable
- [ ] Duration/info displays
- [ ] Hover effect works
- [ ] Link/button works
- [ ] Consistent sizing

### 3.3 TeamMember Component
- [ ] Image/placeholder displays
- [ ] Name is prominent
- [ ] Title displays correctly
- [ ] Credentials display
- [ ] Bio is readable
- [ ] Specializations list properly
- [ ] Consistent card sizing
- [ ] Hover effects work

### 3.4 ContactForm Component
- [ ] All fields render correctly
- [ ] Labels are clear
- [ ] Placeholders are helpful
- [ ] Validation works
- [ ] Error messages display
- [ ] Success message displays
- [ ] Submit button works
- [ ] Form resets after submission

### 3.5 Hero Component
- [ ] Background displays correctly
- [ ] Text is readable
- [ ] CTA buttons are prominent
- [ ] Benefits list displays
- [ ] Image/placeholder displays
- [ ] Animations work smoothly
- [ ] Mobile layout works

---

## 4. FUNCTIONALITY CHECKS

### 4.1 Forms
- [ ] All form fields accept input
- [ ] Required field validation works
- [ ] Email validation works
- [ ] Phone validation works
- [ ] Date pickers work (if present)
- [ ] Dropdowns populate correctly
- [ ] Form submission works
- [ ] Error handling works
- [ ] Success feedback works
- [ ] Form data is sanitized

### 4.2 Navigation & Routing
- [ ] All internal links work
- [ ] External links open in new tab
- [ ] Back button works correctly
- [ ] Page transitions are smooth
- [ ] Active page highlighting works
- [ ] Mobile menu opens/closes
- [ ] Dropdown menus (if any) work

### 4.3 Authentication
- [ ] Login works
- [ ] Logout works
- [ ] Registration works
- [ ] Protected routes redirect properly
- [ ] Session persistence works
- [ ] Password reset (if implemented) works
- [ ] Role-based access works

### 4.4 Data Display
- [ ] Lists render correctly
- [ ] Tables are responsive
- [ ] Pagination works (if present)
- [ ] Sorting works (if present)
- [ ] Filtering works (if present)
- [ ] Search works (if present)
- [ ] Loading states display
- [ ] Empty states display

### 4.5 Animations
- [ ] Page transitions work
- [ ] Scroll animations trigger correctly
- [ ] Hover animations are smooth
- [ ] Loading animations work
- [ ] Animations don't cause layout shifts
- [ ] Animations respect reduced motion preference
- [ ] No janky/slow animations

---

## 5. RESPONSIVE DESIGN

### 5.1 Mobile (< 640px)
- [ ] Navigation works (hamburger menu)
- [ ] Text is readable (no overflow)
- [ ] Images scale properly
- [ ] Forms are usable
- [ ] Buttons are tappable (min 44px)
- [ ] Cards stack vertically
- [ ] Footer is readable
- [ ] No horizontal scroll

### 5.2 Tablet (640px - 1024px)
- [ ] Layout adapts appropriately
- [ ] Navigation works
- [ ] Grid layouts adjust (2 columns)
- [ ] Images scale properly
- [ ] Text is readable
- [ ] Forms are usable

### 5.3 Desktop (> 1024px)
- [ ] Full navigation displays
- [ ] Multi-column layouts work
- [ ] Images are high quality
- [ ] Hover states work
- [ ] Content doesn't get too wide
- [ ] Sidebars (if any) display

---

## 6. ACCESSIBILITY

### 6.1 Keyboard Navigation
- [ ] All interactive elements are focusable
- [ ] Focus indicators are visible
- [ ] Tab order is logical
- [ ] Skip to main content link works
- [ ] Modal traps focus
- [ ] Escape key closes modals

### 6.2 Screen Readers
- [ ] Images have alt text
- [ ] Links have descriptive text
- [ ] Buttons have aria-labels (if needed)
- [ ] Form fields have labels
- [ ] Page has proper heading structure
- [ ] ARIA landmarks are used
- [ ] Status messages are announced

### 6.3 Visual Accessibility
- [ ] Color contrast meets WCAG AA
- [ ] Text is resizable
- [ ] No information by color alone
- [ ] Focus indicators are visible
- [ ] Links are distinguishable from text

---

## 7. PERFORMANCE

### 7.1 Loading
- [ ] Page loads in < 3 seconds
- [ ] Images are optimized
- [ ] Lazy loading works
- [ ] Loading states display
- [ ] No layout shifts during load
- [ ] Fonts load without FOUT/FOIT

### 7.2 Runtime
- [ ] No console errors
- [ ] No console warnings (or justified)
- [ ] Animations are smooth (60fps)
- [ ] No memory leaks
- [ ] Form submissions are fast
- [ ] API calls have reasonable timeouts

---

## 8. CONTENT

### 8.1 Text Content
- [ ] No placeholder text remains
- [ ] Company name is correct everywhere
- [ ] Contact info is accurate everywhere
- [ ] No typos or grammatical errors
- [ ] Tone is consistent and professional
- [ ] NZ English spelling used

### 8.2 Images
- [ ] All images load
- [ ] Images are relevant
- [ ] Images have proper alt text
- [ ] Image quality is good
- [ ] Aspect ratios are consistent
- [ ] Placeholder images are clearly marked

### 8.3 Links
- [ ] All links work (no 404s)
- [ ] External links are correct
- [ ] Tel links work on mobile
- [ ] Email links work
- [ ] Social media links work (or are removed)

---

## 9. SEO & META

### 9.1 Meta Tags
- [ ] Page titles are descriptive
- [ ] Meta descriptions are present
- [ ] Open Graph tags are set
- [ ] Favicon is set
- [ ] Canonical URLs are set

### 9.2 Structure
- [ ] Semantic HTML is used
- [ ] Heading hierarchy is correct
- [ ] Schema markup (if any) is valid
- [ ] Sitemap is generated
- [ ] Robots.txt is configured

---

## 10. BROWSER COMPATIBILITY

### 10.1 Browsers to Test
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### 10.2 Features
- [ ] CSS features work or have fallbacks
- [ ] JavaScript features work or have polyfills
- [ ] Fonts load correctly
- [ ] Animations work or degrade gracefully

---

## FINDINGS & ISSUES

### Critical Issues (Fix Immediately)
1. **Email templates still use old company information**
   - Location: `/src/lib/email.ts`
   - All email templates reference "HearWell Audiology", phone (555) 123-4567, and old address
   - Email addresses use @hearwell.com instead of @paulhsuhearing.co.nz
   - Need to update: sendAppointmentConfirmation, sendAppointmentReminder, sendAppointmentCancellation functions

### High Priority (Fix Soon)
1. **CSS Class naming conventions**
   - Multiple Tailwind CSS lint warnings across pages (contact, team, footer)
   - Using `bg-[var(--primary)]` instead of `bg-primary`
   - Using `flex-shrink-0` instead of `shrink-0`
   - Using `bg-gradient-to-br` instead of `bg-linear-to-br`
   - These don't break functionality but reduce code cleanliness
   
2. **Insurance information is US-centric**
   - Location: `/src/app/resources/page.tsx`
   - Lists US insurance providers (Medicare, Blue Cross, Aetna, etc.)
   - Should be updated for New Zealand context (ACC, private insurers)

3. **Business hours need confirmation**
   - Currently showing: Mon-Fri: 8:00 AM - 5:00 PM | Sat: 9:00 AM - 1:00 PM
   - Need to verify these are correct for Paul Hsu Hearing

### Medium Priority (Fix When Possible)
1. **Team page only shows founder**
   - Only Paul Hsu is listed
   - Consider adding placeholder for future team members or adjusting layout
   - "Join Our Team" section may need updating

2. **Contact form endpoint needs testing**
   - Form submits to `/api/contact`
   - Need to verify this API route exists and works
   - Test email delivery in production

3. **Map placeholder needs real integration**
   - Contact page shows placeholder for Google Maps
   - Should embed actual location: 42a Hillcrest Road, Hillcrest, Hamilton 3216

4. **Social media links are placeholders**
   - Footer has Facebook, Instagram, LinkedIn links
   - All point to generic domains (facebook.com, instagram.com, linkedin.com)
   - Should be removed or updated with actual company profiles

5. **Resources content is generic**
   - FAQ answers are US-focused
   - First visit info needs NZ-specific details
   - Parking instructions reference US-style setup

### Low Priority (Nice to Have)
1. **Images are all placeholders**
   - Team member photos are placeholders
   - Service images are placeholders
   - Hero images are placeholders
   - Consider adding professional photography

2. **Certifications section needs updating**
   - About page lists: "American Academy of Audiology", "American Speech-Language-Hearing Association"
   - Should be updated with NZ-relevant certifications
   - Or removed if not applicable

3. **Why Choose Us list needs localization**
   - "Over 20 years of combined clinical experience" (new company, founded Oct 2025)
   - "Most insurance plans accepted" (needs NZ context)
   - "Evening and weekend appointments available" (needs confirmation)
   - "Free hearing aid cleanings for life" (needs confirmation)

4. **Services duration/pricing**
   - All service cards show duration estimates
   - Consider adding pricing or "pricing on consultation" note

5. **Accessibility features**
   - Add alt text strategy for when real images are added
   - Consider adding skip-to-content link
   - Verify keyboard navigation flow

### Styling Consistency Notes
✅ **Working Well:**
- Color scheme is consistent across all pages
- Typography hierarchy is clear and logical
- Button component has all necessary variants
- Mobile responsiveness is implemented
- Animations are smooth and not excessive
- Component structure is clean and reusable

⚠️ **Needs Attention:**
- Some pages use CSS variable syntax that could be simplified
- Gradient classes could use Tailwind v4 syntax
- Focus states are present but could be more consistent

### Content Accuracy Status
✅ **Updated Correctly:**
- Company name: Paul Hsu Hearing Limited ✓
- Phone: 07 838 9888 ✓
- Email: info@paulhsuhearing.co.nz ✓
- Address: 42a Hillcrest Road, Hillcrest, Hamilton 3216, NZ ✓
- Company number: 9374293 ✓
- Footer copyright ✓
- Header branding ✓
- Contact page information ✓
- About page story ✓
- Team page founder info ✓

❌ **Still Needs Update:**
- Email templates (all still use old branding)
- Insurance information (US-focused)
- Certifications (US-focused)
- Resources/FAQ content (US-focused)
- Some marketing copy (claims that need verification)

### Functionality Status (Requires Testing)
❓ **Needs Manual Testing:**
- [ ] Contact form submission
- [ ] Appointment booking flow
- [ ] Patient portal login/registration
- [ ] Admin dashboard access
- [ ] Email delivery (when configured)
- [ ] Database connections
- [ ] API routes functionality
- [ ] Authentication flows
- [ ] Mobile navigation menu
- [ ] Form validations
- [ ] Responsive design at all breakpoints

### Technical Debt
1. Email service not configured (using console.log in development)
2. Database seeding needs production-ready data
3. Environment variables need production setup
4. No actual images uploaded yet
5. Test credentials in TEST_CREDENTIALS.md (ensure removed before production)

---

## Sign-off

**Audit Date:** 15 December 2025
**Audited By:** AI Assistant
**Status:** ⚠️ Needs Updates - Critical email template fixes required, content localization needed
**Next Review Date:** After email templates and NZ-specific content updates
**Priority:** Fix email templates immediately, then update US-centric content for NZ market
