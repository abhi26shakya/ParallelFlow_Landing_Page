import React from 'react';

export const Navbar: React.FC = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F7F5EC]/85 backdrop-blur-md border-b border-[#E5DFCF]/80 py-4 transition-all duration-200">
      <div className="max-w-[1000px] mx-auto px-6 flex items-center justify-between">
        <a 
          href="#" 
          className="inline-flex items-center gap-1.5 font-bold text-[1.3rem] tracking-tight text-[#181816] hover:opacity-85 transition-opacity group cursor-pointer"
          onClick={(e) => { 
            e.preventDefault(); 
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
          }}
        >
          <span>ParallelFlow</span>
          <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1 font-semibold text-[#254431]">
            →
          </span>
        </a>

        <nav className="flex items-center gap-4 sm:gap-7">
          <button 
            type="button" 
            className="hidden sm:inline-block text-[0.9rem] font-medium text-[#454138] hover:text-[#254431] transition-colors py-1 px-1 cursor-pointer"
            onClick={() => scrollToSection('problem')}
          >
            The Problem
          </button>
          
          <button 
            type="button" 
            className="text-[0.9rem] font-medium text-[#454138] hover:text-[#254431] transition-colors py-1 px-1 cursor-pointer"
            onClick={() => scrollToSection('manifesto')}
          >
            The Manifesto
          </button>

          <button 
            type="button" 
            className="bg-[#254431] hover:bg-[#1C3526] text-white px-5 py-2 rounded-full text-[0.88rem] font-semibold tracking-tight ring-1 ring-inset ring-white/15 shadow-[0_2px_8px_rgba(37,68,49,0.2)] hover:shadow-[0_6px_16px_rgba(37,68,49,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
            onClick={() => scrollToSection('waitlist')}
          >
            Join Waitlist
          </button>
        </nav>
      </div>
    </header>
  );
};
