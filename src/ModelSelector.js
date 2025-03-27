import React from 'react';

const ModelSelector = ({ models, selectedModels, onModelSelect }) => {
    if (!models || models.length === 0) {
        return <div className="loading-message">Loading models...</div>;
    }

    return (
        <div className="model-selector">
            {models.map(model => (
                <div
                    key={model.id}
                    className={`model-card ${selectedModels.includes(model.id) ? 'selected' : ''}`}
                    onClick={() => onModelSelect(model.id)}
                >
                    <div className="model-card-header">
                        <h4>{model.name}</h4>
                        <span className="model-provider">{model.provider}</span>
                    </div>
                    <p className="model-id">{model.model}</p>
                    <p className="model-description">{model.description}</p>
                    <div className="model-selection-indicator">
                        {selectedModels.includes(model.id) ? 'Selected' : 'Click to select'}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ModelSelector;