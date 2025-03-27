# llm-model-validation

A web application for testing and evaluating multiple LLM models on a set of questions. This platform allows users to manage questions, select models, and run tests to compare model performance.

## Project Structure

The project consists of two main parts:

1. **React Frontend**: User interface for managing questions and models, and displaying test results
2. **Python Backend**: API for serving and processing data, and executing the main testing script

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)

### Frontend Setup

1. Navigate to the project directory
   ```bash
   cd llm-testing-platform
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm start
   ```
   The application will open in your browser at http://localhost:3000

### Backend Setup

1. Navigate to the backend directory
   ```bash
   cd backend
   ```

2. Create a Python virtual environment (optional but recommended)
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment
    - On Windows:
      ```bash
      venv\Scripts\activate
      ```
    - On macOS/Linux:
      ```bash
      source venv/bin/activate
      ```

4. Install Python dependencies
   ```bash
   pip install flask flask-cors
   ```

5. Start the Flask server
   ```bash
   python app.py
   ```
   The backend API will run at http://localhost:5000

## Usage

### Home Page

- Select one or more LLM models for testing
- Click "Launch Tests" to run the selected models against the questions
- View test results including total questions, unique questions, and correct answers per model

### Questions Management

- View all existing questions
- Add new questions with system message, human message, and answer message (evaluation criteria)
- Delete existing questions

### Models Management

- View all existing LLM models
- Add new models with their configuration details
- Delete existing models

## File Structure

- `src/`: Frontend React code
    - `components/`: React components
    - `services/`: API services
- `backend/`: Python backend code
    - `app.py`: Flask API server
    - `main.py`: Script for running LLM tests
    - `questions.json`: Test questions storage
    - `models.json`: LLM models configuration storage

## Development

### Adding Custom LLM Providers

To add a new LLM provider, you'll need to:

1. Add the model to `models.json` with appropriate configuration
2. If needed, update `main.py` to handle the new provider's API

### Customizing the Testing Logic

The main testing logic is in `main.py`. You can modify this file to:

- Change how questions are processed
- Implement actual LLM API calls (replacing the simulation)
- Customize the evaluation criteria

## License

This project is licensed under the MIT License.