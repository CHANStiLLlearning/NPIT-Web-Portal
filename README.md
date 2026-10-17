# National Polytechnic Institute Techo Sen (NPIT) - Official Web Portal
វិទ្យាស្ថានជាតិពហុបច្ចេកទេសតេជោសែន

A modern, high-performance, bilingual (Khmer & English) academic portal for the **National Polytechnic Institute Techo Sen (NPIT)**. Features online admissions, real-time application tracking, interactive research showcase with full page navigation, and a secure administrative dashboard.

---

## 🌐 Live Production Deployment

- **Production URL**: [https://npit-portal.web.app](https://npit-portal.web.app)
- **Alternate Mirror**: [https://npit-portal.firebaseapp.com](https://npit-portal.firebaseapp.com)
- **Status**: 🟢 **Live & Operational** (Firebase Free Spark Tier)

---

## 🚀 Key Features

1. **Official Brand Identity & Aesthetic**
   - Palette derived directly from the official NPIT emblem:
     - **Primary Navy / Royal Blue**: `#001a4d` & `#002b80`
     - **Accent Red / Crimson**: `#d32f2f`
     - **Accreditation Gold**: `#d4af37`
     - **Canvas White / Slate**: `#f8fafc` & `#ffffff`
   - High-contrast typography optimized for both Khmer (Battambang/Kantumruy Pro) and English (Inter/Outfit).

2. **Dedicated Page Navigation (Zero Annoying Popups)**
   - **Admissions & Online Enrollment**: `#apply` modal & full-page intake form.
   - **Academic Departments**: Civil, Electrical, Mechanical, and Information Technology.
   - **Academic Research**: Full dedicated deep-linkable view (`#research`) featuring solar microgrids, automation, AI precision agriculture, and composite materials.
   - **Student Services & Campus Life**: Dedicated overview (`#student-life`) of dormitories, sports facilities, robotics lab, and career guidance.
   - **News & Announcements**: Dedicated archive (`#news`) with real-time faculty notices.

3. **Real-Time Cloud Firestore Integration**
   - Automated cloud persistence for candidate enrollment applications and contact inquiries.
   - Automatic graceful fallback to offline local storage cache if network interrupts.

4. **Live Application Status Tracker (`#track`)**
   - Direct link: [https://npit-portal.web.app/#track](https://npit-portal.web.app/#track)
   - Candidates enter their Application Reference (`NPIT-2026-APP-XXXXXX`) or Inquiry Reference (`NPIT-INQ-XXXX`) to inspect their real-time 4-step progress:
     1. **Submitted** &rarr; 2. **Document Verification** &rarr; 3. **Faculty Evaluation** &rarr; 4. **Officially Accepted**
   - Displays student credentials, Bac II grade, scholarship category (100% State, 50% Priority, Women in STEM), and official committee instructions.

5. **Academic & Admissions Admin Dashboard (`#admin`)**
   - Direct link: [https://npit-portal.web.app/#admin](https://npit-portal.web.app/#admin)
   - **Passcode**: `npit2026`
   - Real-time KPI counters (Total Applications, Pending Review, Accepted Students, Scholarship Requests, Inquiries).
   - Filter applicants by department, status, and scholarship type.
   - Full candidate dossier view with one-click decision buttons:
     - *Approve & Accept*
     - *Schedule Interview*
     - *Mark Under Review*
     - *Waitlist*
   - Immediate live sync back to the applicant's tracker.
   - Export full applicant list to CSV spreadsheet.

---

## 🛠 Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS & Vanilla CSS Design Tokens
- **Icons**: Lucide React
- **Cloud Backend**: Google Firebase Cloud Firestore
- **Hosting & CDN**: Firebase Hosting with global edge caching and SPA rewrites
- **Automation & Quality**: Playwright browser automation & E2E verification

---

## 💻 Local Development

### 1. Prerequisites
- Node.js (v18+)
- npm or pnpm

### 2. Setup
```bash
# Clone or navigate to the directory
cd NPIT

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🔐 Environment Variables

The project uses `.env` for Firebase configuration:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=npit-portal.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=npit-portal
VITE_FIREBASE_STORAGE_BUCKET=npit-portal.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=231060558416
VITE_FIREBASE_APP_ID=1:231060558416:web:4666ea717dad2e72b63755
```

---

## 📦 Deployment to Firebase Hosting

To deploy updates to the live site:

```bash
# Build the production bundle
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

---

## 🏛 Campus Information

- **Institute**: National Polytechnic Institute Techo Sen (NPIT)
- **Ministry**: Ministry of Labour and Vocational Training (MLVT), Cambodia
- **Contact**: info@npit.edu.kh | (+855) 23 888 999
- **Location**: Phnom Penh, Kingdom of Cambodia
