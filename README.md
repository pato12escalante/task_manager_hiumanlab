# Task Manager

Aplicación web para gestionar tareas.

## Requisitos

- Node.js
- npm
- Python 3
- pip

## Instalación

### Backend

Entrar a la carpeta backend:

cd backend

Instalar dependencias:

pip install flask flask-cors

### Frontend

Entrar a la carpeta frontend:

cd frontend/task-frontend

Instalar dependencias:

npm install

## Ejecución

### Backend

cd backend
python app.py

El servidor se ejecuta en:
http://127.0.0.1:5000

### Frontend

cd frontend/task-frontend
npm run dev

La aplicación se ejecuta en:
http://localhost:5173

## Autenticación

La API requiere un token en los headers de cada solicitud:

Authorization: 123456

## Endpoints

GET /tasks
Obtiene la lista de tareas

POST /tasks
Crea una nueva tarea

DELETE /tasks/:id
Elimina una tarea por ID
