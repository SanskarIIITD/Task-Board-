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

Start backend:
cd backend
uvicorn main:app --reload

Start frontend:
cd frontend
npm run dev

Used ChatGPT for this task.
https://chatgpt.com/share/6829c641-4e00-8008-8ddb-74fb47ae79a0
