import React, { useState } from 'react';
import TaskCard from './TaskCard';

const KanbanBoard = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: 'Task 1', status: 'To Do' },
        { id: 2, title: 'Task 2', status: 'In Progress' },
        { id: 3, title: 'Task 3', status: 'Done' },
        { id: 4, title: 'Task 4', status: 'Done' },
        // add more tasks as needed
    ]);

    const [columns, setColumns] = useState([
        'To Do', 'In Progress', 'Done'
    ])

    const handleTaskMove = (id, newStatus) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, status: newStatus };
            }
            return task;
        });
        setTasks(updatedTasks);
    };



    const renderTaskCards = (status) => {
        return tasks
            .filter(task => task.status === status)
            .map(task => (

                <div key={task.id} className="task-card">
                    <TaskCard task={task} />
                </div>
            ));
    };

    return (
        <div className="board">
            <div className="column">
                <h2>{columns[0]}</h2>
                {renderTaskCards('To Do')}
            </div>
            <div className="column">
                <h2>{columns[1]}</h2>
                {renderTaskCards('In Progress')}
            </div>
            <div className="column">
                <h2>{columns[2]}</h2>
                {renderTaskCards('Done')}
            </div>
            <button onClick={() => handleTaskMove(1, 'Done')}>Move to Done</button>
        </div>
    );
};

export default KanbanBoard;
