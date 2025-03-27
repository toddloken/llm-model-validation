import React, { useState, useEffect } from 'react';
import ModelSelector from './ModelSelector';
import ResultsDisplay from './ResultsDisplay';
import { fetchModels, launchPythonScript } from '../services/api';

const Home = () => {
    const [models, setModels] = useState([]);
    const [selectedModels, setSelectedModels] = useState([]);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getModels = async () => {
            try {
                const modelData = await fetchModels();
                setModels(modelData);
            } catch (err) {
                setError('Failed to fetch models. Please try again later.');
                console.error(err);
            }
        };

        getModels();
    }, []);

    const handleModelSelection = (modelId) => {
        if (selectedModels.includes(modelId)) {
            setSelectedModels(selectedModels.filter(id => id !== modelId));
        } else {
            setSelectedModels([...selectedModels, modelId]);
        }
    };

    const handleLaunch = async () => {
        if (selectedModels.length === 0) {
            setError('Please select at least one model to test.');
            return;
        }

        setLoading(true);
        setError(null);
        setResults(null);

        try {
            const response = await launchPythonScript(selectedModels);
            setResults(response);
        } catch (err) {
            setError('Failed to execute the script. Please try again later.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-container">
            <h2>Model Testing Platform</h2>

            <section className="model-selection-section">
                <h3>Select Models to Test</h3>
                <ModelSelector
                    models={models}
                    selectedModels={selectedModels}
                    onModelSelect={handleModelSelection}
                />
            </section>

            <div className="launch-container">
                <button
                    className="launch-button"
                    onClick={handleLaunch}
                    disabled={loading || selectedModels.length === 0}
                >
                    {loading ? 'Running Tests...' : 'Launch Tests'}
                </button>

                {error && <div className="error-message">{error}</div>}
            </div>

            {results && (
                <section className="results-section">
                    <h3>Test Results</h3>
                    <ResultsDisplay results={results} />
                </section>
            )}
        </div>
    );
};

export default Home;