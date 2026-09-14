import React, { useState } from "react";
import { X, Calendar as CalendarIcon, Save, Building2, MapPin, Users, FileText } from "lucide-react";
import "../admin/RecordPlacementOfferModal.css";

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
    <div className="rp-modal-overlay">
      <div className="rp-modal-card max-w-2xl">
        {/* Header */}
        <div className="rp-modal-header">
          <div className="rp-header-left">
            <div className="rp-header-icon-badge" style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }}>
              <CalendarIcon size={24} />
            </div>
            <div className="rp-header-text">
              <h3 className="rp-modal-title">
                {isPrivate ? "Add Private Off-Campus Event 🔒" : "Add Recruitment Event"}
              </h3>
              <p className="rp-modal-subtitle">
                {isPrivate
                  ? "Add your private off-campus interview or test"
                  : "Schedule a campus recruitment drive or interview round"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rp-close-btn"
            title="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="rp-modal-body">
          {/* Section 1: Core Details */}
          <div className="rp-form-group">
            <label className="rp-field-label">
              Company Name <span className="rp-asterisk">*</span>
            </label>
            <div className="rp-input-wrapper">
              <Building2 size={18} className="rp-input-icon" />
              <input
                type="text"
                name="company"
                required
                value={eventData.company}
                placeholder="e.g. Microsoft / Google"
                className="rp-input-field"
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rp-form-group">
              <label className="rp-field-label">
                Job Role <span className="rp-asterisk">*</span>
              </label>
              <div className="rp-input-wrapper">
                <FileText size={18} className="rp-input-icon" />
                <input
                  type="text"
                  name="role"
                  required
                  value={eventData.role}
                  placeholder="e.g. Software Engineer"
                  className="rp-input-field"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="rp-form-group">
              <label className="rp-field-label">Event Type</label>
              <div className="rp-input-wrapper">
                <select
                  name="type"
                  value={eventData.type}
                  className="rp-input-field cursor-pointer bg-transparent"
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
          </div>

          {/* Section 2: Logistics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rp-form-group">
              <label className="rp-field-label">
                Scheduled Date <span className="rp-asterisk">*</span>
              </label>
              <div className="rp-input-wrapper">
                <CalendarIcon size={18} className="rp-input-icon text-blue-600" />
                <input
                  type="date"
                  name="date"
                  required
                  value={eventData.date}
                  className="rp-input-field font-mono cursor-pointer"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="rp-form-group">
              <label className="rp-field-label">Start Time</label>
              <div className="rp-input-wrapper">
                <input
                  type="time"
                  name="time"
                  value={eventData.time}
                  className="rp-input-field font-mono cursor-pointer"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="rp-form-group">
              <label className="rp-field-label">Venue / Location</label>
              <div className="rp-input-wrapper">
                <MapPin size={18} className="rp-input-icon text-rose-600" />
                <input
                  type="text"
                  name="venue"
                  value={eventData.venue}
                  placeholder="Auditorium / Online"
                  className="rp-input-field"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Eligibility & Coordinator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rp-form-group">
              <label className="rp-field-label">Coordinator Name</label>
              <div className="rp-input-wrapper">
                <Users size={18} className="rp-input-icon" />
                <input
                  type="text"
                  name="coordinator"
                  value={eventData.coordinator}
                  placeholder="Coordinator Name"
                  className="rp-input-field"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="rp-form-group">
              <label className="rp-field-label">Eligible Branches</label>
              <div className="rp-input-wrapper">
                <input
                  type="text"
                  name="branches"
                  value={eventData.branches}
                  placeholder="CSE, IT, ECE"
                  className="rp-input-field"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Section 4: Instructions */}
          <div className="rp-form-group">
            <label className="rp-field-label">Instructions & Overview</label>
            <div className="rp-input-wrapper" style={{ alignItems: 'flex-start' }}>
              <textarea
                name="description"
                rows={3}
                value={eventData.description}
                placeholder="Detailed instructions for candidates..."
                className="rp-input-field min-h-[70px] resize-none"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="rp-modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="rp-btn-cancel"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rp-btn-save"
            style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }}
          >
            <Save size={16} />
            Save Event
          </button>
        </div>
      </div>
    </div>
  );
}