"use client";

import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Search, Plus, ExternalLink, Bookmark, Globe, Book, FileText, CheckCircle2, Code2 } from "lucide-react";

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={props.className}
    height="1em"
    width="1em"
    {...props}
  >
    <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.525 3.545 12 3.545 12 3.545s-7.525 0-9.387.508a3.003 3.003 0 00-2.11 2.11C0 8.025 0 12 0 12s0 3.975.503 5.837a3.003 3.003 0 002.11 2.11c1.862.508 9.387.508 9.387.508s7.525 0 9.387-.508a3.003 3.003 0 002.11-2.11c.503-1.862.503-5.837.503-5.837s0-3.975-.503-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

interface ResourceHubItem {
  id: string;
  title: string;
  description: string;
  category: "YOUTUBE" | "DOCUMENTATION" | "BOOK" | "COURSE" | "PRACTICE";
  url: string;
  rating: string;
  creator: string;
}

const mockResources: ResourceHubItem[] = [
  {
    id: "r1",
    title: "MDN Web Docs",
    description: "The standard resource for developer documentation on HTML, CSS, and Javascript APIs.",
    category: "DOCUMENTATION",
    url: "https://developer.mozilla.org",
    rating: "4.9/5",
    creator: "Mozilla Foundation"
  },
  {
    id: "r2",
    title: "js.info JavaScript Tutorial",
    description: "From beginner concepts to advanced asynchronous loops, prototypes, and web workers.",
    category: "DOCUMENTATION",
    url: "https://javascript.info",
    rating: "4.8/5",
    creator: "Ilya Kantor"
  },
  {
    id: "r3",
    title: "Traversy Media YouTube",
    description: "Highly approachable crash courses on web fundamentals, frameworks, databases, and Docker.",
    category: "YOUTUBE",
    url: "https://www.youtube.com/@TraversyMedia",
    rating: "4.7/5",
    creator: "Brad Traversy"
  },
  {
    id: "r4",
    title: "Clean Code Book",
    description: "A handbook of agile software craftsmanship. Mandatory reading for backend and systems design.",
    category: "BOOK",
    url: "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882",
    rating: "4.9/5",
    creator: "Robert C. Martin (Uncle Bob)"
  },
  {
    id: "r5",
    title: "NeetCode DSA Roadmap",
    description: "Practice platform categorized matching Blind 75 and NeetCode 150. Contains video solutions.",
    category: "PRACTICE",
    url: "https://neetcode.io",
    rating: "4.9/5",
    creator: "NeetCode"
  },
  {
    id: "r6",
    title: "Full Stack Open",
    description: "Learn React, Redux, Node.js, MongoDB, GraphQL, TypeScript, and Docker in one rigorous course.",
    category: "COURSE",
    url: "https://fullstackopen.com/en/",
    rating: "4.8/5",
    creator: "University of Helsinki"
  }
];

export default function ResourceHub() {
  const [resources, setResources] = useState<ResourceHubItem[]>(mockResources);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  // Form states
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newCategory, setNewCategory] = useState<ResourceHubItem["category"]>("DOCUMENTATION");
  const [newCreator, setNewCreator] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;

    // Simulate submission to admin queue
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowSubmitModal(false);
      // Reset form
      setNewTitle("");
      setNewUrl("");
      setNewCreator("");
      setNewDesc("");
    }, 2000);
  };

  const filteredResources = resources.filter((res) => {
    const matchesSearch = res.title.toLowerCase().includes(search.toLowerCase()) ||
                          res.description.toLowerCase().includes(search.toLowerCase()) ||
                          res.creator.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "ALL" || res.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getResourceIcon = (cat: ResourceHubItem["category"]) => {
    switch (cat) {
      case "YOUTUBE": return <YoutubeIcon className="h-5 w-5 text-red-500" />;
      case "DOCUMENTATION": return <FileText className="h-5 w-5 text-blue-500" />;
      case "BOOK": return <Book className="h-5 w-5 text-green-500" />;
      case "COURSE": return <Globe className="h-5 w-5 text-purple-500" />;
      case "PRACTICE": return <Code2 className="h-5 w-5 text-orange-500" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/40 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Curated Resource Hub</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Top quality books, documentation guides, video channels, courses, and practice boards matching your track.
            </p>
          </div>
          <Button onClick={() => setShowSubmitModal(true)} className="font-bold flex items-center space-x-1.5 h-10">
            <Plus className="h-4 w-4" />
            <span>Submit Resource</span>
          </Button>
        </div>

        {/* Submit Resource Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-card border border-border rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4 animate-scale-in">
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <h3 className="text-lg font-bold">Recommend a Resource</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowSubmitModal(false)}>✕</Button>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="h-12 w-12 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-lg">Submission Received!</h4>
                  <p className="text-sm text-muted-foreground">Thank you. The resource will appear in the catalog after admin reviews the URL.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Resource Title *</label>
                    <Input placeholder="e.g. Eloquent JavaScript" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">Type Category</label>
                      <Select value={newCategory} onChange={(e) => setNewCategory(e.target.value as any)}>
                        <option value="DOCUMENTATION">Documentation</option>
                        <option value="YOUTUBE">YouTube Channel / Video</option>
                        <option value="BOOK">Book</option>
                        <option value="COURSE">Online Course</option>
                        <option value="PRACTICE">Practice Platform</option>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-muted-foreground">Author / Creator Name</label>
                      <Input placeholder="e.g. Marijn Haverbeke" value={newCreator} onChange={(e) => setNewCreator(e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Resource Web Link *</label>
                    <Input placeholder="https://eloquentjavascript.net" value={newUrl} onChange={(e) => setNewUrl(e.target.value)} required />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-muted-foreground">Brief Description</label>
                    <textarea
                      className="w-full h-20 p-2.5 text-sm rounded-lg border border-border bg-background"
                      placeholder="Why do you recommend this resource to other students?"
                      value={newDesc}
                      onChange={(e) => setNewDesc(e.target.value)}
                    />
                  </div>

                  <div className="flex gap-2 justify-end border-t border-border/40 pt-4">
                    <Button type="button" variant="outline" onClick={() => setShowSubmitModal(false)}>Cancel</Button>
                    <Button type="submit">Submit for Review</Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Filter bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-1">
            {["ALL", "DOCUMENTATION", "YOUTUBE", "BOOK", "COURSE", "PRACTICE"].map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className="text-xs h-8"
              >
                {cat === "ALL" ? "All resources" : cat.toLowerCase()}
              </Button>
            ))}
          </div>

          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resource catalog..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-11"
            />
          </div>
        </div>

        {/* Catalog grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <Card key={res.id} hoverGlow className="bg-card/40 border-border/80 flex flex-col justify-between">
              <CardHeader className="space-y-2 pb-4">
                <div className="flex items-center justify-between">
                  <div className="p-1.5 rounded-lg border border-border bg-background">
                    {getResourceIcon(res.category)}
                  </div>
                  <Badge variant="secondary" className="text-[9px] uppercase font-bold">{res.rating}</Badge>
                </div>
                <CardTitle className="text-base font-bold line-clamp-1">{res.title}</CardTitle>
                <CardDescription className="text-xs font-semibold text-primary">By {res.creator}</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3 min-h-[50px]">
                  {res.description}
                </p>
              </CardContent>
              <CardFooter className="border-t border-border/40 pt-4 flex gap-2">
                <a href={res.url} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button variant="default" size="sm" className="w-full text-xs font-bold flex items-center justify-center space-x-1">
                    <span>Visit Resource</span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </a>
                <Button variant="outline" size="sm" className="h-9 w-9 flex-shrink-0" title="Save Resource">
                  <Bookmark className="h-4.5 w-4.5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
