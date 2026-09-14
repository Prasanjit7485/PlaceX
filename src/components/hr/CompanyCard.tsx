import type { Company } from "./hrTypes";

interface Props {
  company: Company;
  isSelected?: boolean;
  onSelect: (company: Company) => void;
}

export default function CompanyCard({ company, isSelected, onSelect }: Props) {
  const getBadgeClass = (status: string) => {
    switch (status) {
      case "Replied":
        return "sp-badge sp-badge-success";
      case "Pending":
        return "sp-badge sp-badge-warning";
      case "Never Contacted":
      default:
        return "sp-badge sp-badge-info";
    }
  };

  return (
    <div
      onClick={() => onSelect(company)}
      className={`glass-card p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
        isSelected
          ? "border-blue-600 ring-2 ring-blue-100 bg-blue-50/30 shadow-sm"
          : "border-slate-200 bg-white hover:border-blue-300 shadow-xs"
      }`}
    >
      <div className="flex items-center gap-3.5">
        <img
          src={company.logo}
          alt={company.name}
          className="w-11 h-11 rounded-xl object-cover border border-slate-200 shrink-0 bg-slate-50"
        />
        <div>
          <h3 className="font-bold text-slate-900 text-sm font-display">
            {company.name}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {company.hr}
          </p>
          <span className={`inline-block mt-1.5 ${getBadgeClass(company.status)}`}>
            {company.status}
          </span>
        </div>
      </div>
    </div>
  );
}