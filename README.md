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
