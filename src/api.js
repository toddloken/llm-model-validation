const API_BASE_URL = 'http://localhost:5000';

// Helper function for handling fetch responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `Error: ${response.status} ${response.statusText}`;
        throw new Error(errorMessage);
    }
    return response.json();
};

// Models API
export const fetchModels = async () => {
    const response = await fetch(`${API_BASE_URL}/models`);
    return handleResponse(response);
};

export const addModel = async (modelData) => {
    const response = await fetch(`${API_BASE_URL}/models`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(modelData),
    });
    return handleResponse(response);
};

export const deleteModel = async (modelId) => {
    const response = await fetch(`${API_BASE_URL}/models/${modelId}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};

// Questions API
export const fetchQuestions = async () => {
    const response = await fetch(`${API_BASE_URL}/questions`);
    return handleResponse(response);
};

export const addQuestion = async (questionData) => {
    const response = await fetch(`${API_BASE_URL}/questions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(questionData),
    });
    return handleResponse(response);
};

export const deleteQuestion = async (questionId) => {
    const response = await fetch(`${API_BASE_URL}/questions/${questionId}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};

// Launch main.py script
export const launchPythonScript = async (selectedModels) => {
    const response = await fetch(`${API_BASE_URL}/launch`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ models: selectedModels }),
    });
    return handleResponse(response);
};