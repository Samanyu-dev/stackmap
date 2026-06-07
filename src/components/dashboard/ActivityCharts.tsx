"use client";

import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

const mockActivityData = [
  { day: "Mon", hours: 2 },
  { day: "Tue", hours: 4.5 },
  { day: "Wed", hours: 3 },
  { day: "Thu", hours: 6 },
  { day: "Fri", hours: 1.5 },
  { day: "Sat", hours: 5 },
  { day: "Sun", hours: 4 }
];

const mockSkillData = [
  { subject: "DSA", A: 120, B: 110, fullMark: 150 },
  { subject: "Frontend", A: 98, B: 130, fullMark: 150 },
  { subject: "Backend", A: 86, B: 130, fullMark: 150 },
  { subject: "DevOps", A: 65, B: 100, fullMark: 150 },
  { subject: "Systems", A: 85, B: 90, fullMark: 150 }
];

export default function ActivityCharts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-[300px] w-full bg-card animate-pulse rounded-xl" />;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Activity Area Chart */}
      <div className="lg:col-span-3 p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-base">Weekly Study Consistency</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Hours logged per day this week.</p>
        </div>

        <div className="h-64 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockActivityData}>
              <defs>
                <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{ background: "#18181b", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}
                labelStyle={{ fontSize: "12px", color: "#a1a1aa" }}
              />
              <Area type="monotone" dataKey="hours" stroke="#8b5cf6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorHours)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skills Radar Chart */}
      <div className="lg:col-span-2 p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-base">Competency Distribution</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Topic mastery vs class baseline.</p>
        </div>

        <div className="h-64 w-full mt-4 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={mockSkillData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="subject" stroke="#a1a1aa" fontSize={10} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#52525b" fontSize={9} tickLine={false} />
              <Radar name="My Level" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.25} />
              <Radar name="Class Average" dataKey="B" stroke="#6366f1" fill="#6366f1" fillOpacity={0.05} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
