import React from "react";
import PropTypes from "prop-types";
import "./index.css";
import { STORY_STATUS } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const Task = ({ onDragTask, task, onEditTask, onDeleteTask }) => {
  const onDragStart = () => {
    console.log("Started dragging task - ", task);
    onDragTask(task);
  };

  const getStatusTagColor = (status) => {
    switch (status) {
      case STORY_STATUS.READY:
        return "#F4C300"; // Yellow
      case STORY_STATUS.IN_PROGRESS:
        return "#0065FF"; // Blue
      case STORY_STATUS.RESOLVED:
        return "#00875A"; // Green
      default:
        return "#F4C300"; // Default to yellow
    }
  };

  return (
    <div className="task" draggable onDragStart={onDragStart}>
      <h3>{task.heading}</h3>
      <p>{task.description}</p>

      <div className="task-footer">
        <span
          className="status-tag"
          style={{ backgroundColor: getStatusTagColor(task.status) }}
        >
          {task.status}
        </span>
        <span className="story-points-tag">{task.storyPoints} Points</span>
        <span className="assignee-tag">Assigned to: {task.assignee}</span>
      </div>
      <div className="action-buttons">
        <button className="edit" onClick={() => onEditTask(task)}>
          <FontAwesomeIcon icon={faPen} />
          {` Edit`}
        </button>
        <button className="delete" onClick={() => onDeleteTask(task)}>
          <FontAwesomeIcon icon={faTrash} />
          <span> Delete</span>
        </button>
      </div>
    </div>
  );
};

Task.propTypes = {
  task: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    storyPoints: PropTypes.number.isRequired,
    assignee: PropTypes.string.isRequired,
  }).isRequired,
  onDragTask: PropTypes.func.isRequired,
};

export default Task;
