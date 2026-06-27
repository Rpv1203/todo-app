import React from "react";

function CalendarView({ todos }) {
    const grouped = {};

    todos.forEach((todo) => {
        if (todo.due_date) {
            const date = todo.due_date;
            if (!grouped[date]) grouped[date] = [];
            grouped[date].push(todo);
        }
    });

    const sortedDates = Object.keys(grouped).sort();

    if (sortedDates.length === 0) {
        return (
            <div className="empty-state">
                <p>No todos with due dates yet! Add a due date to see them here.</p>
            </div>
        );
    }

    return (
        <div className="calendar-view">
            {sortedDates.map((date) => (
                <div key={date} className="calendar-day">
                    <div className="calendar-date-header">
                        {new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })}
                    </div>
                    <div className="calendar-tasks">
                        {grouped[date].map((todo) => (
                            <div
                                key={todo.id}
                                className={`calendar-task ${todo.is_completed ? "completed" : ""}`}
                            >
                                <span
                                    className="priority-dot"
                                    style={{
                                        backgroundColor:
                                            todo.priority === "high" ? "#C0392B" :
                                            todo.priority === "low" ? "#1D9E75" : "#BA7517"
                                    }}
                                />
                                <span className={todo.is_completed ? "strikethrough" : ""}>
                                    {todo.task}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CalendarView;