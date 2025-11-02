🚗 RoadAssist – Full Stack Vehicle Service App

📍 Tech Stack: React Native (Expo), Node.js, Express.js, MongoDB Atlas, EAS Build
🔗 GitHub Repository

🚀 Overview

RoadAssist is a full-stack mobile application that helps users find nearby vehicle service centers and request on-site repairs when their vehicle breaks down.
It connects users and mechanics through a real-time backend and provides a mechanic dashboard for managing service requests.

⚙️ Features

📍 Find Nearby Service Centers: Users can locate nearby mechanics based on their GPS location.

🔧 On-Site Repair Requests: Send service requests with issue details and location data.

🧰 Mechanic Dashboard: Web dashboard for mechanics to view and respond to user requests.

☁️ Cloud Backend: RESTful API built with Node.js and Express, hosted on Render.

💬 Real-Time Data: MongoDB Atlas integration for live request updates.

📱 APK Build: Android version built using Expo EAS Build.

🧩 Tech Stack
Category	Tools Used
Frontend	React Native (Expo)
Backend	Node.js, Express.js
Database	MongoDB Atlas
Hosting	Render
Mobile Build	Expo EAS Build
Tools	Postman, VS Code, Git
💻 Setup Instructions
🔹 Backend

Clone the repo and install dependencies:

cd backend
npm install


Add your MongoDB URI in .env file:

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/


Start the server:

node server.js

🔹 Frontend (Mobile App)

Navigate to mobile directory:

cd mobile
npm install
npm start


Open Expo Go app on your Android and scan the QR code.

🌐 Deployed Links

Backend API: https://road-assist-t6ux.onrender.com

Mechanic Dashboard: https://road-assist-t6ux.onrender.com/mechanic-dashboard.html

Android APK: (add Expo build link once available)

📸 App Architecture
User (Mobile App)
     ↓
Express + Node.js Backend (Render)
     ↓
MongoDB Atlas Database
     ↑
Mechanic Dashboard (Web)
