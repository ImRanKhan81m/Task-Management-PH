import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const ProjectCard = ({ project, setIsUpdateModalVisible, setSelectedProject, setIsDeleteModalVisible }) => {

    const { projectName, description, status } = project;

    const getStatusColor = () => {
        switch (project?.status) {
            case 'Not Started':
                return 'lightblue';
            case 'In Progress':
                return 'lightgreen';
            case 'On Hold':
                return 'orange';
            case 'Completed':
                return 'lightgreen';
            default:
                return 'white'; // Default color for unknown status
        }
    };

    const onEdit = () => {
        setIsUpdateModalVisible(true);
        setSelectedProject(project);
    }

    const onDelete = () => {
        setIsDeleteModalVisible(true);
        setSelectedProject(project);
    }


    return (
        <div className='border border-gray-200 p-5 rounded-md shadow-md  '>
            <h1 className='text-lg font-bold'>{project.projectName}</h1>
            <p>{project.description}</p>

            <div>
                <div className='flex mt-5 justify-between items-center'>
                    <div className={`project-container py-2 px-3 rounded-3xl`} style={{ backgroundColor: getStatusColor() }}>
                        <h1 className=''>{project?.status}</h1>
                    </div>
                    <div className='flex gap-3'>
                        <EditOutlined onClick={onEdit} className='edit-icon text-xl' />
                        {/* Delete icon */}
                        <DeleteOutlined onClick={onDelete} className='delete-icon text-xl' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;