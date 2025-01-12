import { useEffect, useState } from "react";
import css from "./App.module.css";
import nextId from "react-id-generator";

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const taskId = nextId();
  const URL = "https://testing-to-do.onrender.com";

  const deleteTask = async (id) => {
    if (!id) {
      throw new Error("Not found");
    }

    const response = await fetch(`${URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete task. Status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  };

  const getAllTasks = async () => {
    const response = await fetch(`${URL}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Not found");
    }

    const json = await response.json();
    setTasks(json);
  };

  const addTask = async (newTask) => {
    const taskData = { id: taskId, text: newTask, status: "inProgress" };

    const response = await fetch(`${URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      throw new Error("Not found");
    }

    const json = await response.json();
    return json;
  };

  useEffect(() => {
    getAllTasks();
  }, [tasks]);

  return (
    <div className={css.container}>
      <form
        className={css.form}
        onSubmit={() => {
          addTask(newTask);
        }}
      >
        <input
          className={css.input}
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" style={{ backgroundColor: "#7ff587" }}>
          Add
        </button>
      </form>
      <h2>Tasks</h2>
      <ul className={css.list}>
        {tasks.map((task, i) => (
          <li className={css.item} key={i}>
            <p>{task.text}</p>
            <button
              className={css.buttonDel}
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
