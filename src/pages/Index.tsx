import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { user } = useAuth();
  return <Navigate to={user ? "/home" : "/onboarding"} replace />;
};
export default Index;
