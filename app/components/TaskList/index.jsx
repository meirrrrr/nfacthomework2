import React from "react";
import TaskItem from "../TaskItem";

const TaskList = ({ tasks, handleToggleTask, handleDeleteTask }) => {
  // Render TaskItems using TaskItem component
  // Filter tasks by status here
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          handleToggleTask={handleToggleTask}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
