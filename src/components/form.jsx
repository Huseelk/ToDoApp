import React from "react";
import "./form.scss";

const Form = ({ inputValue, setInputValue, tasks, setTasks }) => {
  const handleButtonClick = () => {
    if (inputValue.length <= 54 && inputValue.length > 0) {
      setTasks([
        {
          value: inputValue,
          done: false,
          id: Math.floor(Math.random() * 100000),
        },
        ...tasks,
      ]);
      setInputValue("");
    }
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="inputForm">
      <span className="text_container">Task</span>
      <div className="input_container">
        <input
          value={inputValue}
          onChange={handleInputChange}
          className={`taskInput ${inputValue.length > 54 ? `error` : ""}`}
          type="search"
          placeholder="Write here"
          maxLength={55}
          style={{
            WebkitSearchCancelButton: () => setInputValue("")
          }}
        />
        <button onClick={handleButtonClick} className="addButton">
          Add
        </button>
      </div>
      {inputValue.length > 54 ? (
        <span className="errorMassage">
          Task content can contain max 54 characters.
        </span>
      ) : null}
    </div>
  );
};

export default Form;
