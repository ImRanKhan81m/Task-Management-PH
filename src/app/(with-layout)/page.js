'use client'
import Dashboard from "@/components/Dashboard/Dashboard";
import ProtectedRoute from "../hooks/ProtectedRoute";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = () => {

  const router = useRouter();

  useEffect(() => {
    router.push('/projects')
  }, [])


  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  )
}

export default HomePage;