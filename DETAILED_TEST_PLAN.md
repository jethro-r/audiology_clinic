# DETAILED TEST PLAN FOR OPUS - COMPREHENSIVE FUNCTIONALITY TESTING

**Document Version:** 1.0
**Created:** 2025-12-15
**Purpose:** Systematic testing guide for verifying all website functionality

---

## TEST ENVIRONMENT SETUP

### Prerequisites
- Development server running on `http://localhost:3000`
- Database seeded with test data
- All test credentials available
- Browser DevTools open to monitor network/console

### Test Credentials
```
ADMIN:
  Email: admin@hearwell.com
  Password: admin123
  Role: System Administrator

AUDIOLOGIST:
  Email: sarah.chen@hearwell.com
  Password: doctor123
  Role: Lead Audiologist

RECEPTIONIST:
  Email: reception@hearwell.com
  Password: reception123
  Role: Receptionist

PATIENT:
  Email: john.smith@example.com
  Password: patient123
  Role: Patient
```

---

## TEST 1: PUBLIC MARKETING WEBSITE - HOMEPAGE

### 1.1 Hero Section
**Steps:**
1. Navigate to `http://localhost:3000`
2. Verify page loads without errors
3. Look for hero section at top of page
4. Check for main headline (should relate to hearing/audiology)
5. Check for subheadline/description
6. Verify CTA buttons visible (at least 2)
7. Test each CTA button is clickable
8. Check for background image or gradient

**Expected Results:**
- Page loads within 2 seconds
- Hero section is prominent
- All text is readable (good contrast)
- CTA buttons navigate to correct pages
- Hero section responsive on mobile (text stacks)

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 1.2 Services Overview Section
**Steps:**
1. Scroll down from hero section
2. Look for "Comprehensive Hearing Care" or "Our Services" section
3. Verify 4 service cards displayed in grid layout
4. Check each card has:
   - Icon (ear, headphones, volume, shield, etc.)
   - Service title
   - Description text
   - Duration (e.g., "60-90 minutes")
   - Link/button to service details
5. Verify cards have hover effects
6. Test "View All Services" button links to `/services`

**Expected Results:**
- All 4 services display with correct icons
- Text is readable and well-formatted
- Cards stack on mobile (single column)
- Animations trigger on scroll
- "View All Services" button functional

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 1.3 Stats Section (Teal Background)
**Steps:**
1. Continue scrolling
2. Find section with teal/cyan background
3. Verify 4 stat cards displayed:
   - "100%" - Independent
   - "60min" - Appointments
   - "Direct" - Audiologist Access
   - "NZ" - Qualified
4. Check each stat has icon and label
5. Verify stat values are bold/prominent
6. Check for animated number counting (if applicable)

**Expected Results:**
- All 4 stats visible and readable
- Icons display correctly
- Grid layout on desktop, stack on mobile
- Text color is white/light (good contrast on teal)

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 1.4 "My Promise" Section
**Steps:**
1. Continue scrolling
2. Find section with 3 promise cards
3. Verify each card has:
   - Quote icon
   - Promise title (No Pressure Sales, Clear Explanations, Ongoing Support)
   - Description text
4. Check cards are well-spaced
5. Verify responsive layout (cards stack on mobile)

**Expected Results:**
- All 3 promises display clearly
- Quote icons visible
- Cards have subtle background/borders
- No text overflow

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 1.5 FAQ Section
**Steps:**
1. Continue scrolling
2. Find FAQ section titled "Frequently Asked Questions"
3. Count number of FAQ items (should be 7)
4. Verify each FAQ shows:
   - Question text
   - Chevron icon (chevron-down)
5. Click first FAQ to expand
   - Verify answer appears below question
   - Verify chevron rotates (points down)
6. Click same FAQ again to collapse
   - Verify answer disappears
   - Verify chevron rotates back (points right)
7. Click multiple FAQs simultaneously
   - Verify only one opens at a time (previous closes)
8. Check FAQ content:
   - First appointment expectations
   - ACC acceptance
   - Why independent
   - Hearing aid costs
   - Signs of hearing loss
   - Types of hearing aids
   - Trial period availability

**Expected Results:**
- All 7 FAQs render correctly
- Expand/collapse works smoothly
- Only one FAQ open at a time
- Chevron rotation animates
- Text is readable
- No console errors

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 1.6 Final CTA Section
**Steps:**
1. Continue scrolling to bottom
2. Find section with gradient background (teal/primary color)
3. Verify heading: "Ready to Take the First Step?"
4. Check subheading explains the offer
5. Verify 2 buttons:
   - "Schedule Appointment" (secondary color)
   - "Call 0800 555 051" (outline style)
6. Click "Schedule Appointment" button
   - Should navigate to `/contact`
7. Click "Call" button
   - Should have `href="tel:+6478389888"` (or similar)

**Expected Results:**
- Section has proper teal gradient background
- Both buttons present and functional
- Text is white/light for contrast
- Buttons have hover effects
- Links navigate correctly

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 1.7 Animations & Framer Motion
**Steps:**
1. Refresh page and watch animations as page loads
2. Scroll slowly through page
3. Observe animations trigger as sections come into view
4. Check for:
   - Fade-in animations on text
   - Slide/translate animations
   - Staggered animations on cards (each card animates with slight delay)
5. Check animations are smooth (no jank)
6. Verify no animations break layout

**Expected Results:**
- Animations are smooth and professional
- Animations don't interfere with readability
- No jerky/stuttering motion
- Frame rate stable (60 FPS)
- Mobile performance acceptable

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 2: ABOUT PAGE

### 2.1 Page Load & Structure
**Steps:**
1. Click "About" in navigation menu
2. Verify page loads to `/about`
3. Check page header/hero section
4. Scroll through entire page
5. Verify all sections load

**Expected Results:**
- Page loads without errors
- About hero section displays
- Page is properly formatted

---

### 2.2 Content Sections
**Steps:**
1. Verify "Our Story" section explains independent practice
2. Check "Mission Statement" section
3. Verify "Our Values" section shows 4 cards:
   - Honesty First
   - Clinical Excellence
   - Your Time Matters
   - Ongoing Support
4. Check "Certifications" section shows professional credentials
5. Verify "Why Choose Us" section with 8+ benefit items
6. Each benefit should have checkmark icon

**Expected Results:**
- All sections render correctly
- Text is readable and professional
- Icons display correctly
- Cards have proper spacing
- Layout is responsive

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 2.3 CTA Buttons
**Steps:**
1. Find CTA button to "Schedule Your Visit"
2. Click button
3. Verify navigation to `/contact`
4. Go back to about page
5. Check for other CTAs

**Expected Results:**
- CTA buttons functional
- Navigate to correct pages
- No broken links

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 3: SERVICES PAGE

### 3.1 Services List Display
**Steps:**
1. Navigate to `/services`
2. Page loads correctly
3. Count service sections (should be 6)
4. For each service, verify:
   - Service name displays
   - Duration shown (e.g., "60-90 minutes")
   - Description text present
   - "What's Included" section with checklist items (6 items per service)

**Service List to Verify:**
1. Comprehensive Hearing Evaluations
2. Hearing Aid Fitting & Programming
3. Tinnitus Management
4. Custom Ear Protection
5. Pediatric Audiology
6. Hearing Aid Repair & Maintenance

**Expected Results:**
- All 6 services display correctly
- Each service has duration and description
- All checklist items visible
- No text overflow
- Proper spacing between services

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 3.2 Layout & Responsiveness
**Steps:**
1. Check service layout on desktop (should alternate left/right)
2. Verify images/content alternates sides for each service
3. Resize browser to mobile width (< 768px)
4. Verify services stack vertically on mobile
5. Check text is readable at all sizes
6. Verify no horizontal scrolling

**Expected Results:**
- Desktop layout alternates correctly
- Mobile layout stacks properly
- Responsive without issues
- All text readable

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 3.3 CTA at Bottom
**Steps:**
1. Scroll to bottom of services page
2. Find consultation CTA button
3. Click button
4. Verify navigates to contact page

**Expected Results:**
- CTA button visible and functional
- Navigates correctly

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 4: TEAM PAGE

### 4.1 Team Member Display
**Steps:**
1. Navigate to `/team`
2. Find "Meet Your Audiologist" section
3. Look for team member card(s)
4. Verify card shows:
   - Photo/image placeholder
   - Name
   - Title (e.g., "Lead Audiologist")
   - Credentials/qualifications
   - Bio/description
5. Check for hover effects on card

**Expected Results:**
- Team member card displays correctly
- All information visible
- Professional appearance
- Responsive layout

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 4.2 Why Independent Section
**Steps:**
1. Continue scrolling on team page
2. Find "Why Independent Matters" section
3. Verify explanation text
4. Check for benefit items/bullets
5. Verify professional tone

**Expected Results:**
- Section explains benefits clearly
- Text is readable
- Professional appearance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 4.3 Team Page CTA
**Steps:**
1. Find "Book an Appointment" button
2. Click button
3. Verify navigation to `/contact`

**Expected Results:**
- Button functional
- Correct navigation

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 5: RESOURCES PAGE

### 5.1 What to Expect Section
**Steps:**
1. Navigate to `/resources`
2. Find "What to Expect at Your First Visit" section
3. Verify 3 subsections:
   - Before your visit (bullet points)
   - During your visit (bullet points)
   - After your visit (bullet points)
4. Check all bullet points display

**Expected Results:**
- All 3 sections visible
- Bullet points render correctly
- Text is clear and helpful

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 5.2 Insurance & Payment Info
**Steps:**
1. Scroll to "Insurance & Payment" section
2. Verify 8 insurance provider logos/names listed
3. Verify 5 payment notes displayed
4. Check for information about:
   - Coverage varies by plan
   - ACC eligibility
   - Flexible payment options
   - Multiple payment methods

**Expected Results:**
- All insurance providers listed
- Payment information clear
- Professional presentation

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 5.3 FAQ Section
**Steps:**
1. Find FAQ section on resources page
2. Verify 6 FAQs about hearing health
3. Test expand/collapse functionality
4. Check content covers hearing-related questions

**Expected Results:**
- All 6 FAQs display
- Expand/collapse works
- Content is informative

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 5.4 Downloadable Forms
**Steps:**
1. Find "Downloadable Forms" section
2. Verify 5 form options:
   - Patient Registration Form
   - Medical History Form
   - HIPAA Notice
   - Patient Rights
   - Financial Policy Agreement
3. Try to download at least one form
4. Verify file downloads (PDF or similar)

**Expected Results:**
- All 5 forms listed
- Download buttons functional
- Files accessible
- Proper file format

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 5.5 Articles Section
**Steps:**
1. Find "Hearing Health Articles" section
2. Verify 4 article cards display:
   - Understanding Hearing Loss
   - Choosing the Right Hearing Aids
   - Living with Tinnitus
   - Protecting Your Hearing
3. Check each article card has:
   - Title
   - Brief description
   - Read More or similar link
4. Click on article link (if implemented)

**Expected Results:**
- All 4 articles display
- Cards are well-formatted
- Links functional (if implemented)

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 6: CONTACT PAGE

### 6.1 Contact Form Fields
**Steps:**
1. Navigate to `/contact`
2. Locate contact form on left side (if two-column layout)
3. Verify form has these fields:
   - Name (text input)
   - Email (email input)
   - Phone (tel input)
   - Subject (text input)
   - Message (textarea)
4. Check all fields have labels
5. Verify form has Submit button

**Expected Results:**
- All form fields render correctly
- Labels associated with inputs
- Placeholders visible (if any)
- Submit button present

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 6.2 Form Validation
**Steps:**
1. Try to submit form without filling any fields
2. Verify error message appears (required fields)
3. Fill in only name, try to submit
4. Verify email is required error
5. Fill email with invalid format (e.g., "not-an-email")
6. Try to submit
7. Verify email format error
8. Fix email to valid format
9. Fill all required fields correctly
10. Verify no error messages

**Expected Results:**
- Form validation works
- Error messages are clear
- Email format validated
- Required fields enforced

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 6.3 Form Submission
**Steps:**
1. Fill all form fields with valid data:
   - Name: "Test User"
   - Email: "test@example.com"
   - Phone: "555-1234"
   - Subject: "Test Inquiry"
   - Message: "This is a test message"
2. Click Submit button
3. Check for loading state (spinner/disabled button)
4. Wait for response
5. Verify success message displays

**Expected Results:**
- Form submits without error
- Loading state shows during submission
- Success message displays after submission
- Form may clear after successful submission
- No console errors

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 6.4 Contact Information Cards
**Steps:**
1. Look for contact info section (usually right side of page)
2. Verify 4 information cards:
   - Phone number (0800 555 051) with phone icon
   - Email address with mail icon
   - Physical address with location icon
   - Operating hours with clock icon
3. Check all information is readable
4. Verify phone number is clickable (`tel:` link)
5. Verify email is clickable (`mailto:` link)

**Expected Results:**
- All 4 contact info cards display
- Icons render correctly
- Information is accurate
- Phone/email links functional
- Professional formatting

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 6.5 Google Maps & Additional Info
**Steps:**
1. Look for Google Maps placeholder/embed
2. Verify maps section displays
3. Look for parking instructions
4. Verify accessible spaces mentioned
5. Find emergency medical notice at bottom
6. Verify it's clear and professional

**Expected Results:**
- Maps displays (placeholder or actual)
- Parking info clear
- Emergency notice visible and appropriate

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 7: HEADER & NAVIGATION

### 7.1 Top Bar
**Steps:**
1. Check header at top of every page
2. Verify top bar with:
   - Phone icon and number (0800 555 051)
   - Operating hours display
   - Teal/primary color background
3. Check styling and readability

**Expected Results:**
- Top bar visible on all public pages
- Contact info clearly displayed
- Good contrast for readability

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 7.2 Main Navigation
**Steps:**
1. Check main navigation menu below top bar
2. Verify all 6 navigation items:
   - Home
   - About
   - Services
   - Team
   - Resources
   - Contact
3. Click each navigation item
4. Verify correct page loads
5. Check for visual indication of active page

**Expected Results:**
- All 6 nav items present
- Links navigate correctly
- Active page highlighted
- No broken links

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 7.3 Logo/Branding
**Steps:**
1. Check logo in header
2. Verify "Veritas Hearing" branding
3. Check tagline "Hear better. Live fully" (if present)
4. Click logo
5. Verify navigates to homepage

**Expected Results:**
- Logo displays correctly
- Branding looks professional
- Logo clickable and navigates home

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 7.4 CTA Buttons (Not Logged In)
**Steps:**
1. Ensure not logged in
2. Check header right side for:
   - "Sign In" button
   - "Book Appointment" button
3. Click "Sign In" button
4. Verify navigates to `/login`
5. Go back
6. Click "Book Appointment" button
7. Verify navigates to `/contact`

**Expected Results:**
- Both buttons present when logged out
- Buttons navigate correctly
- No console errors

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 7.5 Mobile Navigation
**Steps:**
1. Resize browser to mobile width (< 768px)
2. Verify desktop navigation hidden
3. Look for hamburger menu icon
4. Click hamburger menu
5. Verify menu expands showing all nav items
6. Click a nav item
7. Verify menu closes and page navigates
8. Click hamburger again to open menu
9. Click hamburger again to close menu
10. Verify menu collapses

**Expected Results:**
- Mobile hamburger menu appears on small screens
- Menu expands/collapses correctly
- All nav items in mobile menu
- Menu closes after selecting item
- No broken functionality

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 7.6 Responsive Design
**Steps:**
1. Test header at different breakpoints:
   - Desktop (1440px)
   - Tablet (768px)
   - Mobile (375px)
2. Verify layout adapts appropriately at each size
3. Check text is readable at all sizes
4. Verify no horizontal scrolling
5. Check buttons are tappable on mobile (min 44px)

**Expected Results:**
- Header responsive at all sizes
- All elements visible and readable
- No overflow or scrolling issues
- Mobile-friendly sizing

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 8: AUTHENTICATION - LOGIN PAGE

### 8.1 Page Load & Layout
**Steps:**
1. Navigate to `/login`
2. Check page loads correctly
3. Verify centered layout
4. Check for logo/branding
5. Verify "Welcome Back" heading
6. Verify subheading mentions "patient portal"
7. Check page is not full of header/footer (cleaner layout)

**Expected Results:**
- Login page loads cleanly
- Proper spacing and alignment
- Professional appearance
- No header/footer clutter

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 8.2 Form Fields
**Steps:**
1. Verify email input field:
   - Has label "Email Address"
   - Has mail icon on left
   - Has placeholder text
   - Can type email
2. Verify password input field:
   - Has label "Password"
   - Has lock icon on left
   - Text is masked (shows dots/asterisks)
   - Can type password
3. Check "Remember me" checkbox:
   - Present and clickable
4. Check "Forgot password?" link:
   - Present and clickable

**Expected Results:**
- All form fields render correctly
- Icons display
- Password properly masked
- Placeholder text visible
- All labels clear

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 8.3 Sign In Button
**Steps:**
1. Check Sign In button:
   - Text says "Sign In"
   - Button is prominent/styled
   - Button is clickable
2. Try clicking button with empty fields
3. Verify form requires input
4. Fill email with "john.smith@example.com"
5. Fill password with "patient123"
6. Click Sign In button
7. Watch for loading state (spinner)
8. Wait for response

**Expected Results:**
- Button functional
- Loading state shows during login
- Form validates before submission

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 8.4 Successful Patient Login
**Steps:**
1. Log in with patient credentials:
   - Email: john.smith@example.com
   - Password: patient123
2. Wait for redirect
3. Verify redirect to `/portal/dashboard`
4. Check portal loads correctly
5. Verify patient name in sidebar/header
6. Check user is logged in

**Expected Results:**
- Login succeeds with valid credentials
- Redirects to patient portal dashboard
- Session established
- User info shows in interface
- No console errors

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 8.5 Successful Admin Login
**Steps:**
1. Log out (if logged in)
2. Navigate to `/login`
3. Log in with admin credentials:
   - Email: admin@hearwell.com
   - Password: admin123
4. Wait for redirect
5. Verify redirect to `/admin/dashboard`
6. Check admin portal loads correctly
7. Verify admin can see User Management in nav

**Expected Results:**
- Admin login succeeds
- Redirects to admin dashboard
- Admin sees full admin navigation
- User Management visible in admin nav
- Session established

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 8.6 Successful Audiologist Login
**Steps:**
1. Log out
2. Navigate to `/login`
3. Log in with audiologist credentials:
   - Email: sarah.chen@hearwell.com
   - Password: doctor123
4. Wait for redirect
5. Verify redirect to `/admin/dashboard`
6. Check audiologist can see appointments, patients, etc.
7. Verify User Management NOT visible (audios can't manage users)

**Expected Results:**
- Audiologist login succeeds
- Redirects to admin dashboard
- User Management NOT visible
- Can access appointment management
- Proper role-based restrictions

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 8.7 Invalid Credentials
**Steps:**
1. Log out
2. Navigate to `/login`
3. Fill email with valid account: "john.smith@example.com"
4. Fill password with wrong password: "wrongpassword"
5. Click Sign In
6. Wait for response
7. Verify error message displays
8. Check error message says something like "Invalid email or password"
9. Verify user stays on login page (not redirected)
10. Check error is cleared when typing new input

**Expected Results:**
- Login fails with invalid password
- Error message displayed clearly
- User stays on login page
- Can try again
- Error clears when user types

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 8.8 Non-existent Email
**Steps:**
1. Fill email with non-existent account: "nonexistent@example.com"
2. Fill password with any password: "password123"
3. Click Sign In
4. Wait for response
5. Verify error message displays
6. Check user stays on login page

**Expected Results:**
- Login fails gracefully
- Error message shown
- No different message for non-existent vs wrong password (security best practice)

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 8.9 Links & Navigation
**Steps:**
1. Look for "Create one" link in "Don't have an account?" text
2. Click link
3. Verify navigates to `/register`
4. Go back to login
5. Look for "Forgot password?" link
6. Click link
7. Check where it navigates (may not be implemented)
8. Look for "Back to Home" link at bottom
9. Click link
10. Verify navigates to homepage

**Expected Results:**
- "Register" link functional
- "Back to Home" link functional
- "Forgot password" link present (may not be implemented)

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 9: AUTHENTICATION - REGISTRATION PAGE

### 9.1 Page Load & Layout
**Steps:**
1. Navigate to `/register`
2. Check page loads correctly
3. Verify centered layout
4. Check logo/branding
5. Verify "Create Your Account" heading
6. Verify subheading about managing appointments

**Expected Results:**
- Registration page loads cleanly
- Proper layout and spacing
- Professional appearance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 9.2 Form Fields (First Section)
**Steps:**
1. Verify First Name field:
   - Label "First Name" with red * (required)
   - User icon on left
   - Placeholder "John"
   - Can type text
2. Verify Last Name field:
   - Label "Last Name" with red * (required)
   - User icon on left
   - Placeholder "Doe"
   - Can type text
3. Check fields are side-by-side on desktop
4. Check fields stack on mobile

**Expected Results:**
- Name fields display correctly
- Proper required indicators
- Good layout on all sizes
- Icons visible

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 9.3 Form Fields (Contact Info)
**Steps:**
1. Verify Email field:
   - Label "Email Address" with red * (required)
   - Mail icon on left
   - Placeholder "john@example.com"
   - Can type email
2. Verify Phone field:
   - Label "Phone Number" (no * - optional)
   - Phone icon on left
   - Placeholder "(555) 123-4567"
   - Can type phone
3. Verify Date of Birth field:
   - Label "Date of Birth" (no * - optional)
   - Calendar icon on left
   - Can select date
4. Check phone and DOB are side-by-side on desktop

**Expected Results:**
- Contact fields render correctly
- Phone and DOB are optional (no *)
- Email has required indicator
- Icons display
- Date picker works

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 9.4 Form Fields (Password)
**Steps:**
1. Verify Password field:
   - Label "Password" with red * (required)
   - Lock icon on left
   - Placeholder "••••••••"
   - Input is masked (shows dots)
   - Can type password
   - Shows helper text "Must be at least 8 characters"
2. Verify Confirm Password field:
   - Label "Confirm Password" with red * (required)
   - Lock icon on left
   - Placeholder "••••••••"
   - Input is masked
   - Can type password

**Expected Results:**
- Password fields render correctly
- Input is masked for security
- Helper text explains requirements
- Both password fields present

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 9.5 Terms & Privacy Checkbox
**Steps:**
1. Look for terms checkbox
2. Verify checkbox with text
3. Check text mentions "Terms of Service"
4. Check text mentions "Privacy Policy"
5. Verify links are clickable:
   - Click "/terms" link (may not be implemented)
   - Click "/privacy" link (may not be implemented)
6. Go back to register form
7. Try to submit form without checking terms
8. Verify form won't submit (terms required)

**Expected Results:**
- Terms checkbox visible
- Links to terms and privacy
- Form requires checkbox to be checked
- Clear requirement shown

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 9.6 Form Validation - Required Fields
**Steps:**
1. Click Submit button with all fields empty
2. Verify error message for First Name: "First name is required"
3. Fill First Name and submit again
4. Verify error for Last Name: "Last name is required"
5. Continue filling fields one by one, submitting after each
6. Verify error messages for each required field

**Expected Results:**
- Form validates required fields
- Error messages are clear and specific
- Only relevant errors shown
- User can fix one field at a time

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 9.7 Form Validation - Email Format
**Steps:**
1. Fill all required fields correctly
2. Fill email with invalid format: "notanemail"
3. Try to submit
4. Verify error message: "Invalid email address"
5. Change email to valid format: "test@example.com"
6. Verify error clears
7. Try other invalid formats:
   - "test@"
   - "@example.com"
   - "test.example.com"
8. Verify each shows error

**Expected Results:**
- Email format validated
- Invalid formats rejected
- Clear error message
- Error clears when fixed

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 9.8 Form Validation - Phone Format (Optional)
**Steps:**
1. Fill all required fields
2. Fill phone with invalid format: "123"
3. Try to submit
4. Check if error appears (phone is optional)
5. If error appears, verify message: "Invalid phone number"
6. Clear phone field (make it empty)
7. Try to submit
8. Verify form accepts empty phone (optional)

**Expected Results:**
- Phone validation works (if implemented)
- Phone field is optional (can be empty)
- Invalid formats rejected

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 9.9 Form Validation - Password
**Steps:**
1. Fill all fields correctly except password
2. Fill password with short password: "pass"
3. Try to submit
4. Verify error: "Password must be at least 8 characters"
5. Fill password with correct length: "password123"
6. Fill confirm password with different: "different123"
7. Try to submit
8. Verify error: "Passwords do not match"
9. Fill confirm password to match: "password123"
10. Try to submit (should work now)

**Expected Results:**
- Password minimum length enforced (8 chars)
- Passwords must match
- Clear error messages
- Form accepts valid passwords

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 9.10 Successful Registration
**Steps:**
1. Fill form with new test data:
   - First Name: "Test"
   - Last Name: "User"
   - Email: "testuser[timestamp]@example.com" (unique email)
   - Phone: "555-1234" (optional, can skip)
   - Date of Birth: (optional, can skip)
   - Password: "TestPassword123"
   - Confirm Password: "TestPassword123"
   - Check Terms checkbox
2. Click "Create Account" button
3. Watch for loading state (spinner)
4. Wait for success screen
5. Verify success screen shows:
   - Checkmark icon
   - "Account Created!" message
   - "Redirecting you to login..." message
   - Spinner showing redirection
6. Wait for auto-redirect to `/login` (should take ~2 seconds)
7. Verify login page loads

**Expected Results:**
- Registration succeeds
- Success screen displays with appropriate messaging
- Auto-redirect to login after 2 seconds
- Can now log in with new account
- No console errors

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 9.11 Duplicate Email Error
**Steps:**
1. Go back to register page
2. Fill form with data but use existing patient email:
   - Email: "john.smith@example.com" (existing)
3. Fill other fields correctly
4. Try to submit
5. Verify error message appears
6. Check error is something like: "Email already exists" or "Email already registered"

**Expected Results:**
- Duplicate email prevented
- Clear error message
- User stays on form (can try different email)

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 9.12 Links & Navigation
**Steps:**
1. Look for "Already have an account? Sign in" link
2. Click link
3. Verify navigates to `/login`
4. Go back to register (browser back)
5. Look for "Back to Home" link at bottom
6. Click link
7. Verify navigates to homepage

**Expected Results:**
- "Sign in" link functional
- "Back to Home" link functional
- Navigation works correctly

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 10: PATIENT PORTAL - ACCESS CONTROL & LAYOUT

### 10.1 Unauthenticated Access
**Steps:**
1. Log out completely
2. Try to navigate directly to `/portal/dashboard`
3. Verify redirected to `/login`
4. Check login page appears with message or callback URL
5. Repeat for other portal routes:
   - `/portal/appointments`
   - `/portal/profile`
   - `/portal/documents`
   - `/portal/billing`
   - `/portal/messages`

**Expected Results:**
- All portal routes require authentication
- Unauthenticated users redirected to login
- Protected routes working properly

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 10.2 Patient Can Access Patient Portal
**Steps:**
1. Log in with patient credentials:
   - Email: john.smith@example.com
   - Password: patient123
2. Verify redirect to `/portal/dashboard`
3. Check portal loads correctly
4. Verify user is authenticated

**Expected Results:**
- Patient can access patient portal
- Proper redirect on login
- Portal interface loads

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 10.3 Admin/Staff Cannot Access Patient Portal
**Steps:**
1. Log out
2. Log in with admin credentials:
   - Email: admin@hearwell.com
   - Password: admin123
3. Try to navigate directly to `/portal/dashboard`
4. Verify NOT allowed to access (may redirect to `/admin/dashboard`)
5. Repeat with audiologist:
   - Email: sarah.chen@hearwell.com
   - Password: doctor123
6. Try to access `/portal/*` routes
7. Verify access denied or redirect to admin portal

**Expected Results:**
- Admin/staff cannot access patient portal
- Proper access control enforcement
- Redirects appropriately

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 10.4 Portal Layout Structure
**Steps:**
1. Log in as patient
2. Check portal sidebar on desktop:
   - Logo/branding for portal
   - User info section (name, email)
   - Navigation menu with items:
     - Dashboard
     - Appointments
     - Profile
     - Documents
     - Billing
     - Messages
     - Settings (if present)
   - "Back to Website" button
   - "Sign Out" button
3. Check styling (should be clean/professional)
4. Verify sidebar visible on desktop

**Expected Results:**
- All navigation items present
- Sidebar well-organized
- Professional appearance
- Proper spacing

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 10.5 Portal Mobile Navigation
**Steps:**
1. Resize browser to mobile width (< 768px)
2. Check if sidebar visible or hidden
3. Look for mobile navigation (bottom nav, hamburger, etc.)
4. Verify all portal sections accessible on mobile
5. Test navigation between sections
6. Check mobile layout doesn't break

**Expected Results:**
- Mobile navigation functional
- All sections accessible on mobile
- Proper mobile layout
- No horizontal scrolling

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 10.6 Sign Out Functionality
**Steps:**
1. Click "Sign Out" button in portal
2. Verify redirected to homepage (or login)
3. Verify session cleared
4. Try to navigate back to `/portal/dashboard`
5. Verify redirected to login

**Expected Results:**
- Sign out successful
- Session cleared
- Protected routes blocked after logout
- Redirect appropriate

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 11: PATIENT PORTAL - DASHBOARD

### 11.1 Dashboard Load & Personalization
**Steps:**
1. Log in as patient
2. Verify on `/portal/dashboard`
3. Check for personalized greeting with patient's first name
4. Verify heading includes patient name
5. Check user is properly authenticated

**Expected Results:**
- Dashboard loads correctly
- Personalization works (shows correct patient name)
- Professional appearance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 11.2 Quick Actions Cards
**Steps:**
1. Look for Quick Actions section with 3 cards:
   - Book Appointment
   - View Documents
   - Pay Bill
2. Verify each card has:
   - Icon
   - Title
   - Description/explanation
3. Click "Book Appointment" card/button
   - Verify navigates to `/portal/appointments/new`
4. Go back to dashboard
5. Click "View Documents" card/button
   - Verify navigates to `/portal/documents`
6. Go back to dashboard
7. Click "Pay Bill" card/button
   - Verify navigates to `/portal/billing`

**Expected Results:**
- All 3 quick action cards present
- Cards well-designed and clickable
- Navigation links functional
- No broken links

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 11.3 Upcoming Appointments Section
**Steps:**
1. Look for "Upcoming Appointments" section
2. If patient has appointments, verify:
   - Appointment type (service name)
   - Date (formatted clearly)
   - Time (start time)
   - Audiologist name
   - Status badge (color-coded)
   - "View Details" button
   - "Reschedule" button
3. Click "View Details" for an appointment
4. Verify navigates to appointment detail page
5. Go back to dashboard
6. Click "Reschedule" button
7. Verify takes to rescheduling flow

**Expected Results:**
- Upcoming appointments displayed correctly
- All appointment info visible
- Buttons functional
- Navigation works

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 11.4 No Appointments State
**Steps:**
1. If patient has no upcoming appointments, verify:
   - "No Upcoming Appointments" message displays
   - "Book Now" button is prominent
2. Click "Book Now" button
3. Verify navigates to booking page

**Expected Results:**
- Empty state handled gracefully
- Message is clear
- CTA button functional

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 11.5 Notifications/Alerts
**Steps:**
1. Look for any notification banners
2. If profile incomplete, verify:
   - Alert banner visible
   - Message about completing profile
   - Link to profile settings
3. Click profile link
4. Verify navigates to `/portal/profile`

**Expected Results:**
- Notifications display appropriately
- Links functional
- Professional appearance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 12: PATIENT PORTAL - APPOINTMENTS LIST & BOOKING

### 12.1 Appointments List Page
**Steps:**
1. Click "Appointments" in portal navigation
2. Verify page loads to `/portal/appointments`
3. Check page title "My Appointments"
4. Look for search box
5. Look for filter buttons: All, Upcoming, Completed, Cancelled
6. Check appointment list displays

**Expected Results:**
- Appointments page loads correctly
- All UI elements present
- Professional layout

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 12.2 Appointments Filtering
**Steps:**
1. Click "All" filter button
   - Verify all appointments show
2. Click "Upcoming" filter button
   - Verify only future appointments show
   - Verify status is likely "SCHEDULED" or "CONFIRMED"
3. Click "Completed" filter button
   - Verify only past appointments show
   - Verify status is "COMPLETED"
4. Click "Cancelled" filter button
   - Verify only cancelled appointments show
   - Verify status is "CANCELLED"
5. Click "All" again
   - Verify full list returns

**Expected Results:**
- All filters functional
- List updates when filter changes
- Correct appointments shown for each filter
- Active filter highlighted

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 12.3 Appointment Search
**Steps:**
1. Click in search box
2. Type part of appointment type (e.g., "Hearing")
3. Verify list filters to matching appointments
4. Clear search box
5. Verify full list returns
6. Search for non-existent term
7. Verify "No appointments found" message

**Expected Results:**
- Search functionality works
- Results update as user types
- Clear works correctly
- Empty state handled

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 12.4 Appointment Cards Display
**Steps:**
1. Look at appointment cards in list
2. Verify each card shows:
   - Appointment type
   - Date
   - Time
   - Audiologist name
   - Status badge
3. Check cards have hover effects
4. Verify spacing and layout

**Expected Results:**
- Appointment cards well-formatted
- All info visible and readable
- Professional appearance
- Status badges color-coded

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 12.5 New Appointment Booking - Step 1 (Service Selection)
**Steps:**
1. Click "Book Appointment" from dashboard or use navigation
2. Verify on `/portal/appointments/new`
3. Check page title and progress indicator
4. Verify Step 1: Service Selection is active
5. Look for 5 service cards:
   - Comprehensive Hearing Evaluation
   - Hearing Aid Fitting
   - Hearing Aid Follow-up
   - Tinnitus Consultation
   - Custom Ear Protection
6. Verify each card shows:
   - Service name
   - Description
   - Duration (minutes)
   - Price
7. Click on first service to select it
   - Verify selection indication (radio/highlight)
8. Click "Next" button
   - Verify moves to Step 2

**Expected Results:**
- All 5 services display correctly
- Information is accurate and readable
- Service selection works
- Next button functional
- Progress indicator shows Step 1

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 12.6 New Appointment Booking - Step 2 (Provider Selection)
**Steps:**
1. From Step 1, click Next
2. Verify on Step 2: Provider Selection
3. Look for 4 audiologist options:
   - Dr. Sarah Chen - Lead Audiologist
   - Dr. Michael Torres - Clinical Audiologist
   - Dr. Emily Watson - Pediatric Audiologist
   - Dr. James Park - Clinical Audiologist
4. Click on first provider to select
   - Verify selection indicated
5. Click "Back" button
   - Verify returns to Step 1
   - Verify previous selection saved (service still selected)
6. Click "Next" again
7. Verify back on Step 2
8. Select a provider
9. Click "Next" button
   - Verify moves to Step 3

**Expected Results:**
- All 4 providers display correctly
- Provider selection works
- Back button preserves previous selections
- Next button moves to Step 3
- Progress shows Step 2

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 12.7 New Appointment Booking - Step 3 (Date & Time)
**Steps:**
1. From Step 2, click Next
2. Verify on Step 3: Date & Time Selection
3. Look for calendar/date grid showing next 14 days
4. Verify Sundays are excluded
5. Click on a future date (at least 2-3 days from now)
   - Verify date is highlighted/selected
6. Look for time slots list (should show ~14 time slots)
7. Click on a time slot (e.g., 9:00 AM)
   - Verify time is selected/highlighted
8. Click "Back" button
   - Verify returns to Step 2
   - Verify provider selection still there
9. Click "Next" again
10. Verify still on Step 3 with previous selections
11. Select new date and time
12. Click "Next" button
    - Verify moves to Step 4

**Expected Results:**
- Calendar displays 14 days correctly
- Date selection works
- Time slots display correctly
- Time selection works
- Back preserves selections
- Next moves to Step 4

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 12.8 New Appointment Booking - Step 4 (Confirmation)
**Steps:**
1. From Step 3, click Next
2. Verify on Step 4: Confirmation/Review
3. Verify appointment summary shows:
   - Selected service type
   - Selected provider name
   - Selected date
   - Selected time
   - Total price
4. Look for optional notes textarea
   - Try to add notes: "Test appointment notes"
5. Click "Back" button
   - Verify returns to Step 3
6. Click "Next" again
7. Verify back on Step 4
8. Click "Confirm Booking" button
9. Watch for loading state (spinner)
10. Wait for response (should take 1-2 seconds)

**Expected Results:**
- Summary displays all selections correctly
- Notes field functional
- Back button works
- Confirm button functional
- Loading state shows during submission

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 12.9 Appointment Booking Success
**Steps:**
1. Continue from Step 4 after clicking Confirm
2. Wait for success screen
3. Verify success screen shows:
   - Checkmark icon
   - "Appointment Booked!" message
   - Appointment details summary (type, date, time, provider)
   - Confirmation reference or next steps
4. Look for "View Appointment" button
   - Click button
   - Verify navigates to appointment detail page
5. Go back and verify appointment now shows in appointments list

**Expected Results:**
- Booking succeeds and displays success screen
- Success message clear and professional
- Appointment detail page accessible
- Appointment appears in list
- Confirmation email likely sent (check email if available)

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 13: PATIENT PORTAL - APPOINTMENT DETAIL

### 13.1 Appointment Detail Page Load
**Steps:**
1. Navigate to an appointment detail page (from dashboard or appointments list)
2. Verify page loads to `/portal/appointments/[id]`
3. Check appointment type displays prominently
4. Verify status badge is visible and color-coded

**Expected Results:**
- Detail page loads correctly
- Appointment info displays
- Professional layout

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 13.2 Appointment Information Cards
**Steps:**
1. Look for Date & Time card:
   - Shows full date (formatted)
   - Shows time range (start - end)
2. Look for Location card:
   - Shows clinic address
   - May have Google Maps link
   - May show parking info
3. Look for Preparation Instructions card:
   - Shows what to bring
   - Shows what to expect
   - Shows any prep needed
4. Look for Notes card (if appointment has notes)
   - Shows any provider or patient notes

**Expected Results:**
- All information cards display clearly
- Information is accurate
- Cards well-designed
- Maps/links functional (if present)

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 13.3 Provider Information
**Steps:**
1. Look for provider info sidebar/section
2. Verify shows:
   - Provider name
   - Email address
   - Phone number
   - Credentials/title (if shown)
3. Verify provider info is accurate

**Expected Results:**
- Provider info displays correctly
- All contact details shown
- Professional presentation

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 13.4 Appointment Actions
**Steps:**
1. Look for action buttons:
   - "Contact Us" button
   - "Send Message" button
   - "Reschedule" button (if appointment not completed)
   - "Cancel" button (if appointment not completed)
2. Click "Contact Us" button
   - Verify navigates to contact page or shows contact info
3. Go back
4. Click "Send Message" button
   - Verify navigates to messaging or opens message form
5. Go back
6. If appointment is future: Click "Reschedule" button
   - Verify opens rescheduling interface
7. If appointment is future: Click "Cancel" button
   - Verify shows confirmation modal
   - Check modal asks for cancellation reason (optional)
   - Click "Confirm Cancel"
   - Verify appointment status changes to "CANCELLED"

**Expected Results:**
- All action buttons present and functional
- Navigation/modals work correctly
- Cancellation updates status appropriately

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 14: PATIENT PORTAL - PROFILE

### 14.1 Profile Page Load
**Steps:**
1. Navigate to `/portal/profile` from sidebar
2. Verify page loads correctly
3. Check page title "My Profile"
4. Verify form loads with current patient data

**Expected Results:**
- Profile page loads correctly
- Current data pre-populated
- Professional layout

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 14.2 Personal Information Fields
**Steps:**
1. Check First Name field:
   - Shows current first name
   - Can edit
   - Is required (visually indicated)
2. Check Last Name field:
   - Shows current last name
   - Can edit
   - Is required
3. Check Email field:
   - Shows current email
   - Is read-only (disabled or grayed out)
   - Cannot be changed
4. Check Phone field:
   - Shows current phone
   - Can edit
   - Try to clear it
5. Check Date of Birth field:
   - Shows current DOB
   - Can edit
   - Has date picker

**Expected Results:**
- All fields render correctly
- Current values display
- Email is read-only
- Other fields editable
- Professional appearance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 14.3 Address Section
**Steps:**
1. Check Street Address field:
   - Can type/edit
   - Shows placeholder or current value
2. Check City field:
   - Can type/edit
3. Check State/Province field:
   - Can type/edit
4. Check ZIP/Postal Code field:
   - Can type/edit

**Expected Results:**
- Address fields editable
- All fields render correctly
- Layout organized

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 14.4 Emergency Contact Section
**Steps:**
1. Check Contact Name field:
   - Can type/edit
   - Shows current emergency contact name
2. Check Contact Phone field:
   - Can type/edit
   - Shows current emergency contact phone

**Expected Results:**
- Emergency contact fields editable
- Values pre-populated if available
- Professional layout

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 14.5 Saving Profile Changes
**Steps:**
1. Make a change to profile:
   - Change First Name from "John" to "Jonathan"
2. Scroll to "Save Changes" button
3. Click button
4. Watch for loading state (spinner, button disabled)
5. Wait for response (1-2 seconds)
6. Verify success message displays
7. Refresh page
8. Verify change persisted (First Name still shows "Jonathan")

**Expected Results:**
- Save button functional
- Loading state shows
- Success message displays
- Changes persist after refresh
- No console errors

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 14.6 Form Validation
**Steps:**
1. Clear First Name field
2. Try to save
3. Verify error message: "First name is required"
4. Fill First Name back in
5. Clear Last Name field
6. Try to save
7. Verify error message: "Last name is required"
8. Fill Last Name back in
9. Make valid change (e.g., change phone)
10. Try to save
11. Verify succeeds

**Expected Results:**
- Form validates required fields
- Error messages clear and specific
- Can fix and retry
- Success after valid input

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 15: PATIENT PORTAL - DOCUMENTS

### 15.1 Documents Page Load
**Steps:**
1. Navigate to `/portal/documents` from sidebar
2. Verify page loads correctly
3. Check page title "My Documents"
4. Look for search box
5. Look for filter tabs: All Documents, Test Results, Prescriptions, Invoices, Forms
6. Look for document list

**Expected Results:**
- Documents page loads correctly
- All UI elements present
- Professional layout

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 15.2 Document Filtering
**Steps:**
1. Click "All Documents" tab
   - Verify all documents display
2. Click "Test Results" tab
   - Verify only test result documents show
3. Click "Prescriptions" tab
   - Verify only prescription documents show
4. Click "Invoices" tab
   - Verify only invoice documents show
5. Click "Forms" tab
   - Verify only form documents show
6. Click "All Documents" again
   - Verify full list returns

**Expected Results:**
- All filters functional
- Correct documents shown per filter
- Active filter highlighted
- List updates on filter change

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 15.3 Document Search
**Steps:**
1. Click in search box
2. Type part of a document name
3. Verify list filters to matching documents
4. Clear search box
5. Verify full list returns
6. Search for non-existent term
7. Verify "No documents found" message

**Expected Results:**
- Search works as user types
- Results update correctly
- Clear works
- Empty state handled

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 15.4 Document Display
**Steps:**
1. Look at document list items
2. Verify each document shows:
   - Icon (PDF, image, document)
   - Document name
   - Category tag/label
   - Date (upload or modified)
   - File size (if shown)
3. Verify documents are well-formatted
4. Check for "View" button
5. Check for "Download" button

**Expected Results:**
- Documents display clearly
- All info visible
- Icons appropriate for file type
- Buttons present and accessible

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 15.5 Document Actions
**Steps:**
1. Click "View" button on a document
   - Verify document opens (may open in new tab or modal)
   - Check document displays correctly
   - Go back to documents list
2. Click "Download" button on a document
   - Watch for loading state
   - Verify download starts (browser download indicator)
   - Check file downloads with correct name
3. Try with different document types (PDF, image, etc.)

**Expected Results:**
- View button opens document
- Download button works
- Files download with correct names
- Loading states show
- No console errors

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 15.6 Empty State & Info
**Steps:**
1. If no documents exist, verify:
   - "No documents found" message displays
   - Info about requesting documents shown
   - "Request Documents" button (if available)
2. Check message is helpful

**Expected Results:**
- Empty state handled gracefully
- Message is clear
- CTA provided if available

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 16: PATIENT PORTAL - BILLING & INVOICES

### 16.1 Billing Page Load
**Steps:**
1. Navigate to `/portal/billing` from sidebar
2. Verify page loads correctly
3. Check page title "Billing & Invoices"
4. Look for summary cards

**Expected Results:**
- Page loads without errors
- Professional layout

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 16.2 Summary Cards
**Steps:**
1. Look for 3 summary cards:
   - "Total Invoices" - shows count
   - "Outstanding Amount" - shows $ owed
   - "Total Paid" - shows $ paid total
2. Verify each card has:
   - Title
   - Value (number or currency)
   - Icon
3. Check cards are properly formatted
4. Verify values make sense

**Expected Results:**
- All 3 cards display
- Values are correct/reasonable
- Professional appearance
- Icons visible

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 16.3 Outstanding Balance Alert
**Steps:**
1. Check if alert banner displays (if patient has outstanding balance)
2. Verify alert shows:
   - Amount owed
   - Due date (if applicable)
   - Payment instructions
   - Payment methods accepted
3. Check alert styling (warning color like orange/red)

**Expected Results:**
- Alert displays if balance due
- Information clear
- Payment instructions provided
- No alert if no balance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 16.4 Invoice Filtering
**Steps:**
1. Click "All Invoices" tab
   - Verify all invoices display
2. Click "Unpaid" tab
   - Verify only unpaid invoices show
   - Verify status is SENT, OVERDUE, or DRAFT
3. Click "Paid" tab
   - Verify only paid invoices show
   - Verify status is PAID
4. Click "All Invoices" again
   - Verify full list returns

**Expected Results:**
- All filters work correctly
- Correct invoices shown
- Active tab highlighted
- List updates on filter change

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 16.5 Invoice List Display
**Steps:**
1. Look at invoice list items
2. Verify each invoice shows:
   - Invoice number (e.g., "INV-001")
   - Service/appointment type
   - Date (invoice date)
   - Amount (currency)
   - Status badge (color-coded)
3. Check status badges:
   - DRAFT (gray or neutral)
   - SENT (blue)
   - PAID (green)
   - OVERDUE (red)
   - CANCELLED (gray with strikethrough or faded)
4. Verify invoices are clickable

**Expected Results:**
- Invoice list well-formatted
- All info visible
- Status badges color-coded appropriately
- Professional appearance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 16.6 Invoice Detail Modal
**Steps:**
1. Click on an invoice in the list
2. Verify modal opens showing invoice details
3. Verify invoice header shows:
   - Invoice number
   - Status badge
   - Issue date
   - Due date
4. Verify Appointment Details section:
   - Service type
   - Date and time of appointment
   - Provider name
5. Verify Line Items table:
   - Description column
   - Quantity column
   - Unit Price column
   - Total Price column
   - Shows service/appointment line item
6. Verify Totals section:
   - Subtotal amount
   - Tax/GST line (15%)
   - Total amount due

**Expected Results:**
- Modal opens correctly
- All invoice sections display
- Formatting is professional
- Numbers display correctly
- Tax calculated (15% of subtotal)

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 16.7 Invoice Payment Info
**Steps:**
1. In invoice detail modal:
2. If invoice is PAID:
   - Look for "Payment History" section
   - Verify shows:
     - Payment method (Cash, Card, Bank Transfer, ACC, Insurance)
     - Amount paid
     - Payment date
     - Reference number
3. If invoice is UNPAID:
   - Look for "Amount Due" section
   - Verify shows outstanding amount
   - Verify shows "Payment Instructions"
   - Check instructions include:
     - Bank account details (if paying by transfer)
     - Reference number (invoice number to include)
     - Payment deadline

**Expected Results:**
- Payment info displays correctly
- For paid: shows payment history
- For unpaid: shows instructions
- Professional presentation

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 16.8 Invoice Actions
**Steps:**
1. In invoice detail modal:
2. Look for "Print Invoice" button
   - Click button
   - Verify print dialog opens (browser print)
   - Can preview and print
3. Look for "Pay Online" button (if available)
   - Click button (may open payment page or not be implemented)
4. Look for Close/X button to close modal
   - Click to close
   - Verify modal closes and returns to list

**Expected Results:**
- Print button functional
- Print dialog opens
- Pay Online button (if implemented) functional
- Close button works
- Modal closes properly

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 16.9 Empty State
**Steps:**
1. Check if no invoices in selected filter
2. Verify "No invoices found" message displays
3. Check message is helpful

**Expected Results:**
- Empty state handled gracefully
- Message is clear
- Helpful information provided

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 17: PATIENT PORTAL - MESSAGES

### 17.1 Messages Page Load
**Steps:**
1. Navigate to `/portal/messages` from sidebar
2. Verify page loads correctly
3. Check page title "Messages"
4. Look for two-column layout on desktop

**Expected Results:**
- Messages page loads
- Professional layout
- Two-column on desktop

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 17.2 Conversation List
**Steps:**
1. Look at left side conversation list
2. Verify "New Message" button at top
3. Look for search box for conversations
4. Verify conversation items display:
   - Participant name/title
   - Subject line
   - Last message preview (truncated)
   - Timestamp (e.g., "2h ago")
   - Unread indicator (if applicable)
5. Click on a conversation
   - Verify selected/highlighted
   - Verify detail view loads on right

**Expected Results:**
- Conversation list displays correctly
- New Message button present
- Search box functional
- Conversation selection works
- Detail view loads

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 17.3 Conversation Detail View
**Steps:**
1. With conversation open on right:
2. Verify conversation header shows:
   - Participant name
   - Subject
   - Date/time
3. Look for message thread showing:
   - Patient messages (one color/style)
   - Clinic messages (different color/style)
   - Sender name
   - Message timestamp
   - Message text
4. Verify read receipts (if shown)

**Expected Results:**
- Conversation header correct
- Message thread displays clearly
- Message styling differentiates sender
- Readable and professional

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 17.4 Message Composition
**Steps:**
1. In conversation detail view
2. Look at bottom for message input area:
   - Textarea for typing message
   - Attachment/file button (if supported)
   - Send button
3. Click in message textarea
4. Type test message: "This is a test message"
5. Click Send button
6. Watch for loading state
7. Wait for response
8. Verify message appears in thread:
   - Shows as patient message (your color)
   - Shows timestamp
   - Shows message text
9. Verify message input clears

**Expected Results:**
- Message input functional
- Can type and send messages
- Loading state shows
- Message appears in thread
- Professional appearance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 17.5 New Message Creation
**Steps:**
1. Click "New Message" button
2. Verify modal opens with:
   - Recipient dropdown
   - Subject input
   - Message textarea
   - Cancel button
   - Send button
3. Click recipient dropdown
4. Verify options like:
   - Reception
   - Billing
   - Specific audiologist
5. Select a recipient
6. Fill in subject: "Test Subject"
7. Fill in message: "Test new message"
8. Click Send
9. Watch for loading state
10. Wait for response
11. Verify new conversation created/message sent
12. Verify conversation appears in list

**Expected Results:**
- New Message modal opens
- All fields functional
- Recipient options correct
- Message sends successfully
- Conversation created
- Professional interface

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 17.6 Empty State
**Steps:**
1. Check if no conversations exist
2. Verify helpful message displays
3. Verify "New Message" button highlighted/prominent

**Expected Results:**
- Empty state handled gracefully
- Message is clear
- CTA obvious

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 18: PATIENT PORTAL - SETTINGS

### 18.1 Settings Page Load
**Steps:**
1. Navigate to `/portal/settings` from sidebar
2. Verify page loads correctly
3. Check page title "Settings"
4. Look for tabbed interface with 3 tabs:
   - Profile
   - Notifications
   - Security
5. Verify first tab (Profile) is active by default

**Expected Results:**
- Settings page loads
- Tabs visible
- Professional layout

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 18.2 Settings - Profile Tab
**Steps:**
1. Click Profile tab (should already be active)
2. Verify form fields:
   - First Name (editable)
   - Last Name (editable)
   - Email (read-only)
   - Phone (editable)
   - Date of Birth (editable)
3. Make a change (e.g., change phone number)
4. Click "Save Changes" button
5. Watch for loading state
6. Wait for response
7. Verify success message displays

**Expected Results:**
- Profile tab shows correct fields
- Fields match profile page
- Save button functional
- Changes persist

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 18.3 Settings - Notifications Tab
**Steps:**
1. Click Notifications tab
2. Verify toggle switches for:
   - Email Notifications (with description)
   - SMS Notifications (with description)
   - Appointment Reminders (with description)
   - Marketing Emails (with description)
3. Toggle each switch:
   - Turn on (or off)
   - Verify toggle state changes visually
4. Look for "Save Preferences" button
5. Click button
6. Watch for loading state
7. Wait for response
8. Verify success message

**Expected Results:**
- All notification toggles present
- Descriptions clear
- Toggles work smoothly
- Save button functional
- Preferences persist

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 18.4 Settings - Security Tab
**Steps:**
1. Click Security tab
2. Verify form fields:
   - Current Password (masked input)
   - New Password (masked input, shows requirements)
   - Confirm New Password (masked input)
3. Look for eye icon to toggle password visibility
4. Click eye icon on Current Password field
   - Verify password becomes visible
   - Click again to hide
5. Fill in Current Password correctly: "patient123"
6. Fill in New Password: "NewPassword456"
7. Fill in Confirm Password: "NewPassword456"
8. Click "Change Password" button
9. Watch for loading state
10. Wait for response
11. Verify success message displays

**Expected Results:**
- Security tab shows password fields
- Eye icons functional
- Password visibility toggles
- New passwords must match
- Change button functional
- Success message on change

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 18.5 Password Change Validation
**Steps:**
1. Go to Security tab again (may need to re-login or reset)
2. Fill Current Password: wrong password "wrongpass"
3. Fill New Password: "NewPass789"
4. Fill Confirm Password: "NewPass789"
5. Try to change password
6. Verify error message: "Current password is incorrect"
7. Fill correct current password: "patient123"
8. Fill New Password: "short"
9. Try to change
10. Verify error about password requirements (8+ characters)
11. Fill New Password: "GoodPassword123"
12. Fill Confirm Password: "DifferentPassword"
13. Try to change
14. Verify error: "Passwords do not match"
15. Fix confirm password to match
16. Click Change Password
17. Verify success

**Expected Results:**
- Current password validated
- New password requirements enforced
- Passwords must match
- Clear error messages
- Success when all correct

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 18.6 Account Security Tips
**Steps:**
1. On Security tab
2. Look for "Account Security Tips" section
3. Verify at least 4 tips displayed with checkmarks:
   - Use strong passwords
   - Don't share credentials
   - Enable notifications
   - Keep info updated
   - Two-factor auth (if applicable)
4. Check professional presentation

**Expected Results:**
- Security tips displayed
- Tips are helpful and clear
- Professional appearance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 18.7 Tab Switching
**Steps:**
1. Make change on Profile tab
2. Click Notifications tab (without saving)
3. Click back to Profile tab
   - Verify change still there or lost (depends on implementation)
4. Click Notifications tab
5. Toggle a notification switch
6. Click Security tab (without saving)
7. Click back to Notifications tab
   - Verify toggle state saved

**Expected Results:**
- Tab switching works smoothly
- Changes persist within tab
- Professional behavior

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 19: FOOTER

### 19.1 Footer Display
**Steps:**
1. Go to any public page (home, about, services, team, etc.)
2. Scroll to bottom
3. Verify footer displays with:
   - Business information
   - Quick links
   - Contact info
   - Social media links (if any)
   - Copyright notice
4. Check footer styling (background color, text color)
5. Verify footer NOT present on:
   - Login page
   - Register page
   - Portal pages
   - Admin pages

**Expected Results:**
- Footer displays on public pages
- Footer hidden on auth/portal/admin pages
- Professional appearance
- All sections visible

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 19.2 Footer Links
**Steps:**
1. Click each link in footer:
   - Quick links
   - Navigation links
   - Contact links
2. Verify correct navigation
3. Check no broken links
4. Verify social links functional (if any)

**Expected Results:**
- All footer links functional
- Navigation correct
- No broken links

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 20: RESPONSIVE DESIGN

### 20.1 Mobile Breakpoint (< 768px)
**Steps:**
1. Using browser DevTools, set mobile viewport (375px width)
2. Test homepage:
   - Hero section stacks vertically
   - Text readable
   - Images scale appropriately
   - No horizontal scrolling
   - Navigation hamburger visible
   - CTA buttons tappable (44px+ height)
3. Test contact page:
   - Form fields stack vertically
   - Labels visible
   - All fields accessible
4. Test auth pages:
   - Form centered
   - Readable
   - Buttons tappable

**Expected Results:**
- Layout adapts for mobile
- All content accessible
- No horizontal scrolling
- Text readable
- Buttons tappable

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 20.2 Tablet Breakpoint (768px)
**Steps:**
1. Set tablet viewport (768px width)
2. Test multiple pages
3. Verify layout between mobile and desktop
4. Check grid layouts (should show more columns than mobile)
5. Verify navigation adapts appropriately

**Expected Results:**
- Tablet layout optimized
- Good use of space
- Professional appearance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 20.3 Desktop Breakpoint (1440px+)
**Steps:**
1. Set desktop viewport (1440px+)
2. Test all pages
3. Verify full-width layouts
4. Check multi-column layouts
5. Verify desktop navigation shows (not hamburger)
6. Check spacing and sizing appropriate

**Expected Results:**
- Desktop layout optimal
- Full-width layouts work
- Navigation desktop version
- Professional spacing

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 20.4 Image Scaling
**Steps:**
1. Test at different viewport widths
2. Verify images:
   - Scale appropriately
   - Don't distort
   - Load correctly
   - Have alt text (if applicable)
3. Check for lazy loading (if implemented)

**Expected Results:**
- Images responsive
- No distortion
- Proper alt text
- Performance good

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 21: ADMIN PORTAL - DASHBOARD

### 21.1 Admin Access & Layout
**Steps:**
1. Log out
2. Log in with admin credentials:
   - Email: admin@hearwell.com
   - Password: admin123
3. Verify redirect to `/admin/dashboard`
4. Check admin sidebar layout:
   - Dark sidebar
   - Logo and "Admin Portal" title
   - User info showing name and role
   - Navigation menu with items
5. Verify User Management visible in nav (admin only)

**Expected Results:**
- Admin login successful
- Admin dashboard loads
- User Management visible
- Professional admin interface

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 21.2 Dashboard Statistics
**Steps:**
1. Look for 4 stat cards:
   - Today's Appointments (count)
   - Patients This Week (count)
   - Avg Wait Time (minutes)
   - Revenue This Month ($)
2. Verify each card shows:
   - Stat name
   - Value
   - Icon
   - Change % (up/down)
3. Check values are reasonable

**Expected Results:**
- All 4 stats display
- Values shown correctly
- Icons visible
- Professional appearance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 21.3 Today's Appointments Section
**Steps:**
1. Look for "Today's Appointments" section
2. Verify appointments list showing:
   - Time
   - Patient name
   - Appointment type
   - Status badge
   - Audiologist
3. Verify at least 5 appointments shown (mock data)
4. Check status badge colors:
   - SCHEDULED (gray)
   - CONFIRMED (blue)
   - CHECKED_IN (green)
   - COMPLETED (green)
   - CANCELLED (red)
   - NO_SHOW (orange)
5. Click on appointment (if clickable)
   - Verify navigates to appointment detail

**Expected Results:**
- Appointments list displays correctly
- Status color-coded appropriately
- All info visible
- Clickable (if applicable)

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 22: ADMIN PORTAL - APPOINTMENTS

### 22.1 Admin Appointments Page Load
**Steps:**
1. Click "Appointments" in admin sidebar
2. Verify page loads to `/admin/appointments`
3. Check page title
4. Look for search box
5. Look for status filter buttons
6. Look for date navigation

**Expected Results:**
- Appointments page loads
- All UI elements present
- Professional layout

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 22.2 Search Functionality
**Steps:**
1. Click search box
2. Type patient name (e.g., "John")
3. Verify appointments filtered
4. Clear search box
5. Verify full list returns
6. Search by appointment type
7. Verify filtering works

**Expected Results:**
- Search functional
- Results update
- Clear works
- Professional behavior

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 22.3 Status Filtering
**Steps:**
1. Click "SCHEDULED" filter
   - Verify only scheduled appointments show
2. Click "CONFIRMED" filter
   - Verify only confirmed show
3. Click other status filters
4. Verify filtering works correctly

**Expected Results:**
- All status filters work
- Correct appointments shown
- Active filter highlighted

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 22.4 Appointments List Display
**Steps:**
1. Look at appointment list items
2. Verify each shows:
   - Patient name
   - Patient phone
   - Patient email
   - Appointment type
   - Start time and end time
   - Status badge
   - Audiologist
   - Notes
3. Check professional formatting
4. Verify data is accurate

**Expected Results:**
- List well-formatted
- All info visible
- Professional appearance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 22.5 Status Updates
**Steps:**
1. Click on an appointment
2. Look for status update option
3. Change status (e.g., from SCHEDULED to CONFIRMED)
4. Verify change saves
5. Verify list updates
6. Try different status transitions

**Expected Results:**
- Status updates functional
- Changes persist
- List updates correctly

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 23: ADMIN PORTAL - PATIENTS

### 23.1 Admin Patients Page Load
**Steps:**
1. Click "Patients" in admin sidebar
2. Verify page loads to `/admin/patients`
3. Check page title
4. Look for search box
5. Look for patient list

**Expected Results:**
- Patients page loads
- UI elements present
- Professional layout

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 23.2 Patient List Display
**Steps:**
1. Look at patient list
2. Verify each patient shows:
   - Name
   - Email
   - Phone
   - Date of Birth
   - Registration date
   - Status
3. Check formatting and alignment
4. Verify multiple patients listed

**Expected Results:**
- Patient list displays correctly
- All info shown
- Professional appearance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 23.3 Patient Search & Filter
**Steps:**
1. Search for patient by name
2. Verify results filter
3. Search by email
4. Verify filtering works
5. Clear search
6. Verify full list returns

**Expected Results:**
- Search functional
- Filtering works
- Clear works properly

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 23.4 Patient Detail Access
**Steps:**
1. Click on a patient
2. Verify detail page or modal opens
3. Check shows full patient info:
   - Personal details
   - Contact info
   - Emergency contact
   - Appointment history
   - Document access
   - Billing history
4. Look for edit/update options
5. Look for deactivate/delete options (with confirmation)

**Expected Results:**
- Patient details accessible
- All info displayed
- Edit/delete options available
- Confirmation on delete

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 24: ADMIN PORTAL - USER MANAGEMENT (ADMIN ONLY)

### 24.1 User Management Access
**Steps:**
1. Logged in as admin
2. Look for "User Management" in sidebar
3. Verify visible
4. Click "User Management"
5. Verify page loads to `/admin/users`

**Expected Results:**
- User Management visible for admin
- Page loads correctly

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 24.2 User Management Hidden from Non-Admin
**Steps:**
1. Log out
2. Log in as audiologist:
   - Email: sarah.chen@hearwell.com
   - Password: doctor123
3. Check admin sidebar
4. Verify "User Management" NOT visible
5. Try to navigate directly to `/admin/users`
6. Verify access denied or redirect

**Expected Results:**
- User Management hidden from audiologist
- Access control enforced
- Professional behavior

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 24.3 User List Display
**Steps:**
1. Logged in as admin
2. Go to User Management
3. Look at user list
4. Verify each user shows:
   - Name
   - Email
   - Role (ADMIN, AUDIOLOGIST, RECEPTIONIST)
   - Status
   - Last login date
5. Check professional formatting

**Expected Results:**
- User list displays
- All info shown
- Professional layout

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 24.4 Create New User
**Steps:**
1. Look for "Create User" or "Add User" button
2. Click button
3. Verify form opens with fields:
   - First Name
   - Last Name
   - Email
   - Role dropdown (ADMIN, AUDIOLOGIST, RECEPTIONIST)
   - Initial password or generated password
   - Status toggle
4. Fill form:
   - First Name: "Test"
   - Last Name: "Staff"
   - Email: "teststaff@example.com"
   - Role: "AUDIOLOGIST"
5. Click Submit/Create button
6. Watch for loading state
7. Verify success message
8. Verify new user appears in list
9. Verify welcome email sent (check if applicable)

**Expected Results:**
- Create user form functional
- All fields present
- User created successfully
- Appears in list
- Success message shown

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 24.5 Edit User
**Steps:**
1. Click on a user in the list
2. Verify edit form opens
3. Verify can update:
   - First Name
   - Last Name
   - Role
   - Status (active/inactive)
4. Make a change (e.g., change role)
5. Click Save/Update button
6. Verify success message
7. Verify change appears in list

**Expected Results:**
- Edit form functional
- Changes save correctly
- List updates appropriately

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 24.6 Delete User
**Steps:**
1. Find a test user in list
2. Click Delete button
3. Verify confirmation modal appears
4. Check modal warns about permanent deletion
5. Click "Confirm Delete" button
6. Watch for loading state
7. Verify success message
8. Verify user removed from list
9. Try to log in with deleted user credentials
10. Verify login fails

**Expected Results:**
- Delete button functional
- Confirmation required
- User deleted successfully
- User can't log in after delete
- Professional confirmation dialog

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 25: ADMIN PORTAL - AVAILABILITY

### 25.1 Availability Page Load
**Steps:**
1. Click "Availability" in admin sidebar
2. Verify page loads to `/admin/availability`
3. Check page title
4. Look for provider selection
5. Look for schedule display

**Expected Results:**
- Availability page loads
- Professional layout

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 25.2 Provider Selection
**Steps:**
1. Look for provider dropdown or list
2. Click dropdown
3. Verify all audiologists listed:
   - Dr. Sarah Chen
   - Dr. Michael Torres
   - Dr. Emily Watson
   - Dr. James Park
4. Select first provider
5. Verify provider's schedule loads

**Expected Results:**
- Provider list complete
- Selection works
- Schedule loads for selected provider

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 25.3 Weekly Schedule Display
**Steps:**
1. With provider selected
2. Look for week view showing:
   - Days of week (Mon-Sun)
   - Time slots (hourly or 30-min)
3. Verify color coding:
   - Green/filled = Available
   - Red/blocked = Booked or blocked
   - Gray/empty = Not available
4. Check professional presentation

**Expected Results:**
- Week view displays
- Days and times visible
- Color coding clear
- Professional appearance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 25.4 Add Availability
**Steps:**
1. Look for "Add Availability" or similar button
2. Click button
3. Verify form opens with:
   - Day selection
   - Start time picker
   - End time picker
   - Recurring option (weekly, specific range)
4. Fill form:
   - Day: Monday
   - Start time: 9:00 AM
   - End time: 5:00 PM
   - Recurring: Weekly
5. Click Add/Submit button
6. Verify loading state
7. Verify availability appears on calendar
8. Verify color changes to green/available

**Expected Results:**
- Add availability form functional
- All fields present
- Availability saves and displays
- Calendar updates correctly

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 25.5 Block Time Off
**Steps:**
1. Look for "Block Time Off" or similar button
2. Click button
3. Verify form opens with:
   - Start date picker
   - End date picker
   - Time range (if specific time)
   - Reason field (optional)
4. Fill form:
   - Start date: Tomorrow
   - End date: Day after tomorrow
   - Reason: "Doctor appointment"
5. Click Block/Submit button
6. Verify loading state
7. Verify blocked time appears on calendar
8. Verify color changes to red/blocked

**Expected Results:**
- Block time form functional
- Blocked time displays on calendar
- Calendar updates correctly
- Professional appearance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 25.6 Edit/Delete Availability
**Steps:**
1. Click on an availability block on calendar
2. Verify edit/delete options appear
3. Try to edit:
   - Change times
   - Change day
   - Click Save
   - Verify changes appear
4. Click on another block
5. Click Delete
6. Verify confirmation
7. Verify removed from calendar

**Expected Results:**
- Edit functionality works
- Delete functionality works
- Changes persist
- Calendar updates appropriately

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 26: ADMIN PORTAL - BILLING

### 26.1 Billing Page Load
**Steps:**
1. Click "Billing" in admin sidebar
2. Verify page loads to `/admin/billing`
3. Check page title
4. Look for summary cards
5. Look for invoice list

**Expected Results:**
- Billing page loads
- Professional layout

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 26.2 Billing Summary Cards
**Steps:**
1. Look for 4 summary cards:
   - Total Revenue (this month/year)
   - Outstanding Invoices (count & $)
   - Paid Invoices (count & $)
   - Overdue Invoices (count & $)
2. Verify each shows:
   - Title
   - Value
   - Icon
3. Check values are reasonable

**Expected Results:**
- All 4 cards display
- Values shown correctly
- Icons visible
- Professional appearance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 26.3 Invoice List
**Steps:**
1. Look at invoice list
2. Verify each invoice shows:
   - Invoice number
   - Patient name
   - Service type
   - Date
   - Amount
   - Status badge
3. Verify status colors:
   - DRAFT (gray)
   - SENT (blue)
   - PAID (green)
   - OVERDUE (red)
   - CANCELLED (gray)
4. Verify professional formatting

**Expected Results:**
- Invoice list complete
- All info shown
- Status color-coded
- Professional layout

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 26.4 Create Invoice
**Steps:**
1. Look for "Create Invoice" button
2. Click button
3. Verify form opens with fields:
   - Patient dropdown/search
   - Appointment selection
   - Service description
   - Amount input
   - Due date picker
   - Notes textarea
4. Fill form:
   - Select patient: any existing patient
   - Enter amount: 150.00
   - Select due date: 30 days from now
5. Click Create/Submit button
6. Verify loading state
7. Verify success message
8. Verify invoice appears in list

**Expected Results:**
- Create invoice form functional
- All fields present
- Invoice created and listed
- Professional interface

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 26.5 Record Payment
**Steps:**
1. Find an unpaid invoice
2. Look for "Record Payment" button
3. Click button
4. Verify payment modal opens with:
   - Amount received input
   - Payment method dropdown (Cash, Card, Bank Transfer, ACC, Insurance)
   - Payment date picker
   - Reference number field
   - Notes field
5. Fill form:
   - Amount: 150.00 (full amount)
   - Method: "Bank Transfer"
   - Date: Today
   - Reference: "BT12345"
6. Click Submit button
7. Verify loading state
8. Verify success message
9. Verify invoice status changes to PAID
10. Verify payment history updates

**Expected Results:**
- Payment form functional
- All options available
- Payment recorded successfully
- Status updates to PAID
- Professional appearance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 26.6 Send Invoice
**Steps:**
1. Find an invoice (DRAFT or SENT)
2. Look for "Send Invoice" button
3. Click button
4. Verify confirmation dialog
5. Click "Send" to confirm
6. Verify loading state
7. Verify success message
8. Verify status changes to SENT
9. Verify invoice email sent to patient (check email if available)

**Expected Results:**
- Send button functional
- Confirmation required
- Invoice sent successfully
- Status updates to SENT
- Professional confirmation

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 27: ADMIN PORTAL - REPORTS

### 27.1 Reports Page Load
**Steps:**
1. Click "Reports" in admin sidebar
2. Verify page loads to `/admin/reports`
3. Check page title
4. Look for different report sections
5. Look for filters/date range picker

**Expected Results:**
- Reports page loads
- Professional layout
- Multiple report types visible

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 27.2 Revenue Report
**Steps:**
1. Look for "Revenue Report" section
2. Verify shows:
   - Revenue by date/month
   - Chart visualization (if implemented)
   - Total revenue amount
   - Comparison to previous period
3. Look for filter by date range
4. Change date range
5. Verify report updates

**Expected Results:**
- Revenue report displays
- Data shown clearly
- Filtering works
- Professional presentation

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 27.3 Appointment Statistics
**Steps:**
1. Look for "Appointment Statistics" section
2. Verify shows:
   - Total appointments
   - Breakdown by status
   - Breakdown by service type
   - Chart visualization (if any)
3. Check data is accurate

**Expected Results:**
- Stats display correctly
- Breakdown clear
- Professional appearance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 27.4 Patient Metrics
**Steps:**
1. Look for "Patient Metrics" section
2. Verify shows:
   - Total patients
   - New patients this period
   - Growth chart/trend
   - Retention metrics (if shown)
3. Check professional presentation

**Expected Results:**
- Patient metrics display
- Charts visible
- Professional layout

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 27.5 Export Reports
**Steps:**
1. Look for export buttons:
   - "Export as PDF"
   - "Export as CSV"
   - "Print"
2. Click "Export as PDF"
3. Verify download starts
4. Check PDF file downloads
5. Try "Export as CSV"
6. Verify CSV file downloads
7. Try "Print" button
8. Verify print dialog opens

**Expected Results:**
- Export options available
- Files download correctly
- Print dialog opens
- Professional functionality

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 28: ADMIN PORTAL - SETTINGS

### 28.1 Settings Page Load
**Steps:**
1. Click "Settings" in admin sidebar
2. Verify page loads to `/admin/settings`
3. Check page title
4. Look for multiple sections/tabs
5. Look for various setting fields

**Expected Results:**
- Settings page loads
- Professional layout
- Multiple settings visible

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 28.2 Clinic Information
**Steps:**
1. Look for "Clinic Information" section
2. Verify fields:
   - Clinic Name (should show "Veritas Hearing")
   - Clinic Email
   - Clinic Phone (0800 555 051)
   - Clinic Address (street, city, state, postal code)
3. Make a change (e.g., update phone)
4. Look for "Save Settings" button
5. Click Save
6. Verify loading state
7. Verify success message
8. Refresh page
9. Verify change persisted

**Expected Results:**
- Clinic info fields editable
- All fields present
- Changes save correctly
- Professional interface

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 28.3 Operating Hours
**Steps:**
1. Look for "Operating Hours" section
2. Verify for each day (Monday-Sunday):
   - Opening time picker
   - Closing time picker
   - "Closed" toggle (if applicable)
3. Check current hours are correct
4. Try changing a day's hours
5. Click Save Settings
6. Verify changes save

**Expected Results:**
- Operating hours editable
- All days shown
- Time pickers functional
- Changes persist

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 28.4 Default Settings
**Steps:**
1. Look for "Default Settings" section
2. Verify fields:
   - Default appointment duration (minutes)
   - Appointment buffer time
   - Default appointment type (dropdown)
   - Max appointments per day
   - Min advance booking days
   - Max advance booking days
3. Check current values
4. Make a change (e.g., max advance booking days: 60)
5. Click Save Settings
6. Verify loading and success message

**Expected Results:**
- Default settings editable
- All fields present
- Values reasonable
- Changes save correctly

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 28.5 Notification Settings
**Steps:**
1. Look for "Notification Settings" section
2. Verify toggles/options:
   - Email notifications enabled
   - SMS notifications enabled (if applicable)
   - Appointment reminder timing (24h, 1h, etc.)
   - Confirmation required toggle
3. Make changes
4. Click Save Settings
5. Verify settings save

**Expected Results:**
- Notification settings editable
- Options clear
- Changes persist
- Professional interface

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 28.6 Payment Settings
**Steps:**
1. Look for "Payment Settings" section (if applicable)
2. Verify fields:
   - Tax/GST rate (should be 15%)
   - Currency setting
   - Accepted payment methods display
   - Bank account details (if shown)
3. Check values are correct
4. Try to edit tax rate
5. Verify can change and save

**Expected Results:**
- Payment settings visible
- Tax rate correct (15%)
- Settings editable
- Professional appearance

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 28.7 Save All Settings
**Steps:**
1. Make multiple changes across different sections
2. Click "Save Settings" button
3. Watch for loading state
4. Wait for response
5. Verify success message displays
6. Refresh page
7. Verify all changes persisted

**Expected Results:**
- All settings can be changed
- Save functionality works
- All changes persist
- Professional user experience

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST 29: CROSS-CUTTING FUNCTIONALITY

### 29.1 Responsive Design Testing
**Steps:**
1. Test all major pages at mobile (375px), tablet (768px), and desktop (1440px)
2. For each size verify:
   - Layout adapts appropriately
   - Text is readable
   - No horizontal scrolling
   - Buttons/inputs are tappable (min 44px on mobile)
   - Navigation appropriate (hamburger on mobile)
   - Images scale correctly
   - Forms stack properly
3. Test pages:
   - Homepage
   - Services
   - Login
   - Patient portal dashboard
   - Admin dashboard
   - Billing/Invoices

**Expected Results:**
- All pages responsive
- Professional appearance at all sizes
- No broken layouts
- Excellent mobile experience

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 29.2 Performance Testing
**Steps:**
1. Open browser DevTools (F12)
2. Go to Network tab
3. Load homepage
4. Check:
   - Total page load time (should be < 3 seconds)
   - Total page size
   - Number of requests
5. Load patient portal dashboard
6. Check loading time
7. Load admin dashboard
8. Check loading time
9. Check Console tab for errors:
   - No JavaScript errors
   - No 404s on assets
   - No warnings about deprecated APIs

**Expected Results:**
- Pages load quickly (< 3 seconds)
- No console errors
- All assets load successfully
- No performance issues

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 29.3 Animations & Interactions
**Steps:**
1. Test Framer Motion animations:
   - Load homepage
   - Observe animations on page load
   - Scroll through page
   - Verify fade-in/slide animations trigger
   - Check animations are smooth (60 FPS)
   - Check no layout shifts during animations
2. Test form interactions:
   - Click form inputs
   - Verify focus states visible
   - Type in inputs
   - Check for input validation feedback
   - Test form submission animations

**Expected Results:**
- Animations smooth and professional
- No jank or stuttering
- Focus states clear
- Interactions responsive
- Great UX

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 29.4 Accessibility Testing
**Steps:**
1. Test keyboard navigation:
   - Use Tab key to navigate through all interactive elements
   - Verify focus indicator visible
   - Verify all buttons accessible
   - Verify form fields accessible
   - Test form submission with keyboard
2. Test color contrast:
   - Check text vs background colors
   - Use WebAIM contrast checker (if needed)
   - Verify readable for low vision users
3. Test screen reader (if available):
   - Test form labels associated with inputs
   - Test button text readable
   - Test image alt text
4. Test form accessibility:
   - Verify required fields marked
   - Verify error messages clear
   - Verify labels above inputs

**Expected Results:**
- Full keyboard navigation possible
- Good color contrast
- Screen reader friendly
- Form labels and error messages clear
- Professional accessibility

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 29.5 Security Testing
**Steps:**
1. Test password security:
   - Login page password is masked
   - Check network requests (DevTools Network tab)
   - Verify passwords not sent in URL
   - Verify HTTPS used (if deployed)
2. Test data protection:
   - Try to access patient portal without login
   - Verify redirected to login
   - Try to access admin portal as patient
   - Verify access denied
3. Test form security:
   - Fill contact form with test data
   - Check DevTools Network tab
   - Verify data not exposed in URLs
4. Test logout:
   - Log out from portal
   - Try to access protected route
   - Verify redirected to login
   - Try to use browser back button
   - Verify can't access portal (forward redirect to login)

**Expected Results:**
- Passwords masked
- Protected routes enforced
- No data in URLs
- Session properly cleared on logout
- Professional security

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 29.6 Error Handling
**Steps:**
1. Test form validation errors:
   - Submit empty form
   - Verify error messages appear
   - Fill in fields
   - Verify errors clear
2. Test network error handling:
   - Simulate offline (DevTools > Network > Offline)
   - Try to submit form
   - Verify error message
   - Go back online
   - Try again
   - Should work
3. Test 404 errors:
   - Navigate to non-existent page: `/nonexistent`
   - Verify 404 page displays (or appropriate error)
   - Check error message is helpful
4. Test invalid data:
   - Try to access appointment detail with invalid ID
   - Verify error handled gracefully

**Expected Results:**
- All errors handled gracefully
- Error messages clear and helpful
- Forms provide feedback
- No server errors exposed
- Professional error handling

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 29.7 Email Notifications Testing
**Steps:**
1. Create new patient account
2. Check email for registration confirmation
3. Check email was received
4. Book an appointment
5. Check email for appointment confirmation
6. Go to admin, record payment on invoice
7. Check email sent to patient about payment
8. Send message to clinic
9. Check email sent to patient about message receipt

**Expected Results:**
- All emails sent appropriately
- Emails contain correct information
- Professional formatting
- Links in emails functional

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 29.8 Browser Compatibility
**Steps:**
1. Test in multiple browsers:
   - Chrome (desktop)
   - Firefox (desktop)
   - Safari (desktop)
   - Edge (desktop)
   - Chrome Mobile (iOS/Android)
   - Safari Mobile (iOS)
2. For each browser verify:
   - Pages load correctly
   - Styling renders properly
   - Forms functional
   - No JavaScript errors
   - Responsive layout works

**Expected Results:**
- Works in all major browsers
- Professional appearance
- All features functional
- No browser-specific issues

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

### 29.9 Data Persistence
**Steps:**
1. Log in as patient
2. Make changes to profile
3. Refresh page
4. Verify changes persisted
5. Book appointment
6. Refresh page
7. Verify appointment still there
8. Go to admin
9. Create invoice
10. Refresh page
11. Verify invoice still exists
12. Verify all data persists correctly

**Expected Results:**
- All user changes persist
- No data loss on refresh
- Database properly saving data
- Professional data handling

**Issues Found:**
- [ ] Issue: _____
- [ ] Issue: _____

---

## TEST COMPLETION TRACKING

### Summary by Section
- [ ] Public Marketing Pages: ___/40 items tested
- [ ] Header & Navigation: ___/40 items tested
- [ ] Authentication: ___/50 items tested
- [ ] Patient Portal (General): ___/50 items tested
- [ ] Patient Dashboard: ___/20 items tested
- [ ] Patient Appointments: ___/60 items tested
- [ ] Patient Profile: ___/30 items tested
- [ ] Patient Documents: ___/25 items tested
- [ ] Patient Billing: ___/45 items tested
- [ ] Patient Messages: ___/30 items tested
- [ ] Patient Settings: ___/40 items tested
- [ ] Admin Portal (General): ___/30 items tested
- [ ] Admin Dashboard: ___/30 items tested
- [ ] Admin Appointments: ___/40 items tested
- [ ] Admin Patients: ___/30 items tested
- [ ] Admin Users: ___/40 items tested
- [ ] Admin Availability: ___/40 items tested
- [ ] Admin Billing: ___/50 items tested
- [ ] Admin Reports: ___/25 items tested
- [ ] Admin Settings: ___/50 items tested
- [ ] Cross-Cutting (Responsive, Security, etc.): ___/60 items tested

### Overall Completion
**Total Items to Test:** ~900
**Items Completed:** ___
**Completion Rate:** ___%

### Critical Issues Found
1. [ ] Issue: _____
2. [ ] Issue: _____
3. [ ] Issue: _____

### Known Limitations (Not Implemented)
- 🚫 Terms and Privacy Policy pages (links don't work)
- 🚫 Forgot password functionality
- 🚫 Stripe payment integration (Phase 3)
- 🚫 HIPAA document upload (Phase 4)
- 🚫 Real email provider integration (uses mock/test)
- 🚫 SMS notifications (requires Twilio or similar)
- 🚫 Two-factor authentication

### Recommendations
1. [ ] Implement missing features listed above
2. [ ] Address any critical issues found
3. [ ] Optimize performance if needed
4. [ ] Enhance mobile responsiveness if needed
5. [ ] Add more comprehensive error handling

---

**Test Date:** ______
**Tester Name:** ______
**Browser/Device:** ______
**Overall Status:** [ ] PASS [ ] FAIL [ ] PARTIAL

