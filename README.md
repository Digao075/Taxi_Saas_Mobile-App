# 📱 GesTaxi SaaS - Employee Mobile App (React Native)

This is the cross-platform (iOS/Android) mobile app for employees of companies using the GesTaxi platform. Built with React Native and Expo, it allows employees to request corporate-approved rides.

---

### ✨ Core Ecosystem

This project is the end-user mobile app for a complete full-stack application.
* **[Backend API (Node.js)](https://github.com/Digao075/Taxi_Saas_Backend)**
* **[Admin Panel (React)](https://github.com/Digao075/Taxi_Saas_Frontend)**

---

### 🛠️ Tech Stack

* **React Native**
* **Expo** (and Expo Router for file-based navigation)
* **Axios** (for API communication)
* **AsyncStorage** (for persistent session/token storage)
* **JavaScript (ES6+)**
* **`@react-native-community/datetimepicker`** (for ride scheduling)

---

### 🚀 Key Features

* **Secure Employee Login:** Connects to the dedicated employee auth endpoint (`/auth/login`).
* **Persistent Session:** Remembers the user's login. The app checks `AsyncStorage` for a valid token on startup and routes to `(tabs)` or `/` accordingly using the `_layout.js` file.
* **Request Ride (Now):** Employees can request an immediate ride.
* **Schedule Ride (Future):**
    * Uses a native date/time picker to select a future time.
    * Communicates with the backend, which enforces business logic (e.g., must be 1hr+ in advance).
* **API Service Layer:** All API communication is handled through a central service (`services/api.js`) with an Axios interceptor that automatically attaches the `Bearer` token to every protected request.

---

### 🏁 Getting Started

To run this app locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Digao075/taxi-saas-app.git](https://github.com/Digao075/taxi-saas-app.git)
    cd taxi-saas-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Backend Prerequisite (CRITICAL):**
    * This app **must** connect to the **[Backend API](https://github.com/Digao075/Taxi_Saas_Backend)** over your local network.
    * Find your computer's local IPv4 address (e.g., `192.168.1.10`).
    * Open the `services/api.js` file and update the `API_URL` constant with your PC's IP address:
        ```javascript
        // services/api.js
        const API_URL = 'http://YOUR_LOCAL_IP_ADDRESS:3333/api';
        ```

4.  **Run the app:**
    ```bash
    npx expo start
    ```
    * Scan the QR code using the **Expo Go** app on your iOS or Android phone (must be on the same Wi-Fi network).
    * Alternatively, press `w` in the terminal to run the web version (Note: may require CORS adjustments on the backend).
