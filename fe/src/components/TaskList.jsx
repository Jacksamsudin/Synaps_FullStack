import { CalendarDays, Check, Trash2 } from "lucide-react";

function formatDate(date) {
  if (!date) return "Belum ditentukan";
  return new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric", month: "short", year: "numeric"
  });
}

export default function TaskList({ tasks, onDeleteTask, onUpdateStatus }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article className="task-row" key={task.id}>
          <div className={`task-check ${task.status === "Selesai" ? "checked" : ""}`}>
            {task.status === "Selesai" ? <Check size={17} /> : <span />}
          </div>
          <div className="task-main">
            <h3 className={task.status === "Selesai" ? "completed-title" : ""}>{task.title}</h3>
            <p>{task.course}</p>
            {task.description && <p className="task-description">{task.description}</p>}
            <div className="task-meta"><span><CalendarDays size={14} /> {formatDate(task.deadline)}</span><span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span></div>
          </div>
          <div className="task-actions">
            <label className="status-label" htmlFor={`status-${task.id}`}>Status</label>
            <select id={`status-${task.id}`} value={task.status} onChange={(event) => onUpdateStatus(task.id, event.target.value)} aria-label={`Ubah status ${task.title}`}>
              <option>Belum Selesai</option><option>Sedang Dikerjakan</option><option>Selesai</option>
            </select>
            <button className="delete-button" onClick={() => onDeleteTask(task.id)} aria-label={`Hapus ${task.title}`} title="Hapus tugas"><Trash2 size={16} /></button>
          </div>
        </article>
      ))}
    </div>
  );
}