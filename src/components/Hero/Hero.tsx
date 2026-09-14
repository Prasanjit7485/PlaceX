import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, LogIn, ArrowRight } from 'lucide-react';
import { GravityStarsBackground } from './GravityStarsBackground';
import placedLogo from '../../assets/placed_logo.png';
import './Hero.css';

interface HeroProps {
  onSelectAction?: (mode: 'login' | 'register') => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectAction }) => {
  const navigate = useNavigate();

  const handleAction = (mode: 'login' | 'register') => {
    if (onSelectAction) {
      onSelectAction(mode);
    }
    navigate(`/auth?mode=${mode}`);
  };

  return (
    <section className="hero-container">
      {/* Animated gravity stars particle field */}
      <GravityStarsBackground
        starsCount={90}
        starsSize={2.4}
        starsOpacity={0.75}
        glowIntensity={12}
        glowAnimation="ease"
        movementSpeed={0.65}
        mouseInfluence={220}
        mouseGravity="attract"
        gravityStrength={150}
        starsInteraction={false}
      />

      {/* Decorative animated floating blue/purple background bubbles */}
      <div className="hero-bubble-field" aria-hidden="true">
        <div className="hero-bubble bubble-1"></div>
        <div className="hero-bubble bubble-2"></div>
        <div className="hero-bubble bubble-3"></div>
        <div className="hero-bubble bubble-4"></div>
      </div>

      <div className="hero-content-wrapper">
        <div className="hero-logo-box flex items-center justify-center p-3 rounded-3xl bg-white/90 border border-blue-100 shadow-xl backdrop-blur-md">
          <img src={placedLogo} alt="PlaceD Logo" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
        </div>

        <h1 className="hero-title">PlaceD</h1>

        <span className="hero-subtitle-badge">
          AI Powered Placement Management
        </span>

        <h2 className="hero-heading">Transform Campus Placements</h2>

        <p className="hero-description">
          Track students, manage drives, analyze resumes,
          conduct mock interviews and improve placement rates.
        </p>

        {/* Hero statistics */}
        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <h3>5000+</h3>
            <span>Students</span>
          </div>
          <div className="hero-stat-item">
            <h3>300+</h3>
            <span>Companies</span>
          </div>
          <div className="hero-stat-item">
            <h3>95%</h3>
            <span>Success Rate</span>
          </div>
        </div>

        {/* Dual Side-by-Side Action Entry Cards */}
        <div className="hero-action-cards-wrapper">
          <button
            type="button"
            onClick={() => handleAction('register')}
            className="hero-action-card hero-action-card-register"
            aria-label="Register New Account"
          >
            <div className="hero-action-icon-box">
              <UserPlus size={24} />
            </div>
            <div className="hero-action-text-box">
              <div className="hero-action-title">
                <span>Register New Account</span>
                <ArrowRight size={16} className="hero-action-arrow" />
              </div>
              <p className="hero-action-subtitle">
                Join PlaceD as a Student, TPO, Recruiter, or Alumni
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleAction('login')}
            className="hero-action-card hero-action-card-login"
            aria-label="Log In to Existing Account"
          >
            <div className="hero-action-icon-box">
              <LogIn size={24} />
            </div>
            <div className="hero-action-text-box">
              <div className="hero-action-title">
                <span>Log In to Existing Account</span>
                <ArrowRight size={16} className="hero-action-arrow" />
              </div>
              <p className="hero-action-subtitle">
                Access your portal and manage recruitment drives
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
