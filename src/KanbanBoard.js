import React, { useState } from 'react';

import TaskCard from './TaskCard';

const KanbanBoard = () => {


    const [stateColumns, setColumns] = useState([
        { kanbanOrder: 0, title: 'To Do', active: true },
        { kanbanOrder: 1, title: 'In Analysis', active: false },
        { kanbanOrder: 1.5, title: 'Ready for dev', active: false },
        { kanbanOrder: 2, title: 'In dev', active: true },
        { kanbanOrder: 2.5, title: 'Ready for QA', active: false },
        { kanbanOrder: 3, title: 'In QA', active: false },
        { kanbanOrder: 3.5, title: 'Ready for release', active: false },
        { kanbanOrder: 4, title: 'Done', active: true },
        { kanbanOrder: 5, title: 'Complete', active: false }
    ])

    const activeColumns = () => {
        return stateColumns.filter(c => c.active);
    }

    const [tasks, setTasks] = useState([
        { title: 'Task 0', kanbanOrder: 0 },
        { title: 'Task 1', kanbanOrder: 0 },
        { title: 'Task 2', kanbanOrder: 0 },
        { title: 'Task 3', kanbanOrder: 0 },

        // add more tasks as needed
    ]);

    const [elapsedDays, setElapsedDays] = useState(0);
    const advanceProbability = 0.5;
    const backToStartProbability = 0.1

    const elapsedDaysText = () => {
        return 'Days elapsed: ' + elapsedDays;
    }

    const handleTaskMove = (movingTask, newStatus) => {
        const updatedTasks = tasks.map(task => {
            if (task === movingTask) {
                return { ...task, kanbanOrder: newStatus };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    const moveForward = 1;
    const moveBack = -1;

    const taskIsComplete = (task) => {
        const sortedStates = activeColumns().sort((a, b) => a.kanbanOrder - b.kanbanOrder);
        return task.kanbanOrder === sortedStates[sortedStates.length - 1].kanbanOrder;
    }

    const moveForwardOrBack = (task, columnOffset) => {

        const sortedStates = activeColumns().sort((a, b) => a.kanbanOrder - b.kanbanOrder);
        const index = activeColumns().findIndex(column => column.kanbanOrder === task.kanbanOrder);

        if (index + columnOffset >= 0 && index + columnOffset < activeColumns().length) {

            handleTaskMove(task, sortedStates[index + columnOffset].kanbanOrder);
        }
    }

    const getNewCardStatusAdvance = (task) => {
        const sortedStates = activeColumns().sort((a, b) => a.kanbanOrder - b.kanbanOrder);
        const currentIndex = activeColumns().findIndex(column => column.kanbanOrder === task.kanbanOrder);
        if (currentIndex + 1 < stateColumns.length) {
            return sortedStates[currentIndex + 1].kanbanOrder;
        }
        return currentIndex;
    }

    const resolveAddCards = () => {
        const updatedTasks = tasks.map(task => {
            if (taskIsComplete(task)) {
                return task;
            }
            const randomNumberForAdvance = Math.random();
            const advanceCard = randomNumberForAdvance < advanceProbability;
            if (advanceCard) {
                return { ...task, kanbanOrder: getNewCardStatusAdvance(task) }
            }
            const randomNumberForRestart = Math.random();
            const restartCard = randomNumberForRestart < backToStartProbability;
            if (restartCard) {
                return { ...task, kanbanOrder: stateColumns.sort((a, b) => a.kanbanOrder - b.kanbanOrder)[0].kanbanOrder }
            }
            return task;
        });



        setTasks(updatedTasks);
    }
    const incrementDays = () => {

        setElapsedDays(elapsedDays + 1);
        resolveAddCards();
    }

    const newCard = () => {
        const newCardTitle = 'Task ' + tasks.length;
        const updatedTasks = [...tasks, { title: newCardTitle, kanbanOrder: 0 }];
        setTasks(updatedTasks);
    }

    const renderTaskCards = (kanbanOrder) => {
        return tasks
            .filter(task => task.kanbanOrder === kanbanOrder)
            .map(task => (

                <div key={task.title} className="task-card">
                    <TaskCard task={task}
                        moveForward={() => moveForwardOrBack(task, moveForward)}
                        moveBack={() => moveForwardOrBack(task, moveBack)} />
                </div>
            ));
    };

    const columnDivs = activeColumns()
        .sort((a, b) => a.kanbanOrder - b.kanbanOrder)
        .filter((column) => column.active)
        .map((column) => (

            <div key={column.kanbanOrder} className="column" >

                <h2>{column.title}</h2>
                {renderTaskCards(column.kanbanOrder)}
            </div>
        ));

    const handleCheckboxChange = (column) => {
        column.checked = !column.checked;
        const updatedColumns = stateColumns.map(c => {
            if (c === column) {
                return { ...c, active: column.checked };
            }
            return c;
        });
        setColumns(updatedColumns);
    }
    const renderColumnSelector = () => {
        return (stateColumns
            .sort((a, b) => a.kanbanOrder - b.kanbanOrder)
            .map((column) => (

                <div key={column.title} >
                    <label>
                        <input
                            type="checkbox"
                            checked={column.active}
                            
                            onChange={() => handleCheckboxChange(column)}
                        />
                        {column.title}
                    </label>
                </div>
            )));
    }

    return (
        <div>
            <div className="board">
                {columnDivs}
            </div>
            <div><button onClick={() => newCard()}>New card</button></div>
            <div><button onClick={() => incrementDays()}>Increment days</button></div>
            <div key='daysElapsed' >{elapsedDaysText()}</div>
            <div key='activeColumnSelector' className="activeColumnSelector">{renderColumnSelector()}</div>
        </div>
    );
};

export default KanbanBoard;
