# 🌿 AarogyaCare — Ayurvedic Clinical Practice & Hospital Management System (CPMS)

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Frontend-Vite%205-646CFF.svg)](https://vitejs.dev/)
[![Express.js](https://img.shields.io/badge/Backend-Express%205-black.svg)](https://expressjs.com/)
[![Firebase Firestore](https://img.shields.io/badge/Database-Firebase%20Firestore-orange.svg)](https://firebase.google.com/)

---

## 📌 Executive Summary

**AarogyaCare** is a specialized Electronic Health Record (EHR) and Clinical Practice Management System (CPMS) engineered explicitly for **BAMS (Bachelor of Ayurvedic Medicine and Surgery) practitioners, Ayurvedic hospitals, and Panchakarma wellness centers**.

Unlike generic hospital management software that relies on modern Western diagnostic templates, AarogyaCare bridges traditional Ayurvedic clinical methodology with cutting-edge digital health infrastructure. It digitizes the classical **Ashtavidha Pariksha (Eight-Fold Examination)**, interactive **Prakriti (Tridosha) Assessment**, **Panchakarma Multi-Day Therapy Scheduling**, and **Aushadha Sevana Kala (Classical Ayurvedic Pharmacopeia & Timing)**.

---

## 🎯 Problem Statement & Clinical Relevance

* **The Gap**: Most open-source or commercial Hospital Information Systems (HIS) are built exclusively for allopathic workflows (ICD-10, vital charts, lab panels) and lack structural support for Ayurvedic diagnostics (*Nadi Gati*, *Ama assessment*, *Dosha vitiation*).
* **The Reality in Ayurvedic Clinics**: Walk-in patients, physical pulse evaluations, multi-day oil retention therapies (*Basti, Shirodhara*), and dietary restrictions (*Pathya & Apathya*) are traditionally tracked on loose paper slips or unstandardized registers.
* **The AarogyaCare Solution**: A role-centric clinical operating system designed for **BAMS Vaidyas / Doctors**, **Panchakarma Therapists**, and **Hospital Reception Staff** that provides clinical decision support, standardized examination forms, printable legal prescription letterheads, and an offline-resilient architecture.

---

## 🌟 Core Modules & Clinical Features

```
                                  ┌────────────────────────┐
                                  │      AarogyaCare       │
                                  └───────────┬────────────┘
                      ┌───────────────────────┴───────────────────────┐
                      ▼                                               ▼
         ┌────────────────────────┐                      ┌────────────────────────┐
         │     Doctor Portal      │                      │   Reception & Admin    │
         └────────────┬───────────┘                      └────────────┬───────────┘
     ┌────────────────┼────────────────┐                 ┌────────────┼───────────┐
     ▼                ▼                ▼                 ▼            ▼           ▼
[Ashtavidha]     [Prakriti]      [Panchakarma]       [OPD Token] [Doctor Rota] [Herbal Stock]
 [Pariksha]      [Analyzer]       [Scheduler]         [Walk-in]    [Directory]   [Inventory]
```

### 1. 🩺 Ashtavidha Pariksha (Eight-Fold Classical Examination)
Standardized digital capture of the 8 diagnostic pillars:
* **Nadi (Pulse)**: Gati classification (*Sarpa / Snake - Vata*, *Manduka / Frog - Pitta*, *Hamsa / Swan - Kapha*, *Dwandwaja*, *Sannipataja*).
* **Mutra (Urine)**: Visual clarity, color (*Peeta, Avila, Aruna*), and burning sensations.
* **Mala (Stool)**: Consistency, *Ama* presence (mucus/metabolic toxins), and transit status (*Vibandha, Atisara*).
* **Jihva (Tongue)**: Coating thickness (*Saama* vs. *Nirama*), fissures, and discoloration.
* **Shabda (Voice/Speech)**: Pitch, clarity, hoarseness (*Kshama, Gambhira, Spashta*).
* **Sparsha (Touch/Skin)**: Temperature and hydration (*Ushna, Sheeta, Ruksha, Snigdha*).
* **Druk (Eyes/Vision)**: Scleral pallor, icterus, dryness.
* **Aakriti (Physique)**: Body frame typing (*Sthula, Krisha, Madhyama*).
* **Agni & Koshtha**: Sluggish (*Mandagni*), intense (*Tikshnagni*), variable (*Vishamagni*), or balanced (*Samagni*).

### 2. 🧬 Interactive Prakriti Diagnostic Tool (Tridosha Analyzer)
* Real-time weighted questionnaire mapping phenotypic and metabolic traits.
* Instant calculation and visualization of dominant constitutions (e.g., *Vata-Pitta Prakriti*).
* Contextual clinical lifestyle advice based on doshic dominance.

### 3. 🌿 Panchakarma Department & Therapy Tracker
* Multi-day treatment protocol manager (*Janu Basti, Kati Basti, Shirodhara, Takradhara, Abhyanga & Bashpa Swedana, Nasya, Virechana*).
* Day-by-day progress tracker with percentage completion bars.
* Specific medicament and oil assignment (*Mahanarayan Taila, Ksheerabala 101, Sahacharadi*).
* One-click session verification for therapists on duty.

### 4. 📜 Classical Ayurvedic Formulary & Prescription Generator
* Pre-loaded formulary covering *Kwatha, Churna, Vati/Guggulu, Asava/Arishta, Taila/Ghrita*.
* Standardized dosage (*Matra*), classical administration timing (*Aushadha Sevana Kala*: *Pragbhakta, Madhyabhakta, Adhobhakta, Nishi*), and traditional carriers (*Anupana*: honey, warm water, cow's milk).
* **Pathya & Apathya Guidance**: Automatic suggestions of diet to favor and strictly avoid based on diagnosis.
* **One-Click Printable Letterhead**: Generates a clean, clinic-branded PDF prescription slip via browser print engine.

### 5. 🏥 OPD Reception Desk & Token Management
* Rapid walk-in patient registration issuing standardized Patient IDs (`AC-10X`).
* Real-time token generation slip with assigned consultation room and Vaidya.
* Pharmacy inventory monitoring for classical formulations and reorder warnings.

---

## 🛠️ Technology Stack & Architecture

### **Frontend Architecture**
* **Core Framework**: HTML5, Modern ECMAScript (ES6+), CSS3
* **Build System & Dev Server**: [Vite 5](https://vitejs.dev/) (Multi-page configuration for dashboards and authentication portals)
* **Visual Components & Icons**: FontAwesome 6, Google Fonts (Inter)
* **Data Visualization**: [Chart.js 4](https://www.chartjs.org/) (OPD footfall curves, disease prevalence doughnut charts, revenue breakdowns)
* **Animations**: AOS (Animate on Scroll)

### **Backend Architecture**
* **Runtime**: [Node.js (LTS v18+)](https://nodejs.org/)
* **Server Framework**: [Express.js 5](https://expressjs.com/) (RESTful API architecture)
* **Security & Auth**: JSON Web Tokens (`jsonwebtoken`), `bcrypt` password hashing, `cors` cross-origin middleware
* **Logging**: `morgan` (Dev request logging)
* **File Handling**: `multer` (Upload processing)
* **Mailing**: `nodemailer` (Notification infrastructure)

### **Database & Data Layer**
* **Primary Cloud Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore) via `firebase-admin` SDK
* **Offline Resilience Layer**: Client-side localStorage Clinical Practice Engine in `frontend/js/api.js` with auto-failover, ensuring continuous operation during viva evaluations or internet outages.

---

## 📂 Project Directory Structure

```text
AarogyaCare/
├── package.json                         # Root monorepo workspace scripts
│
└── AarogyaCare-main/
    ├── package.json                     # Monorepo task runner
    ├── .gitignore                       # Git exclusion rules
    │
    ├── backend/                         # Express.js REST API service
    │   ├── config/
    │   │   └── db.js                    # Firebase Admin Firestore connection & fallback
    │   ├── controllers/
    │   │   ├── appointmentController.js # OPD token queue & appointment handling
    │   │   ├── authController.js        # User authentication & JWT issuance
    │   │   ├── doctorController.js      # Vaidya profiles & rosters
    │   │   ├── patientController.js     # Patient clinical records
    │   │   └── prescriptionController.js# Prescription saving & retrieval
    │   ├── middleware/
    │   │   ├── authMiddleware.js        # JWT bearer authentication guard
    │   │   ├── roleMiddleware.js        # Role-based access control (Doctor / Admin)
    │   │   └── uploadMiddleware.js      # Multer file storage handler
    │   ├── routes/                      # Express route endpoints
    │   ├── seeder.js                    # Database seed script for initial demo data
    │   ├── server.js                    # Main server entry point & CORS configuration
    │   ├── .env.example                 # Environment variables blueprint
    │   └── package.json                 # Backend dependencies
    │
    └── frontend/                        # Vite Multi-Page Frontend Application
        ├── css/
        │   ├── dashboard.css            # Clinical control panel styling
        │   └── style.css                # Base design system & layout tokens
        ├── js/
        │   └── api.js                   # Unified clinical API client & offline fallback store
        ├── public/
        │   └── js/api.js                # Public asset bundle of the clinical API engine
        ├── images/                      # Clinical illustrations and banners
        ├── index.html                   # Hospital public landing page
        ├── login.html                   # Role selection portal
        ├── login-doctor.html            # BAMS Vaidya authentication portal
        ├── login-admin.html             # Reception & Hospital Administrator portal
        ├── login-patient.html           # Patient portal advisory & redirect notice
        ├── doctor-dashboard.html        # Comprehensive Doctor consultation suite
        ├── admin-dashboard.html         # OPD reception, token desk & analytics
        ├── vite.config.js               # Multi-page build resolution config
        └── package.json                 # Frontend dependencies
```

---

## ⚡ Quick Start & Installation

### Prerequisites
* **Node.js** (v18.0.0 or higher)
* **npm** (v9.0.0 or higher)

### 1. Clone the Repository
```bash
git clone https://github.com/ShlokKondekar02/AarogyaCare.git
cd AarogyaCare/AarogyaCare-main
```

### 2. Install Dependencies
Install dependencies for both frontend and backend:
```bash
# Install backend packages
cd backend
npm install

# Install frontend packages
cd ../frontend
npm install

# Return to root
cd ..
```

### 3. Configure Environment Variables
In `AarogyaCare-main/backend/`, copy `.env.example` to `.env`:
```bash
cp backend/.env.example backend/.env
```
Update the parameters if connecting to your Firebase instance:
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=aarogyacare_secure_jwt_secret_key_2026

# Firebase Admin SDK Credentials
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```
*(Note: If Firebase credentials are not supplied, the application automatically activates its built-in local clinical storage engine, allowing complete functionality out-of-the-box).*

### 4. Run the Project
Start both servers in separate terminal tabs:

**Terminal 1 — Backend API Server:**
```bash
cd backend
npm start
# Server listens on http://localhost:3000
```

**Terminal 2 — Frontend Dev Server:**
```bash
cd frontend
npm run dev
# Application accessible on http://localhost:5173
```

---

## 🔑 Demo Access Credentials

The application includes pre-configured demo credentials with one-click quick-fill buttons:

| Portal | Role | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Doctor Desk** | BAMS Senior Vaidya | `rohan@aarogya.com` | `password123` | Ashtavidha Pariksha, Prakriti Tool, Panchakarma Orders, Rx Generator |
| **Doctor Desk** | Panchakarma Specialist | `amit@aarogya.com` | `password123` | Panchakarma Unit Monitoring, Therapy Schedules, Clinical Logs |
| **Reception / Admin** | Chief Administrator | `rajesh@aarogya.com` | `password123` | Walk-in Registration, Token Generation, Inventory, Analytics |

---

## 🔮 Future Work & Engineering Roadmap

* [ ] **ABHA (Ayushman Bharat Health Account) Integration**: Integrate with India's ABDM (Ayushman Bharat Digital Mission) sandbox for M1, M2, and M3 compliance (health ID generation and consent-based health data exchange).
* [ ] **AI-Assisted Prakriti & Dosha Correlation Engine**: Train a machine learning model on classical texts (*Charaka Samhita*, *Sushruta Samhita*) to correlate patient symptom clusters with likely *Samprapti* (pathogenesis).
* [ ] **Barcode / QR-Coded Token & Prescription Slips**: QR-coded printable prescriptions enabling the hospital pharmacy to scan and auto-dispense herbal formulations.
* [ ] **IoT Pulse Sensor (Digital Nadi Pariksha)**: Hardware integration with optical/piezoelectric wrist sensors to capture and visualize arterial pulse waveforms (*Nadi Gati*).
* [ ] **Multi-Lingual Clinical Interface**: Support for Sanskrit terminology alongside Hindi, Marathi, Gujarati, and English for regional practitioners.
* [ ] **Progressive Web App (PWA) & Offline Sync**: Enable background SQLite / IndexedDB sync for practitioners conducting rural health camps with intermittent connectivity.

---

## 👨‍💻 Project Maintainer & Author

* **Shlok Kondekar**  
  * GitHub: [@ShlokKondekar02](https://github.com/ShlokKondekar02)   
  * Repository: [AarogyaCare](https://github.com/ShlokKondekar02/AarogyaCare)

---

## 📄 License
This project is licensed under the **ISC License**. Academic and educational use is welcomed with proper attribution.

