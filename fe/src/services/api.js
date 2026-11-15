
const API_URL = "http://localhost:3000/tasks";


const statusToApi = {
  "Belum Selesai": "belum-selesai",
  "Sedang Dikerjakan": "sedang-dikerjakan",
  "Selesai": "selesai",
};


const statusFromApi = {
  "belum-selesai": "Belum Selesai",
  "sedang-dikerjakan": "Sedang Dikerjakan",
  "selesai": "Selesai",
};


function formatTask(task) {
  return {
    id: task.id,
    title: task.judul,
    description: task.deskripsi ?? "",
    course: task.matakuliah,
    deadline: String(task.deadline).slice(0, 10),
    priority:
      task.prioritas.charAt(0).toUpperCase() +
      task.prioritas.slice(1),
    status: statusFromApi[task.status] ?? "Belum Selesai",
  };
}


function prepareTask(task) {
  return {
    judul: task.title,
    deskripsi: task.description ?? "",
    matakuliah: task.course,
    deadline: task.deadline,
    prioritas: task.priority.toLowerCase(),
    status: statusToApi[task.status],
  };
}


async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message
        ? Array.isArray(data.message)
          ? data.message.join(", ")
          : data.message
        : "Terjadi kesalahan pada server",
    );
  }

  return data;
}


export async function getTasks() {
  const data = await request(API_URL);
  return data.map(formatTask);
}


export async function createTask(task) {
  const data = await request(API_URL, {
    method: "POST",
    body: JSON.stringify(prepareTask(task)),
  });

  return formatTask(data);
}


export async function updateTask(id, changes) {
  const data = await request(`${API_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(prepareTask(changes)),
  });

  return formatTask(data);
}


export async function deleteTask(id) {
  return request(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
