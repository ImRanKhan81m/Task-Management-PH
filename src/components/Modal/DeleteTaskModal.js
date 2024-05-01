import { Modal } from 'antd';
import React from 'react';
import { toast } from 'react-toastify';

const DeleteTaskModal = ({ isDeleteModalVisible, handleCloseModal, selectedTask, setRefetch }) => {


    const handleDeleteProject = async (projectData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/tasks/${selectedTask._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                // Handle non-2xx status codes appropriately
                const errorData = await response.json();
                throw new Error(`API request failed with status ${response.status}: ${errorData.message || 'Unknown error'}`);
            }

            const updatedProject = await response.json();

            if (updatedProject.success) {
                console.log('Success:', updatedProject);
                toast.success('Task deleted Successfully');
                setRefetch(Math.random())
                handleCloseModal();
            }

        } catch (error) {
            console.error('Error deleting task:', error);
            // Display an error message to the user (optional)
        }
    }


    return (
        <Modal
            visible={isDeleteModalVisible}
            onCancel={handleCloseModal}
            onFinish={handleDeleteProject}
            onOk={handleDeleteProject}
        >
            <h1 className='text-2xl font-bold mb-5'>Are you sure you want to Delete the Task? </h1>
            {/* Project creation form goes here */}

        </Modal>
    );
};

export default DeleteTaskModal;