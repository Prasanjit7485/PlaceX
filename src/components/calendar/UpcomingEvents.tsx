import type { CalendarEvent } from "../../api/types";
import { INITIAL_CALENDAR_EVENTS } from "../../mockCalendar";
import { Calendar, MapPin, Clock, Building2, Sparkles, CheckCircle2 } from "lucide-react";
import { getEventColor } from "./calendarUtils";

interface UpcomingEventsProps {
  events?: CalendarEvent[];
  onSelectEvent?: (event: CalendarEvent) => void;
}

export default function UpcomingEvents({ events, onSelectEvent }: UpcomingEventsProps) {
  const displayEvents = events && events.length > 0 ? events : INITIAL_CALENDAR_EVENTS;

  return (
    <div className="glass-card p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white shadow-xs flex flex-col gap-6">
      {/* Header with Padded Scheduled Count Box */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-5 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold shadow-2xs">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 font-display tracking-tight leading-none">
              Upcoming Schedule
            </h2>
            <p className="text-[11px] text-slate-500 font-medium mt-1">
              Active campus recruitment timeline
            </p>
          </div>
        </div>

        {/* Padded Box for Scheduled Count Status */}
        <div className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 font-mono text-xs font-black shadow-2xs shrink-0">
          {displayEvents.length} Scheduled
        </div>
      </div>

      {/* Events Card List */}
      {displayEvents.length === 0 ? (
        <div className="text-center py-12 px-4 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <Calendar size={36} className="mx-auto opacity-30 mb-2.5" />
          <p className="text-xs font-extrabold text-slate-600">No upcoming events scheduled.</p>
          <p className="text-[11px] text-slate-400 mt-0.5">New drive timelines will appear here automatically.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4.5 max-h-[680px] lg:max-h-[720px] overflow-y-auto pr-2 custom-scrollbar shrink-0 min-h-0">
          {displayEvents.map((event) => {
            const color = getEventColor(event);
            const companyName = event.companyName || event.company || "Placement Cell";
            const locationText = event.location || event.venue || "Campus Main Hall";

            return (
              <div
                key={String(event.id)}
                onClick={() => onSelectEvent?.(event)}
                className="sp-kpi-card shrink-0 w-full hover:border-blue-400 hover:shadow-md transition-all duration-200 cursor-pointer active:scale-99 group flex flex-col justify-between"
                style={{ '--kpi-accent': color.bg } as React.CSSProperties}
                title="Click to view event details and navigate to date on calendar"
              >
                {/* Top Accent Color Line matching Student Dashboard sp-kpi-card */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: color.bg }}
                />

                {/* Header Tag Row: Event Type Badge + Company Tag (Left) & Date Pill (Right) */}
                <div className="flex items-center justify-between gap-3 flex-wrap mb-3.5 pt-1">
                  <div className="flex items-center gap-2 flex-wrap min-w-0">
                    <span
                      className="px-3.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider text-white whitespace-nowrap inline-flex items-center justify-center shrink-0 shadow-2xs leading-none"
                      style={{ backgroundColor: color.bg }}
                    >
                      {event.eventType || "Event"}
                    </span>

                    <span className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800 bg-slate-100 px-3.5 py-1 rounded-md border border-slate-200/80 shadow-2xs whitespace-nowrap shrink-0">
                      <Building2 size={14} className="text-slate-500 shrink-0" />
                      <span className="truncate max-w-[140px] font-display">{companyName}</span>
                    </span>
                  </div>

                  <span className="text-[11px] font-extrabold font-mono text-slate-600 bg-slate-50 px-3 py-1 rounded-md border border-slate-200/80 shadow-2xs shrink-0 whitespace-nowrap">
                    {event.scheduledDate}
                  </span>
                </div>

                {/* Event Title */}
                <h3 className="font-extrabold text-base text-slate-900 leading-snug font-display group-hover:text-blue-600 transition-colors mb-3.5">
                  {event.title}
                </h3>

                {/* Grid Mini-Cards Spec Box */}
                <div className="grid grid-cols-2 gap-3 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/80 text-xs shrink-0">
                  {/* Time Mini-Card */}
                  <div className="flex items-center gap-2.5 bg-white p-3 rounded-lg border border-slate-200/70 shadow-2xs min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Clock size={15} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Time</span>
                      <span className="font-extrabold text-slate-900 font-mono text-xs truncate">
                        {event.startTime || "09:00 AM"}
                      </span>
                    </div>
                  </div>

                  {/* Venue Mini-Card */}
                  <div className="flex items-center gap-2.5 bg-white p-3 rounded-lg border border-slate-200/70 shadow-2xs min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                      <MapPin size={15} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Location</span>
                      <span className="font-extrabold text-slate-900 text-xs truncate" title={locationText}>
                        {locationText}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Optional Status Pill Footer */}
                {event.status && (
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 text-[11px] text-slate-500 font-bold shrink-0">
                    <span className="flex items-center gap-1.5 text-emerald-700">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      Status: {event.status}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}