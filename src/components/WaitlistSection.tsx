import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  User,
  Workflow,
  Wand2,
  MessageSquare
} from 'lucide-react';

interface WaitlistSectionProps {
  onSuccess?: () => void;
}

// Section 1 Options
const ROLE_OPTIONS = [
  'Developer',
  'Startup founder / co-founder',
  'Engineering lead / manager',
  'Student',
  'Indie hacker / solo builder',
];

const EXPERIENCE_OPTIONS = [
  'Just starting',
  'Less than 1 year',
  '1–3 years',
  '3–5 years',
  '5+ years',
];

const TEAM_SIZE_OPTIONS = [
  'Just me',
  '2–5 people',
  '6–15 people',
  '16–50 people',
  '50+ people',
];

// Section 2 Options
const WORKFLOW_PROBLEM_OPTIONS = [
  'Switching between too many tools',
  'Keeping project context and documentation organized',
  'Coordinating work across a team',
  'Managing multiple AI agents or assistants',
  'Tracking tasks and AI-generated work',
  'Reviewing AI-generated code',
  'Maintaining product',
  'My current tools work well; I do not have a major problem',
  'Other',
];

// Section 3 Options
const CAPABILITY_OPTIONS = [
  'One workspace for the development workflow',
  'A shared AI agent that works with the whole team',
  'Personal AI assistants for individual team members',
  'Shared project knowledge and context',
  'Task delegation and progress tracking',
  'AI code review and testing',
  'GitHub and other developer-tool integrations',
  'Custom agents, skills, and MCP integrations',
];

const TRY_LIKELIHOOD_OPTIONS = [
  'Very likely',
  'Somewhat likely',
  'Not sure',
  'Unlikely',
];

const WILLING_TO_TEST_OPTIONS = [
  'Yes',
  'Maybe',
  'Not right now',
];

export const WaitlistSection: React.FC<WaitlistSectionProps> = ({ onSuccess }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Section 1: About You
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(ROLE_OPTIONS[0]);
  const [experience, setExperience] = useState('1–3 years');
  const [teamSize, setTeamSize] = useState('2–5 people');

  // Section 2: Current Workflow - Question 8 is Multiple Choice
  const [workflowProblems, setWorkflowProblems] = useState<string[]>([
    'Switching between too many tools',
  ]);
  const [workflowProblemOther, setWorkflowProblemOther] = useState('');
  const [frustratingExperience, setFrustratingExperience] = useState('');

  // Section 3: What Would Be Useful?
  const [selectedCapabilities, setSelectedCapabilities] = useState<string[]>([
    'A shared AI agent that works with the whole team',
    'Shared project knowledge and context',
  ]);
  const [tryLikelihood, setTryLikelihood] = useState('Very likely');
  const [willingToTest, setWillingToTest] = useState('Yes');

  // Section 4: Final Thoughts
  const [feedbackSuggestions, setFeedbackSuggestions] = useState('');
  const [canContact, setCanContact] = useState(true);

  // Submission State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ message: string; email: string } | null>(null);

  // Toggle multi-select for Question 8
  const toggleWorkflowProblem = (prob: string) => {
    if (workflowProblems.includes(prob)) {
      setWorkflowProblems(workflowProblems.filter(p => p !== prob));
    } else {
      setWorkflowProblems([...workflowProblems, prob]);
    }
  };

  // Toggle capabilities for Question 10 (max 3)
  const toggleCapability = (cap: string) => {
    if (selectedCapabilities.includes(cap)) {
      setSelectedCapabilities(selectedCapabilities.filter(c => c !== cap));
    } else {
      if (selectedCapabilities.length >= 3) {
        setErrorMsg('You can select up to 3 capabilities.');
        return;
      }
      setErrorMsg(null);
      setSelectedCapabilities([...selectedCapabilities, cap]);
    }
  };

  // Unrestricted navigation: users can freely travel through all questions without filling anything out
  const handleNext = () => {
    setErrorMsg(null);
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setErrorMsg(null);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setErrorMsg('Please enter your email address in Section 1 to join the waitlist.');
      setCurrentStep(1);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid work email format in Section 1.');
      setCurrentStep(1);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: trimmedEmail,
          role,
          experience,
          team_size: teamSize,
          workflow_problem: workflowProblems,
          workflow_problem_other: workflowProblems.includes('Other') ? workflowProblemOther.trim() : '',
          frustrating_experience: frustratingExperience.trim(),
          valuable_capabilities: selectedCapabilities,
          try_likelihood: tryLikelihood,
          willing_to_test: willingToTest,
          feedback_suggestions: feedbackSuggestions.trim(),
          can_contact: canContact,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          setErrorMsg(data.message || "You're already on the waitlist!");
        } else {
          setErrorMsg(data.error || 'Failed to submit response. Please try again.');
        }
        return;
      }

      setSuccessData({
        message: data.message || 'Access requested! Check your inbox for confirmation.',
        email: trimmedEmail,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error('Waitlist submit error:', err);
      setErrorMsg('Network error. Ensure the server is running on port 4000.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setName('');
    setFeedbackSuggestions('');
    setFrustratingExperience('');
    setWorkflowProblemOther('');
    setWorkflowProblems(['Switching between too many tools']);
    setCurrentStep(1);
    setSuccessData(null);
    setErrorMsg(null);
  };

  const stepsList = [
    { num: 1, title: 'About You', icon: User },
    { num: 2, title: 'Workflow', icon: Workflow },
    { num: 3, title: 'Capabilities', icon: Wand2 },
    { num: 4, title: 'Final Thoughts', icon: MessageSquare },
  ];

  return (
    <section id="waitlist" className="pt-8 pb-20 sm:pb-28 scroll-mt-20">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6">
        <div className="bg-[#1E3024] border border-[#314B38] rounded-2xl p-7 sm:p-11 text-white shadow-[0_20px_50px_rgba(15,26,18,0.35),0_1px_3px_rgba(0,0,0,0.1)] relative overflow-hidden">
          {/* Subtle Ambient Radial Glow with soft colorful light tints */}
          <div className="absolute -top-28 -right-28 w-96 h-96 bg-[radial-gradient(circle_at_top_right,rgba(52,168,105,0.25)_0%,rgba(244,180,26,0.08)_40%,transparent_70%)] pointer-events-none" />

          {/* Form Header */}
          <div className="text-center mb-8 sm:mb-9 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#16251C] border border-[#304837] text-xs font-semibold text-[#A2CBB0] mb-3 shadow-xs">
              <Sparkles size={13} className="text-emerald-400" />
              <span>Early User Feedback & Waitlist</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-[2.05rem] font-extrabold tracking-tight text-[#FAF8F2] leading-tight">
              Ready to build in parallel? Join the Waitlist
            </h2>
            <p className="text-sm sm:text-[0.94rem] text-[#A6C4B0] mt-2.5 max-w-[620px] mx-auto leading-[1.55]">
              We’re exploring ParallelFlow, a collaborative workspace where people and AI agents plan, build, and ship software together. Browse all questions freely and help shape the early product.
            </p>
          </div>

          {successData ? (
            <div className="text-center py-10 px-4 max-w-[540px] mx-auto flex flex-col items-center relative z-10">
              <div className="mb-4 text-emerald-400">
                <CheckCircle2 size={48} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                You're on the list!
              </h3>
              <p className="text-sm sm:text-base text-[#CFE3D5] mt-2 leading-relaxed">
                Thank you! We've recorded your responses and reserved early access for <strong>{successData.email}</strong>.
              </p>
              
              <div className="mt-5 bg-[#16251C]/90 border border-[#314A38] px-4.5 py-3 rounded-xl text-xs sm:text-sm text-[#A8CDB4] flex flex-col gap-1.5 shadow-sm">
                <span>Role: <strong>{role}</strong> • Team: <strong>{teamSize}</strong></span>
                <span>Selected {workflowProblems.length} workflow bottleneck(s)</span>
              </div>

              <button 
                type="button" 
                className="mt-7 text-emerald-300 hover:text-white text-sm font-semibold px-4.5 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                onClick={resetForm}
              >
                Submit another response →
              </button>
            </div>
          ) : (
            <div className="relative z-10 max-w-[740px] mx-auto">
              {/* Stepper Navigation - Clickable to freely travel between questions */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-8">
                {stepsList.map((step) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.num;
                  return (
                    <button
                      key={step.num}
                      type="button"
                      onClick={() => {
                        setErrorMsg(null);
                        setCurrentStep(step.num);
                      }}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-[#172B1E] border-[#4E7E5D] text-white shadow-[0_2px_8px_rgba(0,0,0,0.2)] ring-1 ring-[#4E7E5D]/50'
                          : 'bg-[#142118]/60 border-[#2A3F30] text-[#95B5A0] hover:border-[#3D5B46] hover:text-white'
                      }`}
                      title={`Go to Section ${step.num}: ${step.title}`}
                    >
                      <div className={`w-5.5 h-5.5 rounded-full text-[0.72rem] font-bold flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-emerald-400 text-black' : 'bg-[#2E4736] text-white'
                      }`}>
                        {step.num}
                      </div>
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Icon size={13} className="shrink-0 opacity-80 hidden sm:inline-block" />
                        <span className="text-xs font-semibold truncate">{step.title}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Error Alert */}
              {errorMsg && (
                <div className="mb-5 bg-red-950/60 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg flex items-center gap-2.5 text-xs sm:text-sm shadow-sm">
                  <AlertCircle size={18} className="shrink-0 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* ================= STEP 1: ABOUT YOU ================= */}
                {currentStep === 1 && (
                  <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                    <div className="border-b border-[#2F4735] pb-3 mb-1">
                      <h3 className="text-lg font-bold text-white tracking-tight">Section 1: About You</h3>
                      <p className="text-xs text-[#8DB29A] mt-0.5">Tell us a bit about yourself and your work. (You can navigate freely to any section!)</p>
                    </div>

                    {/* Question 1: Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name-input" className="text-xs sm:text-[0.85rem] font-medium text-[#C0D8C8]">
                        1. What is your name? <span className="text-[#7A9E88] font-normal">(Optional)</span>
                      </label>
                      <input
                        id="name-input"
                        type="text"
                        placeholder="Ada Lovelace"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-[#152319] border border-[#2D4534] focus:border-[#4E825D] focus:ring-2 focus:ring-[#4E825D]/30 text-white placeholder-[#587862] text-[0.92rem] py-2.5 px-3.5 rounded-lg outline-none transition-all"
                      />
                    </div>

                    {/* Question 2: Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email-input" className="text-xs sm:text-[0.85rem] font-medium text-[#C0D8C8]">
                        2. What is your email address? <span className="text-emerald-400 font-bold">*</span>
                      </label>
                      <input
                        id="email-input"
                        type="email"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#152319] border border-[#2D4534] focus:border-[#4E825D] focus:ring-2 focus:ring-[#4E825D]/30 text-white placeholder-[#587862] text-[0.92rem] py-2.5 px-3.5 rounded-lg outline-none transition-all"
                      />
                    </div>

                    {/* Question 3: Role */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs sm:text-[0.85rem] font-medium text-[#C0D8C8]">
                        3. Which best describes your role?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {ROLE_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setRole(opt)}
                            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs sm:text-[0.85rem] text-left transition-all border cursor-pointer ${
                              role === opt
                                ? 'bg-[#172D1E] border-[#4A7A58] text-white ring-1 ring-[#4A7A58]/50'
                                : 'bg-[#16251A]/70 hover:bg-[#1C2F21] border-[#2C4233] text-[#CBE0D2]'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${role === opt ? 'border-emerald-400' : 'border-[#4F735B]'}`}>
                              {role === opt && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                            </span>
                            <span>{opt}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Question 4: Experience */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs sm:text-[0.85rem] font-medium text-[#C0D8C8]">
                        4. How long have you been working in software development or building technical projects? <span className="text-[#7A9E88] font-normal">(Optional)</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {EXPERIENCE_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setExperience(opt)}
                            className={`px-3 py-2.5 rounded-lg text-xs sm:text-[0.83rem] text-center transition-all border cursor-pointer ${
                              experience === opt
                                ? 'bg-[#172D1E] border-[#4A7A58] text-white font-medium ring-1 ring-[#4A7A58]/50'
                                : 'bg-[#16251A]/70 hover:bg-[#1C2F21] border-[#2C4233] text-[#CBE0D2]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Question 5: Team Size */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs sm:text-[0.85rem] font-medium text-[#C0D8C8]">
                        5. What is your team size? <span className="text-[#7A9E88] font-normal">(Optional)</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {TEAM_SIZE_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setTeamSize(opt)}
                            className={`px-3 py-2.5 rounded-lg text-xs sm:text-[0.83rem] text-center transition-all border cursor-pointer ${
                              teamSize === opt
                                ? 'bg-[#172D1E] border-[#4A7A58] text-white font-medium ring-1 ring-[#4A7A58]/50'
                                : 'bg-[#16251A]/70 hover:bg-[#1C2F21] border-[#2C4233] text-[#CBE0D2]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= STEP 2: YOUR CURRENT WORKFLOW ================= */}
                {currentStep === 2 && (
                  <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                    <div className="border-b border-[#2F4735] pb-3 mb-1">
                      <h3 className="text-lg font-bold text-white tracking-tight">Section 2: Your Current Workflow</h3>
                      <p className="text-xs text-[#8DB29A] mt-0.5">Help us pinpoint where time and focus get lost.</p>
                    </div>

                    {/* Question 8: Biggest Problem - MULTIPLE CHOICE */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs sm:text-[0.85rem] font-medium text-[#C0D8C8]">
                          8. What is the biggest problem in your current development workflow?
                        </label>
                        <span className="text-[0.72rem] bg-[#16291D] text-emerald-300 border border-[#40684D] px-2 py-0.5 rounded-full font-medium">
                          Multiple choice · select all that apply
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        {WORKFLOW_PROBLEM_OPTIONS.map((opt) => {
                          const isSelected = workflowProblems.includes(opt);
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => toggleWorkflowProblem(opt)}
                              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs sm:text-[0.86rem] text-left transition-all border cursor-pointer ${
                                isSelected
                                  ? 'bg-[#172D1E] border-[#4A7A58] text-white ring-1 ring-[#4A7A58]/50'
                                  : 'bg-[#16251A]/70 hover:bg-[#1C2F21] border-[#2C4233] text-[#CBE0D2]'
                              }`}
                            >
                              <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                                isSelected ? 'bg-emerald-500 border-emerald-500 text-black font-bold text-[10px]' : 'border-[#4F735B]'
                              }`}>
                                {isSelected ? '✓' : ''}
                              </span>
                              <span>{opt}</span>
                            </button>
                          );
                        })}
                      </div>

                      {workflowProblems.includes('Other') && (
                        <div className="mt-1">
                          <input
                            type="text"
                            placeholder="Please specify your workflow bottleneck..."
                            value={workflowProblemOther}
                            onChange={(e) => setWorkflowProblemOther(e.target.value)}
                            className="w-full bg-[#152319] border border-[#2D4534] focus:border-[#4E825D] text-white placeholder-[#587862] text-sm py-2 px-3 rounded-lg outline-none"
                          />
                        </div>
                      )}
                    </div>

                    {/* Question 9: Frustrating Experience */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="frustrating-input" className="text-xs sm:text-[0.85rem] font-medium text-[#C0D8C8]">
                        9. Can you describe a recent frustrating experience while building software or working with AI tools? <span className="text-[#7A9E88] font-normal">(Optional)</span>
                      </label>
                      <textarea
                        id="frustrating-input"
                        rows={3}
                        placeholder="e.g. Having to re-explain project architecture in every new chat window, or AI hallucinating code that bypassed our team conventions..."
                        value={frustratingExperience}
                        onChange={(e) => setFrustratingExperience(e.target.value)}
                        className="w-full bg-[#152319] border border-[#2D4534] focus:border-[#4E825D] focus:ring-2 focus:ring-[#4E825D]/30 text-white placeholder-[#587862] text-sm py-2.5 px-3.5 rounded-lg outline-none transition-all resize-none"
                      />
                    </div>
                  </div>
                )}

                {/* ================= STEP 3: WHAT WOULD BE USEFUL ================= */}
                {currentStep === 3 && (
                  <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                    <div className="border-b border-[#2F4735] pb-3 mb-1">
                      <h3 className="text-lg font-bold text-white tracking-tight">Section 3: What Would Be Useful?</h3>
                      <p className="text-xs text-[#8DB29A] mt-0.5">Select features that would make the highest impact for your team.</p>
                    </div>

                    {/* Question 10: Capabilities */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs sm:text-[0.85rem] font-medium text-[#C0D8C8]">
                          10. Which ParallelFlow capabilities would be most valuable to you?
                        </label>
                        <span className="text-[0.75rem] text-[#8DB29A] font-medium">
                          {selectedCapabilities.length}/3 selected
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {CAPABILITY_OPTIONS.map((cap) => {
                          const isSelected = selectedCapabilities.includes(cap);
                          return (
                            <button
                              key={cap}
                              type="button"
                              onClick={() => toggleCapability(cap)}
                              className={`flex items-start gap-2.5 p-2.5 rounded-lg text-xs sm:text-[0.84rem] text-left transition-all border cursor-pointer ${
                                isSelected
                                  ? 'bg-[#172D1E] border-[#4A7A58] text-white shadow-xs ring-1 ring-[#4A7A58]/50'
                                  : 'bg-[#16251A]/70 hover:bg-[#1C2F21] border-[#2C4233] text-[#CBE0D2]'
                              }`}
                            >
                              <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                                isSelected ? 'bg-emerald-500 border-emerald-500 text-black font-bold text-[10px]' : 'border-[#4F735B]'
                              }`}>
                                {isSelected ? '✓' : ''}
                              </span>
                              <span className="leading-snug">{cap}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Question 11: Try Likelihood */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs sm:text-[0.85rem] font-medium text-[#C0D8C8]">
                        11. How likely would you be to try a tool like ParallelFlow?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {TRY_LIKELIHOOD_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setTryLikelihood(opt)}
                            className={`px-3 py-2.5 rounded-lg text-xs sm:text-[0.83rem] text-center transition-all border cursor-pointer ${
                              tryLikelihood === opt
                                ? 'bg-[#172D1E] border-[#4A7A58] text-white font-medium ring-1 ring-[#4A7A58]/50'
                                : 'bg-[#16251A]/70 hover:bg-[#1C2F21] border-[#2C4233] text-[#CBE0D2]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Question 12: Willing to test */}
                    <div className="flex flex-col gap-2">
                      <label className="text-xs sm:text-[0.85rem] font-medium text-[#C0D8C8]">
                        12. Would you be willing to test an early version of ParallelFlow and share feedback?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {WILLING_TO_TEST_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setWillingToTest(opt)}
                            className={`px-3 py-2.5 rounded-lg text-xs sm:text-[0.83rem] text-center transition-all border cursor-pointer ${
                              willingToTest === opt
                                ? 'bg-[#172D1E] border-[#4A7A58] text-white font-medium ring-1 ring-[#4A7A58]/50'
                                : 'bg-[#16251A]/70 hover:bg-[#1C2F21] border-[#2C4233] text-[#CBE0D2]'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= STEP 4: FINAL THOUGHTS ================= */}
                {currentStep === 4 && (
                  <div className="flex flex-col gap-5 animate-in fade-in duration-200">
                    <div className="border-b border-[#2F4735] pb-3 mb-1">
                      <h3 className="text-lg font-bold text-white tracking-tight">Section 4: Final Thoughts</h3>
                      <p className="text-xs text-[#8DB29A] mt-0.5">Almost done! Any last notes or permission to reach out.</p>
                    </div>

                    {/* Question 13: Suggestions */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="suggestions-input" className="text-xs sm:text-[0.85rem] font-medium text-[#C0D8C8]">
                        13. Do you have any suggestions, features, or concerns you would like us to know about? <span className="text-[#7A9E88] font-normal">(Optional)</span>
                      </label>
                      <textarea
                        id="suggestions-input"
                        rows={3}
                        placeholder="Ideas on integrations, security requirements, role management, or features you'd love to see..."
                        value={feedbackSuggestions}
                        onChange={(e) => setFeedbackSuggestions(e.target.value)}
                        className="w-full bg-[#152319] border border-[#2D4534] focus:border-[#4E825D] focus:ring-2 focus:ring-[#4E825D]/30 text-white placeholder-[#587862] text-sm py-2.5 px-3.5 rounded-lg outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Question 14: Contact Permission */}
                    <div className="bg-[#15241B]/80 border border-[#2E4535] p-4 rounded-xl">
                      <label className="flex items-center gap-3.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={canContact}
                          onChange={(e) => setCanContact(e.target.checked)}
                          className="w-4.5 h-4.5 rounded text-emerald-600 bg-[#152319] border-[#2D4534] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                        />
                        <div className="flex flex-col">
                          <span className="text-xs sm:text-[0.88rem] font-medium text-white">
                            14. May we contact you about early access or follow-up feedback?
                          </span>
                          <span className="text-[0.78rem] text-[#8DB29A] mt-0.5">
                            Yes, you may contact me at {email || 'my email'}.
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* Stepper Action Buttons - Free Travel Back & Forth */}
                <div className="flex items-center justify-between pt-3.5 border-t border-[#2F4735] mt-2">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#A6C4B0] hover:text-white px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-[#326B47] hover:bg-[#3B7B53] text-white px-5.5 py-2.5 rounded-lg shadow-[0_2px_10px_rgba(20,44,28,0.35)] hover:shadow-[0_4px_16px_rgba(20,44,28,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer ring-1 ring-inset ring-white/15"
                    >
                      <span>Continue</span>
                      <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-[#326B47] hover:bg-[#3B7B53] text-white px-6 py-2.5 rounded-lg shadow-[0_2px_10px_rgba(20,44,28,0.35)] hover:shadow-[0_4px_16px_rgba(20,44,28,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 cursor-pointer ring-1 ring-inset ring-white/15"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          <span>Submitting feedback...</span>
                        </>
                      ) : (
                        <>
                          <span>Request Access & Submit</span>
                          <Sparkles size={15} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
