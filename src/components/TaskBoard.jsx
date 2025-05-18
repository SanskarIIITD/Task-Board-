import React, { useEffect, useState } from "react";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { v4 as uuidv4 } from "uuid";

const columns = ["To Do", "In Progress", "Done"];

function TaskBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/tasks").then((res) => setTasks(res.data));
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const updatedTasks = tasks.map((task) =>
      task.id === draggableId
        ? { ...task, status: destination.droppableId }
        : task
    );

    const movedTask = updatedTasks.find((t) => t.id === draggableId);
    axios.put(`http://localhost:8000/tasks/${draggableId}`, movedTask);
    setTasks(updatedTasks);
  };

  const createTask = (title) => {
    const newTask = {
      id: uuidv4(),
      title,
      description: "",
      status: "To Do",
    };
    axios.post("http://localhost:8000/tasks", newTask).then((res) => {
      setTasks((prev) => [...prev, res.data]);
    });
  };

  const updateTask = (updatedTask) => {
    axios.put(`http://localhost:8000/tasks/${updatedTask.id}`, updatedTask);
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:8000/tasks/${id}`);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => {
          const title = prompt("Enter task title:");
          if (title) createTask(title);
        }}
      >
        Add Task
      </button>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {columns.map((col) => (
            <Column
              key={col}
              title={col}
              tasks={tasks.filter((t) => t.status === col)}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default TaskBoard;
