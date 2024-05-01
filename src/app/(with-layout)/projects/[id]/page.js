'use client'
import Dashboard from '@/components/Dashboard/Dashboard';
import AddTaskModal from '@/components/Modal/AddTaskModal';
import DeleteTaskModal from '@/components/Modal/DeleteTaskModal';
import TaskCard from '@/components/Tasks/TaskCard';
import { useProjectStore } from '@/stores/projectStore';
import { taskStore } from '@/stores/taskStore';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ProjectDetails = ({ params }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [project, setProject] = useState({});
    const [refetch, setRefetch] = useState('');
    const [selectedTask, setSelectedTask] = useState({});
    const id = params.id;
    const { fetchTasks, getTasksByProjectId } = taskStore((state) => ({
        fetchTasks: state.fetchTasks,
        getTasksByProjectId: state.getTasksByProjectId,
    }))
    const { projects, getProjectById } = useProjectStore((state) => ({
        projects: state.projects,
        getProjectById: state.getProjectById,
    }));

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch project based on project ID
                const fetchedProject = await getProjectById(id);
                setProject(fetchedProject.data);
            } catch (error) {
                console.error('Error fetching project:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData(); // Fetch data on component mount
    }, [getProjectById, id]);

    console.log(project, '====project');


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch tasks based on project ID
                const fetchedTasks = await getTasksByProjectId(id);
                setTasks(fetchedTasks);

            } catch (error) {
                console.error('Error fetching tasks:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData(); // Fetch data on component mount 
    }, [id, getTasksByProjectId, refetch]);

    const handleOpenModal = () => setIsModalVisible(true);
    const handleCloseModal = () => {
        setIsModalVisible(false);
        setIsDeleteModalVisible(false);
    };


    const getInProgressTasks = tasks?.data?.filter(task => task.status === 'In Progress');
    const getDoneTasks = tasks?.data?.filter(task => task.status === 'Done');
    const getToDoTasks = tasks?.data?.filter(task => task.status === 'To Do');

    return (
        <Dashboard>
            <div className=' flex items-center justify-between gap-20'>
                <div>
                    <h1 className='text-2xl font-bold  '> {project?.projectName}</h1>
                    <p className='mt-2'>{project?.description}</p>
                </div>
                <div>
                    <Button type="primary" onClick={handleOpenModal}>
                        Add Task
                    </Button>
                </div>
            </div>

            <div className='grid grid-cols-3 mt-10 gap-10 '
            // style={{
            //     backgroundImage: `url('https://i.ibb.co/whM05CR/sunset-silhouettes-trees-mountains-generative-ai-169016-29371.jpg')`,
            //     backgroundSize: 'cover',
            //     backgroundPosition: 'center',
            //     height: '75vh', 
            //     backgroundRepeat: 'no-repeat',

            // }}
            >
                {
                    tasks?.data?.length > 0 && (
                        <>
                            <div className='bg-[#f3f7ff5b] rounded-md shadow p-5 '>
                                <div className='bg-orange-600 text-center rounded-md p-1 text-white'>
                                    <h1 className='text-xl font-bold'> To do / {getToDoTasks?.length}</h1>
                                </div>
                                {
                                    getToDoTasks?.map((task) => <TaskCard key={task.id} task={task} setSelectedTask={setSelectedTask} setIsDeleteModalVisible={setIsDeleteModalVisible}/>)
                                }
                            </div>
                            <div className='bg-[#f3f7ff5b] rounded-md shadow p-5 '>
                                <div className='bg-yellow-400 text-center rounded-md p-1 text-white'>
                                    <h1 className='text-xl font-bold'> In Progress / {getInProgressTasks?.length}</h1>
                                </div>
                                {
                                    getInProgressTasks?.map((task) => <TaskCard key={task.id} task={task} setSelectedTask={setSelectedTask} setIsDeleteModalVisible={setIsDeleteModalVisible} />)
                                }
                            </div>
                            <div className='bg-[#f3f7ff5b] rounded-md shadow p-5 '>
                                <div className='bg-green-500 text-center rounded-md p-1 text-white'>
                                    <h1 className='text-xl font-bold'> Done / {getDoneTasks?.length}</h1>
                                </div>
                                {
                                    getDoneTasks?.map((task) => <TaskCard key={task.id} task={task} setSelectedTask={setSelectedTask} setIsDeleteModalVisible={setIsDeleteModalVisible}/>)
                                }
                            </div>
                        </>
                    )
                }
            </div>

            {
                tasks?.data?.length === 0 && (

                    <div className='flex items-center justify-center w-full h-96'>
                        <h1 className='text-xl font-bold text-red-500 text-center'>No tasks found</h1>
                    </div>
                )
            }

            <AddTaskModal isModalVisible={isModalVisible} handleCloseModal={handleCloseModal} id={id} setRefetch={setRefetch} />
            <DeleteTaskModal isDeleteModalVisible={isDeleteModalVisible} setIsDeleteModalVisible={setIsDeleteModalVisible} handleCloseModal={handleCloseModal} selectedTask={selectedTask} setRefetch={setRefetch}/>
        </Dashboard>
    );
};

export default ProjectDetails;