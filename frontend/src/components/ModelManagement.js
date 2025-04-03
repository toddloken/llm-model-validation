import React, { useState, useEffect } from 'react';
import { fetchModels, addModel, deleteModel } from '../services/api';

const ModelManagement = () => {
    const [models, setModels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        model: '',
        provider: '',
        invoker: '',
        providerClass: '',
        description: ''
    });
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const getModels = async () => {
            try {
                const data = await fetchModels();
                setModels(data);
            } catch (err) {
                setError('Failed to fetch models. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getModels();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        const requiredFields = ['id', 'name', 'model', 'provider', 'description'];
        const missingFields = requiredFields.filter(field => !formData[field]);

        if (missingFields.length > 0) {
            setError(`Missing required fields: ${missingFields.join(', ')}`);
            return;
        }

        try {
            setIsAdding(true);
            const updatedModels = await addModel(formData);
            setModels(updatedModels);

            // Reset form
            setFormData({
                id: '',
                name: '',
                model: '',
                provider: '',
                invoker: '',
                providerClass: '',
                description: ''
            });
        } catch (err) {
            setError('Failed to add model. Please try again.');
            console.error(err);
        } finally {
            setIsAdding(false);
        }
    };

    const handleDelete = async (modelId) => {
        if (!window.confirm('Are you sure you want to delete this model?')) {
            return;
        }

        try {
            const updatedModels = await deleteModel(modelId);
            setModels(updatedModels);
        } catch (err) {
            setError('Failed to delete model. Please try again.');
            console.error(err);
        }
    };

    if (loading) {
        return <div className="loading">Loading models...</div>;
    }

    return (
        <div className="model-management">
            <h2>Model Management</h2>

            {error && <div className="error-message">{error}</div>}

            <div className="add-model-form">
                <h3>Add New Model</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="id">ID:</label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                value={formData.id}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="model">Model ID:</label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                value={formData.model}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="provider">Provider:</label>
                            <input
                                type="text"
                                id="provider"
                                name="provider"
                                value={formData.provider}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="invoker">Invoker:</label>
                        <input
                            type="text"
                            id="invoker"
                            name="invoker"
                            value={formData.invoker}
                            onChange={handleInputChange}
                            placeholder="fmv.LLMMessageInvoker(provider=\"provider_name\")"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="providerClass">Provider Class:</label>
                        <input
                            type="text"
                            id="providerClass"
                            name="providerClass"
                            value={formData.providerClass}
                            onChange={handleInputChange}
                            placeholder="Chat[ProviderName]"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="2"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="add-button"
                        disabled={isAdding}
                    >
                        {isAdding ? 'Adding...' : 'Add Model'}
                    </button>
                </form>
            </div>

            <div className="models-list">
                <h3>Existing Models</h3>

                {models.length === 0 ? (
                    <p className="no-items">No models available.</p>
                ) : (
                    <div className="model-cards">
                        {models.map(model => (
                            <div key={model.id} className="model-card">
                                <div className="model-header">
                                    <h4>{model.name}</h4>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(model.id)}
                                        aria-label={`Delete model ${model.name}`}
                                    >
                                        Delete
                                    </button>
                                </div>

                                <div className="model-content">
                                    <div className="model-field">
                                        <strong>ID:</strong> {model.id}
                                    </div>

                                    <div className="model-field">
                                        <strong>Model:</strong> {model.model}
                                    </div>

                                    <div className="model-field">
                                        <strong>Provider:</strong> {model.provider}
                                    </div>

                                    {model.providerClass && (
                                        <div className="model-field">
                                            <strong>Provider Class:</strong> {model.providerClass}
                                        </div>
                                    )}

                                    <div className="model-field">
                                        <strong>Description:</strong> {model.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModelManagement;