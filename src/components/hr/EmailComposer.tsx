import { useState, useEffect, type MouseEvent } from "react";
import type { Company } from "./hrTypes";
import { Mail, Sparkles, Send } from "lucide-react";

interface Props {
  selected: Company | null;
  selectedTemplate?: string | null;
}

export default function EmailComposer({ selected, selectedTemplate }: Props) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (!selected) return;

    const companyName = selected.name;
    const hrName = selected.hr;

    if (selectedTemplate === "Internship Invitation") {
      setSubject(`Summer Internship Hiring Drive - ${companyName}`);
      setBody(
`Dear ${hrName},

We would like to invite ${companyName} for our upcoming Summer Internship Hiring Season. Our top pre-final year candidates are available for 2 to 6 months internships.

We look forward to collaborating with your campus talent acquisition team.

Regards,
Training & Placement Office`
      );
    } else if (selectedTemplate === "Placement Drive Reminder") {
      setSubject(`Reminder: Campus Placement Drive Schedule - ${companyName}`);
      setBody(
`Dear ${hrName},

This is a gentle reminder regarding the upcoming campus recruitment schedule for ${companyName}.

Please let us know if you require any arrangements for online assessment or interview logistics.

Regards,
Training & Placement Office`
      );
    } else if (selectedTemplate === "Follow-up Email") {
      setSubject(`Follow-up: Campus Placement Engagement - ${companyName}`);
      setBody(
`Dear ${hrName},

I hope this message finds you well.

Following up on our previous communication regarding campus hiring, we wanted to check if your team has finalized recruitment slots for this season.

Regards,
Training & Placement Office`
      );
    } else if (selectedTemplate === "Thank You Email") {
      setSubject(`Thank You for Partnering with PlaceD - ${companyName}`);
      setBody(
`Dear ${hrName},

Thank you for conducting the placement drive at our campus for ${companyName}.

We appreciate your team's effort and look forward to a long-term corporate relationship.

Regards,
Training & Placement Office`
      );
    } else {
      // Default: Campus Recruitment
      setSubject(`Invitation for Campus Recruitment - ${companyName}`);
      setBody(
`Dear ${hrName},

Greetings from PlaceD Training & Placement Cell.

The Placement Office cordially invites ${companyName} to participate in our campus recruitment drive for the upcoming batch.

We would be delighted to host your recruitment team.

Regards,
Training & Placement Office`
      );
    }
  }, [selected, selectedTemplate]);

  const handleSendEmail = () => {
    if (!selected) return;
    const mailtoUrl = `mailto:${encodeURIComponent(selected.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  if (!selected) {
    return (
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-sm text-center text-slate-400 flex flex-col items-center justify-center min-h-90">
        <Mail size={48} className="opacity-20 mb-3" />
        <p className="text-base font-bold text-slate-700 font-display">No Recruiter Selected</p>
        <p className="text-xs text-slate-500 mt-1 max-w-xs font-medium">Select a company from the list on the left to compose an outreach email.</p>
      </div>
    );
  }

  function handleBlogSubmit(e: MouseEvent<HTMLButtonElement>, arg1: boolean): void {
    e.preventDefault();
    if (!selected) return;

    const draft = {
      recipient: selected.email,
      company: selected.name,
      subject,
      body,
      savedAt: new Date().toISOString(),
      published: arg1,
    };

    try {
      const drafts = JSON.parse(localStorage.getItem("placeD-email-drafts") ?? "[]");
      const nextDrafts = Array.isArray(drafts)
        ? [...drafts.filter((item) => item.recipient !== selected.email), draft]
        : [draft];
      localStorage.setItem("placeD-email-drafts", JSON.stringify(nextDrafts));
    } catch {
      // Storage may be unavailable; the composed email remains intact.
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h2 className="text-xl font-bold font-display text-slate-900 flex items-center gap-2.5">
          <Mail size={22} className="text-blue-600" />
          Compose Outreach Email
        </h2>
        <span className="sp-badge sp-badge-primary">
          {selected.name}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-slate-700">Recipient Email</label>
        <input
          value={selected.email}
          readOnly
          className="input-field bg-slate-50 text-slate-600 font-medium cursor-not-allowed"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-slate-700">Subject Line</label>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject Line"
          className="input-field font-semibold"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold text-slate-700">Email Message Body</label>
        <textarea
          rows={9}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="input-field font-sans leading-relaxed resize-none"
        />
      </div>

      <div className="flex flex-wrap justify-end gap-3 mt-3 pt-4 border-t border-slate-100">
        <button
  type="button"
  onClick={(e) => handleBlogSubmit(e, false)}
>
  Save Draft
</button>

        <button
          type="button"
          className="btn btn-secondary h-11 px-5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200 text-sm font-bold flex items-center gap-2"
        >
          <Sparkles size={16} className="text-amber-600" /> AI Polish
        </button>

        <button
          type="button"
          onClick={handleSendEmail}
          className="btn btn-primary h-11 px-6 rounded-xl text-sm font-bold flex items-center gap-2"
        >
          <Send size={16} /> Send Email
        </button>
      </div>
    </div>
  );
}