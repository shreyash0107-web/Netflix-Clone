import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Tv, Download, Smile, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What is Netflix?",
    answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.\n\nYou can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!"
  },
  {
    question: "How much does Netflix cost?",
    answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts."
  },
  {
    question: "Where can I watch?",
    answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.\n\nYou can also download your favorite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere."
  },
  {
    question: "How do I cancel?",
    answer: "Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime."
  }
];

const Landing = () => {
  const [email, setEmail] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const navigate = useNavigate();

  const handleGetStarted = (e) => {
    e.preventDefault();
    if (email) {
      navigate('/signup', { state: { email } });
    }
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Hero Section */}
      <div className="relative h-[100vh] min-h-[600px] w-full border-b-8 border-[#232323]">
        <div className="absolute inset-0">
          <img 
            src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
            alt="Netflix Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-black via-black/40 to-black/80" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto mt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-md">Unlimited movies, TV shows, and more</h1>
          <p className="text-xl md:text-2xl font-medium mb-6 drop-shadow">Watch anywhere. Cancel anytime.</p>
          <p className="text-lg md:text-xl mb-4 drop-shadow">Ready to watch? Enter your email to create or restart your membership.</p>
          
          <form onSubmit={handleGetStarted} className="flex flex-col md:flex-row gap-2 w-full max-w-2xl mt-2">
            <div className="relative flex-1 group">
              <input 
                type="email" 
                className="w-full h-full px-4 pt-5 pb-2 bg-black/50 border border-gray-500 rounded focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-white text-lg backdrop-blur-sm peer transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                required
              />
              <label 
                className={`absolute left-4 transition-all duration-200 pointer-events-none ease-[cubic-bezier(0.4,0,0.2,1)]
                ${email ? 'text-xs text-gray-300 font-semibold top-2' : 'text-base text-gray-400 top-4 peer-focus:text-xs peer-focus:text-gray-300 peer-focus:font-semibold peer-focus:top-2'}`}
              >
                Email address
              </label>
            </div>
            <button 
              type="submit" 
              className="bg-netflix text-white px-8 py-3 md:py-4 rounded text-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition duration-300 w-full md:w-auto mt-2 md:mt-0"
            >
              Get Started <ChevronRight className="w-6 h-6" />
            </button>
          </form>
        </div>
      </div>

      {/* Feature Sections */}
      <div className="py-20 px-8 border-b-8 border-[#232323] bg-black">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-12">More reasons to join</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            <div className="bg-gradient-to-br from-[#192247] to-[#210e17] p-8 rounded-2xl flex flex-col relative overflow-hidden text-left min-h-[280px]">
              <h3 className="text-2xl font-bold mb-4 z-10">Enjoy on your TV</h3>
              <p className="text-gray-300 text-sm md:text-base z-10">Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.</p>
              <Tv className="w-16 h-16 text-pink-500 absolute bottom-6 right-6 opacity-80" />
            </div>
            
            <div className="bg-gradient-to-br from-[#192247] to-[#210e17] p-8 rounded-2xl flex flex-col relative overflow-hidden text-left min-h-[280px]">
              <h3 className="text-2xl font-bold mb-4 z-10">Download your shows</h3>
              <p className="text-gray-300 text-sm md:text-base z-10">Save your favorites easily and always have something to watch.</p>
              <Download className="w-16 h-16 text-blue-500 absolute bottom-6 right-6 opacity-80" />
            </div>
            
            <div className="bg-gradient-to-br from-[#192247] to-[#210e17] p-8 rounded-2xl flex flex-col relative overflow-hidden text-left min-h-[280px]">
              <h3 className="text-2xl font-bold mb-4 z-10">Watch everywhere</h3>
              <p className="text-gray-300 text-sm md:text-base z-10">Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</p>
              <div className="absolute bottom-6 right-6 opacity-80">
                <svg className="w-16 h-16 text-purple-500" fill="currentColor" viewBox="0 0 24 24"><path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7v2H8v2h8v-2h-2v-2h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H3V4h18v12z"/></svg>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-[#192247] to-[#210e17] p-8 rounded-2xl flex flex-col relative overflow-hidden text-left min-h-[280px]">
              <h3 className="text-2xl font-bold mb-4 z-10">Create profiles for kids</h3>
              <p className="text-gray-300 text-sm md:text-base z-10">Send kids on adventures with their favorite characters in a space made just for them.</p>
              <Smile className="w-16 h-16 text-green-500 absolute bottom-6 right-6 opacity-80" />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="py-20 px-4 md:px-8 border-b-8 border-[#232323] bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-2 mb-12">
            {faqs.map((faq, index) => (
              <div key={index} className="flex flex-col">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center bg-[#2d2d2d] hover:bg-[#414141] transition-colors duration-200 p-6 text-xl md:text-2xl font-medium text-left"
                >
                  <span>{faq.question}</span>
                  <Plus 
                    className={`w-8 h-8 md:w-10 md:h-10 transform transition-transform duration-300 ease-in-out ${openFaq === index ? 'rotate-45' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.5, 0, 0.1, 1] }}
                      className="overflow-hidden bg-[#2d2d2d] mt-[1px]"
                    >
                      <div className="p-6 text-lg md:text-xl text-left whitespace-pre-wrap">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-lg md:text-xl mb-4 text-gray-300">Ready to watch? Enter your email to create or restart your membership.</p>
            <form onSubmit={handleGetStarted} className="flex flex-col md:flex-row justify-center gap-2 w-full max-w-2xl mx-auto mt-2">
              <div className="relative flex-1 group">
                <input 
                  type="email" 
                  className="w-full h-full px-4 pt-5 pb-2 bg-black/50 border border-gray-500 rounded focus:outline-none focus:border-white focus:ring-1 focus:ring-white text-white text-lg backdrop-blur-sm peer transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  required
                />
                <label 
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${email ? 'text-xs text-gray-300 font-semibold top-2' : 'text-base text-gray-400 top-4 peer-focus:text-xs peer-focus:text-gray-300 peer-focus:font-semibold peer-focus:top-2'}`}
                >
                  Email address
                </label>
              </div>
              <button 
                type="submit" 
                className="bg-netflix text-white px-8 py-3 md:py-4 rounded text-xl font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition duration-300 w-full md:w-auto mt-2 md:mt-0"
              >
                Get Started <ChevronRight className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
