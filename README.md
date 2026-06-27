# Todo App — Full Stack Practice Project

A simple full-stack Todo application built as a **learning project** to understand how APIs work, how a frontend communicates with a backend, and how data is stored and retrieved from a real database.

---

## What this project is about

This app was built from scratch to practise:
- How REST APIs work (GET, POST, PUT, DELETE)
- How a React frontend sends requests to a Python backend
- How a backend connects to and queries a PostgreSQL database
- How all three layers (frontend, backend, database) work together as one application

---

## Tech Stack

| Layer | Technology | Port |
|---|---|---|
| Frontend | ReactJS | localhost:4000 |
| Backend | Python (FastAPI) | localhost:8080 |
| Database | PostgreSQL | localhost:5432 |

---

## Features

- Add a new todo with a task name, priority level, and due date
- Edit existing todos (task text, priority, due date)
- Mark todos as complete / incomplete (checkbox toggle)
- Delete todos
- Priority levels: Low, Medium, High (color-coded badges)
- Dark mode toggle
- Data persists in a real PostgreSQL database

---

## Project Structure

```
todo-app/
├── backend/
│   ├── main.py          # FastAPI app — all API endpoints
│   ├── database.py      # PostgreSQL connection
│   └── requirements.txt # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── App.js       # Main React component
│   │   ├── api.js       # API call functions
│   │   └── components/
│   │       ├── TodoForm.js   # Add new todo form
│   │       ├── TodoCard.js   # Single todo card (edit/delete/complete)
│   │       └── TodoList.js   # Renders all todo cards
│   └── package.json
└── .gitignore
```

---

## API Endpoints

| Method | Endpoint | What it does |
|---|---|---|
| GET | `/todos` | Fetch all todos |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/{id}` | Update a todo (text, priority, due date, completion) |
| DELETE | `/todos/{id}` | Delete a todo |

---

## How to Run Locally

### Prerequisites
- Python 3.x
- Node.js
- PostgreSQL

### 1. Database setup

```sql
psql -U postgres
CREATE DATABASE todo_db;
\c todo_db
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    task TEXT NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE,
    priority TEXT DEFAULT 'medium',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Backend setup

```bash
cd backend
python -m venv venv
venv\Scripts\Activate        # Windows
pip install -r requirements.txt
```

Update the password in `database.py` to match your PostgreSQL password, then:

```bash
uvicorn main:app --reload --port 8080
```

Backend runs at: `http://localhost:8080`
API docs available at: `http://localhost:8080/docs`

### 3. Frontend setup

```bash
cd frontend
npm install
$env:PORT=4000; npx react-scripts start   # Windows PowerShell
```

Frontend runs at: `http://localhost:4000`

---

## What I learned building this

- How HTTP methods (GET, POST, PUT, DELETE) map to CRUD operations
- How FastAPI handles request validation using Pydantic models
- How psycopg2 connects Python to PostgreSQL and executes parameterised queries
- Why CORS needs to be configured when frontend and backend run on different ports
- How React's `useState` and `useEffect` hooks manage state and data fetching
- How `fetch` API sends requests from the browser to the backend
- How to structure a full-stack project with clearly separated frontend and backend

---

## Note

This is a **practice project** — not deployed, intentionally kept simple. Built to understand the fundamentals of full-stack development and REST API communication before moving to more complex applications.

---

*Built with React, FastAPI, and PostgreSQL*
