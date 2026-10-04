import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Signup = () => {
  const location = useLocation();
  const initialEmail = location.state?.email || '';
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    
    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setError('Please enter a valid email address.');
    }
    
    // Strict Gmail check (since you requested invalid gmail catching)
    if (!email.toLowerCase().endsWith('@gmail.com')) {
      return setError('Only @gmail.com addresses are allowed.');
    }

    setIsLoading(true);
    const res = await signup(name, email, password);
    if (!res.success) {
      setError(res.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black relative flex flex-col">
      <nav className="border-b border-gray-200 px-4 md:px-12 py-4 flex items-center justify-between">
        <Link to="/">
          <h1 className="text-netflix text-3xl font-bold tracking-wider">NETFLIX</h1>
        </Link>
        <Link to="/login" className="font-bold text-lg hover:underline">
          Sign In
        </Link>
      </nav>

      <div className="flex-1 flex flex-col items-center pt-8 pb-20 px-4">
        <div className="w-full max-w-[440px]">
          <p className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-2">Step 1 of 3</p>
          <h2 className="text-3xl font-bold mb-4">Create a password to start your membership</h2>
          <p className="text-lg text-gray-600 mb-6">Just a few more steps and you're done! We hate paperwork, too.</p>
          
          {error && <div className="bg-[#e87c03] p-3 rounded mb-4 text-sm text-white">{error}</div>}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-400 rounded px-4 py-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Full Name"
              required
            />
            
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-400 rounded px-4 py-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Email address"
              required
            />
            
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-400 rounded px-4 py-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Add a password"
              required
            />

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-400 rounded px-4 py-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Confirm password"
              required
            />
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-netflix text-white py-4 rounded text-xl font-bold mt-4 hover:bg-red-700 transition disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Next'}
            </button>
          </form>
          
          <div className="mt-6 text-gray-500 text-sm">
            Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign In now</Link>.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
