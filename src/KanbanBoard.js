import React, { useState } from 'react';
import TaskCard from './TaskCard';

const KanbanBoard = () => {


    const [columns, setColumns] = useState([
        { id: 0, title: 'To Do' },
        {id: 4, title:'In Analysis'},
        { id: 1, title: 'In Progress' },
        { id: 5, title: 'In QA' },
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

    const handleTaskMove = (movingTask, newStatus) => {
        const updatedTasks = tasks.map(task => {
            if (task === movingTask) {
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

    const columnDivs = columns.map((item) => (
        <div key={item.id} className="column">
          
          <h2>{item.title}</h2>
          {renderTaskCards(item.id)}
        </div>
      ));


    return (
        
        <div className="board">
            {columnDivs}
            <button onClick={() => handleTaskMove(tasks[0], 2)}>Move to Done</button>
        </div>
    );
};

export default KanbanBoard;
