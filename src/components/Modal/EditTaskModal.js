import { useProjectStore } from '@/stores/projectStore';
import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { toast } from 'react-toastify';

const EditTaskModal = ({ isEditModalVisible, handleCloseModal, selectedTask, setRefetch }) => {


    const handleEditSubmit = async (projectData) => {
        try {
            const response = await fetch(`https://task-management-wheat-omega.vercel.app/api/v1/tasks/${selectedTask._id}`, {
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
                toast.success('Task deleted Successfully');
                handleCloseModal();
                setRefetch(Math.random());

                // clear form fields


            }

        } catch (error) {
            console.error('Error updating task:', error);
            // Display an error message to the user (optional)
        }
    }


    return (
        <Modal
            visible={isEditModalVisible}
            footer={null}
            onCancel={handleCloseModal}
            onFinish={handleEditSubmit}

        >
            <h1 className='text-2xl font-bold mb-5'>Update Task</h1>
            {/* Project creation form goes here */}
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={handleEditSubmit}
            >
                <h1 className=''>Task Title</h1>
                <Form.Item
                    name="title" initialValue={selectedTask.title}
                >

                    <Input className='h-10' type='text' placeholder="Enter task title" />
                </Form.Item>
                <h1 className=''>Task Description</h1>
                <Form.Item
                    name="description" initialValue={selectedTask.description}
                >

                    <Input.TextArea className='h-10'

                        type="text"
                        placeholder="Enter task description"
                    />
                </Form.Item>

                <h1 className=' '>Status</h1>
                <Form.Item
                    name="status" initialValue={selectedTask.status}
                >
                    <Select className='h-10'>
                        <Select.Option value="To Do">To Do</Select.Option>
                        <Select.Option value="In Progress">In Progress</Select.Option>
                        <Select.Option value="Done">Done</Select.Option>
                    </Select>
                </Form.Item>

                <h1 className=''>Assign Member</h1>
                <Form.Item
                    name="assignedTo" initialValue={selectedTask.assignedTo}
                >
                    <Select className='h-10'>
                        <Select.Option value="Imran Hossen">Imran Hossen</Select.Option>
                        <Select.Option value="Abdul Karim">Abdul Karim</Select.Option>
                        <Select.Option value="Robiul Islam">Robiul Islam</Select.Option>
                        <Select.Option value="Shekh Jahed">Shekh Jahed</Select.Option>

                    </Select>
                </Form.Item>

                <h1 className=''>Deadline Date</h1>

                <Form.Item
                    name="deadline" initialValue={selectedTask.deadline}
                >
                    <Input className='h-10' type="date" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button mt-5">
                        Add Task
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditTaskModal;