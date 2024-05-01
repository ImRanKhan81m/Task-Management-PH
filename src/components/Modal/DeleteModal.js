import { useProjectStore } from '@/stores/projectStore';
import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { toast } from 'react-toastify';

const DeleteModal = ({ isDeleteModalVisible, handleCloseModal, selectedProject }) => {
    const { projects, fetchProjects } = useProjectStore((state) => ({
        projects: state.projects,
        fetchProjects: state.fetchProjects,
    }));

    const handleDeleteProject = async (projectData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/projects/${selectedProject._id}`, {
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
                toast.success('Project deleted Successfully');
                fetchProjects();
                handleCloseModal();
            }

        } catch (error) {
            console.error('Error deleting project:', error);
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
            <h1 className='text-2xl font-bold mb-5'>Are you sure you want to delete this Project? </h1>
            {/* Project creation form goes here */}

        </Modal>
    );
};

export default DeleteModal;