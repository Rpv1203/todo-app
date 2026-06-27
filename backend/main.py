from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from database import get_connection

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class TodoCreate(BaseModel):
    task: str
    priority: Optional[str] = "medium"
    due_date: Optional[str] = None

class TodoUpdate(BaseModel):
    task: Optional[str] = None
    priority: Optional[str] = None
    due_date: Optional[str] = None
    is_completed: Optional[bool] = None 
    
@app.get("/todos")
def get_todos():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM todos;")
    rows = cursor.fetchall()
    cursor.close()
    conn.close()
    return rows

@app.post("/todos")
def create_todo(todo: TodoCreate):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO todos (task, priority, due_date) VALUES (%s, %s, %s) RETURNING id;",
        (todo.task, todo.priority, todo.due_date)
    )
    new_id = cursor.fetchone()[0]
    conn.commit()
    cursor.close()
    conn.close()
    return {"id": new_id, "message": "Todo created successfully"}

@app.put("/todos/{todo_id}")
def update_todo(todo_id: int, todo: TodoUpdate):
    conn = get_connection()
    cursor = conn.cursor()
    
    fields = []
    values = []
    
    if todo.task is not None:
        fields.append("task = %s")
        values.append(todo.task)
    if todo.priority is not None:
        fields.append("priority = %s")
        values.append(todo.priority)
    if todo.due_date is not None:
        fields.append("due_date = %s")
        values.append(todo.due_date)
    if todo.is_completed is not None:
        fields.append("is_completed = %s")
        values.append(todo.is_completed)
    
    values.append(todo_id)
    query = f"UPDATE todos SET {', '.join(fields)} WHERE id = %s;"
    
    cursor.execute(query, values)
    conn.commit()
    cursor.close()
    conn.close()
    
    return {"message": "Todo updated successfully"}

@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: int):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM todos WHERE id = %s;", (todo_id,))
    conn.commit()
    cursor.close()
    conn.close()
    return {"message": "Todo deleted successfully"}

