
import { useEffect, useState } from "react";
import { getTodos } from "../services/api";

export default function ApiTaskList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTodos() {
    setLoading(true);
    setError("");

    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <section className="api-panel">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">DATA EKSTERNAL</p>
          <h2>Rekomendasi Tugas</h2>
          <p className="muted">
            Tugas ini diambil dari JSONPlaceholder API
          </p>
        </div>
      </div>

      {loading && (
        <div className="api-loading">
          <p>Sedang mengambil data tugas</p>
        </div>
      )}

      {!loading && error && (
        <div className="api-error">
          <p>{error}</p>
          <button className="primary-button" onClick={loadTodos}>
            Coba Lagi
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="api-task-list">
          {todos.map((todo) => (
            <div className="api-task-item" key={todo.id}>
              <div>
                <h3>{todo.title}</h3>
                <span>
                  {todo.completed ? "Selesai" : "Belum Selesai"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
