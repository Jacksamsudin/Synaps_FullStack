import { ListTodo } from "lucide-react";

export default function EmptyState({ message = "Belum ada data Tugas" }) {
  return (
    <div className="empty-state">
      <span className="empty-icon"><ListTodo size={27} /></span>
      <h3>{message}</h3>
      <p>Tugas yang kamu tambahkan akan muncul di bagian ini.</p>
    </div>
  );
}