import React, { useState } from 'react';
import TaskCard from './TaskCard';

const KanbanBoard = () => {


    const [columns, setColumns] = useState([
        { id: 0, title: 'To Do' },
        { id: 1, title: 'In Progress' },
        { id: 2, title: 'Done' },
        { id: 3, title: 'Complete' }
    ])

    const [tasks, setTasks] = useState([
        { id: 1, title: 'Task 1', status: 0},
        { id: 2, title: 'Task 2', status: 1 },
        { id: 3, title: 'Task 3', status: 1 },
        { id: 4, title: 'Task 4', status: 2 },
        // add more tasks as needed
    ]);

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
                <h2>{columns[0].title}</h2>
                {renderTaskCards(columns[0].id)}
            </div>
            <div className="column">
                <h2>{columns[1].title}</h2>
                {renderTaskCards(columns[1].id)}
            </div>
            <div className="column">
                <h2>{columns[2].title}</h2>
                {renderTaskCards(columns[2].id)}
            </div>
            <button onClick={() => handleTaskMove(1, columns[2].id)}>Move to Done</button>
        </div>
    );
};

export default KanbanBoard;
