// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/OAuthContext";


interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { user } = useAuth();

	// If the user is not authenticated, redirect to login
	if (!user) {
		return <Navigate to="/login" />;
	}

	// Otherwise, render the protected component
	return children;
};

export default ProtectedRoute;
