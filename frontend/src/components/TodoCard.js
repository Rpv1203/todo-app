import React, { useState } from "react";

function TodoCard({ todo, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTask, setEditTask] = useState(todo.task);
    const [editPriority, setEditPriority] = useState(todo.priority);
    const [editDueDate, setEditDueDate] = useState(todo.due_date || "");

    const priorityColors = {
        low: "#1D9E75",
        medium: "#BA7517",
        high: "#C0392B"
    };

    const handleSave = () => {
        onUpdate(todo.id, {
            task: editTask,
            priority: editPriority,
            due_date: editDueDate || null
        });
        setIsEditing(false);
    };

    const handleComplete = () => {
        onUpdate(todo.id, { is_completed: !todo.is_completed });
    };

    if (isEditing) {
        return (
            <div className="todo-card editing">
                <input
                    type="text"
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}
                    className="edit-input"
                />
                <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="priority-select"
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input
                    type="date"
                    value={editDueDate}
                    onChange={(e) => setEditDueDate(e.target.value)}
                    className="date-input"
                />
                <div className="card-actions">
                    <button onClick={handleSave} className="save-btn">Save</button>
                    <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
                </div>
            </div>
        );
    }

    return (
        <div className={`todo-card ${todo.is_completed ? "completed" : ""}`}>
            <div className="card-left">
                <input
                    type="checkbox"
                    checked={todo.is_completed}
                    onChange={handleComplete}
                    className="complete-checkbox"
                />
                <div className="card-content">
                    <p className={`task-text ${todo.is_completed ? "strikethrough" : ""}`}>
                        {todo.task}
                    </p>
                    <div className="card-meta">
                        <span
                            className="priority-badge"
                            style={{ backgroundColor: priorityColors[todo.priority] || "#BA7517" }}
                        >
                            {todo.priority}
                        </span>
                        {todo.due_date && (
                            <span className="due-date">
                                Due: {todo.due_date}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            <div className="card-actions">
                <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
                <button onClick={() => onDelete(todo.id)} className="delete-btn">Delete</button>
            </div>
        </div>
    );
}

export default TodoCard;