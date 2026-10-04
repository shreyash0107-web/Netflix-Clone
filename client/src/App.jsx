import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Browse from './pages/Browse';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyList from './pages/MyList';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  if (isLoading) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const { checkAuth, isAuthenticated } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/browse" /> : <Landing />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/browse" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/browse" /> : <Signup />} />
        <Route path="/browse" element={<ProtectedRoute><Browse /></ProtectedRoute>} />
        <Route path="/my-list" element={<ProtectedRoute><MyList /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
