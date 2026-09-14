import React from 'react';
import { MessageSquare, Send, Award, ArrowRight, RefreshCw, Sparkles, User, Bot } from 'lucide-react';
import { MOCK_INTERVIEW_QAS } from '../../mockData';

interface StudentInterviewViewProps {
  interviewRole: 'Software Engineer' | 'Analyst' | null;
  setInterviewRole: (role: 'Software Engineer' | 'Analyst' | null) => void;
  interviewQuestions: any[];
  setInterviewQuestions: (q: any[]) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (idx: number) => void;
  userAnswer: string;
  setUserAnswer: (ans: string) => void;
  chatHistory: Array<{ sender: 'user' | 'bot' | 'feedback'; text: string }>;
  setChatHistory: React.Dispatch<React.SetStateAction<Array<{ sender: 'user' | 'bot' | 'feedback'; text: string }>>>;
  isInterviewFinished: boolean;
  setIsInterviewFinished: (fin: boolean) => void;
  interviewScores: number[];
  setInterviewScores: React.Dispatch<React.SetStateAction<number[]>>;
}

export const StudentInterviewView: React.FC<StudentInterviewViewProps> = ({
  interviewRole,
  setInterviewRole,
  interviewQuestions,
  setInterviewQuestions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  userAnswer,
  setUserAnswer,
  chatHistory,
  setChatHistory,
  isInterviewFinished,
  setIsInterviewFinished,
  interviewScores,
  setInterviewScores
}) => {
  // Start Interview (EXACT UNTOUCHED ALGORITHM)
  const handleStartInterview = (role: 'Software Engineer' | 'Analyst') => {
    setInterviewRole(role);
    const qas = MOCK_INTERVIEW_QAS[role];
    setInterviewQuestions(qas);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setIsInterviewFinished(false);
    setInterviewScores([]);

    setChatHistory([
      {
        sender: 'bot',
        text: `Welcome to your simulated ${role} Technical Interview. I will ask you standard technical and behavioral screening questions. Let's begin!`
      },
      { sender: 'bot', text: `Question 1: ${qas[0].question}` }
    ]);
  };

  // Submit Answer (EXACT UNTOUCHED ALGORITHM)
  const handleSendAnswer = () => {
    if (!userAnswer.trim() || !interviewRole) return;

    const answer = userAnswer.trim();
    const currentQuestion = interviewQuestions[currentQuestionIndex];

    const updatedHistory = [...chatHistory, { sender: 'user' as const, text: answer }];
    setChatHistory(updatedHistory);
    setUserAnswer('');

    const answerLower = answer.toLowerCase();
    const matchedKeywords = currentQuestion.correctKeywords.filter((kw: string) =>
      answerLower.includes(kw.toLowerCase())
    );

    const scoreVal = Math.min(2 + matchedKeywords.length * 2, 10);
    const newScores = [...interviewScores, scoreVal];
    setInterviewScores(newScores);

    let feedbackText = `[Feedback] Score: ${scoreVal}/10. `;
    if (matchedKeywords.length > 0) {
      feedbackText += `You correctly targeted key components: "${matchedKeywords.join(', ')}". `;
    } else {
      feedbackText += `Your answer missed foundational terminology. `;
    }

    if (scoreVal < 6) {
      feedbackText += `Recommendation: Try to integrate specific terminology. Mentioning "${currentQuestion.correctKeywords
        .slice(0, 3)
        .join(', ')}" would strengthen the rating.`;
    } else {
      feedbackText += `Excellent precision in utilizing professional concepts.`;
    }

    const historyWithFeedback = [...updatedHistory, { sender: 'feedback' as const, text: feedbackText }];
    setChatHistory(historyWithFeedback);

    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < interviewQuestions.length) {
        setCurrentQuestionIndex(nextIndex);
        setChatHistory((prev) => [
          ...prev,
          {
            sender: 'bot',
            text: `Question ${nextIndex + 1}: ${interviewQuestions[nextIndex].question}`
          }
        ]);
      } else {
        setIsInterviewFinished(true);
        const finalAverage = Math.round(
          (newScores.reduce((a, b) => a + b, 0) / newScores.length) * 10
        );
        setChatHistory((prev) => [
          ...prev,
          { sender: 'bot', text: `Interview complete! Thank you. I have analyzed your overall responses.` },
          {
            sender: 'bot',
            text: `Your overall performance index is ${finalAverage}%. A comprehensive report has been generated.`
          }
        ]);
      }
    }, 1200);
  };

  const finalAvg = interviewScores.length > 0
    ? Math.round((interviewScores.reduce((a, b) => a + b, 0) / interviewScores.length) * 10)
    : 0;

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Banner */}
      <div className="sp-page-header">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight flex items-center gap-3">
            <MessageSquare size={28} className="text-blue-600 shrink-0" />
            Mock Interview Simulator
          </h1>
          <p className="sp-page-subtitle">
            Test your technical knowledge in simulated interview rounds with automated feedback evaluation.
          </p>
        </div>

        {interviewRole && (
          <button
            onClick={() => setInterviewRole(null)}
            className="btn btn-secondary h-10 px-4 rounded-xl text-xs font-bold self-start md:self-center"
          >
            ← Change Track
          </button>
        )}
      </div>

      {!interviewRole ? (
        /* Track Choice Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-blue-300 transition-all flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold border border-blue-100 shadow-2xs">
                <Sparkles size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">Software Engineer Track</h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-2 font-medium">
                  Evaluates core system design, data structures, concurrency, database indexes, state management, and async logic.
                </p>
              </div>
            </div>
            <button
              onClick={() => handleStartInterview('Software Engineer')}
              className="btn btn-primary h-12 w-full rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-2"
            >
              Start Software Engineering Mock <ArrowRight size={16} />
            </button>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-xs hover:border-indigo-300 transition-all flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold border border-indigo-100 shadow-2xs">
                <Award size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">Technology Analyst Track</h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-2 font-medium">
                  Evaluates business metrics calculations, dataset imputation, stakeholder communication, and root cause analysis.
                </p>
              </div>
            </div>
            <button
              onClick={() => handleStartInterview('Analyst')}
              className="btn btn-primary h-12 w-full rounded-xl font-bold text-sm shadow-sm flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 border-indigo-600"
            >
              Start Technology Analyst Mock <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ) : (
        /* Chat Simulator Workspace */
        <div className="sp-card flex flex-col gap-5 p-6 sm:p-7">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div className="flex items-center gap-3">
              <span className="sp-badge sp-badge-primary font-bold">{interviewRole} Simulation</span>
              <span className="text-xs text-slate-500 font-semibold">
                Question {Math.min(currentQuestionIndex + 1, interviewQuestions.length)} of {interviewQuestions.length}
              </span>
            </div>
            {isInterviewFinished && (
              <span className="sp-badge sp-badge-success font-bold font-mono">
                Final Rating: {finalAvg}%
              </span>
            )}
          </div>

          {/* Chat Bubble History Window */}
          <div className="sp-chat-window">
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`sp-chat-bubble ${
                  msg.sender === 'user'
                    ? 'user'
                    : msg.sender === 'feedback'
                    ? 'feedback'
                    : 'assistant'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1 text-xs opacity-90">
                  {msg.sender === 'user' ? (
                    <>
                      <User size={14} /> Your Response
                    </>
                  ) : msg.sender === 'feedback' ? (
                    <>
                      <Sparkles size={14} /> Real-Time Keyword Evaluation
                    </>
                  ) : (
                    <>
                      <Bot size={14} /> Interviewer AI
                    </>
                  )}
                </div>
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Bar */}
          {!isInterviewFinished ? (
            <div className="flex items-center gap-3 mt-2">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && userAnswer.trim()) {
                    handleSendAnswer();
                  }
                }}
                placeholder="Type your technical interview answer here..."
                className="flex-1 h-12 px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button
                disabled={!userAnswer.trim()}
                onClick={handleSendAnswer}
                className="h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all shrink-0 cursor-pointer"
              >
                <Send size={18} />
                <span>Submit</span>
              </button>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center flex flex-col items-center gap-3">
              <Award size={36} className="text-emerald-600" />
              <h4 className="font-bold text-emerald-900 text-lg font-display">Interview Completed!</h4>
              <p className="text-sm text-emerald-800 max-w-md">
                Your performance rating index is <strong>{finalAvg}%</strong> based on technical keyword precision.
              </p>
              <button
                onClick={() => handleStartInterview(interviewRole)}
                className="mt-2 h-11 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <RefreshCw size={16} /> Retry Simulator
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
