import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Zap,
  UserCheck,
  Building2,
  Shield,
  ArrowRight,
  CheckCircle2,
  FileText,
  Send,
  Award,
  PlusCircle,
  Users,
  PieChart
} from 'lucide-react';
import { Footer } from './Footer';
import './HowItWorksPage.css';

type RoleTab = 'student' | 'tpo' | 'recruiter';

export const HowItWorksPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<RoleTab>('student');

  const tabs: { id: RoleTab; label: string }[] = [
    { id: 'student', label: 'For Students' },
    { id: 'tpo', label: 'For TPOs & Admin' },
    { id: 'recruiter', label: 'For Recruiters' }
  ];

  const studentSteps = [
    {
      step: '01',
      title: 'Build Profile & Upload ATS Resume',
      desc: 'Register your account, enter CGPA, skills, and projects. Use our AI ATS Scorer to optimize resume keywords.',
      icon: <FileText size={26} className="text-blue-600" />
    },
    {
      step: '02',
      title: 'Apply to Drives & Track Status',
      desc: 'Browse eligible campus placement drives, submit applications in one click, and track stage promotions live.',
      icon: <Send size={26} className="text-purple-600" />
    },
    {
      step: '03',
      title: 'Get Placed & Guide Juniors',
      desc: 'Receive offer letters, update placement status, and connect with upcoming batches for alumni mentorship.',
      icon: <Award size={26} className="text-emerald-600" />
    }
  ];

  const tpoSteps = [
    {
      step: '01',
      title: 'Seed & Manage Student Roster',
      desc: 'Import or seed student profiles, verify department credentials, CGPA records, and unplaced status.',
      icon: <Users size={26} className="text-blue-600" />
    },
    {
      step: '02',
      title: 'Publish Drives & Calendar Events',
      desc: 'Schedule placement drives, online test dates, pre-placement talks, and application deadlines.',
      icon: <PlusCircle size={26} className="text-amber-600" />
    },
    {
      step: '03',
      title: 'Promote Candidates & Export Insights',
      desc: 'Advance candidates through recruitment rounds, mark offers, and export department placement reports.',
      icon: <PieChart size={26} className="text-indigo-600" />
    }
  ];

  const recruiterSteps = [
    {
      step: '01',
      title: 'Create Recruiter Profile & Post Drives',
      desc: 'Sign in as a corporate hiring partner, define job roles, salary package, location, and CGPA cutoff.',
      icon: <Building2 size={26} className="text-emerald-600" />
    },
    {
      step: '02',
      title: 'Review ATS-Scored Applications',
      desc: 'Filter candidate resumes matched by AI scores, review profiles, and shortlist candidates for tests.',
      icon: <UserCheck size={26} className="text-blue-600" />
    },
    {
      step: '03',
      title: 'Issue Offers & Final Selection',
      desc: 'Conduct interviews, advance selected candidates to final offer stage, and notify campus TPO officers.',
      icon: <Shield size={26} className="text-purple-600" />
    }
  ];

  const currentSteps =
    activeTab === 'student' ? studentSteps : activeTab === 'tpo' ? tpoSteps : recruiterSteps;

  // Motion animation variants
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.05
      }
    }
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 22, filter: 'blur(4px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.55, ease: 'easeOut' as const }
    }
  };

  const stepsGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05
      }
    },
    exit: { opacity: 0, transition: { duration: 0.15 } }
  };

  const stepCardVariants = {
    hidden: { opacity: 0, y: 25, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: 'easeOut' as const }
    }
  };

  return (
    <div className="how-it-works-container">
      {/* Hero Section Banner with Line-by-Line Reveal */}
      <motion.section
        className="how-hero-section"
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={lineVariants} className="inline-block">
          <span className="how-hero-badge">
            <Zap size={14} /> Guided Execution
          </span>
        </motion.div>

        <motion.h1 variants={lineVariants} className="how-hero-title">
          How PlaceD Works for Everyone
        </motion.h1>

        <motion.p variants={lineVariants} className="how-hero-subtitle">
          Select your role to explore the step-by-step workflow tailored specifically for your placement journey.
        </motion.p>
      </motion.section>

      {/* Role Tab Switcher Bar with Sliding Pill */}
      <section className="role-tabs-section">
        <div className="role-tabs-wrapper">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`role-tab-btn relative z-10 ${isActive ? 'active' : ''}`}
              >
                <span className="relative z-10">{tab.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-role-tab-pill"
                    className="role-tab-sliding-pill"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3 Interactive Steps Display with Animated Tab Switch */}
      <section className="steps-grid-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="steps-grid"
            variants={stepsGridVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {currentSteps.map((s, idx) => (
              <motion.div
                key={idx}
                variants={stepCardVariants}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                className="step-card"
              >
                <div>
                  <div className="step-card-header">
                    <span className="step-number-badge">{s.step}</span>
                    <div className="step-icon-box">{s.icon}</div>
                  </div>
                  <h3 className="step-card-title">{s.title}</h3>
                  <p className="step-card-desc">{s.desc}</p>
                </div>

                <div className="step-status-badge">
                  <CheckCircle2 size={16} className="step-status-icon" />
                  <span>Automated Workflow Active</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* Call to Action Bar */}
      <motion.section
        className="how-cta-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="how-cta-card">
          <Sparkles size={38} className="how-cta-icon" />
          <h2 className="how-cta-title">
            Ready to experience the workflow?
          </h2>
          <p className="how-cta-desc">
            Register your role now or log in to access your customized dashboard workspace.
          </p>
          <div className="how-cta-buttons">
            <button
              onClick={() => navigate('/auth?mode=register')}
              className="how-btn-primary"
            >
              Create Account <ArrowRight size={16} />
            </button>
            <button
              onClick={() => navigate('/auth?mode=login')}
              className="how-btn-secondary"
            >
              Sign In to Account
            </button>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};
