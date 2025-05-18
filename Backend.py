from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict
import json
import uuid

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load initial data
with open('tasks.json') as f:
    board = json.load(f)

class Task(BaseModel):
    id: str
    title: str
    description: str = ''

class Column(BaseModel):
    id: str
    title: str
    tasks: List[Task]

@app.get("/board", response_model=Dict)
def get_board():
    return board

@app.post("/task", response_model=Task)
def create_task(column_id: str, task: Task):
    for col in board['columns']:
        if col['id'] == column_id:
            new_task = task.dict()
            new_task['id'] = str(uuid.uuid4())
            col['tasks'].append(new_task)
            return new_task
    raise HTTPException(status_code=404, detail="Column not found")

@app.put("/task/{task_id}", response_model=Task)
def update_task(task_id: str, task: Task):
    for col in board['columns']:
        for idx, t in enumerate(col['tasks']):
            if t['id'] == task_id:
                updated = task.dict()
                updated['id'] = task_id
                col['tasks'][idx] = updated
                return updated
    raise HTTPException(status_code=404, detail="Task not found")

@app.delete("/task/{task_id}")
def delete_task(task_id: str):
    for col in board['columns']:
        for idx, t in enumerate(col['tasks']):
            if t['id'] == task_id:
                col['tasks'].pop(idx)
                return {"status": "deleted"}
    raise HTTPException(status_code=404, detail="Task not found")

@app.post("/move")
def move_task(task_id: str, source: str, dest: str, dest_index: int):
    task_obj = None
    for col in board['columns']:
        if col['id'] == source:
            for idx, t in enumerate(col['tasks']):
                if t['id'] == task_id:
                    task_obj = col['tasks'].pop(idx)
                    break
    if not task_obj:
        raise HTTPException(status_code=404, detail="Task not found in source")
    for col in board['columns']:
        if col['id'] == dest:
            col['tasks'].insert(dest_index, task_obj)
            return {"status": "moved"}
    raise HTTPException(status_code=404, detail="Destination column not found")