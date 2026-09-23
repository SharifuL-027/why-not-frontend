import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import adminAxios from '../api/adminAxios';

// Reusable SVG Icon Components to keep JSX clean
const ArrowRightIcon = () => (
  <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const AdminIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>
);

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
);

const LogoutIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" /></svg>
);


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Authentication Query (Preserved from your code)
  const { data: user, isLoading } = useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const response = await adminAxios.get('/auth/me');
        return response.data.user;
      } catch (error) {
        return null; 
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
  });

  const handleLogout = async () => {
    try {
      await adminAxios.post('/auth/logout');
      queryClient.setQueryData(['authUser'], null); 
      navigate("/authpage");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b border-white/5 ${
          isScrolled 
            ? 'bg-[#0a1930]/95 backdrop-blur-md shadow-lg py-4' 
            : 'bg-[#0a1930] py-6'
        }`}
      >
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32 max-w-[1600px] mx-auto">
          <div className="flex justify-between items-center">
            
            {/* Logo Section */}
            <div className="shrink-0 flex items-center cursor-pointer">
              <Link 
                to="/" 
                className="font-serif font-bold text-2xl tracking-tight text-white transition-opacity hover:opacity-80 flex flex-col"
                onClick={() => setIsOpen(false)}
              >
                <span>WHY NOT YOU?</span>
                <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[#3c5685] font-sans -mt-1 font-normal">
                  Know Yourself • Change Yourself
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links (Preserved routes from your code: /tests, /image-quiz, /selection) */}
            <div className="hidden md:flex space-x-10 items-center">
              <Link 
                to="/tests" 
                className="font-medium text-white/80 hover:text-white hover:underline underline-offset-4 decoration-[#ffba12] transition-all text-sm uppercase tracking-wider"
              >
                Tests
              </Link>
              <Link 
                to="/image-quiz" 
                className="font-medium text-white/80 hover:text-white hover:underline underline-offset-4 decoration-[#ffba12] transition-all text-sm uppercase tracking-wider"
              >
                Image Quiz
              </Link>
              <Link 
                to="/selection" 
                className="font-medium text-white/80 hover:text-white hover:underline underline-offset-4 decoration-[#ffba12] transition-all text-sm uppercase tracking-wider"
              >
                Selection
              </Link>
            </div>

            {/* Desktop Auth & Call to Action (Book a session based on client design) */}
            <div className="hidden md:flex items-center space-x-6">
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-[#ffba12] border-t-transparent rounded-full animate-spin"></div>
              ) : user ? (
                <div className="flex items-center space-x-4 border-r border-[#3c5685]/30 pr-6">
                  {user.role === 'ADMIN' ? (
                    <Link to="/dashboard/admin/why-not-you" className="text-white/70 hover:text-[#ffba12] transition-colors" title="Admin Panel">
                      <AdminIcon />
                    </Link>
                  ) : (
                    <Link to="/profile" className="text-white/70 hover:text-[#ffba12] transition-colors" title="My Profile">
                      <ProfileIcon />
                    </Link>
                  )}
                  <button onClick={handleLogout} className="text-white/70 hover:text-red-400 transition-colors" title="Logout">
                    <LogoutIcon />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4 border-r border-[#3c5685]/30 pr-6">
                   <Link to="/authpage" className="font-medium text-white/80 hover:text-white text-sm">Sign In</Link>
                </div>
              )}

              {/* Client's Gold Action Button (Goes to /assessment) */}
              <button 
                onClick={() => navigate('/assessment')}
                className="group flex items-center bg-[#ffba12] text-[#0a1930] px-6 py-2.5 rounded-md font-bold text-sm hover:bg-white transition-all shadow-[0_4px_14px_rgba(255,186,18,0.2)]"
              >
                Book a session
                <ArrowRightIcon />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(true)}
                className="p-2 text-white hover:text-[#ffba12] transition-colors focus:outline-none"
                aria-label="Open menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#0a1930] flex flex-col"
          >
            <div className="flex justify-between items-center w-full px-6 py-6 border-b border-[#3c5685]/20">
               <Link 
                to="/" 
                className="font-serif font-bold text-xl tracking-tight text-white flex flex-col"
                onClick={() => setIsOpen(false)}
              >
                <span>WHY NOT YOU?</span>
              </Link>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 text-white/70 hover:text-white rounded-full bg-white/5 focus:outline-none"
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col flex-1 overflow-y-auto px-8 py-12 space-y-8">
              
              {/* Preserved Routes */}
              <div className="flex flex-col space-y-6 border-b border-[#3c5685]/20 pb-8">
                <Link to="/tests" onClick={() => setIsOpen(false)} className="text-2xl font-serif text-white hover:text-[#ffba12] transition-colors flex items-center justify-between">
                  Tests <span className="text-[#3c5685]">→</span>
                </Link>
                <Link to="/image-quiz" onClick={() => setIsOpen(false)} className="text-2xl font-serif text-white hover:text-[#ffba12] transition-colors flex items-center justify-between">
                  Image Quiz <span className="text-[#3c5685]">→</span>
                </Link>
                <Link to="/selection" onClick={() => setIsOpen(false)} className="text-2xl font-serif text-white hover:text-[#ffba12] transition-colors flex items-center justify-between">
                  Selection <span className="text-[#3c5685]">→</span>
                </Link>
              </div>

              {/* Preserved Auth Logic */}
              <div className="flex flex-col space-y-6 pb-8">
                {isLoading ? (
                   <div className="w-8 h-8 border-2 border-[#ffba12] border-t-transparent rounded-full animate-spin"></div>
                ) : user ? (
                  <>
                    {user.role === 'ADMIN' ? (
                      <Link to="/dashboard/admin/why-not-you" onClick={() => setIsOpen(false)} className="text-xl text-white/80 hover:text-white flex items-center gap-3">
                         <AdminIcon /> Admin Panel
                      </Link>
                    ) : (
                      <Link to="/profile" onClick={() => setIsOpen(false)} className="text-xl text-white/80 hover:text-white flex items-center gap-3">
                        <ProfileIcon /> My Profile
                      </Link>
                    )}
                    <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-xl text-red-400 hover:text-red-300 text-left flex items-center gap-3">
                      <LogoutIcon /> Logout
                    </button>
                  </>
                ) : (
                  <Link to="/authpage" onClick={() => setIsOpen(false)} className="text-xl text-white/80 hover:text-white">Sign In</Link>
                )}
              </div>

              <div className="mt-auto pt-8">
                <button 
                  onClick={() => {
                    setIsOpen(false);
                    navigate('/assessment');
                  }}
                  className="w-full bg-[#ffba12] text-[#0a1930] px-6 py-4 rounded-md font-bold text-lg hover:bg-white transition-all flex justify-center items-center gap-2"
                >
                  Book a session
                  <ArrowRightIcon />
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;