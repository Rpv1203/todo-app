const BASE_URL = "http://localhost:8080";

export const getTodos = async () => {
    const response = await fetch(`${BASE_URL}/todos`);
    return response.json();
};

export const createTodo = async (todo) => {
    const response = await fetch(`${BASE_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo)
    });
    return response.json();
};

export const updateTodo = async (id, todo) => {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todo)
    });
    return response.json();
};

export const deleteTodo = async (id) => {
    const response = await fetch(`${BASE_URL}/todos/${id}`, {
        method: "DELETE"
    });
    return response.json();
};