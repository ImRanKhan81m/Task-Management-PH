import Dashboard from "@/components/Dashboard/Dashboard";
import ProtectedRoute from "../hooks/ProtectedRoute";

const HomePage = () => {
  return (
    <ProtectedRoute> 
        <Dashboard /> 
    </ProtectedRoute>
  )
}

export default HomePage;