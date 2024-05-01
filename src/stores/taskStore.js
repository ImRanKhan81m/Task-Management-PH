import { create } from 'zustand';

export const taskStore = create((set) => ({
    tasks: [], // Initial state: empty array

    fetchTasks: async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/tasks');
            const data = await response.json();
            set({ tasks: data }); // Update tasks state
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    },

    // get task by id 
    getTaskById: async (taskId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/tasks/${taskId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch task:", error);
        }
    },

    // get task by project id
    getTasksByProjectId: async (projectId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/tasks/project/${projectId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
        }
    },

    // create task
    createTask: async (taskData) => { 
        try {
            const response = await fetch('http://localhost:5000/api/v1/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            const data = await response.json();
            console.log(data, '==========res data');
            return data
            // fetchTasks()
            // set((state) => ({ tasks: [...state.tasks, data] }));

        } catch (error) {
            console.error("Failed to create task:", error);
        }
    },

    // update task
    updateTask: async (taskId, taskData) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/tasks/${taskId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            const data = await response.json();
            set((state) => {
                const updatedTasks = state.tasks.map((task) => {
                    if (task._id === taskId) {
                        return data;
                    }
                    return task;
                });

                return { tasks: updatedTasks };
            });
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    },

    // delete task
    deleteTask: async (taskId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/v1/tasks/${taskId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                set((state) => ({ tasks: state.tasks.filter((task) => task._id !== taskId) }));
            }
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    },
}));

