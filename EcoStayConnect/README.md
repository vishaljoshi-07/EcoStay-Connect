# EcoStay Connect - Backend Integration & Setup
**Intern ID:** 26101252  
**Project Name:** EcoStay Connect  
**Topic:** Week 4 Node.js + Express.js + MongoDB Backend Integration

EcoStay Connect is a premium web platform built to help travelers discover and book eco-friendly homestays in rural and hilly regions. The platform supports browsing homestays, detailed sustainable audit checklists, and locations/ratings searching or filtering.

This codebase has been upgraded with a modular, MVC-structured **Node.js/Express** backend and integrated with the React frontend to fetch properties dynamically from a **MongoDB** database.

---

## 📁 Directory Structure

```text
backend/
├── config/
│   └── db.js                 # MongoDB connection setup
├── controllers/
│   └── homestayController.js # CRUD & search/filter API handlers
├── middleware/
│   └── errorMiddleware.js    # Global express error and 404 middleware
├── models/
│   └── homestayModel.js      # Mongoose schema for Homestays
├── routes/
│   └── homestayRoutes.js     # API route paths
├── utils/
│   └── asyncHandler.js       # Express async exception handler utility
├── .env.example              # Configuration environment template
├── package.json              # Backend scripts & NPM package definitions
└── server.js                 # Main server starting point
```

---

## ⚡ REST API Specifications

The Express backend serves the API on `http://localhost:5000/api/homestays`. All endpoints return standard JSON payloads and appropriate HTTP status codes.

| Endpoint | Method | Description | Example Payload / Query |
|---|---|---|---|
| `/api/homestays` | **GET** | Retrieve all homestay listings | *None* |
| `/api/homestays/:id` | **GET** | Retrieve a single homestay | `:id` $\rightarrow$ Mongoose ObjectId |
| `/api/homestays` | **POST** | Add/onboard a new homestay listing | `{ "title": "Hill Cottage", "price": 3000, ... }` |
| `/api/homestays/:id` | **PUT** | Update an existing homestay listing | `{ "price": 3200 }` |
| `/api/homestays/:id` | **DELETE**| Delete a homestay listing | *None* |
| `/api/homestays/search` | **GET** | Search homestays by location | `?location=Himachal` (regex match) |
| `/api/homestays/filter` | **GET** | Filter homestays by rating | `?rating=4.8` (minimum rating threshold) |

---

## 🚀 How to Run Backend Locally

### 1. Prerequisites
Ensure you have the following installed on your machine:
* **Node.js** (v18 or higher)
* **MongoDB Community Server** (running locally on port `27017`) or a **MongoDB Atlas** URL.

### 2. Install Dependencies
Open a terminal in the project directory, navigate to the `backend` folder, and install the dependencies:
```bash
cd backend
npm install
```

### 3. Setup Environment Variables
Create a `.env` file inside the `backend` folder (you can copy the contents of `.env.example` as a starting template):
```bash
cp .env.example .env
```
Inside `backend/.env`, configure your variables:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecostay_connect
NODE_ENV=development
```

### 4. Seed Sample Database
To populate your MongoDB database with the default six certified eco-friendly homestays, run the database seeder script:
```bash
npm run seed
```
*(To destroy seeded data if resetting, run: `node utils/seeder.js -d`)*

### 5. Start Dev Server
To run the Express backend server with hot-reloading (`nodemon`), run:
```bash
npm run dev
```
The backend server will start running at:
* **Backend URL:** `http://localhost:5000`
* **API Route:** `http://localhost:5000/api/homestays`

---

## 💻 How to Run Frontend Locally

### 1. Install Dependencies
In the root directory of the project, run:
```bash
npm install
```

### 2. Start Development Server
Start the React + Vite development server:
```bash
npm run dev
```
The frontend application will start running at:
* **Frontend URL:** `http://localhost:5173` (Vite default dev port)

The frontend is fully connected to the backend. It will perform a `GET` request on load to retrieve listings and fire `GET` requests to the search route `/api/homestays/search?location={loc}` when filters are clicked. It includes structured UI render branches for **loading**, **error**, and **empty** response states.
