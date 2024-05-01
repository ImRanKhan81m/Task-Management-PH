import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const TaskCard = ({ task, setSelectedTask, setIsEditModalVisible, setIsDeleteModalVisible }) => {

    const taskDeadline = task?.deadline;

    // Option 1 (using substring):
    const year = taskDeadline.substring(0, 4);
    const month = taskDeadline.substring(5, 7); // Month is at index 5 (0-based)
    const date = taskDeadline.substring(8, 10);

    const onEdit = () => {
        setSelectedTask(task)
        setIsEditModalVisible(true)
    }

    const onDelete = () => {
        setSelectedTask(task)
        setIsDeleteModalVisible(true)
    }


    return (
        <div className="bg-white my-3 p-3 rounded-md shadow-md border">
            <h3 className='font-bold'>{task?.title}</h3>
            <p>{task?.description}</p>
            <div className="flex justify-between items-center mt-5">
                <div className='flex gap-2'>
                    <div className="  bg-green-800 px-3 py-1 rounded-3xl text-white">
                        <span className='text-xs'>{task?.assignedTo}</span>
                    </div>
                    <div className="  bg-red-500 px-3 py-1 rounded-3xl text-white">
                        <span className='text-xs'>{date}-</span>
                        <span className='text-xs '>{month}-</span>
                        <span className='text-xs'>{year}</span>
                    </div>
                </div>
                <div className='flex gap-3 items-center '>
                    <EditOutlined onClick={onEdit} className='edit-icon text-[16px]' />
                    {/* Delete icon */}
                    <DeleteOutlined onClick={onDelete} className='delete-icon text-[16px]' />
                </div>
            </div>
        </div>
    );
};

export default TaskCard;