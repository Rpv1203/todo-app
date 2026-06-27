import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import { getTodos, createTodo, updateTodo, deleteTodo } from "./api";
import "./App.css";

function App() {
    const [todos, setTodos] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const data = await getTodos();
        const formatted = data.map((row) => ({
            id: row[0],
            task: row[1],
            is_completed: row[2],
            priority: row[3],
            due_date: row[4],
            created_at: row[5]
        }));
        setTodos(formatted);
    };

    const handleAdd = async (todo) => {
        await createTodo(todo);
        fetchTodos();
    };

    const handleUpdate = async (id, todo) => {
        await updateTodo(id, todo);
        fetchTodos();
    };

    const handleDelete = async (id) => {
        await deleteTodo(id);
        fetchTodos();
    };

    return (
        <div className={`app ${darkMode ? "dark" : ""}`}>
            <header className="app-header">
                <h1>My Todo App</h1>
                <div className="header-controls">
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="theme-toggle-btn"
                    >
                        {darkMode ? "Light Mode" : "Dark Mode"}
                    </button>
                </div>
            </header>

            <main className="app-main">
                <TodoForm onAdd={handleAdd} />
                <TodoList
                    todos={todos}
                    onDelete={handleDelete}
                    onUpdate={handleUpdate}
                />
            </main>
        </div>
    );
}

export default App;