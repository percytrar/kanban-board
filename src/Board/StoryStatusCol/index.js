import React, { useState } from "react";
import PropTypes from "prop-types";
import "./index.css";
import Task from "./Task";
import { DEFAULT_STORY_STATUSES } from "../constants";

const StoryCol = ({
  id: colId,
  name,
  onStatusUpdateTask,
  tasks,
  draggedTask,
  setDraggedTask,
  onEditTask,
  onDeleteTask,
}) => {
  const onDragOver = (e) => {
    e.preventDefault();
    console.log("Drag over event for columns");
  };

  const onDrop = (e) => {
    // Appending story to the column action
    e.preventDefault();
    if (draggedTask) {
      console.log("Drop event on story col with id - ", draggedTask);
      onStatusUpdateTask(draggedTask, colId);
      setDraggedTask(null);
    }
  };

  return (
    <div className="story-col" onDragOver={onDragOver} onDrop={onDrop}>
      <h3>{name}</h3>
      {tasks
        .filter((task) => task.status === colId)
        .map((task) => (
          <Task
            onDragTask={setDraggedTask}
            key={task.id}
            task={task}
            onEditTask={onEditTask}
            onDeleteTask={onDeleteTask}
          />
        ))}
    </div>
  );
};

const StatusCol = ({
  storyCols = DEFAULT_STORY_STATUSES,
  onStatusUpdateTask,
  tasks,
  onEditTask,
  onDeleteTask,
}) => {
  const [draggedTask, setDraggedTask] = useState({});

  return (
    <div className="story-col-container">
      {storyCols.map(({ id, name }) => (
        <StoryCol
          key={id}
          id={id}
          name={name}
          onStatusUpdateTask={onStatusUpdateTask}
          tasks={tasks}
          draggedTask={draggedTask}
          setDraggedTask={setDraggedTask}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

StatusCol.propTypes = {
  storyCols: PropTypes.arrayOf(PropTypes.shape({})),
};

export default StatusCol;
