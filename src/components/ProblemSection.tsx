import React from 'react';

interface ProblemCard {
  title: string;
  description: string;
  bgClass: string;
  borderClass: string;
}

const TOP_ROW_CARDS: ProblemCard[] = [
  {
    title: 'Too much time goes into explaining.',
    description: 'Before AI can help, someone has to describe the project, paste documents, and repeat what the team already decided.',
    bgClass: 'bg-[#E5D8B5]',
    borderClass: 'border-[#CEBF96]',
  },
  {
    title: "Individual work and team work don't connect.",
    description: 'Ideas take shape in private chats, but getting them to the team means copying, pasting, and explaining all over again.',
    bgClass: 'bg-[#CBE0CC]',
    borderClass: 'border-[#A6C4A8]',
  },
  {
    title: 'Shared tools make teams work their way, not yours.',
    description: 'The few shared spaces that exist come with fixed workflows, roles, and steps.',
    bgClass: 'bg-[#E5D8B5]',
    borderClass: 'border-[#CEBF96]',
  },
  {
    title: 'Work is scattered across too many apps.',
    description: 'Discussions happen in chat, plans in documents, tasks in a tracker, and AI in yet another tab.',
    bgClass: 'bg-[#CBE0CC]',
    borderClass: 'border-[#A6C4A8]',
  },
];

const BOTTOM_ROW_CARDS: ProblemCard[] = [
  {
    title: 'Decisions get lost.',
    description: 'Teams decide things in meetings and threads, and weeks later nobody can find what was decided or why.',
    bgClass: 'bg-[#E5D8B5]',
    borderClass: 'border-[#CEBF96]',
  },
  {
    title: 'No one is sure what AI produced.',
    description: 'AI-made work moves into the team with no clear review. Nobody knows what the AI wrote or who approved it.',
    bgClass: 'bg-[#CBE0CC]',
    borderClass: 'border-[#A6C4A8]',
  },
  {
    title: 'New teammates start from zero.',
    description: "When someone joins, the project's history lives in other people's heads and chat logs.",
    bgClass: 'bg-[#E5D8B5]',
    borderClass: 'border-[#CEBF96]',
  },
];

export const ProblemSection: React.FC = () => {
  return (
    <section id="problem" className="py-14 sm:py-20 scroll-mt-20 relative">
      {/* Delicate background ambient light blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(240,246,238,0.7)_0%,rgba(254,249,240,0.5)_50%,transparent_75%)] pointer-events-none -z-10" />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-[800px] mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#E5D8B5] border border-[#CEBF96] text-[#554625] text-[0.72rem] font-bold tracking-[0.1em] uppercase mb-5 shadow-[0_1px_3px_rgba(40,35,20,0.04)]">
            THE PROBLEM
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-[2.65rem] font-extrabold leading-[1.17] tracking-tight text-[#171715] text-balance">
            AI has made individuals faster. It hasn’t made teams work better together.
          </h1>
        </div>

        {/* 4 Cards Top Row - 2 Darker, Richer Colors Alternating */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5 mb-4.5">
          {TOP_ROW_CARDS.map((card, idx) => (
            <div 
              key={idx} 
              className={`${card.bgClass} ${card.borderClass} border rounded-xl p-5 shadow-[0_3px_12px_rgba(40,35,20,0.04),0_1px_2px_rgba(40,35,20,0.02)] hover:shadow-[0_12px_28px_rgba(40,35,20,0.09),0_2px_6px_rgba(40,35,20,0.03)] hover:-translate-y-1 transition-all duration-200 ease-out flex flex-col h-full`}
            >
              <h3 className="text-[1.02rem] font-bold text-[#181816] leading-snug tracking-tight mb-2.5">
                {card.title}
              </h3>
              <p className="text-[0.875rem] text-[#3A3528] leading-[1.55] flex-grow">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* 3 Cards Bottom Row - Centered with 2 Darker, Richer Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4.5 max-w-[840px] mx-auto">
          {BOTTOM_ROW_CARDS.map((card, idx) => (
            <div 
              key={idx} 
              className={`${card.bgClass} ${card.borderClass} border rounded-xl p-5 shadow-[0_3px_12px_rgba(40,35,20,0.04),0_1px_2px_rgba(40,35,20,0.02)] hover:shadow-[0_12px_28px_rgba(40,35,20,0.09),0_2px_6px_rgba(40,35,20,0.03)] hover:-translate-y-1 transition-all duration-200 ease-out flex flex-col h-full`}
            >
              <h3 className="text-[1.02rem] font-bold text-[#181816] leading-snug tracking-tight mb-2.5">
                {card.title}
              </h3>
              <p className="text-[0.875rem] text-[#3A3528] leading-[1.55] flex-grow">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
