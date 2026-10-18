import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E5DFCF]/80 py-10 bg-[#F4F1E6]/75">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3.5">
          <span className="font-bold text-[1.1rem] text-[#181816] tracking-tight">
            ParallelFlow
          </span>
          <span className="text-[0.88rem] text-[#635D4F] sm:border-l sm:border-[#DCD5C2] sm:pl-3.5 font-normal">
            AI that works with the team, not just with you.
          </span>
        </div>

        <div className="text-[0.82rem] text-[#868070] font-normal">
          <span>&copy; {new Date().getFullYear()} ParallelFlow Technologies Inc.</span>
        </div>
      </div>
    </footer>
  );
};
