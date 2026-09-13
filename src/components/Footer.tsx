import React from 'react';
import { ContributorAvatar, AvatarGroup, ContributorStyles } from './ContributorAvatar';
import placedLogo from '../assets/placed_logo.png';

const contributors = [
  {
    name: "Prashanjit Mishra",
    image: "https://lh3.googleusercontent.com/d/1MGDVRNOt8JbFlbcWgCsY-CLdGBatzEij",
    github: "https://github.com/Prasanjit7485",
  },
  {
    name: "Shreyaushi Das",
    image: "https://avatars.githubusercontent.com/u/185457484?v=4",
    github: "https://github.com/shreyaushi-Das",
  },
  {
    name: "Sheetal Bajaj",
    image: "https://avatars.githubusercontent.com/u/183822317?v=4",
    github: "https://github.com/Sheetal-cell",
  },
  {
    name: "Arghya Roy Chowdhury",
    image: "https://avatars.githubusercontent.com/u/183939897?v=4",
    github: "https://github.com/roychowdhury-arghya",
  },
];

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer bg-white border-t border-slate-200 text-slate-900" id="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <div className="flex items-center gap-2">
            <img src={placedLogo} alt="PlaceD Logo" className="w-6 h-6 object-contain rounded-md" />
            <span className="font-extrabold text-slate-900 text-base font-display">PlaceD</span>
          </div>
          <p className="text-xs text-slate-600 max-w-xs leading-relaxed mt-2">
            A unified placement & training portal connecting students,
            recruiters, and the Training &amp; Placement Office.
          </p>
        </div>

        <div className="site-footer-links">
          <div>
            <span className="site-footer-heading text-slate-900 font-bold">Product</span>
            <a href="#" className="text-slate-600 hover:text-blue-600 font-medium">Placement Drives</a>
            <a href="#" className="text-slate-600 hover:text-blue-600 font-medium">Resume Insights</a>
            <a href="#" className="text-slate-600 hover:text-blue-600 font-medium">Student Directory</a>
          </div>
          <div>
            <span className="site-footer-heading text-slate-900 font-bold">Institution</span>
            <a href="#" className="text-slate-600 hover:text-blue-600 font-medium">About TPO Cell</a>
            <a href="#" className="text-slate-600 hover:text-blue-600 font-medium">Placement Policy</a>
            <a href="mailto:tpo@university.edu" className="text-blue-600 font-semibold hover:underline">Contact TPO</a>
          </div>
        </div>
        <div className="site-footer-contributors flex flex-col items-start md:items-end">
          <span className="text-[10px] text-blue-600 uppercase tracking-widest font-bold mb-4 flex gap-4">Built by</span>
          <AvatarGroup>
            {contributors.map((contrib, idx) => (
              <ContributorAvatar
                key={idx}
                name={contrib.name}
                image={contrib.image}
                github={contrib.github}
              />
            ))}
          </AvatarGroup>
          <ContributorStyles />
        </div>
      </div>

      <div className="site-footer-bottom text-slate-500 border-t border-slate-100 mt-6 pt-4 text-xs">
        <span className="font-semibold text-slate-700">© {year} PlaceD. Built for campus placement teams.</span>
        <span className="hidden sm:inline text-blue-600 font-bold">v1.0 · University Placement Environment</span>
      </div>
    </footer>
  );
};
