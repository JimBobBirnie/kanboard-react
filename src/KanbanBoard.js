import React, { useState } from 'react';
import TaskCard from './TaskCard';

const KanbanBoard = () => {


    const [columns, setColumns] = useState([
        { id: 0, title: 'To Do' },
        { id: 4, title: 'In Analysis' },
        { id: 1, title: 'In Progress' },
        { id: 5, title: 'In QA' },
        { id: 2, title: 'Done' },
        { id: 3, title: 'Complete' }
    ])

    const [tasks, setTasks] = useState([
        { title: 'Task 0', status: 0 },
        { title: 'Task 1', status: 1 },
        { title: 'Task 2', status: 1 },
        { title: 'Task 3', status: 2 },

        // add more tasks as needed
    ]);

    const handleTaskMove = (movingTask, newStatus) => {
        const updatedTasks = tasks.map(task => {
            if (task === movingTask) {
                return { ...task, status: newStatus };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const newCard = () => {
        const newCardTitle = 'Task ' + tasks.length;
        const updatedTasks = [...tasks, { title: newCardTitle, status: 0 }];
        setTasks(updatedTasks);
    }

    const renderTaskCards = (status) => {
        return tasks
            .filter(task => task.status === status)
            .map(task => (

                <div key={task.title} className="task-card">
                    <TaskCard task={task} />
                </div>
            ));
    };

    const columnDivs = columns.map((item) => (
        <div key={item.id} className="column">

            <h2>{item.title}</h2>
            {renderTaskCards(item.id)}
        </div>
    ));


    return (

        <div className="board">
            {columnDivs}
            <button onClick={() => newCard()}>New card</button>
        </div>
    );
};

export default KanbanBoard;
