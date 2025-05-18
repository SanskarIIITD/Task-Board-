from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
from uuid import uuid4

app = FastAPI()

origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Task(BaseModel):
    id: str
    title: str
    description: str = ""
    status: str

# In-memory "DB"
tasks: Dict[str, Task] = {}

@app.get("/tasks", response_model=List[Task])
def get_tasks():
    return list(tasks.values())

@app.post("/tasks", response_model=Task)
def create_task(task: Task):
    tasks[task.id] = task
    return task

@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: str, task: Task):
    tasks[task_id] = task
    return task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: str):
    tasks.pop(task_id, None)
    return {"message": "Deleted"}
