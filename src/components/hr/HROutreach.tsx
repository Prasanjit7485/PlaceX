import { useState } from "react";
import type { Company } from "./hrTypes";
import { Mail } from "lucide-react";

import CompanyList from "./CompanyList";
import EmailComposer from "./EmailComposer";
import EmailTemplates from "./EmailTemplates";
import OutreachStats from "./OutreachStats";

export default function HROutreach() {
  const [selected, setSelected] = useState<Company | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header Banner */}
      <div className="sp-page-header">
        <div>
          <h1 className="sp-page-title">
            <Mail size={28} className="text-blue-600" />
            Recruiter Relationship Management
          </h1>
          <p className="sp-page-subtitle">
            Manage corporate recruiter communications, dispatch placement invitations, and track email response rates.
          </p>
        </div>
      </div>

      {/* KPI Stats */}
      <OutreachStats />

      {/* Main 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="col-span-1 lg:col-span-4 xl:col-span-3">
          <CompanyList onSelect={setSelected} selectedId={selected?.id} />
        </div>

        <div className="col-span-1 lg:col-span-8 xl:col-span-6">
          <EmailComposer selected={selected} selectedTemplate={selectedTemplate} />
        </div>

        <div className="col-span-1 lg:col-span-12 xl:col-span-3">
          <EmailTemplates onSelectTemplate={setSelectedTemplate} />
        </div>
      </div>
    </div>
  );
}