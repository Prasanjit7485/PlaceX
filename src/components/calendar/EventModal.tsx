import { X, Calendar as CalendarIcon, MapPin, Clock, Building2, FileText, CheckCircle2 } from "lucide-react";
import type { CalendarEvent } from "../../api/types";
import { getEventColor } from "./calendarUtils";

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
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[1000000] p-4 sm:p-8 pt-24 sm:pt-28 overflow-y-auto animate-fade-in">
      <div className="bg-white rounded-3xl p-8 sm:p-10 w-full max-w-2xl sm:max-w-3xl mx-auto shadow-2xl border border-slate-200/90 flex flex-col gap-7 relative overflow-hidden my-auto mt-16 sm:mt-20">
        {/* Top Accent Color Line */}
        <div
          className="absolute top-0 left-0 right-0 h-2"
          style={{ backgroundColor: color.bg }}
        />

        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-6 gap-5 pt-1">
          <div className="flex items-center gap-5 min-w-0">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-white text-2xl shadow-md shrink-0 ring-4 ring-slate-100 font-display"
              style={{ backgroundColor: color.bg }}
            >
              {companyName.charAt(0)}
            </div>

            <div className="flex flex-col gap-2 min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap min-w-0">
                <span
                  className="px-3.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider text-white whitespace-nowrap inline-flex items-center justify-center shrink-0 shadow-2xs leading-none"
                  style={{ backgroundColor: color.bg }}
                >
                  {event.eventType || "Placement Event"}
                </span>

                <span className="flex items-center gap-2 text-xs font-extrabold text-slate-800 bg-slate-100 px-3.5 py-1 rounded-lg border border-slate-200/80 shadow-2xs whitespace-nowrap shrink-0">
                  <Building2 size={15} className="text-slate-500 shrink-0" />
                  <span className="truncate max-w-[200px] font-display">{companyName}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display leading-tight tracking-tight">
                {event.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            title="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* Event Details Grid */}
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date Card */}
            <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
                <CalendarIcon size={22} />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Scheduled Date</span>
                <span className="font-extrabold text-slate-900 text-sm font-mono">{event.scheduledDate}</span>
              </div>
            </div>

            {/* Time Card */}
            <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
                <Clock size={22} />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Start Time</span>
                <span className="font-extrabold text-slate-900 text-sm font-mono">{event.startTime || "09:00 AM"}</span>
              </div>
            </div>

            {/* Venue / Location Card */}
            <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-4 sm:col-span-2">
              <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 shadow-2xs">
                <MapPin size={22} />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0 truncate">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Venue / Location</span>
                <span className="font-extrabold text-slate-900 text-sm truncate" title={locationText}>{locationText}</span>
              </div>
            </div>

            {/* Company Card */}
            <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center gap-4 sm:col-span-2">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
                <Building2 size={22} />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0 truncate">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Company / Organization</span>
                <span className="font-extrabold text-slate-900 text-sm truncate" title={companyName}>{companyName}</span>
              </div>
            </div>
          </div>

          {/* Description Block */}
          {event.description && (
            <div className="bg-blue-50/80 p-6 rounded-2xl border border-blue-100 flex flex-col gap-2.5 shadow-2xs">
              <span className="text-xs font-extrabold text-blue-900 uppercase tracking-wider flex items-center gap-2 font-mono">
                <FileText size={17} /> Event Instructions & Description
              </span>
              <p className="text-slate-700 leading-relaxed font-medium text-sm">
                {event.description}
              </p>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={onClose}
            className="btn btn-primary h-12 w-full rounded-xl text-xs sm:text-sm font-extrabold shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
          >
            <CheckCircle2 size={18} />
            <span>Close Event Details</span>
          </button>
        </div>
      </div>
    </div>
  );
}
