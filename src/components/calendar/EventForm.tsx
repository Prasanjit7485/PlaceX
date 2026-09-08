import React, { useState } from "react";
import { X, Calendar as CalendarIcon, Save, Building2, MapPin, Users, FileText } from "lucide-react";

interface Props {
  onClose: () => void;
  onSave: (event: any) => void;
  isPrivate?: boolean;
}

export default function EventForm({ onClose, onSave, isPrivate = false }: Props) {
  const [eventData, setEventData] = useState({
    company: "",
    role: "",
    type: isPrivate ? "Off-Campus Interview" : "PPT",
    date: "",
    time: "",
    venue: "",
    coordinator: "",
    branches: "",
    description: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    if (!eventData.company || !eventData.role || !eventData.date) {
      alert("Please fill required fields (Company, Role, Date)");
      return;
    }
    onSave(eventData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[1000000] p-4 sm:p-6 pt-24 sm:pt-28 overflow-y-auto animate-fade-in">
      <div className="bg-slate-50/95 rounded-3xl p-6 sm:p-8 w-full max-w-2xl sm:max-w-3xl mx-auto shadow-2xl border border-slate-200 flex flex-col gap-6 relative my-auto max-h-[80vh] overflow-y-auto mt-16 sm:mt-20">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-5 gap-4 sticky top-0 bg-slate-50/95 z-10 pt-1">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white shadow-md flex items-center justify-center font-bold shrink-0">
              <CalendarIcon size={22} />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display leading-tight">
                {isPrivate ? "Add Private Off-Campus Event 🔒" : "Add Recruitment Event"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                {isPrivate
                  ? "Add your off-campus interview, drive, or test (Only visible to you on your calendar)."
                  : "Schedule a campus recruitment drive, test, or interview round for students."}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer shrink-0"
            title="Close Form"
            aria-label="Close Form"
          >
            <X size={20} />
          </button>
        </div>

        {/* Section 1: Core Event Details */}
        <div className="sp-card flex flex-col gap-5 p-6 sm:p-7 bg-white shadow-xs rounded-2xl border border-slate-200/80">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display border-b border-slate-100 pb-3 flex items-center gap-2">
            <Building2 size={16} className="text-blue-600" />
            1. Core Event Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Company Name *</label>
              <input
                type="text"
                name="company"
                required
                value={eventData.company}
                placeholder="e.g. Microsoft"
                className="input-field"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Job Role *</label>
              <input
                type="text"
                name="role"
                required
                value={eventData.role}
                placeholder="e.g. Software Engineer"
                className="input-field"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">Event Type</label>
            <select
              name="type"
              value={eventData.type}
              className="input-field cursor-pointer"
              onChange={handleChange}
            >
              <option value="PPT">Pre-Placement Talk (PPT)</option>
              <option value="Online Assessment">Online Assessment</option>
              <option value="Technical Interview">Technical Interview</option>
              <option value="HR Interview">HR Interview</option>
              <option value="Deadline">Application Deadline</option>
              <option value="Off-Campus Interview">Off-Campus Interview</option>
            </select>
          </div>
        </div>

        {/* Section 2: Schedule & Venue Logistics */}
        <div className="sp-card flex flex-col gap-5 p-6 sm:p-7 bg-white shadow-xs rounded-2xl border border-slate-200/80">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display border-b border-slate-100 pb-3 flex items-center gap-2">
            <MapPin size={16} className="text-emerald-600" />
            2. Schedule & Venue Logistics
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Scheduled Date *</label>
              <input
                type="date"
                name="date"
                required
                value={eventData.date}
                className="input-field font-mono cursor-pointer"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Start Time</label>
              <input
                type="time"
                name="time"
                value={eventData.time}
                className="input-field font-mono cursor-pointer"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Venue / Location</label>
              <input
                type="text"
                name="venue"
                value={eventData.venue}
                placeholder="Auditorium / Online"
                className="input-field"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Section 3: Administration & Eligibility */}
        <div className="sp-card flex flex-col gap-5 p-6 sm:p-7 bg-white shadow-xs rounded-2xl border border-slate-200/80">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display border-b border-slate-100 pb-3 flex items-center gap-2">
            <Users size={16} className="text-indigo-600" />
            3. Administration & Eligibility
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">TPO Coordinator</label>
              <input
                type="text"
                name="coordinator"
                value={eventData.coordinator}
                placeholder="Coordinator Name"
                className="input-field"
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700">Eligible Branches</label>
              <input
                type="text"
                name="branches"
                value={eventData.branches}
                placeholder="CSE, ECE, IT"
                className="input-field"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Section 4: Event Instructions */}
        <div className="sp-card flex flex-col gap-5 p-6 sm:p-7 bg-white shadow-xs rounded-2xl border border-slate-200/80">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-display border-b border-slate-100 pb-3 flex items-center gap-2">
            <FileText size={16} className="text-amber-600" />
            4. Instructions & Additional Details
          </h3>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700">Event Description</label>
            <textarea
              name="description"
              rows={3}
              value={eventData.description}
              placeholder="Detailed instructions for candidates..."
              className="input-field font-sans min-h-[90px] resize-none"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200/80 sticky bottom-0 bg-slate-50/95 z-10 pb-1">
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary h-11 px-6 rounded-xl text-xs font-bold cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="btn btn-primary h-11 px-7 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-98 cursor-pointer"
          >
            <Save size={16} /> Save Event
          </button>
        </div>
      </div>
    </div>
  );
}