import React, { useState } from 'react';


const TaskCard = (props) => {
    const moveForward=props.moveForward;
    
    return (    

        <div key={props.task.id} className="task">
            <h3>{props.task.title}</h3>
            <button>&lt;=</button>
            <button onClick={moveForward}>=&gt;</button>
        </div>
    );


};
export default TaskCard;