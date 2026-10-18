import React, { useEffect, useState } from 'react';
import { X, RefreshCw, Database, Users } from 'lucide-react';

interface WaitlistEntry {
  id: string | number;
  name?: string;
  email: string;
  role?: string;
  experience?: string;
  team_size?: string;
  workflow_problem?: string;
  workflow_problem_other?: string;
  frustrating_experience?: string;
  valuable_capabilities?: string | string[];
  try_likelihood?: string;
  willing_to_test?: string;
  feedback_suggestions?: string;
  can_contact?: boolean;
  created_at: string;
}

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  neonConnected: boolean;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose, neonConnected }) => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [isLiveNeon, setIsLiveNeon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | number | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/waitlist');
      const data = await res.json();
      setEntries(data.entries || []);
      setIsLiveNeon(data.isLiveNeon);
    } catch (err) {
      console.error('Failed to load waitlist entries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-[#121914]/70 backdrop-blur-xs z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[#FAF8F2] border border-[#DFD9C7] rounded-2xl w-full max-w-[880px] max-h-[88vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#E6E1D2] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Database size={20} className="text-[#2C4D39]" />
            <h3 className="text-lg font-bold text-[#1A1A18]">Waitlist & Feedback Submissions</h3>
            <span className={`text-[0.72rem] px-2 py-0.5 rounded-full font-semibold border ${
              isLiveNeon 
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300' 
                : 'bg-amber-100 text-amber-800 border-amber-300'
            }`}>
              {isLiveNeon ? 'Neon Serverless Postgres' : 'Mock In-Memory Store'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="text-[#6C6658] hover:text-[#1A1A18] hover:bg-[#EBE5D5] p-1.5 rounded-lg transition-colors cursor-pointer"
              onClick={fetchData}
              disabled={loading}
              title="Refresh entries"
            >
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            </button>
            <button 
              type="button" 
              className="text-[#6C6658] hover:text-[#1A1A18] hover:bg-[#EBE5D5] p-1.5 rounded-lg transition-colors cursor-pointer" 
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex flex-col gap-4">
          {!neonConnected && (
            <div className="bg-[#F4EEDC] border border-[#DFD5BC] p-3 rounded-lg text-xs sm:text-[0.82rem] text-[#635A45] leading-relaxed">
              <strong>Tip:</strong> Neon connection string not yet configured in <code className="bg-[#E7DECA] px-1 py-0.5 rounded font-mono text-[#383222]">.env</code>.
              Entries are currently stored in memory. To persist permanently in Neon, set <code className="bg-[#E7DECA] px-1 py-0.5 rounded font-mono text-[#383222]">DATABASE_URL=postgresql://...</code> in <code className="bg-[#E7DECA] px-1 py-0.5 rounded font-mono text-[#383222]">.env</code>!
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#555043] bg-[#EFEBDD] px-3 py-1.5 rounded-md font-medium">
              <Users size={15} />
              <span><strong>{entries.length}</strong> Total Signups</span>
            </div>
            <span className="text-xs text-[#7A7568]">Click any row to view full survey responses</span>
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-10 text-sm text-[#7A7568]">
              No waitlist submissions recorded yet.
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {entries.map((item) => {
                const isExpanded = expandedId === item.id;
                let parsedCaps: string[] = [];
                try {
                  if (Array.isArray(item.valuable_capabilities)) {
                    parsedCaps = item.valuable_capabilities;
                  } else if (typeof item.valuable_capabilities === 'string') {
                    parsedCaps = JSON.parse(item.valuable_capabilities);
                  }
                } catch {
                  parsedCaps = [];
                }

                return (
                  <div 
                    key={item.id} 
                    className="border border-[#E2DCC9] rounded-xl bg-white overflow-hidden transition-all shadow-xs"
                  >
                    <div 
                      className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-[#FDFBF7]"
                      onClick={() => setExpandedId(isExpanded ? null : item.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#EAE6D8] text-[#2C4D39] font-bold text-xs flex items-center justify-center shrink-0">
                          {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-[#1A1A18]">{item.email}</span>
                            {item.name && <span className="text-xs text-[#6C6658]">({item.name})</span>}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-[#6C6658] mt-0.5">
                            <span>{item.role || 'Developer'}</span>
                            <span>•</span>
                            <span>{item.team_size || 'Team size not specified'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[0.76rem] bg-[#EEF3EE] text-[#2E563C] px-2.5 py-0.5 rounded border border-[#D1DFD4] font-medium max-w-[200px] truncate">
                          {item.workflow_problem || 'General waitlist'}
                        </span>
                        <span className="text-xs text-[#8C8675] whitespace-nowrap">
                          {new Date(item.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-4 bg-[#F9F7F1] border-t border-[#ECE6D6] text-xs sm:text-[0.83rem] flex flex-col gap-3 animate-in fade-in duration-150">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <div className="p-2 bg-white rounded border border-[#E6E0CE]">
                            <span className="text-[0.7rem] text-[#8C8675] block">Experience</span>
                            <span className="font-semibold text-[#1A1A18]">{item.experience || 'N/A'}</span>
                          </div>
                          <div className="p-2 bg-white rounded border border-[#E6E0CE]">
                            <span className="text-[0.7rem] text-[#8C8675] block">Try Likelihood</span>
                            <span className="font-semibold text-[#1A1A18]">{item.try_likelihood || 'N/A'}</span>
                          </div>
                          <div className="p-2 bg-white rounded border border-[#E6E0CE]">
                            <span className="text-[0.7rem] text-[#8C8675] block">Early Testing</span>
                            <span className="font-semibold text-[#1A1A18]">{item.willing_to_test || 'N/A'}</span>
                          </div>
                          <div className="p-2 bg-white rounded border border-[#E6E0CE]">
                            <span className="text-[0.7rem] text-[#8C8675] block">Can Contact</span>
                            <span className="font-semibold text-[#1A1A18]">{item.can_contact ? 'Yes' : 'No'}</span>
                          </div>
                        </div>

                        {item.workflow_problem_other && (
                          <div>
                            <span className="font-bold text-[#1A1A18] block mb-0.5">Workflow Bottleneck Detail:</span>
                            <p className="text-[#555043] bg-white p-2.5 rounded border border-[#E6E0CE]">{item.workflow_problem_other}</p>
                          </div>
                        )}

                        {item.frustrating_experience && (
                          <div>
                            <span className="font-bold text-[#1A1A18] block mb-0.5">Frustrating Experience:</span>
                            <p className="text-[#555043] bg-white p-2.5 rounded border border-[#E6E0CE]">{item.frustrating_experience}</p>
                          </div>
                        )}

                        {parsedCaps.length > 0 && (
                          <div>
                            <span className="font-bold text-[#1A1A18] block mb-1">Most Valuable Capabilities:</span>
                            <div className="flex flex-wrap gap-1.5">
                              {parsedCaps.map((c, i) => (
                                <span key={i} className="bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded text-[0.75rem]">
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {item.feedback_suggestions && (
                          <div>
                            <span className="font-bold text-[#1A1A18] block mb-0.5">Suggestions & Features:</span>
                            <p className="text-[#555043] bg-white p-2.5 rounded border border-[#E6E0CE]">{item.feedback_suggestions}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
