import React from 'react';
import { FileCheck, Sparkles, ListChecks } from 'lucide-react';
import { MOCK_RESUME_TIPS } from '../../mockData';
import type { Student } from '../../mockData';

interface StudentAtsViewProps {
  currentStudent: Student;
  resumeTextInput: string;
  setResumeTextInput: (val: string) => void;
  atsReport: {
    score: number;
    foundKeywords: string[];
    missingKeywords: string[];
    foundVerbs: string[];
    hasMetrics: boolean;
    recommendations: string[];
  } | null;
  setAtsReport: (report: any) => void;
  onUpdateResumeScore: (score: number, resumeText: string) => void;
}

export const StudentAtsView: React.FC<StudentAtsViewProps> = ({
  currentStudent,
  resumeTextInput,
  setResumeTextInput,
  atsReport,
  setAtsReport,
  onUpdateResumeScore
}) => {
  // Run ATS Scan (EXACT UNTOUCHED ALGORITHM)
  const handleAtsScan = () => {
    if (!resumeTextInput.trim()) return;

    const textLower = resumeTextInput.toLowerCase();
    const foundKeywords: string[] = [];
    const missingKeywords: string[] = [];

    MOCK_RESUME_TIPS.keywords.forEach((kw) => {
      if (textLower.includes(kw.word.toLowerCase())) {
        foundKeywords.push(kw.word);
      } else {
        missingKeywords.push(kw.word);
      }
    });

    const foundVerbs: string[] = [];
    MOCK_RESUME_TIPS.actionVerbs.forEach((verb) => {
      if (textLower.includes(verb.toLowerCase())) {
        foundVerbs.push(verb);
      }
    });

    const metricsRegex = /\b\d+(?:%|\s*k|\s*x|\s*lakhs|\s*percent|\s*million|\s*projects)\b|(?:\d+\+)/i;
    const hasMetrics = metricsRegex.test(textLower);

    let calcScore = 40;
    const keywordPct = foundKeywords.length / MOCK_RESUME_TIPS.keywords.length;
    calcScore += Math.round(keywordPct * 35);

    const verbPct = Math.min(foundVerbs.length / 5, 1);
    calcScore += Math.round(verbPct * 15);

    if (hasMetrics) calcScore += 10;
    calcScore = Math.min(calcScore, 100);

    const recommendations: string[] = [];
    if (foundKeywords.length < 5) {
      recommendations.push(
        'Inject more domain-specific technical skills (e.g., ' +
          missingKeywords.slice(0, 3).join(', ') +
          ').'
      );
    }
    if (foundVerbs.length < 3) {
      recommendations.push(
        "Start accomplishment bullet points with stronger active verbs (e.g. 'Optimized', 'Automated')."
      );
    }
    if (!hasMetrics) {
      recommendations.push(
        "Quantify your achievements! Rephrase text to show metrics (e.g. 'reduced processing latency by 35%')."
      );
    }
    if (resumeTextInput.length < 150) {
      recommendations.push(
        'Expand your profile. Provide details on capstone projects, stack configurations, and team scale.'
      );
    } else if (resumeTextInput.length > 1000) {
      recommendations.push(
        'Keep it concise. Shorten descriptions so ATS scanners can quickly isolate key performance indicators.'
      );
    }

    if (recommendations.length === 0) {
      recommendations.push(
        'Excellent resume details! Formatting and keywords are highly optimized for automated screeners.'
      );
    }

    const reportObj = {
      score: calcScore,
      foundKeywords,
      missingKeywords,
      foundVerbs,
      hasMetrics,
      recommendations
    };

    setAtsReport(reportObj);
    onUpdateResumeScore(calcScore, resumeTextInput);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Header Card */}
      <div className="sp-page-header">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight flex items-center gap-3">
            <FileCheck size={28} className="text-blue-600 shrink-0" />
            ATS Resume Match Scorer
          </h1>
          <p className="sp-page-subtitle">
            Simulate corporate Applicant Tracking Systems. Evaluate keyword density, action verbs, and quantifiable metrics.
          </p>
        </div>

        <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-800 text-xs font-bold flex items-center gap-2 self-start md:self-center shadow-xs">
          <Sparkles size={16} className="text-blue-600" />
          <span>Current Saved ATS Index: {currentStudent.resumeScore}%</span>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* Left Column: Text Area Input Card */}
        <div className="glass-card p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base font-display">Resume Content (Plain Text)</h3>
              <span className="text-xs text-slate-400 font-mono font-semibold">{resumeTextInput.length} chars</span>
            </div>

            <textarea
              rows={12}
              value={resumeTextInput}
              onChange={(e) => setResumeTextInput(e.target.value)}
              placeholder="Paste your professional summary, academic qualifications, capstone projects, technical stack, and experience text here..."
              className="input-field font-sans leading-relaxed text-slate-800 resize-none min-h-[300px]"
            />
          </div>

          <div className="pt-2">
            <button
              disabled={!resumeTextInput.trim()}
              onClick={handleAtsScan}
              className="btn btn-primary h-12 w-full font-bold text-sm shadow-md flex items-center justify-center gap-2.5"
            >
              <FileCheck size={20} />
              Analyze & Calculate ATS Score
            </button>
          </div>
        </div>

        {/* Right Column: Score Report & Checkpoints Card */}
        <div className="glass-card p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-col justify-center gap-6">
          {atsReport ? (
            <div className="flex flex-col gap-6 animate-fade-in">
              {/* Circular Score Gauge */}
              <div className="flex flex-col items-center justify-center text-center">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg width="144" height="144" className="transform -rotate-90">
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      fill="transparent"
                      stroke="#E2E8F0"
                      strokeWidth="12"
                    />
                    <circle
                      cx="72"
                      cy="72"
                      r="60"
                      fill="transparent"
                      stroke="#2563EB"
                      strokeWidth="12"
                      strokeDasharray={376.99}
                      strokeDashoffset={376.99 - (376.99 * atsReport.score) / 100}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black font-display text-slate-900 leading-none">
                      {atsReport.score}
                    </span>
                    <span className="text-xs font-bold uppercase text-slate-400 mt-1">/ 100</span>
                  </div>
                </div>
                <h4 className="text-base font-bold text-slate-900 mt-4 font-display">
                  Applicant Match Score Index
                </h4>
              </div>

              {/* Detailed Checkpoints Grid */}
              <div className="border-t border-slate-100 pt-5 flex flex-col gap-3">
                <h4 className="font-bold text-slate-500 uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <ListChecks size={15} /> Scoring Checkpoints
                </h4>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-700 font-semibold text-xs sm:text-sm">Core Domain Keywords:</span>
                  <span className="font-bold text-xs text-blue-700 bg-blue-100 px-2.5 py-1 rounded-lg">
                    {atsReport.foundKeywords.length} Detected
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-700 font-semibold text-xs sm:text-sm">Action Verbs:</span>
                  <span className="font-bold text-xs text-indigo-700 bg-indigo-100 px-2.5 py-1 rounded-lg">
                    {atsReport.foundVerbs.length} Used
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-700 font-semibold text-xs sm:text-sm">Quantifiable Metrics:</span>
                  <span
                    className={`font-bold text-xs px-2.5 py-1 rounded-lg ${
                      atsReport.hasMetrics
                        ? 'text-emerald-700 bg-emerald-100'
                        : 'text-amber-700 bg-amber-100'
                    }`}
                  >
                    {atsReport.hasMetrics ? '✓ Present' : '⚠ Missing Numbers'}
                  </span>
                </div>
              </div>

              {/* Recommendations */}
              <div className="border-t border-slate-100 pt-5 flex flex-col gap-3">
                <h4 className="font-bold text-slate-500 uppercase tracking-wider text-xs flex items-center gap-1.5">
                  <Sparkles size={15} className="text-blue-600" /> Optimization Recommendations
                </h4>
                <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed list-disc pl-4">
                  {atsReport.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 px-4 text-slate-400 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 flex items-center justify-center mb-4 shadow-xs">
                <FileCheck size={32} />
              </div>
              <h4 className="text-base font-bold text-slate-800 font-display mb-1">No Report Generated Yet</h4>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed">
                Paste your resume text into the editor on the left and click <strong className="text-blue-600 font-semibold">"Analyze & Calculate ATS Score"</strong> to view key metrics, keyword checks, and recommendations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
