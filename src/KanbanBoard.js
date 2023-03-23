import React, { useState } from 'react';
import TaskCard from './TaskCard';

const KanbanBoard = () => {


    const [columns, setColumns] = useState([
        { kanbanOrder: 0, title: 'To Do' },
        { kanbanOrder: 1, title: 'In Analysis' },
        { kanbanOrder: 2, title: 'In Progress' },
        { kanbanOrder: 5, title: 'Complete' },
        { kanbanOrder: 3, title: 'In QA' },
        { kanbanOrder: 4, title: 'Done' }
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

    // const moveForward = (task) => {
    //     const sortedStates = 

    // }

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
                    <TaskCard task={task} moveForward={() => handleTaskMove(task, 5)} />
                </div>
            ));
    };

    const columnDivs = columns
        .sort((a, b) => a.kanbanOrder - b.kanbanOrder)
        .map((item) => (
            <div key={item.kanbanOrder} className="column">

                <h2>{item.title}</h2>
                {renderTaskCards(item.kanbanOrder)}
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
