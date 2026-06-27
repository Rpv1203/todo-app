import React, { useState } from "react";

function TodoForm({ onAdd }) {
    const [task, setTask] = useState("");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!task.trim()) return;
        onAdd({ task, priority, due_date: dueDate || null });
        setTask("");
        setPriority("medium");
        setDueDate("");
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                placeholder="Add a new task..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="task-input"
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="priority-select"
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="date-input"
            />
            <button type="submit" className="add-btn">Add</button>
        </form>
    );
}

export default TodoForm;