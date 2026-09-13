import React, { useMemo, useState } from 'react';
import {
  Users,
  Search,
  Building2,
  GraduationCap,
  Award,
  ExternalLink,
  GitBranch,
  Globe,
  CheckCircle2,
  Sparkles,
  Briefcase
} from 'lucide-react';
import type { Alumni } from '../../api/alumniApi';

interface AlumniDirectoryViewProps {
  alumniList: Alumni[];
  currentAlumni: Alumni;
}

export const AlumniDirectoryView: React.FC<AlumniDirectoryViewProps> = ({
  alumniList,
  currentAlumni
}) => {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('ALL');

  const approvedAlumni = useMemo(() => {
    return alumniList.filter((a) => a.alumniStatus === 'APPROVED' || !a.alumniStatus);
  }, [alumniList]);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();

    return approvedAlumni.filter((item) => {
      const matchesDept =
        deptFilter === 'ALL' ||
        (item.department && item.department.toLowerCase().includes(deptFilter.toLowerCase()));

      if (!matchesDept) return false;
      if (!query) return true;

      return [
        item.name,
        item.email,
        item.currentCompany,
        item.currentRole,
        item.department,
        item.location
      ]
        .join(' ')
        .toLowerCase()
        .includes(query);
    });
  }, [approvedAlumni, search, deptFilter]);

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-10">
      {/* Hero Header */}
      <div className="p-6 sm:p-8 rounded-3xl border border-orange-200/80 bg-gradient-to-r from-orange-50/90 via-amber-50/50 to-white shadow-2xs flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-orange-100/90 text-orange-900 font-extrabold text-xs flex items-center gap-1.5 shadow-2xs">
            <Sparkles size={13} className="text-orange-600" /> Verified Alumni Community
          </span>
          <div className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span>{approvedAlumni.length} Network Members</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mt-1">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display tracking-tight flex items-center gap-3">
              <Users size={28} className="text-orange-600 shrink-0" />
              Alumni Network Directory
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl leading-relaxed font-medium mt-1">
              Connect with fellow graduates, explore industry representations across top tech companies, and foster mentorship opportunities.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, company, role, skills..."
              className="w-full border border-slate-200 rounded-2xl pl-10 pr-4 py-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 transition-all bg-white/90 shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['ALL', 'Computer Science', 'Information Technology', 'Electronics', 'Electrical', 'Mechanical'].map((dept) => (
          <button
            key={dept}
            onClick={() => setDeptFilter(dept)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
              deptFilter === dept
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-orange-50 hover:text-orange-600'
            }`}
          >
            {dept === 'ALL' ? 'All Departments' : dept}
          </button>
        ))}
      </div>

      {/* Grid of Alumni Cards */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 px-6 rounded-3xl border border-slate-200 bg-white shadow-2xs text-slate-400">
          <Users size={36} className="mx-auto mb-3 text-slate-300" />
          <h3 className="text-base font-extrabold text-slate-900 font-display">No alumni members found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try broadening your search query or department filter.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => {
            const isSelf = item.id === currentAlumni.id || item.email.toLowerCase() === currentAlumni.email.toLowerCase();
            const initials = item.name
              ? item.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()
              : 'AL';

            return (
              <div
                key={item.id}
                className={`p-6 rounded-3xl border transition-all duration-200 flex flex-col justify-between gap-5 bg-white shadow-2xs hover:shadow-md ${
                  isSelf ? 'border-orange-300 ring-2 ring-orange-500/20' : 'border-slate-200/90 hover:border-orange-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 text-white font-black text-lg flex items-center justify-center shrink-0 shadow-md shadow-orange-500/20 ring-4 ring-white">
                      {initials}
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {isSelf && (
                        <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-extrabold">
                          You
                        </span>
                      )}
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 size={11} /> Verified
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base sm:text-lg font-display leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {item.email}
                    </p>
                  </div>

                  {item.bio && (
                    <p className="text-xs text-slate-600 italic mt-2.5 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      "{item.bio}"
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.currentCompany && (
                      <span className="px-3 py-1 bg-orange-50/80 border border-orange-200/80 rounded-xl text-xs font-extrabold text-orange-900 flex items-center gap-1.5 shadow-2xs">
                        <Building2 size={13} className="text-orange-600" />
                        {item.currentCompany}
                      </span>
                    )}

                    {item.currentRole && (
                      <span className="px-3 py-1 bg-amber-50/80 border border-amber-200/80 rounded-xl text-xs font-extrabold text-amber-900 flex items-center gap-1.5 shadow-2xs">
                        <Briefcase size={13} className="text-amber-600" />
                        {item.currentRole}
                      </span>
                    )}

                    <span className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                      <GraduationCap size={13} className="text-slate-500" />
                      Class of {item.graduationYear || 2024}
                    </span>

                    <span className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-xl text-xs font-extrabold text-slate-700 flex items-center gap-1.5">
                      <Award size={13} className="text-slate-500" />
                      {item.department || 'CSE'}
                    </span>
                  </div>
                </div>

                {/* Social & Dev Links */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.linkedinUrl && (
                      <a
                        href={item.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
                        title="LinkedIn Profile"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {item.githubUrl && (
                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
                        title="GitHub Profile"
                      >
                        <GitBranch size={14} />
                      </a>
                    )}
                    {item.devToUrl && (
                      <a
                        href={item.devToUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 transition-colors"
                        title="Dev.to Blog"
                      >
                        <Globe size={14} />
                      </a>
                    )}
                  </div>

                  {item.location && (
                    <span className="text-[11px] font-bold text-slate-400 truncate">
                      📍 {item.location}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
