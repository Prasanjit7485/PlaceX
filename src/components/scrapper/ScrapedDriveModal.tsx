//import React from "react";

import {X} from "lucide-react";
import type { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default function ScrapedDriveModal({

drive,

currentStudent = { skills: [] },

onClose

}:any){

if(!drive) return null;

return(

<div className="modal-overlay">

<div className="glass-card modal-content p-6">

<div className="flex justify-between">

<h2 className="text-2xl font-bold">

{drive.company}

</h2>

<X

className="cursor-pointer"

onClick={onClose}

/>

</div>

<div className="mt-6 space-y-3">

<p><b>Role:</b> {drive.title}</p>

<p><b>Location:</b> {drive.location}</p>

<p><b>Salary:</b> {drive.salary}</p>

<p><b>Deadline:</b> {drive.deadline}</p>

<p><b>Source:</b> {drive.source}</p>

<p><b>Description:</b></p>

<p>{drive.description}</p>

<div className="flex flex-wrap gap-2">

{drive.recruitmentType !== 'OFF_CAMPUS' &&
  Array.isArray(drive.skillsRequired) && (
    <div className="flex flex-wrap gap-2 pt-1">
      {drive.skillsRequired.map((skill: boolean | Key | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined) => {
        const hasSkill = currentStudent.skills.some(
          (ss: string) =>
            ss.toLowerCase() === String(skill).toLowerCase()
        );

        return (
          <span
            key={String(skill)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 ${
              hasSkill
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-slate-100 text-slate-600 border border-slate-200'
            }`}
          >
            {hasSkill && (
              <span className="text-emerald-600 font-bold">
                ✓
              </span>
            )}

            {skill}
          </span>
        );
      })}
    </div>
  )}

</div>

<div className="flex gap-3 mt-6">

<button className="btn btn-success">

Approve

</button>

<button className="btn btn-danger">

Reject

</button>

</div>

</div>

</div>

</div>

);

}