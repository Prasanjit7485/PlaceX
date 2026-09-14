import { useState, useEffect } from "react";
import { jobPostingApi } from "../../api/jobPostingApi";
import ScrapedStats from "./ScrapedStats";
import ScrapedFilters from "./ScrapedFilters";
import ScrapedDriveCard from "./ScrapedDriveCard";
import ScrapedDriveModal from "./ScrapedDriveModal";

export function ScrapedDrives() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [drives, setDrives] = useState<any[]>([]);

  useEffect(() => {
    jobPostingApi.getAll()
      .then((postings) => {
        if (Array.isArray(postings)) {
          const mapped = postings.map((jp) => ({
            id: jp.id,
            company: jp.companyName || "Unknown Company",
            title: jp.title,
            location: jp.location || "Remote / Various",
            salary: jp.salary != null ? `${jp.salary} LPA` : "Not disclosed",
            source: jp.source || jp.sourceType || "Web",
            posted: jp.postedAt || "Recently",
            applyLink: jp.applyUrl || "#",
            status: jp.status || "OPEN",
            description: jp.description || "",
            roleCategory: jp.roleCategory || jp.title,
            jobType: jp.jobType || "Full Time",
          }));
          setDrives(mapped);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch scraped drives:", err);
      });
  }, []);

  const filtered = drives.filter((d) =>
    d.company.toLowerCase().includes(search.toLowerCase()) ||
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">🌐 Recruitment Feed</h1>
        <p className="text-gray-400 mt-2">
          Jobs collected automatically from recruitment portals.
        </p>
      </div>

      <ScrapedStats
        pending={drives.filter((d) => d.status === "PENDING").length}
        approved={drives.filter((d) => d.status === "OPEN").length}
        rejected={drives.filter((d) => d.status === "CLOSED").length}
        today={drives.length}
      />

      <ScrapedFilters search={search} setSearch={setSearch} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((drive) => (
          <ScrapedDriveCard key={drive.id} drive={drive} onView={setSelected} />
        ))}
      </div>

      <ScrapedDriveModal drive={selected} onClose={() => setSelected(null)} />
    </div>
  );
}