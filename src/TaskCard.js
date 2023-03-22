import React, { useState } from 'react';


const TaskCard = (props) => {
    return (

        <div key={props.task.id} className="task">
            <h3>{props.task.title}</h3>
            <button>&lt;-</button>
            <button>-&gt;</button>
        </div>
    );


};
export default TaskCard;