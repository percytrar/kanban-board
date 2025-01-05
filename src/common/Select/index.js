import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const Select = ({ id, label, value, options, onChange }) => {
  return (
    <div className="form">
      <label htmlFor={`select-${id}`}>{label}</label>
      <select
        id={`select-${id}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((op) => (
          <option key={op} value={op} id={op}>
            {op}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.arrayOf(),
  onChange: PropTypes.func,
};

export default Select;
