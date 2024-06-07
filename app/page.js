"use client";
import { useState } from "react";
import TaskList from "./components/TaskList";
import { useEffect } from "react";

const task = { id: 1, text: "Todo Test", completed: false };

export default function Home() {
  const [tasks, setTasks] = useState(() => {
    const localTasks = localStorage.getItem("tasks");
    return localTasks ? JSON.parse(localTasks) : [];
  });
  const [newTaskText, setNewTaskText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTaskText.trim() === "") return;
    const newTask = {
      id: tasks.length + 1,
      text: newTaskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setNewTaskText("");
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        {/* Medium level: extract todo's listing to TaskList component */}
        {/* Basic level: map through tasks state by using this code: */}
        <TaskList
          tasks={filteredTasks}
          handleToggleTask={handleToggleTask}
          handleDeleteTask={handleDeleteTask}
        />
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span>
            {" "}
            {tasks.filter((task) => !task.completed).length} items left
          </span>{" "}
          <div>
            <button
              onClick={() => setFilter("all")}
              className={`mr-2 ${filter === "all" ? "text-white" : ""}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`mr-2 ${filter === "active" ? "text-white" : ""}`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`${filter === "completed" ? "text-white" : ""}`}
            >
              Completed
            </button>
          </div>
          <button
            onClick={() => setTasks(tasks.filter((task) => !task.completed))}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
