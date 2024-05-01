import { useProjectStore } from '@/stores/projectStore';
import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { toast } from 'react-toastify';

const EditModal = ({ isUpdateModalVisible, handleCloseModal, selectedProject }) => {
    const { projects, fetchProjects } = useProjectStore((state) => ({
        projects: state.projects,
        fetchProjects: state.fetchProjects,
    }));

    const handleEditSubmit = async (projectData) => {
        try {
            const response = await fetch(`https://task-management-j2riqt7fu-pro-it-guys.vercel.app/api/v1/projects/${selectedProject._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                // Handle non-2xx status codes appropriately
                const errorData = await response.json();
                throw new Error(`API request failed with status ${response.status}: ${errorData.message || 'Unknown error'}`);
            }

            const updatedProject = await response.json();

            if (updatedProject.success) {
                console.log('Success:', updatedProject);
                toast.success('Project updated Successfully');
                fetchProjects();
                handleCloseModal();
                projectData.projectName = '';
                projectData.description = '';
                projectData.status = '';
            }

        } catch (error) {
            console.error('Error updating project:', error);
            // Display an error message to the user (optional)
        }
    }


    return (
        <Modal
            visible={isUpdateModalVisible}
            footer={null}
            onCancel={handleCloseModal}
            onFinish={handleEditSubmit}

        >
            <h1 className='text-2xl font-bold mb-5'>Update Project</h1>
            {/* Project creation form goes here */}
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={handleEditSubmit}
            >
                <h1 className=' my-1'>Project Name</h1>
                <Form.Item
                    name="projectName"

                >
                    <Input className='h-10' type='text' placeholder="Enter your project name" defaultValue={selectedProject.projectName} />
                </Form.Item>
                <h1 className=' my-1'>Project Description</h1>
                <Form.Item
                    name="description"
                >

                    <Input.TextArea className='h-10'
                        defaultValue={selectedProject.description}
                        type="text"
                        placeholder="Enter project description"
                    />
                </Form.Item>

                <h1 className=' mb-2'>Status</h1>
                <Form.Item
                    name="status"
                >
                    <Select className='h-10'>
                        <Select.Option value="Not Started">Not Started</Select.Option>
                        <Select.Option value="In Progress">In Progress</Select.Option>
                        <Select.Option value="On Hold">On Hold</Select.Option>
                        <Select.Option value="Completed">Completed</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Edit Project
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditModal;