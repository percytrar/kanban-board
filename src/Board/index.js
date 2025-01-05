import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import StatusCol from "./StoryStatusCol";
import TitleBar from "./TitleBar";
import "./index.css";

// Features
// Popup menu to edit/create task details like - title, desc, story points, assignee, status
// Filter per assignee
// Right side editor for editing story in focus
// Ability to add comments for a task

const Board = (props) => {
  const [tasks, setTasks] = useState([]);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const hasMounted = useRef(false);
  // Save tasks to localStorage on state change
  useEffect(() => {
    if (hasMounted.current) {
      try {
        console.log("Saving tasks to localStorage:", tasks); // Debug
        localStorage.setItem("tasks", JSON.stringify(tasks));
      } catch (error) {
        console.error("Error saving tasks to localStorage:", error);
      }
    }
  }, [tasks]);

  // Load tasks from localStorage on mount
  useEffect(() => {
    try {
      const tasksFromLocal = JSON.parse(localStorage.getItem("tasks")) || [];
      if (Array.isArray(tasksFromLocal)) {
        setTasks(tasksFromLocal);
        console.log("Loaded tasks from localStorage:", tasksFromLocal); // Debug
      } else {
        console.warn("Invalid tasks format in localStorage, resetting.");
        setTasks([]);
      }
    } catch (error) {
      console.error("Error loading tasks from localStorage:", error);
      setTasks([]); // Reset if parsing fails
    }
    hasMounted.current = true;
  }, []);

  const onAddTask = (task) => {
    const newTask = {
      id: uuidv4(),
      ...task,
    };

    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    setTaskToUpdate(null);
  };

  const onUpdateTask = (updatedTask) => {
    const idx = tasks.findIndex((task) => task.id === updatedTask.id);
    if (idx === -1) return;
    const newTasks = [...tasks];
    newTasks.splice(idx, 1, updatedTask);
    setTasks(newTasks);
    setTaskToUpdate(null);
  };

  const onStatusUpdateTask = (taskId, newStatus) => {
    const newTasks = [...tasks];
    const idx = newTasks.findIndex((id) => id === taskId);
    if (idx === -1) return;
    const updatedTask = { ...tasks[idx], status: newStatus };
    newTasks.splice(idx, 1, updatedTask);
    setTasks(newTasks);
  };

  const onEditTask = (task) => {
    setTaskToUpdate(task);
  };

  const onDeleteTask = (task) => {
    setTasks(tasks.filter(({ id }) => id !== task.id));
  };

  const onCancelUpdate = () => {
    setTaskToUpdate(null);
  };

  return (
    <div className="board">
      <h1>Jira Board</h1>
      <div className="board-container">
        <TitleBar
          onAddTask={onAddTask}
          onUpdateTask={onUpdateTask}
          task={taskToUpdate}
          onCancelUpdate={onCancelUpdate}
        />
        <StatusCol
          tasks={tasks}
          onStatusUpdateTask={onStatusUpdateTask}
          onDeleteTask={onDeleteTask}
          onEditTask={onEditTask}
        />
      </div>
    </div>
  );
};

Board.propTypes = {};

export default Board;
