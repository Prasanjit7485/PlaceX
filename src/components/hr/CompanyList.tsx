import { useState, useEffect } from "react";
import type { Company } from "./hrTypes";
import { companyApi } from "../../api/companyApi";
import CompanyCard from "./CompanyCard";
import { Search } from "lucide-react";

interface Props {
  onSelect: (company: Company) => void;
  selectedId?: number;
}

export default function CompanyList({ onSelect, selectedId }: Props) {
  const [search, setSearch] = useState("");
  const [companyList, setCompanyList] = useState<Company[]>([]);

  useEffect(() => {
    companyApi.getAll()
      .then((realCompanies) => {
        if (Array.isArray(realCompanies)) {
          const mapped: Company[] = realCompanies.map((c, idx) => {
            const domain = c.website ? c.website.replace(/^https?:\/\//, "").split("/")[0] : "";
            return {
              id: c.id ?? idx + 100,
              name: c.name,
              logo: domain ? `https://logo.clearbit.com/${domain}` : "https://logo.clearbit.com/company.com",
              hr: c.location || "Campus Relations",
              email: domain ? `campus@${domain}` : "contact@company.com",
              industry: c.description || "Technology",
              status: "Never Contacted"
            };
          });
          setCompanyList(mapped);
        }
      })
      .catch((err) => {
        console.error("Failed to load company list:", err);
      });
  }, []);

  const filtered = companyList.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.hr.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Company..."
          className="input-field pl-10"
        />
        <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
      </div>

      <div className="flex flex-col gap-3">
        {filtered.map((company) => (
          <CompanyCard
            key={company.id}
            company={company}
            isSelected={company.id === selectedId}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}