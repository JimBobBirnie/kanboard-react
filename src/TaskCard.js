import React, { useState } from 'react';


const TaskCard = (props) => {
    return (

        <div key={props.task.id} className="task-card">
            <h3>{props.task.title}</h3>
            {/* <button onClick={()=> alert('To Do')}>Move to To Do</button>
            <button onClick={()=> alert('In Progress')}>Move to In Progress</button>
            <button onClick={()=> alert('Done')}>Move to Done</button> */}

        </div>
    );


};
export default TaskCard;