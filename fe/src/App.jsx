
import { useEffect, useMemo, useState } from "react";
import {
  BookOpenCheck,
  CalendarDays,
  Plus,
  Search,
} from "lucide-react";

import Header from "./components/Header.jsx";
import TaskSummary from "./components/TaskSummary.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import EmptyState from "./components/EmptyState.jsx";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/api.js";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua Status");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Mengambil data tugas dari backend
  async function loadTasks() {
    try {
      setLoading(true);
      setError("");

      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  const summary = useMemo(
    () => ({
      total: tasks.length,
      pending: tasks.filter(
        (task) => task.status !== "Selesai"
      ).length,
      completed: tasks.filter(
        (task) => task.status === "Selesai"
      ).length,
    }),
    [tasks]
  );

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
        const keyword = search.toLowerCase();

        const matchesSearch =
          task.title.toLowerCase().includes(keyword) ||
          task.course.toLowerCase().includes(keyword);

        const matchesStatus =
          statusFilter === "Semua Status" ||
          task.status === statusFilter;

        return matchesSearch && matchesStatus;
      }),
    [tasks, search, statusFilter]
  );

  // POST: Menambahkan tugas
  async function addTask(newTask) {
    try {
      setError("");

      const createdTask = await createTask(newTask);

      setTasks((currentTasks) => [
        createdTask,
        ...currentTasks,
      ]);

      setActivePage("tasks");
    } catch (err) {
      setError(err.message);
    }
  }

  // DELETE: Menghapus tugas
  async function handleDeleteTask(id) {
    try {
      setError("");

      await deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  }

  // PATCH: Mengubah status tugas
  async function handleUpdateStatus(id, status) {
    try {
      setError("");

      const currentTask = tasks.find(
        (task) => task.id === id
      );

      if (!currentTask) return;

      const updatedTask = await updateTask(id, {
        ...currentTask,
        status,
      });

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? updatedTask : task
        )
      );
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app-shell">
      <Header
        activePage={activePage}
        onNavigate={setActivePage}
      />

      <main className="main-content">
        <section className="welcome">
          <div>
            <p className="eyebrow">RUANG KERJA KULIAH</p>

            <h1>
              {activePage === "add"
                ? "Catat tugas baru."
                : activePage === "tasks"
                ? "Semua tugasmu."
                : "Halo, Tegar!"}
            </h1>

            <p className="welcome-copy">
              {activePage === "add"
                ? "Masukkan detail tugas agar deadline tetap terpantau."
                : "Kelola tugas kuliah dan deadline-mu dalam satu tempat."}
            </p>
          </div>

          <div className="welcome-icon">
            <BookOpenCheck size={28} />
          </div>
        </section>

        <TaskSummary summary={summary} />

        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}

        {activePage === "add" ? (
          <TaskForm
            onAddTask={addTask}
            onCancel={() => setActivePage("tasks")}
          />
        ) : (
          <section className="panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">
                  {activePage === "dashboard"
                    ? "PANTAU PROGRES"
                    : "DAFTAR TUGAS"}
                </p>

                <h2>
                  {activePage === "dashboard"
                    ? "Tugas perkuliahan"
                    : "Semua tugas"}
                </h2>

                <p className="muted">
                  Tetap fokus pada tugas yang paling penting.
                </p>
              </div>

              <button
                className="primary-button"
                onClick={() => setActivePage("add")}
              >
                <Plus size={17} /> Tambah tugas
              </button>
            </div>

            <div className="filters">
              <label className="search-box">
                <Search size={17} />

                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Cari judul atau mata kuliah..."
                  aria-label="Cari tugas"
                />
              </label>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
                aria-label="Filter status"
              >
                <option>Semua Status</option>
                <option>Belum Selesai</option>
                <option>Sedang Dikerjakan</option>
                <option>Selesai</option>
              </select>
            </div>

            {loading ? (
              <p className="muted">Memuat data tugas...</p>
            ) : filteredTasks.length > 0 ? (
              <TaskList
                tasks={
                  activePage === "dashboard"
                    ? filteredTasks.slice(0, 5)
                    : filteredTasks
                }
                onDeleteTask={handleDeleteTask}
                onUpdateStatus={handleUpdateStatus}
              />
            ) : (
              <EmptyState
                message={
                  tasks.length === 0
                    ? "Belum ada data Tugas"
                    : "Tidak ada tugas yang cocok dengan pencarian."
                }
              />
            )}

            <div className="panel-footer">
              <CalendarDays size={15} />
              Data tugas tersimpan melalui backend Synaps.
            </div>
          </section>
        )}

        <footer className="footer">
          Synaps <span>•</span> I Kadek Tegar Suanda
        </footer>
      </main>
    </div>
  );
}
