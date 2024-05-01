
import { taskStore } from '@/stores/taskStore';
import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { toast } from 'react-toastify';

const AddTaskModal = ({ isModalVisible, handleCloseModal, id }) => {
    const { tasks, fetchTasks, createTask } = taskStore();

    const handleSubmit = async (projectData) => {

        projectData.project = id;
        const response = await createTask(projectData);

        console.log(response, '=add task modal');
        if (response.success) {
            handleCloseModal();
            fetchTasks();
            toast.success('Task created successfully');
        }
    };



    return (
        <Modal
            visible={isModalVisible}
            footer={null}
            onCancel={handleCloseModal}
        >
            <h1 className='text-2xl font-bold mb-5'>Create a New Task</h1>
            {/* Project creation form goes here */}
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
            >
                <h1 className=''>Task Title</h1>
                <Form.Item
                    name="title"
                    rules={[{ required: true, message: 'Title is required!' }]}
                >

                    <Input className='h-10' type='text' placeholder="Enter task title" />
                </Form.Item>
                <h1 className=''>Task Description</h1>
                <Form.Item
                    name="description"
                    rules={[{ required: true, message: 'Task description is required!' }]}
                >

                    <Input.TextArea className='h-10'

                        type="text"
                        placeholder="Enter task description"
                    />
                </Form.Item>

                <h1 className=' '>Status</h1>
                <Form.Item
                    name="status"
                    rules={[{ required: true, message: 'Project status is required!' }]}
                >
                    <Select className='h-10'>
                        <Select.Option value="To Do">To Do</Select.Option>
                        <Select.Option value="In Progress">In Progress</Select.Option>
                        <Select.Option value="Done">Done</Select.Option>
                    </Select>
                </Form.Item>

                <h1 className=''>Assign Member</h1>
                <Form.Item
                    name="assignedTo"
                    rules={[{ required: true, message: 'Project status is required!' }]}
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
                    name="deadline"
                    rules={[{ required: true, message: 'Deadline is required!' }]}
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

export default AddTaskModal;