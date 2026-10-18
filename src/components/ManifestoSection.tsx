import React from 'react';

interface ManifestoItem {
  number: string;
  title: string;
  description: string;
  bgClass: string;
  borderClass: string;
  badgeBgClass: string;
}

const LEFT_MANIFESTO_ITEMS: ManifestoItem[] = [
  {
    number: '01',
    title: "Your team shouldn't repeat itself to AI.",
    description: 'Today, every person explains the same project again and again. Context should be told once.',
    bgClass: 'bg-[#E5D8B5]',
    borderClass: 'border-[#CEBF96]',
    badgeBgClass: 'bg-[#D6C498] text-[#4F3E1B]',
  },
  {
    number: '02',
    title: "Good answers shouldn't stay locked.",
    description: 'The best idea of the week often sits in a private window. Work should be easy to share.',
    bgClass: 'bg-[#CBE0CC]',
    borderClass: 'border-[#A6C4A8]',
    badgeBgClass: 'bg-[#B1D4B3] text-[#1A4B24]',
  },
  {
    number: '03',
    title: 'AI should hear the whole conversation.',
    description: 'An AI that only knows what one person typed gives answers that miss what the team already decided.',
    bgClass: 'bg-[#E5D8B5]',
    borderClass: 'border-[#CEBF96]',
    badgeBgClass: 'bg-[#D6C498] text-[#4F3E1B]',
  },
  {
    number: '04',
    title: 'Decisions should be remembered.',
    description: "The AI should hold the team's memory: what was decided, by whom, and why.",
    bgClass: 'bg-[#CBE0CC]',
    borderClass: 'border-[#A6C4A8]',
    badgeBgClass: 'bg-[#B1D4B3] text-[#1A4B24]',
  },
  {
    number: '05',
    title: 'Everyone deserves a private place to think.',
    description: "You should be able to think and draft on your own, then share only what's ready.",
    bgClass: 'bg-[#E5D8B5]',
    borderClass: 'border-[#CEBF96]',
    badgeBgClass: 'bg-[#D6C498] text-[#4F3E1B]',
  },
];

const RIGHT_MANIFESTO_ITEMS: ManifestoItem[] = [
  {
    number: '06',
    title: 'Sharing should take one click.',
    description: "Moving work from a chat window shouldn't mean copying, reformatting, and explaining again.",
    bgClass: 'bg-[#CBE0CC]',
    borderClass: 'border-[#A6C4A8]',
    badgeBgClass: 'bg-[#B1D4B3] text-[#1A4B24]',
  },
  {
    number: '07',
    title: 'AI should do real work, and people should approve it.',
    description: 'The AI does the work and a person signs it off.',
    bgClass: 'bg-[#E5D8B5]',
    borderClass: 'border-[#CEBF96]',
    badgeBgClass: 'bg-[#D6C498] text-[#4F3E1B]',
  },
  {
    number: '08',
    title: 'Every team works differently.',
    description: 'Fixed job titles never match how a real team works. Teams should set their own roles.',
    bgClass: 'bg-[#CBE0CC]',
    borderClass: 'border-[#A6C4A8]',
    badgeBgClass: 'bg-[#B1D4B3] text-[#1A4B24]',
  },
  {
    number: '09',
    title: 'Progress should be visible to everyone.',
    description: "One shared space shows where things are and what's blocking them.",
    bgClass: 'bg-[#E5D8B5]',
    borderClass: 'border-[#CEBF96]',
    badgeBgClass: 'bg-[#D6C498] text-[#4F3E1B]',
  },
  {
    number: '10',
    title: 'Building is a loop, not a straight line.',
    description: "A product isn't done at launch. Feedback, fixes, and new ideas keep coming.",
    bgClass: 'bg-[#CBE0CC]',
    borderClass: 'border-[#A6C4A8]',
    badgeBgClass: 'bg-[#B1D4B3] text-[#1A4B24]',
  },
];

export const ManifestoSection: React.FC = () => {
  return (
    <section id="manifesto" className="py-16 sm:py-24 border-t border-[#E5DFCF]/70 scroll-mt-20 relative">
      {/* Subtle ambient light blur */}
      <div className="absolute top-1/4 right-8 w-96 h-96 bg-[radial-gradient(circle,rgba(203,224,204,0.6)_0%,transparent_70%)] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-8 w-96 h-96 bg-[radial-gradient(circle,rgba(229,216,181,0.6)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-[820px] mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#EBF4EC] border border-[#D0E5D3] text-[#376945] text-[0.72rem] font-bold tracking-[0.1em] uppercase mb-5 shadow-[0_1px_3px_rgba(40,35,20,0.04)]">
            THE MANIFESTO
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[2.35rem] font-extrabold leading-[1.2] tracking-tight text-[#171715] text-balance">
            The ParallelFlow Manifesto — AI should work with the team, not just with you.
          </h2>
        </div>

        {/* 3-Step Flow Diagram - Darker, Richer 2 Colors */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4.5 my-10 sm:my-14 max-w-[760px] mx-auto">
          <div className="flex-1 w-full sm:w-auto bg-[#E5D8B5] hover:bg-white border border-[#CEBF96] hover:border-[#B5A475] rounded-xl p-4.5 text-center shadow-[0_3px_12px_rgba(40,35,20,0.04)] hover:shadow-[0_8px_22px_rgba(40,35,20,0.07)] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center min-h-[68px]">
            <span className="text-[0.98rem] font-bold text-[#181816] leading-tight">
              Isolated Individual Chats
            </span>
          </div>

          <div className="text-[#3E744E] font-bold text-xl rotate-90 sm:rotate-0 select-none">
            →
          </div>

          <div className="flex-1 w-full sm:w-auto bg-[#CBE0CC] hover:bg-white border border-[#A6C4A8] hover:border-[#86AD89] rounded-xl p-4.5 text-center shadow-[0_3px_12px_rgba(40,35,20,0.04)] hover:shadow-[0_8px_22px_rgba(40,35,20,0.07)] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center min-h-[68px] ring-1 ring-emerald-500/20">
            <span className="text-[0.98rem] font-bold text-[#181816] leading-tight">
              Combined Team-Wide AI Memory
            </span>
          </div>

          <div className="text-[#3E744E] font-bold text-xl rotate-90 sm:rotate-0 select-none">
            →
          </div>

          <div className="flex-1 w-full sm:w-auto bg-[#E5D8B5] hover:bg-white border border-[#CEBF96] hover:border-[#B5A475] rounded-xl p-4.5 text-center shadow-[0_3px_12px_rgba(40,35,20,0.04)] hover:shadow-[0_8px_22px_rgba(40,35,20,0.07)] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center min-h-[68px]">
            <span className="text-[0.98rem] font-bold text-[#181816] leading-tight">
              Human Approval Flow
            </span>
          </div>
        </div>

        {/* 2-Column Manifesto Items - Darker, Richer 2 Colors Alternating */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 max-w-[940px] mx-auto">
          {/* Left Column */}
          <div className="flex flex-col gap-4.5">
            {LEFT_MANIFESTO_ITEMS.map((item, idx) => (
              <div 
                key={idx} 
                className={`${item.bgClass} ${item.borderClass} border rounded-xl p-5 shadow-[0_2px_8px_rgba(40,35,20,0.035)] hover:shadow-[0_8px_22px_rgba(40,35,20,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className={`px-2 py-0.5 rounded-md text-[0.7rem] font-mono font-bold tracking-wider ${item.badgeBgClass} shadow-2xs`}>
                      {item.number}
                    </span>
                    <h4 className="text-[1.02rem] font-bold text-[#181816] tracking-tight leading-snug">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-[0.88rem] text-[#3A3528] leading-[1.55] pl-8">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4.5">
            {RIGHT_MANIFESTO_ITEMS.map((item, idx) => (
              <div 
                key={idx} 
                className={`${item.bgClass} ${item.borderClass} border rounded-xl p-5 shadow-[0_2px_8px_rgba(40,35,20,0.035)] hover:shadow-[0_8px_22px_rgba(40,35,20,0.08)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className={`px-2 py-0.5 rounded-md text-[0.7rem] font-mono font-bold tracking-wider ${item.badgeBgClass} shadow-2xs`}>
                      {item.number}
                    </span>
                    <h4 className="text-[1.02rem] font-bold text-[#181816] tracking-tight leading-snug">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-[0.88rem] text-[#3A3528] leading-[1.55] pl-8">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
