import React from 'react';

const TaskCard = ({ task }) => {

    return (
        <div className="bg-white my-3 p-3 rounded-md shadow-md border">
            <h3 className='font-bold'>{task?.title}</h3>
            <p>{task?.description}</p>
            <div className="task-details">
                <div className="assigned-to">
                    <h1>member</h1>
                </div>
                <div className="deadline">
                    <h1>Deadline</h1>
                </div>
                <div className="status">
                    <h1>Status</h1>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;