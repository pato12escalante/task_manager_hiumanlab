import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/tasks", {
      headers: {
        Authorization: "12321",
      },
    })
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  }, []);


  const addTask = () => {
  fetch("http://127.0.0.1:5000/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "12321",
    },
    body: JSON.stringify({
      title: title,
      description: description,
      status: "Pendiente",
    }),
  })
    .then((res) => res.json())
    .then((newTask) => {
      setTasks([...tasks, newTask]); // actualizar lista
      setTitle(""); // limpiar input
      setDescription("");
    })
    .catch((err) => console.log(err));
  };

  const deleteTask = (id) => {
  fetch(`http://127.0.0.1:5000/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "12321",
    },
  })
    .then((res) => res.json())
    .then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    })
    .catch((err) => console.log(err));
  };

  return (
  <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
    <h1>Task Manager</h1>

    {/* FORM */}
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginRight: "10px" }}
      />

      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ marginRight: "10px" }}
      />

      <button onClick={addTask}>Agregar</button>
    </div>

    {/* LISTA */}
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <strong>{task.id}: {task.title}</strong>
            <p>{task.description}</p>
          </div>

          <button onClick={() => deleteTask(task.id)}>
            Eliminar
          </button>
        </li>
      ))}
    </ul>
  </div>
);
}

export default App;