import React, { useState, useEffect } from 'react';
import { fetchQuestions, addQuestion, deleteQuestion } from '../services/api';

const QuestionsManagement = () => {
    const [questions, setQuestions] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        system_message: '',
        human_message: '',
        answer_message: ''
    });
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const data = await fetchQuestions();
                setQuestions(data);
            } catch (err) {
                setError('Failed to fetch questions. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        getQuestions();
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
        if (!formData.system_message || !formData.human_message || !formData.answer_message) {
            setError('All fields are required.');
            return;
        }

        try {
            setIsAdding(true);
            const updatedQuestions = await addQuestion(formData);
            setQuestions(updatedQuestions);

            // Reset form
            setFormData({
                system_message: '',
                human_message: '',
                answer_message: ''
            });
        } catch (err) {
            setError('Failed to add question. Please try again.');
            console.error(err);
        } finally {
            setIsAdding(false);
        }
    };

    const handleDelete = async (questionId) => {
        if (!window.confirm('Are you sure you want to delete this question?')) {
            return;
        }

        try {
            const updatedQuestions = await deleteQuestion(questionId);
            setQuestions(updatedQuestions);
        } catch (err) {
            setError('Failed to delete question. Please try again.');
            console.error(err);
        }
    };

    if (loading) {
        return <div className="loading">Loading questions...</div>;
    }

    return (
        <div className="questions-management">
            <h2>Questions Management</h2>

            {error && <div className="error-message">{error}</div>}

            <div className="add-question-form">
                <h3>Add New Question</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="system_message">System Message:</label>
                        <textarea
                            id="system_message"
                            name="system_message"
                            value={formData.system_message}
                            onChange={handleInputChange}
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="human_message">Human Message:</label>
                        <textarea
                            id="human_message"
                            name="human_message"
                            value={formData.human_message}
                            onChange={handleInputChange}
                            rows="3"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="answer_message">Answer Message (Evaluation Criteria):</label>
                        <textarea
                            id="answer_message"
                            name="answer_message"
                            value={formData.answer_message}
                            onChange={handleInputChange}
                            rows="3"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="add-button"
                        disabled={isAdding}
                    >
                        {isAdding ? 'Adding...' : 'Add Question'}
                    </button>
                </form>
            </div>

            <div className="questions-list">
                <h3>Existing Questions</h3>

                {Object.keys(questions).length === 0 ? (
                    <p className="no-items">No questions available.</p>
                ) : (
                    <div className="question-cards">
                        {Object.entries(questions).map(([id, question]) => (
                            <div key={id} className="question-card">
                                <div className="question-header">
                                    <h4>Question #{id}</h4>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(id)}
                                        aria-label={`Delete question ${id}`}
                                    >
                                        Delete
                                    </button>
                                </div>

                                <div className="question-content">
                                    <div className="question-field">
                                        <strong>System Message:</strong>
                                        <p>{question.system_message}</p>
                                    </div>

                                    <div className="question-field">
                                        <strong>Human Message:</strong>
                                        <p>{question.human_message}</p>
                                    </div>

                                    <div className="question-field">
                                        <strong>Evaluation Criteria:</strong>
                                        <p>{question.answer_message}</p>
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

export default QuestionsManagement;