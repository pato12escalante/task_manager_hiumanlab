from flask import Flask, request, jsonify
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

tasks = []
TOKEN = "12321"

def check_token():
    token = request.headers.get("Authorization")
    return token == TOKEN


@app.route("/")
def home():
    return "Task Manager API funcionando"


#Get para obtener todas las tareas
@app.route("/tasks", methods=["GET"])
def get_tasks():

    if not check_token():
        return jsonify({"error": "Unauthorized"}), 401

    return jsonify(tasks)

#Post para agregar una nueva tarea
@app.route("/tasks", methods=["POST"])
def add_task():
    if not check_token():
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json() or {}
    title = data.get("title")
    description = data.get("description")

    if not title or not description:
        return jsonify({"error": "Faltan campos: title y description son obligatorios"}), 400

    task = {
        "id": len(tasks) + 1,
        "title": title,
        "description": description,
    }

    tasks.append(task)
    return jsonify(task)

#Delete para eliminar una tarea por id
@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    global tasks
    tasks = [task for task in tasks if task["id"] != task_id]

    if not check_token():
        return jsonify({"error": "Unauthorized"}), 401
    return jsonify({"message": "Task deleted"})


if __name__ == "__main__":
    app.run(debug=True)