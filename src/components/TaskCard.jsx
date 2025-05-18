import React from "react";
import { Draggable } from "react-beautiful-dnd";

function TaskCard({ task, index, updateTask, deleteTask }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="bg-gray-200 p-2 rounded shadow flex justify-between items-start"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div>
            <h4 className="font-semibold">{task.title}</h4>
            {task.description && <p className="text-sm">{task.description}</p>}
          </div>
          <div className="space-x-1">
            <button
              className="text-blue-600"
              onClick={() => {
                const newTitle = prompt("Edit task title", task.title);
                if (newTitle) {
                  updateTask({ ...task, title: newTitle });
                }
              }}
            >
              ✏️
            </button>
            <button
              className="text-red-500"
              onClick={() => deleteTask(task.id)}
            >
              🗑️
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
