**Student Name**: Lasith Chamika Viduranga  
**Student ID**: 20210568 | W1867208  
**Module**: 6COSC022W – Web Design & Development  
**Coursework 1** – Secure API Country details Fetch System  
**Last Updated**: 10th April 2025

# CountryAPI Fetch

This project is a full-stack web application built with:
- **React.js** for the frontend
- **Node.js/Express** for the backend

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

##  1. Getting Started

###  Clone the Repository

```bash
git clone https://github.com/Lasith456/advancedServerSideCW1.git
cd advancedServerSideCW1
```

---

##  2. Run with Docker (Recommended)

###  Using `docker-compose` (runs both frontend & backend)

```bash
docker-compose up --build
```

- React App: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:3001](http://localhost:3001)

---

## 🔧 3. Run Without Docker (Manual Development Mode)

### Frontend (React)

```bash
cd my-project
npm install
npm run start   

# To create production build
npm run build
```

> App runs at: [http://localhost:3000](http://localhost:3000)

---

### Backend (Node.js)

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

## 4. Run Docker Containers Separately (Manual)

### Frontend (React)

```bash
cd my-project

# Build Docker image
docker build -t react-dev .

# Run the container
docker run -p 3000:3000 react-dev
```

### Backend (Node.js)

```bash
cd server

# Build Docker image
docker build -t node-backend .

# Run the container
docker run -p 3001:3001 node-backend
```

---

## Environment Variables

Your backend uses environment variables defined in a .env file. An example file is provided as .env.example.
### Setup Instructions
```
cd backend
cp .env.example .env

```

---

## Scripts Reference

| Location   | Script         | Description                    |
|------------|----------------|--------------------------------|
| my-project | `npm start`    | Start React app (CRA)          |
| my-project | `npm run build`| Build for production           |
| backend    | `npm run start`| Start Node.js server           |
| backend    | `npm run dev`  | Start server with nodemon      |

---

## User Test Scenarios

### TC01 – User Registration
Input: Valid username, email, password  
Expected Output: User account created with success message.

### TC02 – Duplicate User Registration
Input: Existing username and email  
Expected Output: Error message “Registration failed: Email already registered!”

### TC03 – Login with Valid Credentials
Input: Correct email and password  
Expected Output: User logged in successfully.

### TC04 – Login with Invalid Credentials
Input: Valid email and incorrect password  
Expected Output: “Login failed: Invalid credentials”

### TC05 – Valid Session
Input: Return with valid session cookie  
Expected Output: User remains authenticated.

### TC06 – Expired Session
Input: Return after session timeout  
Expected Output: Redirect to login page.

### TC07 – Fetch Country by Name with Valid Key
Input: Country name and valid API key  
Expected Output: Country data is returned (name, capital, currency, flag, languages).

### TC08 – Fetch Country by Name without Key
Input: Country name, no API key  
Expected Output: Error: “API Key is not valid!”

### TC09 – Fetch Country by Name with Invalid Key
Input: Country name, invalid API key  
Expected Output: Error: “API Key is not valid!”

### TC10 – Fetch Countries with Valid Key
Input: Valid API key  
Expected Output: List of countries (e.g., in Europe)

### TC11 – Fetch Countries with Invalid Key
Input: Invalid API key  
Expected Output: Error message: “API Key is not valid!”

### TC12 – Fetch Countries without Key
Input: No API key  
Expected Output: Error message: “API Key is not valid!”

### TC13 – Case Insensitivity
Input: Country name in uppercase  
Expected Output: Case-insensitive match returned successfully.

### TC14 – Logout
Action: Click logout  
Expected Output: Session ended, redirect to login.

### TC15 – Old API Key Invalidation
Input: Use old API key  
Expected Output: API access is rejected.

### TC16 – Registration Field Validation
Input: Submit empty registration form  
Expected Output: Prompt to fill all fields.

---

## Admin Test Scenarios

### TC17 – Generate API Key
Action: Click “Generate API Key” after login  
Expected Output: API key generated and stored.

### TC18 – Display API Key
Action: Navigate to country fetch pages  
Expected Output: API key is displayed.

### TC19 – Regenerate API Key
Action: Click “Generate Key” again  
Expected Output: Old key replaced with a new one.

### TC20 – Password Storage Security
Check: DB contents  
Expected Output: Password is hashed (not plain text).

### TC21 – Track API Key Usage
Action: Use valid key  
Expected Output: Entry appears in API stats.

### TC22 – Delete User Account
Action: Admin deletes a user  
Expected Output: User and data removed.

### TC23 – Admin Login
Input: Admin credentials  
Expected Output: Access to admin dashboard.

### TC24 – View All Users
Action: Navigate to stats  
Expected Output: All registered users listed.

### TC25 – Update User Role
Action: Change role via admin panel  
Expected Output: User role is updated.

### TC26 – Access Control for Non-Admin
Input: Normal user tries to access admin  
Expected Output: Admin features not visible.

### TC27 – Password Length Validation
Input: Password <6 or >13  
Expected Output: Validation error message.

### TC28 – API Key Storage Security
Check: DB key storage  
Expected Output: Key is securely hashed.


## 👨‍💻 Author

- **Lasith Chamika Viduranga**  
- GitHub: [@LasithViduranga](https://github.com/Lasith456)

---

