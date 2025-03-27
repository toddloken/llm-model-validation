import React from 'react';

const ResultsDisplay = ({ results }) => {
    if (!results) {
        return null;
    }

    return (
        <div className="results-display">
            <div className="results-summary">
                <div className="results-stat">
                    <h4>Total Questions</h4>
                    <div className="stat-value">{results.totalQuestions}</div>
                </div>
                <div className="results-stat">
                    <h4>Unique Questions</h4>
                    <div className="stat-value">{results.uniqueQuestions}</div>
                </div>
            </div>

            <div className="model-results">
                <h4>Model Performance</h4>
                <table className="results-table">
                    <thead>
                    <tr>
                        <th>Model</th>
                        <th>Correct Answers</th>
                        <th>Accuracy</th>
                    </tr>
                    </thead>
                    <tbody>
                    {results.modelResults && Object.entries(results.modelResults).map(([modelId, modelData]) => (
                        <tr key={modelId}>
                            <td>{modelData.name || modelId}</td>
                            <td>{modelData.correctAnswers}</td>
                            <td>{((modelData.correctAnswers / results.totalQuestions) * 100).toFixed(2)}%</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResultsDisplay;