"use client";
import React, { useState } from "react";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  // Add Task
  const submitHandler = (e) => {
    e.preventDefault();
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false, isEditing: false }]);
      setTask("");
      setSearchResult(null);
    }
  };

  // Search Task
  const searchHandler = () => {
    const index = tasks.findIndex((t) => t.text.toLowerCase() === task.toLowerCase());
    if (index !== -1) {
      setSearchResult(index);
    } else {
      setSearchResult(null);
      alert("Task not found!");
    }
  };

  // Delete Task
  const deleteHandler = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    setSearchResult(null);
  };

  // Toggle Task Completion
  const toggleCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Toggle Edit Mode
  const toggleEdit = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].isEditing = !updatedTasks[index].isEditing;
    setTasks(updatedTasks);
  };

  // Save Edited Task
  const saveTask = (index, newText) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], text: newText, isEditing: false };
    setTasks(updatedTasks);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-blue-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
        My To-Do List
      </h1>

      {/* Task Input Form */}
      <form onSubmit={submitHandler} className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 p-2 border border-blue-500 rounded"
          placeholder="Enter/ Search task here..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
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

      {/* Task List */}
      <div className="bg-white p-4 rounded shadow">
        {tasks.length === 0 ? (
          <h2 className="text-gray-500 text-center">No Task Available</h2>
        ) : (
          <ul>
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`flex items-center justify-between mb-2 p-2 border-b ${
                  searchResult === index ? "bg-green-200" : ""
                }`}
              >
                {/* Strike-through if completed */}
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompletion(index)}
                    className="w-4 h-4 accent-blue-600"
                  />
                  {task.isEditing ? (
                    <input
                      type="text"
                      value={task.text}
                      onChange={(e) => {
                        const updatedTasks = [...tasks];
                        updatedTasks[index].text = e.target.value; // Live update text
                        setTasks(updatedTasks);
                      }}
                      autoFocus
                      className="p-1 border border-blue-400 rounded"
                    />
                  ) : (
                    <span
                      className={`text-lg ${
                        task.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {task.text}
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  {task.isEditing ? (
                    <button
                      onClick={() => saveTask(index, task.text)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleEdit(index)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => deleteHandler(index)}
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
