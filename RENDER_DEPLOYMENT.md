# 🚀 Hosting Guide: Deploying to Render

This project is pre-configured for **1-Click Web Service Deployment on Render (render.com)**.

---

## 📋 Prerequisites
1. A free account on [Render.com](https://render.com).
2. A GitHub account with this project repository uploaded.

---

## 🛠️ Option 1: Automatic Blueprint Deployment (Recommended)

1. **Push Code to GitHub**:
   Ensure all files (including `render.yaml`, `package.json`, and `backend/server.js`) are pushed to your GitHub repository.

2. **Deploy on Render**:
   - Go to your [Render Dashboard](https://dashboard.render.com/).
   - Click **New +** in the top right and select **Blueprint**.
   - Connect your GitHub repository.
   - Render will automatically detect `render.yaml` and configure the web service.
   - Click **Apply**. Render will build and launch your application!

---

## ⚙️ Option 2: Manual Web Service Setup

If you prefer configuring the Web Service manually on Render:

1. Click **New +** → **Web Service**.
2. Connect your GitHub repository.
3. Configure the following fields:
   - **Name:** `hostel-automation-system`
   - **Environment:** `Node`
   - **Region:** Choose closest region to your users
   - **Branch:** `main` (or your default branch)
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
4. Click **Create Web Service**.

---

## 🗄️ Database Options on Render

- **Default (Automatic Fallback):**
  If no external MySQL server URL is provided, the backend automatically uses smart storage persistence so the app runs immediately out-of-the-box without crashing!

- **Using External MySQL (Optional):**
  If you have a remote MySQL database (from Aiven, PlanetScale, Railway, Supabase, etc.), add the following Environment Variables in your Render Web Service settings:
  - `MYSQL_HOST`
  - `MYSQL_USER`
  - `MYSQL_PASSWORD`
  - `MYSQL_DATABASE`
  - `MYSQL_PORT` (Default: 3306)

---

## ✅ Post-Deployment Verification

Once Render finishes building:
1. Your app will be live at `https://<your-app-name>.onrender.com`.
2. Open the URL to access the **Welcome Dashboard**.
3. Click **Hostel Login** to log in using:
   - **Username:** `admin`
   - **Password:** `admin`
