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
import AddProjectModal from '@/components/Modal/AddProjectModal';


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



    return (
        <Dashboard>
            <div className=' flex items-center justify-between'>
                <h1 className='text-2xl font-bold  '>All Projects</h1>
                <div>
                    <Button type="primary" onClick={handleOpenModal}>
                        Add Project
                    </Button>



                </div>
            </div>

            <div>
                {/* project show by card */}
                <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 mt-5'>
                    {projects?.data?.map((project) => <ProjectCard key={project._id} project={project} setIsUpdateModalVisible={setIsUpdateModalVisible} setSelectedProject={setSelectedProject} setIsDeleteModalVisible={setIsDeleteModalVisible} />)}

                </div>
            </div>

            <AddProjectModal isModalVisible={isModalVisible} handleCloseModal={handleCloseModal} />
            <EditModal isUpdateModalVisible={isUpdateModalVisible} setIsUpdateModalVisible={setIsUpdateModalVisible} handleCloseModal={handleCloseModal} selectedProject={selectedProject} />

            <DeleteModal isDeleteModalVisible={isDeleteModalVisible} setIsDeleteModalVisible={setIsDeleteModalVisible} handleCloseModal={handleCloseModal} selectedProject={selectedProject} />
        </Dashboard>
    );
};

export default Project;