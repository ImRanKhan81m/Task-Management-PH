import { useProjectStore } from '@/stores/projectStore';
import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { toast } from 'react-toastify';

const AddProjectModal = ({ isModalVisible, handleCloseModal }) => {
    const { projects, fetchProjects } = useProjectStore((state) => ({
        projects: state.projects,
        fetchProjects: state.fetchProjects,
    }));

    const handleSubmit = async (projectData) => {
        try {
            const response = await fetch('https://task-management-j2riqt7fu-pro-it-guys.vercel.app/api/v1/projects', {
                method: 'POST',
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

            const createdProject = await response.json();

            if (createdProject.success) {
                console.log('Success:', createdProject);
                toast.success('Project added Successfully');
                fetchProjects();
                handleCloseModal();
            }

        } catch (error) {
            console.error('Error creating project:', error);
            // Display an error message to the user (optional)
        }
    };



    return (
        <Modal
            visible={isModalVisible}
            footer={null}
            onCancel={handleCloseModal}
        >
            <h1 className='text-2xl font-bold mb-5'>Create a New Project</h1>
            {/* Project creation form goes here */}
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
            >
                <h1 className=' my-1'>Project Name</h1>
                <Form.Item
                    name="projectName"
                    rules={[{ required: true, message: 'Project name is required!' }]}
                >

                    <Input className='h-10' type='text' placeholder="Enter your project name" />
                </Form.Item>
                <h1 className=' my-1'>Project Description</h1>
                <Form.Item
                    name="description"
                    rules={[{ required: true, message: 'Project description is required!' }]}
                >

                    <Input.TextArea className='h-10'

                        type="text"
                        placeholder="Enter project description"
                    />
                </Form.Item>

                <h1 className=' mb-2'>Status</h1>
                <Form.Item
                    name="status"
                    rules={[{ required: true, message: 'Project status is required!' }]}
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
                        Add Project
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddProjectModal;