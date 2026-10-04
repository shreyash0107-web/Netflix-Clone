import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const res = await login(email, password);
    if (!res.success) {
      setError(res.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative flex flex-col">
      <div className="absolute inset-0 z-0 hidden md:block">
        <img 
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
          alt="Netflix Background" 
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="flex-1 flex items-center justify-center z-10 px-4 py-20 mt-10">
        <div className="bg-black/80 md:bg-black/75 p-8 md:p-16 rounded-md w-full max-w-[450px] shadow-2xl border border-gray-800/50 backdrop-blur-sm">
          <h2 className="text-3xl font-bold mb-8 text-white">Sign In</h2>
          
          {error && <div className="bg-[#e87c03] p-3 rounded mb-4 text-sm text-white">{error}</div>}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="relative group">
              <input
                type="text" // Using text to avoid browser default email styling issues with peer
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#333] text-white rounded px-4 pt-5 pb-2 border border-gray-500 focus:outline-none focus:border-white focus:ring-0 peer transition-all duration-200"
                placeholder=" "
                required
              />
              <label 
                className={`absolute left-4 transition-all duration-200 pointer-events-none ease-[cubic-bezier(0.4,0,0.2,1)]
                ${email ? 'text-xs text-gray-300 font-semibold top-1.5' : 'text-base text-gray-400 top-3 peer-focus:text-xs peer-focus:text-gray-300 peer-focus:font-semibold peer-focus:top-1.5'}`}
              >
                Email or phone number
              </label>
            </div>
            
            <div className="relative group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#333] text-white rounded px-4 pt-5 pb-2 border border-gray-500 focus:outline-none focus:border-white focus:ring-0 peer transition-all duration-200"
                placeholder=" "
                required
              />
              <label 
                className={`absolute left-4 transition-all duration-200 pointer-events-none ease-[cubic-bezier(0.4,0,0.2,1)]
                ${password ? 'text-xs text-gray-300 font-semibold top-1.5' : 'text-base text-gray-400 top-3 peer-focus:text-xs peer-focus:text-gray-300 peer-focus:font-semibold peer-focus:top-1.5'}`}
              >
                Password
              </label>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-netflix text-white py-3.5 rounded font-bold mt-6 hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
            
            <div className="flex justify-between items-center text-sm text-gray-400 mt-2">
              <label className="flex items-center gap-2 cursor-pointer group-hover:text-gray-300 transition">
                <input type="checkbox" className="w-4 h-4 rounded bg-[#333] border-none accent-gray-400 cursor-pointer" />
                Remember me
              </label>
              <a href="#" className="hover:underline text-gray-400 hover:text-gray-300">Need help?</a>
            </div>
          </form>
          
          <div className="mt-16 text-gray-400">
            <p className="mb-2 text-[#737373]">
              New to Netflix? <Link to="/signup" className="text-white font-medium hover:underline">Sign up now</Link>.
            </p>
            <p className="text-xs text-[#8c8c8c]">
              This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="#" className="text-[#0071eb] hover:underline">Learn more.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
