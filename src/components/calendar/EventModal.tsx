import { X, Calendar as CalendarIcon, MapPin, Clock, Building2, FileText, CheckCircle2 } from "lucide-react";
import type { CalendarEvent } from "../../api/types";
import { getEventColor } from "./calendarUtils";
import "../admin/RecordPlacementOfferModal.css";

interface EventModalProps {
  event: CalendarEvent | null;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  if (!event) return null;

  const color = getEventColor(event);
  const companyName = event.companyName || event.company || "Placement Drive";
  const locationText = event.location || event.venue || "Campus Main Hall";

  return (
    <div className="rp-modal-overlay">
      <div className="rp-modal-card max-w-2xl">
        {/* Modal Header */}
        <div className="rp-modal-header">
          <div className="rp-header-left">
            <div
              className="rp-header-icon-badge"
              style={{ background: color.bg || 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }}
            >
              <CalendarIcon size={24} />
            </div>
            <div className="rp-header-text">
              <h3 className="rp-modal-title">{event.title}</h3>
              <p className="rp-modal-subtitle">
                {event.eventType || "Placement Event"} • {companyName}
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

        {/* Modal Body */}
        <div className="rp-modal-body">
          {/* Event Organization Card */}
          <div className="rp-candidate-card">
            <div className="rp-candidate-info">
              <div
                className="rp-candidate-avatar"
                style={{ backgroundColor: color.bg || '#2563eb' }}
              >
                {companyName.charAt(0).toUpperCase()}
              </div>
              <div className="rp-candidate-details">
                <h4 className="rp-candidate-name">{companyName}</h4>
                <p className="rp-candidate-meta">
                  {event.role || event.title}
                </p>
              </div>
            </div>
            <span
              className="rp-candidate-badge"
              style={{ backgroundColor: `${color.bg}20`, color: color.bg }}
            >
              {event.eventType || "Event"}
            </span>
          </div>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Scheduled Date */}
            <div className="rp-input-wrapper bg-slate-50 border-slate-200">
              <CalendarIcon size={18} className="rp-input-icon text-blue-600" />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Scheduled Date</span>
                <span className="text-sm font-bold text-slate-900 font-mono">{event.scheduledDate}</span>
              </div>
            </div>

            {/* Start Time */}
            <div className="rp-input-wrapper bg-slate-50 border-slate-200">
              <Clock size={18} className="rp-input-icon text-indigo-600" />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Start Time</span>
                <span className="text-sm font-bold text-slate-900 font-mono">{event.startTime || "09:00 AM"}</span>
              </div>
            </div>

            {/* Venue / Location */}
            <div className="rp-input-wrapper bg-slate-50 border-slate-200 sm:col-span-2">
              <MapPin size={18} className="rp-input-icon text-rose-600" />
              <div className="flex flex-col min-w-0 truncate">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Venue / Location</span>
                <span className="text-sm font-bold text-slate-900 truncate" title={locationText}>{locationText}</span>
              </div>
            </div>

            {/* Company / Host */}
            <div className="rp-input-wrapper bg-slate-50 border-slate-200 sm:col-span-2">
              <Building2 size={18} className="rp-input-icon text-teal-600" />
              <div className="flex flex-col min-w-0 truncate">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Host Organization</span>
                <span className="text-sm font-bold text-slate-900 truncate">{companyName}</span>
              </div>
            </div>
          </div>

          {/* Description Block */}
          {event.description && (
            <div className="p-4.5 rounded-2xl bg-blue-50/80 border border-blue-200/80 flex flex-col gap-2">
              <span className="text-xs font-extrabold text-blue-900 uppercase tracking-wider flex items-center gap-2 font-mono">
                <FileText size={15} /> Event Instructions & Overview
              </span>
              <p className="text-slate-700 leading-relaxed font-medium text-xs sm:text-sm whitespace-pre-line">
                {event.description}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="rp-modal-footer">
          <button
            type="button"
            onClick={onClose}
            className="rp-btn-save w-full justify-center"
            style={{ background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' }}
          >
            <CheckCircle2 size={16} />
            Done Viewing
          </button>
        </div>
      </div>
    </div>
  );
}
