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

  
}));
 
