'use client'
import Dashboard from '@/components/Dashboard/Dashboard';    
import React from 'react';
import { useQuery } from 'react-query';
import { useStore } from 'zustand'; 
import { useEffect } from 'react';
import {useProjectStore} from  '@/stores/projectStore'
import { Button } from 'antd';


const Project = () => {
    const {projects, fetchProjects} = useProjectStore((state) => ({
        projects: state.projects,
        fetchProjects: state.fetchProjects,
      }));
  
      useEffect(() => {
          fetchProjects();
      }, [fetchProjects]); 
 
    return (
        <Dashboard>
            <Button type="primary">
                Add Project
            </Button>
        </Dashboard>
    );
};

export default Project;