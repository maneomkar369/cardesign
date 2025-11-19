import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, user, getUserRole } = useAuthStore();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific roles are required and user doesn't have permission
  if (allowedRoles.length > 0) {
    const userRole = getUserRole();
    if (!allowedRoles.includes(userRole)) {
      // Redirect to appropriate dashboard based on user role
      switch (userRole) {
        case 'admin':
          return <Navigate to="/admin" replace />;
        case 'designer':
          return <Navigate to="/designer" replace />;
        case 'user':
          return <Navigate to="/dashboard" replace />;
        default:
          return <Navigate to="/login" replace />;
      }
    }
  }

  return children;
}

// Higher-order component for role-based protection
export function withRoleProtection(Component, allowedRoles = []) {
  return function ProtectedComponent(props) {
    return (
      <ProtectedRoute allowedRoles={allowedRoles}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}

// Specific role protection components
export function AdminOnly({ children }) {
  return <ProtectedRoute allowedRoles={['admin']}>{children}</ProtectedRoute>;
}

export function DesignerOnly({ children }) {
  return <ProtectedRoute allowedRoles={['designer']}>{children}</ProtectedRoute>;
}

export function UserOnly({ children }) {
  return <ProtectedRoute allowedRoles={['user']}>{children}</ProtectedRoute>;
}

export function AdminOrDesigner({ children }) {
  return <ProtectedRoute allowedRoles={['admin', 'designer']}>{children}</ProtectedRoute>;
}