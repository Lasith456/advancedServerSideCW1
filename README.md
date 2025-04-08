```md
# 🌐 CountryAPI Fetche

This project is a full-stack web application built with:
- ⚛️ **React.js** for the frontend
- 🚀 **Node.js/Express** for the backend

It supports running via Docker (`docker-compose`) as well as manually for development purposes.

---

## 📁 Project Structure

```
project-root/
│
├── frontend/     # React App (my-project)
│   └── Dockerfile
│
├── backend/      # Node.js Backend (server)
│   └── Dockerfile
│
└── docker-compose.yml
```

---

## 🚀 1. Getting Started

### 🔁 Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

## 🐳 2. Run with Docker (Recommended)

### ▶️ Using `docker-compose` (runs both frontend & backend)

```bash
docker-compose up --build
```

- React App: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:3001](http://localhost:3001)

---

## 🔧 3. Run Without Docker (Manual Development Mode)

### ▶️ Frontend (React)

```bash
cd my-project
npm install
npm run start   

# To create production build
npm run build
```

> App runs at: [http://localhost:3000](http://localhost:3000)

---

### ▶️ Backend (Node.js)

```bash
cd server
npm install

# Run with live reload (development)
npm run dev        # using nodemon

# OR run normally
npm run start
```

> API runs at: [http://localhost:3001](http://localhost:3001)

---

## 🐳 4. Run Docker Containers Separately (Manual)

### 🖼️ Frontend (React)

```bash
cd my-project

# Build Docker image
docker build -t react-dev .

# Run the container
docker run -p 3000:3000 react-dev
```

### 🖥️ Backend (Node.js)

```bash
cd server

# Build Docker image
docker build -t node-backend .

# Run the container
docker run -p 3001:3001 node-backend
```

---

## ⚙️ Environment Variables

Make sure to configure your `.env` files as needed in both `/frontend` and `/backend` directories (if applicable).

Example for backend `.env`:
```
PORT=3001
JWT_SECRET=your_secret_key
```

---

## 🧾 Scripts Reference

| Location   | Script         | Description                    |
|------------|----------------|--------------------------------|
| my-project | `npm start`    | Start React app (CRA)          |
| my-project | `npm run dev`  | Start dev mode (Vite)          |
| frontend   | `npm run build`| Build for production           |
| backend    | `npm run start`| Start Node.js server           |
| backend    | `npm run dev`  | Start server with nodemon      |

---


## 👨‍💻 Author

- **Your Name**  
- GitHub: [@LasithViduranga](https://github.com/Lasith456)

---

```
