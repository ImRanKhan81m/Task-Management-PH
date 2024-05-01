// useProjectStore.js
import { create } from 'zustand';

export const useProjectStore = create((set) => ({
  projects: [], // Initial state: empty array

  fetchProjects: async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/projects');
      console.log(response, '========res==========');
      const data = await response.json();
      set({ projects: data }); // Update projects state
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  },

  // update project 

  updateProject: async (projectId, projectData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/projects/${projectId}`, {
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
        set((state) => {
          const updatedProjects = state.projects.map((project) => {
            if (project._id === projectId) {
              return updatedProject.data;
            }
            return project;
          });

          return { projects: updatedProjects };
        });
      }

    } catch (error) {
      console.error('Error updating project:', error);
    }
  },

})); 