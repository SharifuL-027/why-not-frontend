import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import adminAxios from '../api/adminAxios';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${isScrolled ? 'bg-[#FCFBF9]/95 backdrop-blur-md border-b border-[#1A6BBA]/10 shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="flex justify-between items-center">
            
            <div className="shrink-0 flex items-center cursor-pointer">
              <Link to="/" className="font-sans font-bold text-2xl tracking-tight text-[#0A1930] transition-colors hover:opacity-80 flex items-center gap-1">
                Why not <span className="bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] bg-clip-text text-transparent font-semibold">you</span>
              </Link>
            </div>

            <div className="hidden md:flex space-x-8 items-center">
              <Link to="/tests" className="font-medium text-[#0A1930]/80 hover:text-[#1A6BBA] transition-colors">Tests</Link>
              <Link to="/image-quiz" className="font-medium text-[#0A1930]/80 hover:text-[#1A6BBA] transition-colors">Image Quiz</Link>
              <Link to="/selection" className="font-medium text-[#0A1930]/80 hover:text-[#1A6BBA] transition-colors">Selection</Link>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-[#1A6BBA] border-t-transparent rounded-full animate-spin"></div>
              ) : user ? (
                <div className="flex items-center space-x-4">
                  {user.role === 'ADMIN' ? (
                    <Link to="/dashboard/admin/why-not-you" className="text-[#0A1930]/80 hover:text-[#1A6BBA] transition-colors" title="Admin Panel">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" /></svg>
                    </Link>
                  ) : (
                    <Link to="/profile" className="text-[#0A1930]/80 hover:text-[#1A6BBA] transition-colors" title="My Profile">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    </Link>
                  )}
                  <button onClick={handleLogout} className="font-medium text-[#0A1930]/80 hover:text-red-500 transition-colors" title="Logout">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" /></svg>
                  </button>
                </div>
              ) : (
                <Link to="/authpage" className="font-medium text-[#0A1930]/80 hover:text-[#1A6BBA] transition-colors">Log in</Link>
              )}

              <button onClick={() => navigate('/assessment')} className="bg-linear-to-r from-[#1A6BBA] to-[#5DBB4D] text-white px-6 py-2.5 rounded-full font-semibold hover:scale-105 transition-all shadow-[0_4px_10px_rgba(26,107,186,0.2)]">
                Start Assessment
              </button>
            </div>
            
            {/* Mobile Menu Button - Same as your code */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(true)} className="p-2.5 bg-[#1A6BBA]/5 rounded-full"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg></button>
            </div>
          </div>
        </div>
      </nav>


      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-60 bg-[#FCFBF9] flex flex-col">
            <div className="flex justify-between items-center w-full px-6 py-6 border-b border-[#1A6BBA]/10">
              <Link to="/" onClick={() => setIsOpen(false)} className="font-bold text-2xl">Why not you</Link>
              <button onClick={() => setIsOpen(false)} className="p-2.5 rounded-full bg-[#1A6BBA]/5"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            
            <div className="flex flex-col items-center justify-center flex-1 space-y-10">
              <Link to="/tests" onClick={() => setIsOpen(false)} className="text-3xl font-serif">Tests</Link>
              <Link to="/image-quiz" onClick={() => setIsOpen(false)} className="text-3xl font-serif">Image Quiz</Link>
              <Link to="/selection" onClick={() => setIsOpen(false)} className="text-3xl font-serif">Selection</Link>

              {isLoading ? (
                 <div className="w-8 h-8 border-2 border-[#1A6BBA] border-t-transparent rounded-full animate-spin"></div>
              ) : user ? (
                <>
                  {user.role === 'ADMIN' ? (
                    <Link to="/dashboard/admin/why-not-you" onClick={() => setIsOpen(false)} className="text-3xl font-serif">Admin Panel</Link>
                  ) : (
                    <Link to="/profile" onClick={() => setIsOpen(false)} className="text-3xl font-serif">My Profile</Link>
                  )}
                  <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-3xl font-serif text-red-500">Logout</button>
                </>
              ) : (
                <Link to="/authpage" onClick={() => setIsOpen(false)} className="text-3xl font-serif">Log in</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;