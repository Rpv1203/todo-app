import React from "react";
import TodoCard from "./TodoCard";

function TodoList({ todos, onDelete, onUpdate }) {
    if (todos.length === 0) {
        return (
            <div className="empty-state">
                <p>No todos yet! Add one above to get started.</p>
            </div>
        );
    }

    return (
        <div className="todo-list">
            {todos.map((todo) => (
                <TodoCard
                    key={todo.id}
                    todo={todo}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
}

export default TodoList;