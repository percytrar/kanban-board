import React, { useReducer } from "react";
import PropTypes from "prop-types";
import reducer, {
  setAssignee,
  setDescription,
  setHeading,
  setStoryPoints,
  setStoryStatus,
} from "./storyReducer";
import { DEFAULT_STORY_POINTS, initialState } from "./constants";
import { DEFAULT_ASSIGNEES, DEFAULT_STORY_STATUSES } from "../constants";
import "./index.css";
import Select from "../../common/Select";

const Story = ({ story, onAddTask, onUpdateTask, onCancel }) => {
  const [state, dispatch] = useReducer(reducer, story || initialState);

  const isUpdateMode = !!story;

  const onClickSave = () => {
    if (isUpdateMode) {
      onUpdateTask(state);
    } else {
      onAddTask(state);
    }
  };

  return (
    <div className="story">
      <form>
        <section className="story-section">
          <label htmlFor="input-heading">Title</label>
          <input
            id="input-heading"
            type="text"
            value={state.heading}
            placeholder="Enter title..."
            onChange={(e) => dispatch(setHeading(e.target.value))}
          />
        </section>
        <section className="story-section">
          <label htmlFor="input-description">Description</label>
          <textarea
            id="input-description"
            type="text"
            value={state.description}
            placeholder="Enter description..."
            rows={4}
            onChange={(e) => dispatch(setDescription(e.target.value))}
          />
        </section>
        <section className="story-section">
          <Select
            id="assignee"
            label="Assignee"
            value={state.assignee}
            onChange={(selectedOption) => dispatch(setAssignee(selectedOption))}
            options={DEFAULT_ASSIGNEES}
          />
        </section>
        <section className="story-section">
          <Select
            id="storyPoints"
            label="Story points"
            value={state.storyPoints}
            onChange={(selectedOption) =>
              dispatch(setStoryPoints(selectedOption))
            }
            options={DEFAULT_STORY_POINTS}
          />
        </section>
        <section className="story-section">
          <Select
            id="status"
            label="Status"
            value={state.status}
            onChange={(selectedOption) =>
              dispatch(setStoryStatus(selectedOption))
            }
            options={DEFAULT_STORY_STATUSES.map(({ id }) => id)}
          />
        </section>
      </form>
      <footer className="footer">
        <button onClick={onClickSave}>
          {isUpdateMode ? "Save" : "Create"}
        </button>
        <button onClick={onCancel}>Cancel</button>
      </footer>
    </div>
  );
};

Story.propTypes = {
  story: PropTypes.shape({}),
  onClickAdd: PropTypes.func,
  onClickUpdate: PropTypes.func,
  onClickCancel: PropTypes.func,
};

export default Story;
