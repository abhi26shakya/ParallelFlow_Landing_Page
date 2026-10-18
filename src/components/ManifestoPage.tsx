import React from 'react';
import { ArrowLeft, Sparkles, ArrowRight } from 'lucide-react';

interface ManifestoPageProps {
  onNavigateHome: (targetSection?: string) => void;
}

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
    bgClass: 'bg-[#FDF6EA]',
    borderClass: 'border-[#EFE2C5]',
    badgeBgClass: 'bg-[#F6ECD4] text-[#8C5D1F]',
  },
  {
    number: '02',
    title: "Good answers shouldn't stay locked.",
    description: 'The best idea of the week often sits in a private window. Work should be easy to share.',
    bgClass: 'bg-[#EFF5FA]',
    borderClass: 'border-[#D5E3F0]',
    badgeBgClass: 'bg-[#E1EDF7] text-[#295F8D]',
  },
  {
    number: '03',
    title: 'AI should hear the whole conversation.',
    description: 'An AI that only knows what one person typed gives answers that miss what the team already decided.',
    bgClass: 'bg-[#EEF6EF]',
    borderClass: 'border-[#D4E7D6]',
    badgeBgClass: 'bg-[#DEF0E1] text-[#296D3F]',
  },
  {
    number: '04',
    title: 'Decisions should be remembered.',
    description: "The AI should hold the team's memory: what was decided, by whom, and why.",
    bgClass: 'bg-[#FAF2EB]',
    borderClass: 'border-[#EEDDCE]',
    badgeBgClass: 'bg-[#F6E8DC] text-[#8F5528]',
  },
  {
    number: '05',
    title: 'Everyone deserves a private place to think.',
    description: "You should be able to think and draft on your own, then share only what's ready.",
    bgClass: 'bg-[#F6F2FB]',
    borderClass: 'border-[#E4D8F3]',
    badgeBgClass: 'bg-[#EDE4F8] text-[#633C94]',
  },
];

const RIGHT_MANIFESTO_ITEMS: ManifestoItem[] = [
  {
    number: '06',
    title: 'Sharing should take one click.',
    description: "Moving work from a chat window shouldn't mean copying, reformatting, and explaining again.",
    bgClass: 'bg-[#EEF7F4]',
    borderClass: 'border-[#CEE7DE]',
    badgeBgClass: 'bg-[#DDF0E8] text-[#2B6D4F]',
  },
  {
    number: '07',
    title: 'AI should do real work, and people should approve it.',
    description: 'The AI does the work and a person signs it off.',
    bgClass: 'bg-[#FAF1F0]',
    borderClass: 'border-[#EEDCD9]',
    badgeBgClass: 'bg-[#F6E6E3] text-[#934538]',
  },
  {
    number: '08',
    title: 'Every team works differently.',
    description: 'Fixed job titles never match how a real team works. Teams should set their own roles.',
    bgClass: 'bg-[#FAF6E6]',
    borderClass: 'border-[#ECE2C1]',
    badgeBgClass: 'bg-[#F6EECD] text-[#7F6715]',
  },
  {
    number: '09',
    title: 'Progress should be visible to everyone.',
    description: "One shared space shows where things are and what's blocking them.",
    bgClass: 'bg-[#EEF5F7]',
    borderClass: 'border-[#D3E5EB]',
    badgeBgClass: 'bg-[#DFEDF2] text-[#28647D]',
  },
  {
    number: '10',
    title: 'Building is a loop, not a straight line.',
    description: "A product isn't done at launch. Feedback, fixes, and new ideas keep coming.",
    bgClass: 'bg-[#FAF2EE]',
    borderClass: 'border-[#EFDED8]',
    badgeBgClass: 'bg-[#F7E7E0] text-[#91462D]',
  },
];

export const ManifestoPage: React.FC<ManifestoPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="min-h-screen py-10 sm:py-16 animate-in fade-in duration-300 relative">
      {/* Subtle ambient light blur */}
      <div className="absolute top-1/4 right-8 w-96 h-96 bg-[radial-gradient(circle,rgba(235,247,240,0.7)_0%,transparent_70%)] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-8 w-96 h-96 bg-[radial-gradient(circle,rgba(254,246,235,0.7)_0%,transparent_70%)] pointer-events-none -z-10" />

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        
        {/* Back Navigation Breadcrumb */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => onNavigateHome()}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#57534A] hover:text-[#254431] px-3.5 py-2 rounded-lg bg-[#FAF8F2] hover:bg-white border border-[#E3DEC9] hover:border-[#D0C7AC] transition-all shadow-xs cursor-pointer group"
          >
            <ArrowLeft size={15} className="transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-[840px] mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#EBF4EC] border border-[#D0E5D3] text-[#376945] text-[0.74rem] font-bold tracking-[0.1em] uppercase mb-5 shadow-[0_1px_3px_rgba(40,35,20,0.04)]">
            THE MANIFESTO
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold leading-[1.18] tracking-tight text-[#171715] text-balance">
            The ParallelFlow Manifesto — AI should work with the team, not just with you.
          </h1>
          <p className="text-sm sm:text-base text-[#615B4E] mt-4 max-w-[640px] mx-auto leading-relaxed">
            The fundamental principles of how modern software engineering teams coordinate intelligence, context, and human agency in the age of AI.
          </p>
        </div>

        {/* 3-Step Flow Diagram - Light Colorful Pastels */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4.5 my-10 sm:my-16 max-w-[760px] mx-auto">
          <div className="flex-1 w-full sm:w-auto bg-[#EFF5FA] hover:bg-white border border-[#D5E3F0] hover:border-[#B8D2E8] rounded-xl p-5 text-center shadow-[0_3px_12px_rgba(40,35,20,0.04)] hover:shadow-[0_8px_22px_rgba(40,35,20,0.07)] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center min-h-[72px]">
            <span className="text-[1rem] font-bold text-[#181816] leading-tight">
              Isolated Individual Chats
            </span>
          </div>

          <div className="text-[#3E744E] font-bold text-xl rotate-90 sm:rotate-0 select-none">
            →
          </div>

          <div className="flex-1 w-full sm:w-auto bg-[#EEF6EF] hover:bg-white border border-[#CDE5D3] hover:border-[#ACD6B6] rounded-xl p-5 text-center shadow-[0_3px_12px_rgba(40,35,20,0.04)] hover:shadow-[0_8px_22px_rgba(40,35,20,0.07)] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center min-h-[72px] ring-1 ring-emerald-500/15">
            <span className="text-[1rem] font-bold text-[#181816] leading-tight">
              Combined Team-Wide AI Memory
            </span>
          </div>

          <div className="text-[#3E744E] font-bold text-xl rotate-90 sm:rotate-0 select-none">
            →
          </div>

          <div className="flex-1 w-full sm:w-auto bg-[#FAF2EB] hover:bg-white border border-[#EEDDCE] hover:border-[#DEC5B0] rounded-xl p-5 text-center shadow-[0_3px_12px_rgba(40,35,20,0.04)] hover:shadow-[0_8px_22px_rgba(40,35,20,0.07)] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center min-h-[72px]">
            <span className="text-[1rem] font-bold text-[#181816] leading-tight">
              Human Approval Flow
            </span>
          </div>
        </div>

        {/* 2-Column Manifesto Items - Light Pastel Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 max-w-[940px] mx-auto">
          {/* Left Column */}
          <div className="flex flex-col gap-4.5">
            {LEFT_MANIFESTO_ITEMS.map((item, idx) => (
              <div 
                key={idx} 
                className={`${item.bgClass} ${item.borderClass} border rounded-xl p-5 shadow-[0_2px_8px_rgba(40,35,20,0.03)] hover:shadow-[0_8px_22px_rgba(40,35,20,0.07)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className={`px-2 py-0.5 rounded-md text-[0.7rem] font-mono font-bold tracking-wider ${item.badgeBgClass} shadow-2xs`}>
                      {item.number}
                    </span>
                    <h3 className="text-[1.04rem] font-bold text-[#181816] tracking-tight leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[0.88rem] text-[#554F42] leading-[1.55] pl-8">
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
                className={`${item.bgClass} ${item.borderClass} border rounded-xl p-5 shadow-[0_2px_8px_rgba(40,35,20,0.03)] hover:shadow-[0_8px_22px_rgba(40,35,20,0.07)] hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-2">
                    <span className={`px-2 py-0.5 rounded-md text-[0.7rem] font-mono font-bold tracking-wider ${item.badgeBgClass} shadow-2xs`}>
                      {item.number}
                    </span>
                    <h3 className="text-[1.04rem] font-bold text-[#181816] tracking-tight leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[0.88rem] text-[#554F42] leading-[1.55] pl-8">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Call to Action Card */}
        <div className="mt-14 sm:mt-18 text-center bg-[#1E3024] border border-[#314B38] rounded-2xl p-8 sm:p-12 text-white shadow-[0_16px_40px_rgba(15,26,18,0.3)] relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[radial-gradient(circle_at_top_right,rgba(68,114,84,0.3)_0%,transparent_65%)] pointer-events-none" />
          
          <div className="relative z-10 max-w-[620px] mx-auto flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#16251C] border border-[#304837] text-xs font-semibold text-[#A2CBB0] mb-3.5">
              <Sparkles size={13} className="text-emerald-400" />
              <span>Next Generation Engineering</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
              Ready to build in parallel?
            </h2>
            <p className="text-sm sm:text-base text-[#A8C7B2] mt-2.5 mb-7 leading-relaxed">
              Join the waitlist to get early access to ParallelFlow and help shape the collaborative AI workspace for engineering teams.
            </p>
            <button
              type="button"
              onClick={() => onNavigateHome('waitlist')}
              className="inline-flex items-center gap-2 bg-[#326B47] hover:bg-[#3B7B53] text-white px-7 py-3 rounded-full text-sm font-bold shadow-[0_2px_10px_rgba(20,44,28,0.35)] hover:shadow-[0_4px_16px_rgba(20,44,28,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer ring-1 ring-inset ring-white/15 group"
            >
              <span>Join the Waitlist</span>
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
