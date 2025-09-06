# FinanceFlow

> A comprehensive web-based accounting application for small businesses, featuring journal entries, ledgers, trial balance, and financial reporting.

## 🔗 Live Links

* **Frontend (Production)**: [https://financeflow-web.netlify.app/](https://financeflow-web.netlify.app/)
* **Backend**: Local development only (XAMPP required)

## 📋 Overview

FinanceFlow is a full-stack accounting web application designed for small businesses to manage their financial records. The application provides a complete double-entry bookkeeping system with journal entries, automated ledger generation, trial balance calculations, and comprehensive financial reporting.

**Target Users**: Small business owners, freelancers, and accounting professionals who need a simple yet powerful tool for managing financial transactions and generating reports.

## 🛠️ Tech Stack

### Frontend

* **Framework**: React 18+ with Vite
* **Styling**: Tailwind CSS
* **Authentication**: Firebase Auth
* **HTTP Client**: Axios
* **Routing**: React Router DOM
* **State Management**: Custom hooks with React Context
* **Deployment**: Netlify

### Backend

* **Language**: PHP 7.4+
* **Database**: MySQL 8.0+
* **Server**: Apache (via XAMPP)
* **API Architecture**: RESTful endpoints

### Development Tools

* **Build Tool**: Vite
* **Package Manager**: npm
* **Version Control**: Git

## ✨ Features

### Core Accounting Features

* **Journal Entries**: Create, read, update, and delete journal entries with validation
* **Ledger Management**: Automated ledger generation from journal entries
* **Trial Balance**: Real-time trial balance calculations
* **Financial Reports**: Income statement, balance sheet, and financial summaries
* **Double-Entry Validation**: Ensures all entries balance (debits = credits)

### User Interface

* **Dashboard**: Financial overview with recent entries and key metrics
* **Responsive Design**: Mobile-friendly interface
* **Dark/Light Theme**: User preference theme switching
* **Protected Routes**: Authentication-required pages
* **Real-time Updates**: Immediate reflection of changes across components

### Technical Features

* **Firebase Authentication**: Secure user login and registration
* **CORS Support**: Cross-origin requests between frontend and backend
* **Data Validation**: Client and server-side validation
* **Error Handling**: Comprehensive error management and user feedback

## 📁 Repository Structure

```
FinanceFlow/
├── frontend/                    # React frontend application
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── Dashboard.jsx
│   │   │   ├── JournalEntries.jsx
│   │   │   ├── Ledger.jsx
│   │   │   ├── Reports.jsx
│   │   │   └── ...
│   │   ├── hooks/               # Custom React hooks
│   │   │   └── useAccountingData.js
│   │   ├── context/             # React context providers
│   │   ├── firebase/            # Firebase configuration
│   │   └── utils/               # Utility functions
│   ├── index.html
│   └── vite.config.js
├── backend/                     # PHP backend API
│   ├── journalsHandler.php      # Main API router
│   ├── db.php                   # Database configuration
│   ├── fetchJournalEntries.php
│   ├── saveJournalEntries.php
│   ├── updateJournalEntries.php
│   ├── deleteJournalEntry.php
│   └── validateJournalEntries.php
├── package.json                 
└── README.md
```

## 🔧 Prerequisites

* **Node.js**: 16.0+ and npm 8.0+
* **PHP**: 7.4+ (via XAMPP recommended)
* **MySQL**: 8.0+ (included with XAMPP)
* **XAMPP**: Latest version for local development
* **Modern Browser**: Chrome, Firefox, Safari, or Edge

## 🚀 Backend Setup (XAMPP)

### 1. Install XAMPP

Download and install XAMPP from [https://www.apachefriends.org/](https://www.apachefriends.org/)

### 2. Place Backend Files

Copy the `backend/` folder to your XAMPP `htdocs` directory:

```bash
# Windows
C:\xampp\htdocs\Financial-Web-App\backend\

# macOS/Linux
/Applications/XAMPP/htdocs/Financial-Web-App/backend/
```

### 3. Start Services

1. Open XAMPP Control Panel
2. Start **Apache** and **MySQL** services

### 4. Database Setup

The database is automatically created when you first access the API. The `db.php` file will:

* Create database `db_financeflow` if it doesn't exist
* Create tables `journals` and `transactions` with proper schema
* Set up foreign key relationships

### 5. API Endpoints

**Base URL**: `http://localhost/Financial-Web-App/backend/journalsHandler.php`

| Method   | Description               | Request Body         |
| -------- | ------------------------- | -------------------- |
| `GET`    | Fetch all journal entries | None                 |
| `POST`   | Create new journal entry  | `{"entry": {...}}`   |
| `PUT`    | Update existing entry     | `{"entry": {...}}`   |
| `DELETE` | Delete journal entry      | `{"id": "entry-id"}` |

---

## 💻 Frontend Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Base URL

The frontend is configured to connect to the local backend:

```javascript
// In frontend/src/hooks/useAccountingData.js
const API_BASE = 'http://localhost/Financial-Web-App/backend/journalsHandler.php';
```

### 3. Firebase Configuration

Set up your Firebase project and update `frontend/src/firebase/firebase.init.js` with your config.

### 4. Development Server

```bash
npm run dev
```

### 5. Build for Production

```bash
npm run build
```

---

## 🌐 Deployment

### Frontend (Netlify)

* **Base Directory**: `frontend/`
* **Build Command**: `npm run build`
* **Publish Directory**: `frontend/dist/`

### Backend (Local Only)

* Requires **XAMPP** to run locally
* For production deployment, use a PHP/MySQL-supported host and update `useAccountingData.js` with the new URL

---

## 🗄️ Database Schema

```sql
-- Journals table
CREATE TABLE journals (
    id VARCHAR(100) PRIMARY KEY,
    date VARCHAR(100) NOT NULL,
    description TEXT,
    createdAt VARCHAR(100) NOT NULL
);

-- Transactions table  
CREATE TABLE transactions (
    id VARCHAR(100) PRIMARY KEY,
    journal_id VARCHAR(100) NOT NULL,
    accountName VARCHAR(255) NOT NULL,
    accountType VARCHAR(100) NOT NULL,
    debit DECIMAL(15,2) DEFAULT 0,
    credit DECIMAL(15,2) DEFAULT 0,
    openingBalance DECIMAL(15,2) DEFAULT 0,
    type VARCHAR(50) NOT NULL,
    FOREIGN KEY (journal_id) REFERENCES journals(id) ON DELETE CASCADE
);
```

---

## ⚠️ Known Limitations

* Backend hosting requires local XAMPP setup
* No real-time multi-user sync
* File upload not implemented
* Only basic financial reports
* Single company support

---

## 📜 Available Scripts

```bash
# Development
npm run dev        

# Production
npm run build      
npm run preview         
```

---

## 🗺️ Roadmap

* [ ] Deploy backend to cloud hosting
* [ ] Add WebSocket-based real-time sync
* [ ] Expand financial reports (cash flow, receivables, payables)
* [ ] Add file upload support
* [ ] Multi-company support
* [ ] API documentation (Swagger/OpenAPI)
* [ ] Unit & integration tests
* [ ] Mobile app (React Native)

---

## ©️ Copyright

All rights reserved.
