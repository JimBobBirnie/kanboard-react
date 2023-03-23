import React, { useState } from 'react';
import { scryRenderedDOMComponentsWithClass } from 'react-dom/test-utils';
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

    const [elapsedDays, setElapsedDays] = useState(0);

    const elapsedDaysText = () => {
        return 'Days elapsed: ' + elapsedDays;
    }



    const handleTaskMove = (movingTask, newStatus) => {
        const updatedTasks = tasks.map(task => {
            if (task === movingTask) {
                return { ...task, status: newStatus };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const moveForward = 1;
    const moveBack = -1;

    const moveForwardOrBack = (task, columnOffset) => {

        const sortedStates = columns.sort((a, b) => a.kanbanOrder - b.kanbanOrder);
        const index = columns.findIndex(column => column.kanbanOrder === task.status);
        if (index + columnOffset >= 0 && index + columnOffset < columns.length) {
            handleTaskMove(task, sortedStates[index + columnOffset].kanbanOrder);
        }
    }
    const moveAllCardsForward = () => {
        const sortedStates = columns.sort((a, b) => a.kanbanOrder - b.kanbanOrder);
        const updatedTasks = tasks.map(task => {
            const index = columns.findIndex(column => column.kanbanOrder === task.status);
            if (index + 1 < columns.length) {
                return { ...task, status: sortedStates[index + 1].kanbanOrder }
            }
            return task;
        });
        setTasks(updatedTasks);
    }
    const incrementDays = () => {

        setElapsedDays(elapsedDays + 1);
        moveAllCardsForward();
    }

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
                    <TaskCard task={task}
                        moveForward={() => moveForwardOrBack(task, moveForward)}
                        moveBack={() => moveForwardOrBack(task, moveBack)} />
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
        <div>
            <div className="board">
                {columnDivs}
            </div>
            <div><button onClick={() => newCard()}>New card</button></div>
            <div><button onClick={() => incrementDays()}>Increment days</button></div>
            <div id='daysElapsedDiv'>{elapsedDaysText()}</div>
        </div>
    );
};

export default KanbanBoard;
