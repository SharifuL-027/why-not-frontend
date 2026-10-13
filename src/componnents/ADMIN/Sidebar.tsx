import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard/admin/why-not-you",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    { 
      title: "Image Quiz", 
      path: "/dashboard/admin/why-not-you/image-quiz", 
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ) 
    },
    /* ============ Selection Battery (AM Battery) সেকশন ============ */
    {
      title: "Selection Batteries",
      path: "/dashboard/admin/why-not-you/am-battery",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3m4-14h6m-6 4h6m-6 4h4"
          />
        </svg>
      ),
    },
    {
      title: "New Battery",
      path: "/dashboard/admin/why-not-you/am-battery/create",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    /* ============ নতুন সেকশন শেষ ============ */
    {
      title: "All Users",
      path: "/dashboard/admin/why-not-you/all-users",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="md:hidden flex items-center justify-between bg-white text-[#222222] p-4 border-b border-[#EFECE5] shadow-sm">
        <span className="font-bold font-serif text-xl tracking-wide">Admin Panel</span>
        <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none hover:text-[#A38771] transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#222222] bg-opacity-40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-[#F9F6F0] border-r border-[#EFECE5] text-[#222222] transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } min-h-screen flex flex-col shadow-[10px_0_30px_rgba(0,0,0,0.02)] md:shadow-none`}
      >
        {/* Desktop Header */}
        <div className="p-6 border-b border-[#EFECE5] hidden md:block">
          <h2 className="text-2xl font-bold font-serif text-[#222222] tracking-wide">
            Admin Panel
          </h2>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/dashboard/admin/why-not-you" || item.path === "/dashboard/admin/why-not-you/am-battery"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-sm transition-all duration-200 border ${
                  isActive
                    ? "bg-white text-[#A38771] border-[#EFECE5] shadow-sm font-bold"
                    : "text-[#4A4A4A] border-transparent hover:bg-white/60 hover:text-[#222222]"
                }`
              }
            >
              {item.icon}
              <span className="font-medium text-sm tracking-wide">{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section: Back to Website Button */}
        <div className="p-4 border-t border-[#EFECE5] bg-[#F9F6F0]">
          <Link 
            to="/" 
            className="w-full flex items-center justify-center gap-2 bg-[#222222] hover:bg-[#4A4A4A] text-[#F9F6F0] transition-colors duration-300 py-3.5 px-4 rounded-sm shadow-sm group"
          >
            <svg 
              className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest mt-0.5">Back to Website</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;