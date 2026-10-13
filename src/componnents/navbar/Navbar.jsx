import  { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import adminAxios from '../api/adminAxios'; // আপনার API পাথ ঠিক আছে কিনা চেক করবেন

// Reusable SVG Icon Components

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
  const location = useLocation(); 
  const queryClient = useQueryClient();

  // --- Sidebar Menu Data ---
  const menuItems = [
    { id: '01', label: 'Home', link: '/' }, 
    { id: '02', label: 'Online Assessment', link: '/tests' },
    { id: '03', label: 'Selection & Recruitment', link: '/selection' },
    { id: '04', label: 'Intelligence Assessment', link: '/image-quiz' },
    { id: '05', label: 'Art Therapy', link: '/arttherapy' },
    { id: '06', label: 'Online Counselling', link: '/counselling' },
    { id: '07', label: 'For Young Generation', link: '/young-generation' },
    { id: '08', label: 'Psychological Awareness', link: '/awareness' },
    { id: '09', label: 'About Us & Contacts', link: '/contact' },
  ];

  // Auth Query
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

  // Function to check if a menu item is active
  const isActive = (link) => {
    if (link === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(link);
  };

  return (
    <>
      {/* =========================================
          TOP NAVBAR (Fixed)
          ========================================= */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out border-b border-[#2C3338]/10 ${
          isScrolled 
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-sm py-2 lg:py-4'
            : 'bg-[#FAF7F2] py-3 lg:py-6'
        }`}
      >
        <div className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 max-w-[1600px] mx-auto">
          <div className="flex justify-between items-center">
            
            {/* Logo Section */}
            <div className="shrink-0 flex items-center cursor-pointer">
              <Link 
                to="/" 
                className="flex items-center gap-3 sm:gap-4 group transition-opacity hover:opacity-80"
                onClick={() => setIsOpen(false)}
              >
                {/* 1. Logo Image */}
                <img 
                  src="https://res.cloudinary.com/dsrs8hryx/image/upload/v1790161331/WhatsApp_Image_2026-08-17_at_12.05.48_AM-removebg-preview_o66w0p.png" 
                  alt="Why Not You Logo" 
                  className="h-10 sm:h-12 w-auto object-contain shrink-0" 
                />
                
                {/* 2. Text Container */}
                <div className="flex flex-col">
                  <span className="font-serif font-medium text-[18px] sm:text-xl tracking-tight text-[#2C3338] transition-colors">
                    WHY NOT YOU?
                  </span>
                </div>
              </Link>
            </div>

<<<<<<< HEAD
=======
            {/* Desktop Top Links */}
            <div className="hidden md:flex space-x-10 items-center">
              <Link to="/tests" className="font-medium text-white/80 hover:text-white hover:underline underline-offset-4 decoration-[#ffba12] transition-all text-sm uppercase tracking-wider">
                Tests
              </Link>
              <Link to="/image-quiz" className="font-medium text-white/80 hover:text-white hover:underline underline-offset-4 decoration-[#ffba12] transition-all text-sm uppercase tracking-wider">
                Image Quiz
              </Link>
              <Link to="/selection" className="font-medium text-white/80 hover:text-white hover:underline underline-offset-4 decoration-[#ffba12] transition-all text-sm uppercase tracking-wider">
                Selection
              </Link>
            </div>

>>>>>>> e309ce99c998c2146d7453447277bcdb4d961f9c
            {/* Desktop Auth & Call to Action */}
            <div className="hidden md:flex items-center space-x-6">
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-[#D4BCA6] border-t-transparent rounded-full animate-spin"></div>
              ) : user ? (
                <div className="flex items-center space-x-4 border-r border-[#2C3338]/20 pr-6">
                  {user.role === 'ADMIN' && (
                    <Link to="/dashboard/admin/why-not-you" className="text-[#596573] hover:text-[#D4BCA6] transition-colors" title="Admin Panel"><AdminIcon /></Link>
                  ) }
                  <button onClick={handleLogout} className="text-[#596573] hover:text-red-500 transition-colors" title="Logout"><LogoutIcon /></button>
                </div>
              ) : (
                <div className="flex items-center space-x-4 border-r border-[#2C3338]/20 pr-6">
                   <Link to="/authpage" className="font-medium text-[#596573] hover:text-[#2C3338] text-sm uppercase tracking-wider">Sign In</Link>
                </div>
              )}

             <motion.div
              initial={{ opacity: 0, y: -80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            >
              <button 
                onClick={() => navigate('/form')}
                className="flex items-center justify-center gap-2.5 bg-[#C8D0C0] text-[#2C3338] text-[13px] px-8 py-3.5 rounded-sm font-medium uppercase tracking-widest hover:bg-[#b5bead] transition-all duration-300 shadow-sm"
              >
                <span>Book a Session</span>
              </button>
            </motion.div>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(true)}
                className="p-2 text-[#2C3338] hover:text-[#D4BCA6] transition-colors focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* =========================================
          DESKTOP SIDEBAR (Fixed to Left)
          ========================================= */}
      <aside className="hidden lg:flex fixed left-0 top-0 flex-col w-[320px] bg-[#FAF7F2] h-screen border-r border-[#2C3338]/10 pt-32 px-6 z-40">
        <h3 className="text-xs font-bold tracking-[0.15em] text-[#D4BCA6] uppercase mb-6 ml-4">
          Pages
        </h3>
        <ul className="flex flex-col space-y-1 overflow-y-auto pb-6 custom-scrollbar">
          {menuItems.map((item) => {
            const active = isActive(item.link);
            return (
              <li key={item.id}>
                <Link
                  to={item.link}
                  className={`w-full flex items-center text-left gap-4 px-4 py-3.5 rounded-sm transition-all duration-300 ${
                    active 
                      ? 'bg-[#EAEFF0] text-[#2C3338] shadow-sm border border-[#C8D0C0]/50' 
                      : 'text-[#596573] hover:bg-[#EDE5DA] hover:text-[#2C3338]' 
                  }`}
                >
                  <span className={`text-sm font-medium ${active ? 'text-[#C8D0C0]' : 'text-[#A0AAB2]'}`}>
                    {item.id}
                  </span>
                  <span className={`font-medium text-[14px] uppercase tracking-wider leading-tight pr-4 ${active ? 'font-bold' : ''}`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* =========================================
          FULL-SCREEN MOBILE MENU OVERLAY (Hamburger Menu)
          ========================================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#FAF7F2] flex flex-col"
          >
            {/* Overlay Header */}
            <div className="flex justify-between items-center w-full px-6 py-5 border-b border-[#2C3338]/10">
               <Link to="/" className="font-serif font-bold text-xl tracking-tight text-[#2C3338] flex flex-col" onClick={() => setIsOpen(false)}>
                <span>WHY NOT YOU?</span>
              </Link>
              <button onClick={() => setIsOpen(false)} className="p-2 text-[#596573] hover:text-[#2C3338] rounded-full bg-[#EDE5DA] focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Overlay Body (Scrollable) */}
            <div className="flex flex-col flex-1 overflow-y-auto px-6 py-8 space-y-8">
              
              {/* All Menu Links */}
              <div className="flex flex-col space-y-6 border-b border-[#2C3338]/10 pb-8">
                {menuItems.map((item) => {
                  const active = isActive(item.link);
                  return (
                    <Link 
                      key={item.id} 
                      to={item.link} 
                      onClick={() => setIsOpen(false)} 
                      className={`flex items-center justify-between transition-colors group ${
                        active ? 'text-[#D4BCA6]' : 'text-[#2C3338] hover:text-[#D4BCA6]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className={`text-xs font-sans font-bold tracking-widest ${active ? 'text-[#D4BCA6]' : 'text-[#A0AAB2]'}`}>
                          {item.id}
                        </span>
                        <span className="text-xl font-serif leading-tight">
                          {item.label}
                        </span>
                      </div>
                      <span className={`text-sm transition-transform duration-300 group-hover:translate-x-1 ${active ? 'text-[#D4BCA6]' : 'text-[#A0AAB2]'}`}>
                        →
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Auth / Profile Links */}
              <div className="flex flex-col space-y-6 pb-8">
                {isLoading ? (
                   <div className="w-8 h-8 border-2 border-[#D4BCA6] border-t-transparent rounded-full animate-spin"></div>
                ) : user ? (
                  <>
                    {user.role === 'ADMIN' ? (
                      <Link to="/dashboard/admin/why-not-you" onClick={() => setIsOpen(false)} className="text-xl font-serif text-[#596573] hover:text-[#2C3338] flex items-center gap-3"><AdminIcon /> Admin Panel</Link>
                    ) : (
                      <Link to="/profile" onClick={() => setIsOpen(false)} className="text-xl font-serif text-[#596573] hover:text-[#2C3338] flex items-center gap-3"><ProfileIcon /> My Profile</Link>
                    )}
                    <button onClick={() => { handleLogout(); setIsOpen(false); }} className="text-xl font-serif text-red-500 hover:text-red-600 text-left flex items-center gap-3"><LogoutIcon /> Logout</button>
                  </>
                ) : (
                  <Link to="/authpage" onClick={() => setIsOpen(false)} className="text-xl font-serif text-[#596573] hover:text-[#2C3338] uppercase tracking-wider font-medium">Sign In</Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;