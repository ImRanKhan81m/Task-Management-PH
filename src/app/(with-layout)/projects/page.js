'use client'
import Dashboard from '@/components/Dashboard/Dashboard';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useProjectStore } from '@/stores/projectStore'
import { Button, Checkbox, Form, Input, Modal, Select } from 'antd';
import { toast } from 'react-toastify';
import ProjectCard from '@/components/Project/ProjectCard';
import EditModal from '@/components/Modal/EditModal';
import DeleteModal from '@/components/Modal/DeleteModal';


const Project = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState({});
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const { projects, fetchProjects } = useProjectStore((state) => ({
        projects: state.projects,
        fetchProjects: state.fetchProjects,
    }));

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleOpenModal = () => setIsModalVisible(true);
    const handleCloseModal = () => {
        setIsModalVisible(false);
        setIsUpdateModalVisible(false);
        setIsDeleteModalVisible(false);
    };

    const handleSubmit = async (projectData) => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/projects', {
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
        <Dashboard>
            <div className=' flex items-center justify-between'>
                <h1 className='text-2xl font-bold  '>All Projects</h1>
                <div>
                    <Button type="primary" onClick={handleOpenModal}>
                        Add Project
                    </Button>


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
                </div>
            </div>

            <div>
                {/* project show by card */}
                <div className='grid grid-cols-4 gap-4 mt-5'>
                    {projects?.data?.map((project) => <ProjectCard key={project._id} project={project} setIsUpdateModalVisible={setIsUpdateModalVisible} setSelectedProject={setSelectedProject} setIsDeleteModalVisible={setIsDeleteModalVisible}/>)}

                </div>
            </div>

            <EditModal isUpdateModalVisible={isUpdateModalVisible} setIsUpdateModalVisible={setIsUpdateModalVisible} handleCloseModal={handleCloseModal} selectedProject={selectedProject}/>

            <DeleteModal isDeleteModalVisible={isDeleteModalVisible} setIsDeleteModalVisible={setIsDeleteModalVisible} handleCloseModal={handleCloseModal} selectedProject={selectedProject}/>
        </Dashboard>
    );
};

export default Project;