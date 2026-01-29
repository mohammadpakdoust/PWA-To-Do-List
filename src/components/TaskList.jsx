import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';
import { Trash2, Clock, AlertCircle, CheckCircle, ClipboardList } from 'lucide-react';

const TaskList = () => {
    const tasks = useLiveQuery(() => db.tasks.toArray());

    if (!tasks) return null;

    const handleDelete = async (id) => {
        await db.tasks.delete(id);
    };

    const handleToggleCompletion = async (task) => {
        await db.tasks.update(task.id, { completed: !task.completed });
    };

    const getDeadlineInfo = (deadlineStr, completed) => {
        if (completed) return { className: 'deadline-ok', icon: <CheckCircle size={20} color="var(--color-success)" /> };

        const deadline = new Date(deadlineStr);
        const now = new Date();
        // Reset hours to compare dates only roughly for days calc
        now.setHours(0, 0, 0, 0);
        const deadlineDay = new Date(deadline);
        deadlineDay.setHours(0, 0, 0, 0);

        const diffTime = deadlineDay - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return { className: 'deadline-red', icon: <AlertCircle size={20} color="var(--color-danger)" /> };
        if (diffDays === 0) return { className: 'deadline-orange', icon: <Clock size={20} color="var(--color-urgent)" /> }; // Due today
        if (diffDays <= 3) return { className: 'deadline-orange', icon: <Clock size={20} color="var(--color-urgent)" /> };
        if (diffDays <= 7) return { className: 'deadline-yellow', icon: <Clock size={20} color="var(--color-warning)" /> };
        return { className: 'deadline-ok', icon: <Clock size={20} color="var(--color-success)" /> };
    };

    const formatDate = (isoParams) => {
        if (!isoParams) return '';
        return new Date(isoParams).toLocaleDateString(undefined, {
            weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
        });
    }

    return (
        <div className="task-list">
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ClipboardList size={24} color="var(--color-primary)" />
                My Tasks
            </h2>
            {tasks.length === 0 && (
                <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>
                    <p>No tasks yet. Time to get productive!</p>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {tasks.map(task => {
                    const { className, icon } = getDeadlineInfo(task.deadline, task.completed);
                    return (
                        <div
                            key={task.id}
                            className={`card ${className}`}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                textAlign: "left",
                                marginBottom: 0,
                                opacity: task.completed ? 0.6 : 1,
                                transition: 'opacity 0.2s'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <input
                                    type="checkbox"
                                    checked={!!task.completed}
                                    onChange={() => handleToggleCompletion(task)}
                                    style={{
                                        width: '1.2rem',
                                        height: '1.2rem',
                                        cursor: 'pointer',
                                        accentColor: 'var(--color-success)'
                                    }}
                                />
                                <div style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
                                    {icon}
                                </div>
                                <div>
                                    <div style={{
                                        fontWeight: '600',
                                        fontSize: '1.1rem',
                                        textDecoration: task.completed ? 'line-through' : 'none',
                                        color: task.completed ? 'var(--color-text-secondary)' : 'var(--color-text-primary)'
                                    }}>
                                        {task.description}
                                    </div>
                                    {task.notes && (
                                        <div style={{
                                            fontSize: '0.9rem',
                                            color: 'var(--color-text-secondary)',
                                            marginTop: '0.25rem',
                                            marginBottom: '0.25rem',
                                            whiteSpace: 'pre-wrap'
                                        }}>
                                            {task.notes}
                                        </div>
                                    )}
                                    <div style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        Due: {formatDate(task.deadline)}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(task.id)}
                                style={{
                                    padding: '0.5rem',
                                    background: 'transparent',
                                    color: 'var(--color-text-secondary)',
                                    border: '1px solid var(--color-surface-hover)'
                                }}
                                aria-label="Delete task"
                                title="Delete Task"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TaskList;
