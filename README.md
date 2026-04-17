# 🗒️ MERN Notes App

<p align="center">
  <b>A clean and modern full-stack Notes Management app</b><br/>
  Built with <b>MongoDB</b>, <b>Express</b>, <b>React</b>, and <b>Node.js</b> 🚀
</p>

---

## ✨ Tech Stack

- 🎨 **Frontend:** React + Vite + Tailwind CSS
- ⚙️ **Backend:** Node.js + Express
- 🗄️ **Database:** MongoDB + Mongoose
- 🔐 **Authentication:** JWT + bcrypt

## 📁 Project Structure

```text
Todo_react/
  client/   # React frontend
  server/   # Express backend
```

## ✅ Features

- 👤 User registration and login
- 🔒 Protected routes (dashboard only for logged-in users)
- 📝 Create, edit, and delete notes
- 📌 Each user sees only their own notes
- 📱 Responsive, modern UI
- ⏳ Loading states and 🔔 toast notifications

## 🔌 Backend API Endpoints

### 1. Namespaced endpoints (recommended)

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/notes`
- `POST /api/notes`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`

### 2. Simple endpoints (also supported)

- `POST /register`
- `POST /login`
- `GET /notes`
- `POST /notes`
- `PUT /notes/:id`
- `DELETE /notes/:id`

## 🔑 Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/notes_app
JWT_SECRET=your_super_secret_jwt_key
CLIENT_URL=http://localhost:5173
```

Optional `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Run Locally

### 1. Install dependencies

```bash
cd server && npm install
cd ../client && npm install
```

### 2. Start backend server

```bash
cd server
npm run dev
```

### 3. Start frontend app (new terminal)

```bash
cd client
npm run dev
```

### 4. Open in browser

👉 `http://localhost:5173`

---

<p align="center">
  Made with ❤️ for learning and building awesome MERN projects.
</p>
