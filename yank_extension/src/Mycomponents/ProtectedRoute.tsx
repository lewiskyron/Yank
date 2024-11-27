// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/OAuthContext";
import React from "react";


interface ProtectedRouteProps {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const { user, loading } = useAuth();

	if (loading) {
		// You can display a loading spinner or fallback UI here
		return <div>Loading...</div>;
	}

	// If the user is not authenticated, redirect to login
	if (!user) {
		console.log(user);
		return <Navigate to="/login" />;
	}

	// Otherwise, render the protected component
	return children;
};

export default React.memo(ProtectedRoute);
