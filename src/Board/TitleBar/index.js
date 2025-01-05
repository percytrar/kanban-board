import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Story from "../Story";
import "./create-modal.css";
import "./index.css";

const TitleBar = ({ onAddTask, onUpdateTask, task, onCancelUpdate }) => {
  const [showCreateNewTask, setShowCreateNewTask] = useState(!!task);

  useEffect(() => {
    setShowCreateNewTask(!!task);
  }, [task]);

  const onClickCreateNew = (e) => {
    e.preventDefault();
    setShowCreateNewTask(true);
  };

  const onClickSave = (newTask) => {
    if (task) {
      onUpdateTask(newTask);
    } else {
      onAddTask(newTask);
    }
    setShowCreateNewTask(false);
  };

  return (
    <nav className="title-bar">
      {/* Filters Section */}
      <div className="filters">
        <button className="filter-btn">All</button>
        <button className="filter-btn">In Progress</button>
        <button className="filter-btn">Completed</button>
      </div>

      {/* Create New Button */}
      <button id="createNew" onClick={onClickCreateNew} className="create-btn">
        Create New
      </button>

      {/* Modal for Creating a New Task */}
      {showCreateNewTask && (
        <div className="create-modal">
          <Story
            onAddTask={onClickSave}
            onUpdateTask={onUpdateTask}
            story={task}
            onCancel={() => {
              setShowCreateNewTask(false);
              onCancelUpdate();
            }}
          />
        </div>
      )}
    </nav>
  );
};

TitleBar.propTypes = {
  onAddTask: PropTypes.func.isRequired,
};

export default TitleBar;
