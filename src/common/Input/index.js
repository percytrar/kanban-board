import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import "./index.css";

const Inputs = ({ onAddTask }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    if (error) setError("");
    setInput(e.target.value);
  };

  const onClickCreate = () => {
    if (input) {
      onAddTask({ heading: input });
      setInput("");
    } else {
      setError("Add some content to create a story!");
    }
  };

  return (
    <Fragment>
      <div className="input-container">
        <input
          id="task-input"
          type="text"
          placeholder="Enter new task"
          onChange={onChange}
          value={input}
        />
        <button disabled={!!error} onClick={onClickCreate}>
          Create
        </button>
      </div>
      {error && (
        <div className="error">
          <p>⚠️ {error}</p>
        </div>
      )}
    </Fragment>
  );
};

Inputs.propTypes = {};

export default Inputs;
