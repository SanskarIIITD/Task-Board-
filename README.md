Project Structure
task-board-app/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── tasks.json        # initial mock data
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── components/
│       │   ├── TaskBoard.jsx
│       │   ├── Column.jsx
│       │   └── TaskCard.jsx
│       └── api.js
└── README.md

backend/requirements.txt
fastapi
uvicorn
pydantic


