import type { CalendarEvent } from "./api/types";

export interface PlacementEvent {
  id: string;
  title: string;
  company: string;
  role: string;
  type: string;
  date: string;
  time: string;
  venue: string;
  coordinator: string;
  branches: string[];
  description: string;
}

export const placementEvents: PlacementEvent[] = [
  {
    id: "1",
    title: "Microsoft PPT",
    company: "Microsoft",
    role: "Software Engineer Intern",
    type: "PPT",
    date: "2026-08-10",
    time: "10:00 AM",
    venue: "Seminar Hall",
    coordinator: "TPO Office",
    branches: ["CSE", "IT", "ECE"],
    description: "Pre-placement talk."
  },
  {
    id: "2",
    title: "Amazon OA",
    company: "Amazon",
    role: "SDE Intern",
    type: "OA",
    date: "2026-08-12",
    time: "09:00 AM",
    venue: "Lab 2",
    coordinator: "Placement Cell",
    branches: ["CSE", "IT"],
    description: "Online Coding Assessment."
  },
  {
    id: "3",
    title: "Google Technical Interview Round 1",
    company: "Google",
    role: "Associate Software Engineer",
    type: "Interview",
    date: "2026-08-15",
    time: "02:00 PM",
    venue: "Online (Google Meet)",
    coordinator: "TPO Office",
    branches: ["CSE", "IT"],
    description: "Technical Coding Round."
  },
  {
    id: "4",
    title: "NVIDIA GPU Compiler Test",
    company: "NVIDIA",
    role: "GPU Compiler Engineer",
    type: "Test",
    date: "2026-08-18",
    time: "11:00 AM",
    venue: "Lab 5",
    coordinator: "Placement Cell",
    branches: ["ECE", "EE", "CSE"],
    description: "Compiler & Architecture Test."
  },
  {
    id: "5",
    title: "Deloitte Aptitude Assessment",
    company: "Deloitte",
    role: "Technology Consultant",
    type: "Aptitude",
    date: "2026-08-20",
    time: "10:00 AM",
    venue: "Auditorium",
    coordinator: "TPO Office",
    branches: ["CSE", "IT", "ECE", "EE", "ME"],
    description: "Aptitude & Logical Reasoning Assessment."
  }
];

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = placementEvents.map((pe) => ({
  id: pe.id,
  title: pe.title,
  eventType: pe.type,
  companyName: pe.company,
  company: pe.company,
  role: pe.role,
  scheduledDate: pe.date,
  startTime: pe.time.includes("AM") || pe.time.includes("PM") 
    ? (pe.time.includes("PM") && !pe.time.startsWith("12") 
        ? `${parseInt(pe.time.split(":")[0]) + 12}:${pe.time.split(":")[1].split(" ")[0]}` 
        : pe.time.split(" ")[0])
    : pe.time,
  location: pe.venue,
  venue: pe.venue,
  description: pe.description,
  status: "UPCOMING",
  branches: pe.branches,
}));