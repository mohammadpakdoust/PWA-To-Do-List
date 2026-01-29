import { useState } from 'react';
import { db } from '../db/db';
import { PlusCircle, ClipboardList, AlertCircle, FileText } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TaskForm = () => {
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');
    const [deadline, setDeadline] = useState(null);
    const [error, setError] = useState('');

    // Get current date for min attribute
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!description.trim()) {
            setError('Task description cannot be empty.');
            return;
        }

        if (!deadline) {
            setError('Please select a deadline.');
            return;
        }

        const selectedDate = new Date(deadline);
        // Set time to 00:00:00 for accurate date comparison
        selectedDate.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            setError('Deadline cannot be in the past.');
            return;
        }

        try {
            await db.tasks.add({
                description: description.trim(),
                notes: notes.trim(),
                deadline: selectedDate.toISOString(),
                completed: false
            });
            setDescription('');
            setNotes('');
            setDeadline(null);
            setError('');
        } catch (error) {
            console.error('Failed to add task:', error);
            setError('Failed to save task. Please try again.');
        }
    };

    return (
        <div className="card task-form-card">
            <h2 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <PlusCircle size={24} color="var(--color-primary)" />
                Add New Task
            </h2>

            {error && (
                <div style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    color: 'var(--color-danger)',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.9rem',
                    marginBottom: '1rem'
                }}>
                    <AlertCircle size={18} />
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="input-wrapper">
                    <ClipboardList size={20} color="var(--color-text-secondary)" className="input-icon" />
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        value={description}
                        onChange={(e) => { setError(''); setDescription(e.target.value); }}
                        className="input-with-icon"
                    />
                </div>

                <div className="input-wrapper">
                    <FileText size={20} color="var(--color-text-secondary)" className="input-icon" style={{ top: '0.75rem' }} />
                    <textarea
                        placeholder="Add optional notes..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="input-with-icon"
                        style={{ minHeight: '80px', resize: 'vertical', fontFamily: 'inherit' }}
                    />
                </div>

                <div className="input-wrapper">
                    <DatePicker
                        selected={deadline}
                        onChange={(date) => { setError(''); setDeadline(date); }}
                        minDate={today}
                        placeholderText="Select deadline"
                        className="input-with-icon date-picker-input"
                        wrapperClassName="date-picker-wrapper"
                        showIcon
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="0 0 48 48"
                                style={{ color: "var(--color-text-secondary)", top: "50%", transform: "translateY(-50%)", left: "0.5rem" }}
                            >
                                <mask id="ipSApplication0">
                                    <g fill="none" stroke="#fff" strokeLinejoin="round" strokeWidth="4">
                                        <path strokeLinecap="round" d="M40.04 22v20h-32V22"></path>
                                        <path
                                            fill="#fff"
                                            d="M5.842 13.777C4.312 17.737 7.263 22 11.51 22c3.314 0 6.019-2.686 6.019-6a6 6 0 0 0 6 6h1.018a6 6 0 0 0 6-6c0 3.314 2.706 6 6.02 6c4.248 0 7.201-4.265 5.67-8.228L39.234 6H8.845l-3.003 7.777Z"
                                        ></path>
                                    </g>
                                </mask>
                                <path
                                    fill="currentColor"
                                    d="M0 0h48v48H0z"
                                    mask="url(#ipSApplication0)"
                                ></path>
                            </svg>
                        }
                    />
                </div>
                <button type="submit" style={{ justifyContent: 'center' }}>
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
