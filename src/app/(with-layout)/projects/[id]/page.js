'use client'
import Dashboard from '@/components/Dashboard/Dashboard';
import AddTaskModal from '@/components/Modal/AddTaskModal';
import TaskCard from '@/components/Tasks/TaskCard';
import { taskStore } from '@/stores/taskStore';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ProjectDetails = ({ params }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const id = params.id;
    const { fetchTasks, getTasksByProjectId } = taskStore((state) => ({
        fetchTasks: state.fetchTasks,
        getTasksByProjectId: state.getTasksByProjectId,
    }))

    // useEffect(() => { 
    //     getTasksByProjectId(id);
    // }, [fetchTasks]);


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
    }, [id, getTasksByProjectId]);

    const handleOpenModal = () => setIsModalVisible(true);
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    console.log(tasks, '=====task data');

    const getInProgressTasks = tasks?.data?.filter(task => task.status === 'In Progress');
    const getDoneTasks = tasks?.data?.filter(task => task.status === 'Done');
    const getToDoTasks = tasks?.data?.filter(task => task.status === 'To Do');

    return (
        <Dashboard>
            <div className=' flex items-center justify-between'>
                <h1 className='text-2xl font-bold  '>All Projects</h1>
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
                <div className='bg-[#f3f7ff5b] rounded-md shadow p-5 '>
                    <div className='bg-orange-600 text-center rounded-md p-1 text-white'>
                        <h1 className='text-xl font-bold'> To do / {getToDoTasks?.length}</h1>
                    </div>
                    {
                        getToDoTasks?.map((task) => <TaskCard key={task.id} task={task} />)
                    }
                </div>
                <div className='bg-[#f3f7ff5b] rounded-md shadow p-5 '>
                    <div className='bg-yellow-400 text-center rounded-md p-1 text-white'>
                        <h1 className='text-xl font-bold'> In Progress / {getInProgressTasks?.length}</h1>
                    </div>
                    {
                        getInProgressTasks?.map((task) => <TaskCard key={task.id} task={task} />)
                    }
                </div>
                <div className='bg-[#f3f7ff5b] rounded-md shadow p-5 '>
                    <div className='bg-green-500 text-center rounded-md p-1 text-white'>
                        <h1 className='text-xl font-bold'> Done / {getDoneTasks?.length}</h1>
                    </div>
                    {
                        getDoneTasks?.map((task) => <TaskCard key={task.id} task={task} />)
                    }
                </div>
            </div>

            <AddTaskModal isModalVisible={isModalVisible} handleCloseModal={handleCloseModal} id={id} />
        </Dashboard>
    );
};

export default ProjectDetails;