import psycopg2

def get_connection():
    conn = psycopg2.connect(
        host="localhost",
        port="5432",
        database="todo_db",
        user="postgres",
        password="priya@05"
    )
    return conn
if __name__ == "__main__":
    conn = get_connection()
    print("Connected successfully!")
    conn.close()