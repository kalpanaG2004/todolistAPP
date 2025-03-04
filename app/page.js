"use client";
import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false, isEditing: false }]);
      setTask("");
      setSearchResults([]);
    }
  };

  const searchHandler = () => {
    setSearchTriggered(true);

    if (task.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filteredResults = tasks.filter((t) =>
      t.text.toLowerCase().includes(task.toLowerCase())
    );

    setSearchResults(filteredResults);
  };

  const handleInputChange = (e) => {
    setTask(e.target.value);
    setSearchTriggered(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setTask("");
      setSearchResults([]);
      setSearchTriggered(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const deleteHandler = (taskText) => {
    const updatedTasks = tasks.filter((t) => t.text !== taskText);
    setTasks(updatedTasks);
    if (searchTriggered) {
      setSearchResults(updatedTasks.filter((t) => t.text.toLowerCase().includes(task.toLowerCase())));
    }
  };

  const toggleCompletion = (taskText) => {
    const updatedTasks = tasks.map((t) =>
      t.text === taskText ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    if (searchTriggered) {
      setSearchResults(updatedTasks.filter((t) => t.text.toLowerCase().includes(task.toLowerCase())));
    }
  };

  const toggleEdit = (taskText) => {
    const updatedTasks = tasks.map((t) =>
      t.text === taskText ? { ...t, isEditing: !t.isEditing } : t
    );
    setTasks(updatedTasks);
    if (searchTriggered) {
      setSearchResults(updatedTasks.filter((t) => t.text.toLowerCase().includes(task.toLowerCase())));
    }
  };

  const saveTask = (oldText, newText) => {
    const updatedTasks = tasks.map((t) =>
      t.text === oldText ? { ...t, text: newText, isEditing: false } : t
    );
    setTasks(updatedTasks);
    if (searchTriggered) {
      setSearchResults(updatedTasks.filter((t) => t.text.toLowerCase().includes(task.toLowerCase())));
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-blue-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
        My To-Do List
      </h1>

      <form onSubmit={submitHandler} className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 p-2 border border-blue-500 rounded"
          placeholder="Search or add task..."
          value={task}
          onChange={(e) => {
            setTask(e.target.value);
            setSearchTriggered(false);
          }}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Task
        </button>
        <button
          type="button"
          onClick={searchHandler}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Search Task
        </button>
      </form>

      <div className="bg-white p-4 rounded shadow">
        {(searchResults.length > 0 ? searchResults : tasks).length === 0 ? (
          <h2 className="text-gray-500 text-center">No Task Available</h2>
        ) : (
          <ul>
            {searchResults.length === 0 && searchTriggered ? (
              <li className="text-red-500 font-semibold">No tasks found.</li>
            ) : (searchResults.length > 0 ? searchResults : tasks).map((task) => (
              <li
                key={task.text}
                className={`flex items-center justify-between mb-2 p-2 border-b ${searchResults.includes(task) ? "bg-green-200" : ""
                  }`}
              >
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompletion(task.text)}
                    className="w-4 h-4 accent-blue-600"
                  />
                  {task.isEditing ? (
                    <input
                      type="text"
                      value={task.text}
                      onChange={(e) => {
                        const updatedTasks = tasks.map((t) =>
                          t.text === task.text ? { ...t, text: e.target.value } : t
                        );
                        setTasks(updatedTasks);

                        if (searchTriggered) {
                          const updatedSearchResults = searchResults.map((t) =>
                            t.text === task.text ? { ...t, text: e.target.value } : t
                          );
                          setSearchResults(updatedSearchResults);
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          saveTask(task.text, task.text);
                        }
                      }}
                      autoFocus
                      className="p-1 border border-blue-400 rounded"
                    />
                  ) : (
                    <span
                      className={`text-lg ${task.completed ? "line-through text-gray-500" : ""
                        }`}
                    >
                      {task.text}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {task.isEditing ? (
                    <button
                      onClick={() => saveTask(task.text, task.text)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleEdit(task.text)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteHandler(task.text)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoList;
