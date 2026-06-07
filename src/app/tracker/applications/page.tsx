"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useTrackerStore, Application } from "@/store/useTrackerStore";
import { Briefcase, Plus, Calendar, Landmark, MapPin, ExternalLink, Link as LinkIcon, Trash2, Edit } from "lucide-react";

export default function ApplicationTracker() {
  const { applications, addApplication, updateApplicationStatus, deleteApplication, updateApplication } = useTrackerStore();

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [type, setType] = useState<"internship" | "fulltime">("internship");
  const [location, setLocation] = useState("");
  const [pack, setPack] = useState("");
  const [appLink, setAppLink] = useState("");
  const [deadline, setDeadline] = useState("");
  const [referral, setReferral] = useState("");
  const [resume, setResume] = useState("");
  const [notes, setNotes] = useState("");

  const handleAddApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company || !role) return;

    addApplication({
      company,
      role,
      type,
      location,
      package: pack,
      applicationLink: appLink || undefined,
      appliedDate: new Date().toISOString().split("T")[0],
      deadline: deadline || undefined,
      status: "SAVED",
      referralContact: referral || undefined,
      resumeVersion: resume || undefined,
      notes: notes || undefined
    });

    // Reset
    setCompany("");
    setRole("");
    setLocation("");
    setPack("");
    setAppLink("");
    setDeadline("");
    setReferral("");
    setResume("");
    setNotes("");
    setShowAddForm(false);
  };

  const statusColumns: Application["status"][] = [
    "SAVED",
    "APPLIED",
    "OA",
    "INTERVIEW",
    "HR",
    "OFFER",
    "REJECTED"
  ];

  const filteredApps = applications.filter((app) => {
    const matchesSearch = app.company.toLowerCase().includes(search.toLowerCase()) ||
                          app.role.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "ALL" || app.type === filterType;
    return matchesSearch && matchesType;
  });

  const getStatusColor = (status: Application["status"]) => {
    switch (status) {
      case "SAVED": return "border-blue-500/20 text-blue-400 bg-blue-500/5";
      case "APPLIED": return "border-zinc-500/20 text-zinc-400 bg-zinc-500/5";
      case "OA": return "border-yellow-500/20 text-yellow-400 bg-yellow-500/5";
      case "INTERVIEW": return "border-purple-500/20 text-purple-400 bg-purple-500/5";
      case "HR": return "border-pink-500/20 text-pink-400 bg-pink-500/5";
      case "OFFER": return "border-green-500/20 text-green-400 bg-green-500/5";
      case "REJECTED": return "border-red-500/20 text-red-400 bg-red-500/5";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Placement & Internship Tracker</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Organize your job search pipelines. Manage application files, OA deadlines, and HR response updates.
            </p>
          </div>
          <Button onClick={() => setShowAddForm(!showAddForm)} className="font-bold flex items-center space-x-1.5 h-10">
            <Plus className="h-4 w-4" />
            <span>Add Application</span>
          </Button>
        </div>

        {/* Modal form */}
        {showAddForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-card border border-border rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4 animate-scale-in">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <h3 className="text-lg font-bold">New Placement Record</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)}>✕</Button>
              </div>

              <form onSubmit={handleAddApplication} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Company Name *</label>
                    <Input placeholder="e.g. Google" value={company} onChange={(e) => setCompany(e.target.value)} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Target Role *</label>
                    <Input placeholder="e.g. SWE Intern" value={role} onChange={(e) => setRole(e.target.value)} required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Job Type</label>
                    <Select value={type} onChange={(e) => setType(e.target.value as any)}>
                      <option value="internship">Internship</option>
                      <option value="fulltime">Full-Time</option>
                    </Select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Location</label>
                    <Input placeholder="e.g. Remote / Seattle, WA" value={location} onChange={(e) => setLocation(e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Package / Stipend</label>
                    <Input placeholder="e.g. $45/hr / 12 LPA" value={pack} onChange={(e) => setPack(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Deadline Date</label>
                    <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Referral Contact name</label>
                    <Input placeholder="e.g. Jane (Tech Lead)" value={referral} onChange={(e) => setReferral(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Resume Version</label>
                    <Input placeholder="e.g. SWE_Resume_v3" value={resume} onChange={(e) => setResume(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Application Web Link</label>
                  <Input placeholder="https://careers.company.com/job" value={appLink} onChange={(e) => setAppLink(e.target.value)} />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Notes / Tasks</label>
                  <textarea
                    className="w-full h-20 p-2.5 text-sm rounded-lg border border-border bg-background"
                    placeholder="Focus points, online assessment scores, interviewer names..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div className="flex gap-2 justify-end border-t border-border/40 pt-4">
                  <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                  <Button type="submit">Save Record</Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-2 w-full md:max-w-xs">
            <Input
              placeholder="Search companies or roles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10"
            />
          </div>
          <div className="flex gap-1.5">
            <Button variant={filterType === "ALL" ? "default" : "outline"} size="sm" onClick={() => setFilterType("ALL")}>All</Button>
            <Button variant={filterType === "internship" ? "default" : "outline"} size="sm" onClick={() => setFilterType("internship")}>Internships</Button>
            <Button variant={filterType === "fulltime" ? "default" : "outline"} size="sm" onClick={() => setFilterType("fulltime")}>Full-time</Button>
          </div>
        </div>

        {/* Status Column Kanban Board */}
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-4 min-w-[1200px] items-start">
            {statusColumns.map((status) => {
              const columnApps = filteredApps.filter(app => app.status === status);

              return (
                <div key={status} className="w-80 flex-shrink-0 bg-secondary/20 rounded-2xl border border-border/60 p-4 space-y-4">
                  <div className="flex justify-between items-center border-b border-border/40 pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{status}</span>
                    <Badge variant="secondary" className="px-2 py-0.5 rounded-full">{columnApps.length}</Badge>
                  </div>

                  <div className="space-y-3 min-h-[350px]">
                    {columnApps.length > 0 ? (
                      columnApps.map((app) => (
                        <Card key={app.id} hoverGlow className="bg-card border-border/80 text-left shadow-sm">
                          <CardContent className="p-4 space-y-3.5">
                            <div>
                              <div className="flex items-start justify-between">
                                <h4 className="font-bold text-sm text-foreground line-clamp-1">{app.company}</h4>
                                <Badge variant="outline" className="text-[9px] uppercase px-1 py-0">{app.type}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground font-semibold mt-0.5 line-clamp-1">{app.role}</p>
                            </div>

                            <div className="space-y-1.5 text-[10px] text-muted-foreground border-t border-border/40 pt-2.5">
                              {app.location && (
                                <div className="flex items-center space-x-1.5">
                                  <MapPin className="h-3 w-3" />
                                  <span>{app.location}</span>
                                </div>
                              )}
                              {app.package && (
                                <div className="flex items-center space-x-1.5">
                                  <Landmark className="h-3 w-3" />
                                  <span>{app.package}</span>
                                </div>
                              )}
                              {app.deadline && (
                                <div className="flex items-center space-x-1.5">
                                  <Calendar className="h-3 w-3" />
                                  <span>Due: {app.deadline}</span>
                                </div>
                              )}
                            </div>

                            {app.notes && (
                              <p className="text-[10px] text-muted-foreground bg-secondary/40 p-2 rounded border border-border/40 line-clamp-2 leading-relaxed">
                                {app.notes}
                              </p>
                            )}

                            {/* Dropdown status update */}
                            <div className="flex items-center justify-between gap-2 border-t border-border/40 pt-3">
                              <Select
                                value={app.status}
                                onChange={(e) => updateApplicationStatus(app.id, e.target.value as any)}
                                className="h-8 text-[11px] py-1 pl-2"
                              >
                                {statusColumns.map(col => (
                                  <option key={col} value={col}>{col}</option>
                                ))}
                              </Select>
                              
                              <button
                                onClick={() => deleteApplication(app.id)}
                                className="p-1.5 rounded-lg border hover:bg-red-500/10 text-muted-foreground hover:text-red-400"
                                title="Delete"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-48 text-muted-foreground border border-dashed border-border/40 rounded-xl bg-card/10">
                        <Briefcase className="h-6 w-6 stroke-[1.5] mb-2 opacity-50" />
                        <span className="text-xs">No records</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
