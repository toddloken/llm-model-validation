from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import subprocess
import sys
import uuid

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# File paths
QUESTIONS_FILE = 'questions.json'
MODELS_FILE = 'models.json'

# Helper functions to read and write JSON files
def read_json_file(file_path):
    if not os.path.exists(file_path):
        return {} if file_path == QUESTIONS_FILE else []

    with open(file_path, 'r') as file:
        try:
            return json.load(file)
        except json.JSONDecodeError:
            return {} if file_path == QUESTIONS_FILE else []

def write_json_file(file_path, data):
    with open(file_path, 'w') as file:
        json.dump(data, file, indent=4)

# Routes for questions management
@app.route('/questions', methods=['GET'])
def get_questions():
    return jsonify(read_json_file(QUESTIONS_FILE))

@app.route('/questions', methods=['POST'])
def add_question():
    questions = read_json_file(QUESTIONS_FILE)
    new_question = request.json

    # Generate a new ID for the question
    new_id = str(len(questions) + 1)
    while new_id in questions:
        new_id = str(int(new_id) + 1)

    questions[new_id] = new_question
    write_json_file(QUESTIONS_FILE, questions)

    return jsonify(questions)

@app.route('/questions/<question_id>', methods=['DELETE'])
def delete_question(question_id):
    questions = read_json_file(QUESTIONS_FILE)

    if question_id in questions:
        del questions[question_id]
        write_json_file(QUESTIONS_FILE, questions)

    return jsonify(questions)

# Routes for models management
@app.route('/models', methods=['GET'])
def get_models():
    return jsonify(read_json_file(MODELS_FILE))

@app.route('/models', methods=['POST'])
def add_model():
    models = read_json_file(MODELS_FILE)
    new_model = request.json

    # Check if model with this ID already exists
    for i, model in enumerate(models):
        if model.get('id') == new_model.get('id'):
            models[i] = new_model
            write_json_file(MODELS_FILE, models)
            return jsonify(models)

    # Add new model if not exists
    models.append(new_model)
    write_json_file(MODELS_FILE, models)

    return jsonify(models)

@app.route('/models/<model_id>', methods=['DELETE'])
def delete_model(model_id):
    models = read_json_file(MODELS_FILE)

    for i, model in enumerate(models):
        if model.get('id') == model_id:
            del models[i]
            break

    write_json_file(MODELS_FILE, models)
    return jsonify(models)

# Route to launch main.py
@app.route('/launch', methods=['POST'])
def launch_script():
    try:
        selected_models = request.json.get('models', [])

        if not selected_models:
            return jsonify({'error': 'No models selected'}), 400

        # Run main.py with selected models
        cmd = [sys.executable, 'main.py'] + selected_models
        process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate()

        if process.returncode != 0:
            return jsonify({
                'error': 'Script execution failed',
                'details': stderr.decode('utf-8')
            }), 500

        # Try to parse the output as JSON
        try:
            results = json.loads(stdout.decode('utf-8'))
            return jsonify(results)
        except json.JSONDecodeError:
            # If not JSON, return the raw output
            return jsonify({
                'totalQuestions': 0,
                'uniqueQuestions': 0,
                'modelResults': {},
                'rawOutput': stdout.decode('utf-8')
            })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)