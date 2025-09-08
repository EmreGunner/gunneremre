"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Mail,
  Link as LinkIcon,
  BookOpen,
  FlaskConical,
  Lightbulb,
  FileText,
  Home,
  ArrowRight,
  Download,
  Upload,
  Globe,
} from "lucide-react";

// ==========================
// TELEtext-inspired SPA
// Default export: drop this into a Next.js page (app/page.tsx or pages/index.tsx)
// TailwindCSS, framer-motion, lucide-react are assumed available.
// ==========================

const PAGES: Record<string, string> = {
  "100": "Home",
  "101": "Blog",
  "102": "Ideas",
  "103": "Experiments",
  "104": "Docs",
  "199": "Contact",
};

// --- Edit your site content here ---
const initialContent = {
  owner: {
    name: "Emre Gunner",
    domain: "GunnerEmre",
    tagline: "Build • Test • Learn",
    email: "contact@gunneremre.com", // ← change to your real email (or leave empty to hide)
    instagramHandle: "mrgunner.ai",
    socials: {
      instagram: "https://instagram.com/mrgunner.ai",
      github: "https://github.com/",
      x: "https://x.com/",
      website: "https://gunneremre.com/",
    },
  },
  now: "Shipping AI marketing experiments for real-estate agencies across TR/AE. Documenting results and playbooks.",
  updates: [
    {
      date: "2025-08-24",
      type: "experiment",
      text: "Cold outreach: Teletext landing vs. standard modern landing — CTR +23% on Teletext.",
      url: "#",
    },
    {
      date: "2025-08-22",
      type: "blog",
      text: "Why retro UX converts: constraint as a brand moat.",
      url: "#",
    },
  ],
  blog: [
    {
      id: "welcome-teletext",
      date: "2025-08-20",
      title: "Welcome to the GunnerEmre Teletext",
      tags: ["meta", "design", "retro"],
      summary: "How Teletext UX helps clarity, speed, and signal in a noisy web.",
      content:
        "Teletext strips away everything except information and intent. This site is my living lab: simple, fast, keyboard-first. Expect ideas, experiments, and shipping notes.",
      externalUrl: "",
    },
    {
      id: "ai-outreach",
      date: "2025-08-18",
      title: "AI outreach: from demo-first to trust-first",
      tags: ["ai", "outreach", "real-estate"],
      summary: "Lessons from running 100+ personalized outreach Looms.",
      content:
        "Trust compounds when the first touch is useful. Free, relevant assets (mini-site, competitor insights) set the tone better than any pitch.",
      externalUrl: "",
    },
  ],
  ideas: [
    {
      title: "Teletext Job Board",
      status: "new",
      note: "Ultra-fast board for niche AI/marketing roles. Keyboard nav only.",
    },
    {
      title: "Ad-Intel Tuner",
      status: "prototyping",
      note: "Tune variables (ICP, hook, angle) and auto-generate creatives from competitor patterns.",
    },
    {
      title: "24/7 Concierge Bot",
      status: "done",
      note: "Multilingual WhatsApp bot that qualifies buyers and routes hot leads.",
    },
  ],
  experiments: [
    {
      title: "Teletext vs. Modern Landing",
      date: "2025-08-21",
      hypothesis: "Retro clarity reduces bounce and increases CTA CTR",
      method: "A/B test 1,000 paid clicks (META/IN) — identical offer & copy",
      result: "CTR +23%, bounce −12%, time-on-page +16% on Teletext.",
      link: "#",
    },
    {
      title: "Instagram DM First vs. Email First",
      date: "2025-08-17",
      hypothesis: "Warm DM before email lifts reply rate",
      method: "50/50 split across 100 agencies",
      result: "+9.4% initial replies; +5.1% qualified calls via DM-first.",
      link: "#",
    },
  ],
  docs: [
    {
      title: "Operating System",
      sections: [
        {
          h: "Principles",
          p: "Ship daily. Prove before you pitch. Measure what matters.",
        },
        {
          h: "Stack",
          p: "Next.js, n8n, Meta Ads, Sheets, custom scrapers, GPT agents.",
        },
      ],
    },
    {
      title: "Real Estate Offer — v1",
      sections: [
        {
          h: "Lead Magnet",
          p: "Free TR/EN/AR site mirroring listings + AI concierge.",
        },
        { h: "Proof", p: "Instant value pack: site, leads, competitor insights." },
        { h: "Pricing", p: "₺1K / ₺3K / ₺5K packages; risk-reversal via milestones." },
      ],
    },
  ],
};

// Util: format date nicely
const fmt = (d: string | number | Date) =>
  new Date(d).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

const Row = ({ children, color = "text-green-400" }: any) => (
  <div className={`w-full px-3 py-1 sm:py-1.5 ${color} tracking-wide`}>{children}</div>
);

const Tag = ({ children }: any) => (
  <span className="px-2 py-0.5 text-[10px] uppercase border border-current mr-2 rounded-sm opacity-90">
    {children}
  </span>
);

const SectionTitle = ({ icon: Icon, children, color = "text-yellow-400" }: any) => (
  <div className={`flex items-center gap-2 ${color} mb-2`}>
    <Icon className="h-4 w-4" />
    <h3 className="font-bold uppercase text-xs sm:text-sm">{children}</h3>
  </div>
);

const TeletextHeader = ({ page, owner }: any) => {
  const [clock, setClock] = useState<string>("");
  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      setClock(
        d.toLocaleString(undefined, {
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 250);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="border border-green-600/30 rounded-md overflow-hidden shadow-[0_0_40px_rgba(0,255,120,0.15)]">
      <Row color="bg-green-900/20 text-green-300">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="font-bold uppercase">{owner.domain}</span>
            <span className="opacity-70">TELETEXT</span>
            <span className="opacity-70">PAGE {page}</span>
          </div>
          <div className="opacity-80">{clock}</div>
        </div>
      </Row>
      <Row color="bg-black text-cyan-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span className="uppercase font-bold tracking-wider">{owner.name}</span>
            <span className="opacity-70">— {owner.tagline}</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            {owner.instagramHandle && (
              <a className="hover:underline" href={`https://instagram.com/${owner.instagramHandle}`} target="_blank" rel="noreferrer">
                <span className="inline-flex items-center gap-1"><Instagram className="h-3 w-3" />@{owner.instagramHandle}</span>
              </a>
            )}
            {owner.email && (
              <a className="hover:underline" href={`mailto:${owner.email}`}>
                <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />{owner.email}</span>
              </a>
            )}
          </div>
        </div>
      </Row>
    </div>
  );
};

function usePageDigits(onThreeDigits: (s: string) => void) {
  const buffer = useRef<string>("");
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        buffer.current += e.key;
        if (buffer.current.length >= 3) {
          onThreeDigits(buffer.current.slice(-3));
          buffer.current = "";
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onThreeDigits]);
}

const Nav = ({ page, onNavigate }: { page: string; onNavigate: (p: string) => void }) => {
  const items = [
    { code: "100", label: "Home", color: "text-green-400" },
    { code: "101", label: "Blog", color: "text-yellow-400" },
    { code: "102", label: "Ideas", color: "text-cyan-400" },
    { code: "103", label: "Experiments", color: "text-fuchsia-400" },
    { code: "104", label: "Docs", color: "text-blue-400" },
    { code: "199", label: "Contact", color: "text-red-400" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mt-3">
      {items.map((it) => (
        <motion.button
          key={it.code}
          onClick={() => onNavigate(it.code)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`border border-white/10 rounded-md px-3 py-2 text-left bg-black/60 ${it.color} ${
            page === it.code ? "ring-1 ring-white/30" : ""
          }`}
        >
          <div className="text-[10px] opacity-60">{it.code}</div>
          <div className="text-xs font-bold uppercase tracking-wider">{it.label}</div>
        </motion.button>
      ))}
    </div>
  );
};

const HomePage = ({ content }: any) => {
  return (
    <div className="mt-4 grid lg:grid-cols-3 gap-3">
      <div className="lg:col-span-2 space-y-3">
        <Row color="bg-black text-green-300">
          <SectionTitle icon={BookOpen} color="text-green-300">Latest Updates</SectionTitle>
          <ul className="mt-2 space-y-2 text-sm">
            {content.updates.map((u: any, i: number) => (
              <li key={i} className="flex items-start gap-2">
                <span className="opacity-70 w-20 shrink-0">{fmt(u.date)}</span>
                <span className="uppercase text-[10px] border border-current px-1 mr-2 rounded-sm opacity-80">{u.type}</span>
                <a href={u.url || "#"} className="hover:underline">
                  {u.text}
                </a>
              </li>
            ))}
          </ul>
        </Row>
        <Row color="bg-black text-yellow-300">
          <SectionTitle icon={BookOpen} color="text-yellow-300">From the Blog</SectionTitle>
          <div className="grid sm:grid-cols-2 gap-3 mt-2">
            {content.blog.slice(0, 4).map((p: any) => (
              <a key={p.id} href={p.externalUrl || `#post-${p.id}`} className="border border-white/10 rounded-md p-3 hover:shadow">
                <div className="text-[11px] opacity-70">{fmt(p.date)}</div>
                <div className="font-bold text-sm mt-0.5">{p.title}</div>
                <div className="mt-1 text-xs opacity-80 line-clamp-2">{p.summary}</div>
                <div className="mt-2">
                  {p.tags.map((t: string) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </Row>
      </div>
      <div className="space-y-3">
        <Row color="bg-black text-cyan-300">
          <SectionTitle icon={Lightbulb} color="text-cyan-300">Now</SectionTitle>
          <p className="text-sm opacity-90">{content.now}</p>
        </Row>
        <Row color="bg-black text-fuchsia-300">
          <SectionTitle icon={FlaskConical} color="text-fuchsia-300">Experiments</SectionTitle>
          <ul className="text-sm mt-2 space-y-2">
            {content.experiments.slice(0, 3).map((e: any, i: number) => (
              <li key={i}>
                <span className="opacity-70 mr-2">{fmt(e.date)}</span>
                <a href={e.link || "#"} className="hover:underline font-medium">{e.title}</a>
              </li>
            ))}
          </ul>
        </Row>
        <Row color="bg-black text-blue-300">
          <SectionTitle icon={FileText} color="text-blue-300">Docs</SectionTitle>
          <ul className="text-sm mt-2 space-y-1">
            {content.docs.map((d: any, i: number) => (
              <li key={i} className="flex items-center gap-2">
                <ArrowRight className="h-3 w-3" /> {d.title}
              </li>
            ))}
          </ul>
        </Row>
      </div>
    </div>
  );
};

const BlogPage = ({ content }: any) => {
  const [active, setActive] = useState<string | null>(content.blog?.[0]?.id || null);
  const activePost = useMemo(() => content.blog.find((b: any) => b.id === active), [content.blog, active]);
  return (
    <div className="mt-4 grid lg:grid-cols-3 gap-3">
      <div className="lg:col-span-1 space-y-2">
        {content.blog.map((p: any) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            className={`w-full text-left border border-white/10 rounded-md p-3 hover:bg-white/5 ${active === p.id ? "ring-1 ring-white/30" : ""}`}
          >
            <div className="flex items-center justify-between">
              <div className="font-bold text-sm">{p.title}</div>
              <div className="text-[11px] opacity-70">{fmt(p.date)}</div>
            </div>
            <div className="mt-1 text-xs opacity-80 line-clamp-2">{p.summary}</div>
            <div className="mt-2">{p.tags.map((t: string) => <Tag key={t}>{t}</Tag>)}</div>
          </button>
        ))}
      </div>
      <div className="lg:col-span-2">
        {activePost ? (
          <Row color="bg-black text-yellow-300">
            <SectionTitle icon={BookOpen} color="text-yellow-300">{activePost.title}</SectionTitle>
            <p className="text-sm opacity-90 leading-relaxed whitespace-pre-wrap">{activePost.content}</p>
            {activePost.externalUrl && (
              <a className="inline-flex items-center gap-1 mt-3 text-sm underline" href={activePost.externalUrl} target="_blank" rel="noreferrer">
                Read external <LinkIcon className="h-3 w-3" />
              </a>
            )}
          </Row>
        ) : (
          <Row color="bg-black text-yellow-300">Select a post.</Row>
        )}
      </div>
    </div>
  );
};

const IdeasPage = ({ content }: any) => (
  <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
    {content.ideas.map((idea: any, i: number) => (
      <Row key={i} color="bg-black text-cyan-300">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-bold">{idea.title}</div>
            <div className="text-sm opacity-90 mt-1">{idea.note}</div>
          </div>
          <span className={`text-[10px] uppercase border border-current px-2 py-0.5 rounded-sm ${
            idea.status === "done"
              ? "text-green-300"
              : idea.status === "prototyping"
              ? "text-yellow-300"
              : "text-cyan-300"
          }`}>{idea.status}</span>
        </div>
      </Row>
    ))}
  </div>
);

const ExperimentsPage = ({ content }: any) => (
  <div className="mt-4 space-y-3">
    {content.experiments.map((ex: any, i: number) => (
      <Row key={i} color="bg-black text-fuchsia-300">
        <div className="grid sm:grid-cols-5 gap-2 text-sm">
          <div className="sm:col-span-2">
            <div className="font-bold">{ex.title}</div>
            <div className="opacity-70">{fmt(ex.date)}</div>
          </div>
          <div>
            <div className="uppercase text-[10px] opacity-70">Hypothesis</div>
            <div>{ex.hypothesis}</div>
          </div>
          <div>
            <div className="uppercase text-[10px] opacity-70">Method</div>
            <div>{ex.method}</div>
          </div>
          <div>
            <div className="uppercase text-[10px] opacity-70">Result</div>
            <div className="font-medium">{ex.result}</div>
            {ex.link && (
              <a href={ex.link} className="inline-flex items-center gap-1 underline mt-1"><LinkIcon className="h-3 w-3" />Details</a>
            )}
          </div>
        </div>
      </Row>
    ))}
  </div>
);

const DocsPage = ({ content }: any) => (
  <div className="mt-4 grid lg:grid-cols-2 gap-3">
    {content.docs.map((d: any, i: number) => (
      <Row key={i} color="bg-black text-blue-300">
        <div className="font-bold mb-2">{d.title}</div>
        <div className="space-y-2 text-sm">
          {d.sections.map((s: any, j: number) => (
            <div key={j}>
              <div className="uppercase text-[10px] opacity-70">{s.h}</div>
              <div>{s.p}</div>
            </div>
          ))}
        </div>
      </Row>
    ))}
  </div>
);

const ContactPage = ({ content }: any) => (
  <div className="mt-4 grid md:grid-cols-2 gap-3">
    <Row color="bg-black text-red-300">
      <div className="font-bold mb-1 uppercase">Get in touch</div>
      <ul className="text-sm space-y-2">
        {content.owner.email && (
          <li className="flex items-center gap-2"><Mail className="h-4 w-4" /><a className="underline" href={`mailto:${content.owner.email}`}>{content.owner.email}</a></li>
        )}
        {content.owner.instagramHandle && (
          <li className="flex items-center gap-2"><Instagram className="h-4 w-4" /><a className="underline" href={`https://instagram.com/${content.owner.instagramHandle}`} target="_blank" rel="noreferrer">@{content.owner.instagramHandle}</a></li>
        )}
        {content.owner.socials?.website && (
          <li className="flex items-center gap-2"><Globe className="h-4 w-4" /><a className="underline" href={content.owner.socials.website} target="_blank" rel="noreferrer">{content.owner.socials.website}</a></li>
        )}
      </ul>
    </Row>
    <Row color="bg-black text-white">
      <div className="font-bold mb-1 uppercase opacity-90">Socials</div>
      <div className="flex flex-wrap gap-3 text-sm">
        {Object.entries(content.owner.socials).map(([k, v]: any) => (
          v ? (
            <a key={k} href={v} target="_blank" rel="noreferrer" className="underline inline-flex items-center gap-1">
              <LinkIcon className="h-3 w-3" />{k}
            </a>
          ) : null
        ))}
      </div>
      <div className="text-xs opacity-70 mt-2">Press 199 to jump here via keyboard.</div>
    </Row>
  </div>
);

const Toolbar = ({ content, setContent }: any) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const exportJson = () => {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gunneremre-content.json";
    a.click();
    URL.revokeObjectURL(url);
  };
  const importJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        setContent((prev: any) => ({ ...prev, ...data }));
      } catch (err) {
        alert("Invalid JSON");
      }
    };
    reader.readAsText(file);
  };
  return (
    <div className="mt-3 flex items-center gap-2 text-xs">
      <button onClick={exportJson} className="inline-flex items-center gap-1 border border-white/10 rounded px-2 py-1 hover:bg-white/5">
        <Download className="h-3 w-3" /> Export JSON
      </button>
      <button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-1 border border-white/10 rounded px-2 py-1 hover:bg-white/5">
        <Upload className="h-3 w-3" /> Import JSON
      </button>
      <input ref={fileRef} type="file" accept="application/json" className="hidden" onChange={importJson} />
      <div className="opacity-60 ml-auto">Keyboard: type 100/101/102/103/104/199</div>
    </div>
  );
};

const Ticker = ({ text }: { text: string }) => (
  <div className="fixed bottom-0 left-0 right-0 bg-black/80 border-t border-white/10 text-green-300 text-xs overflow-hidden">
    <div className="whitespace-nowrap animate-[ticker_28s_linear_infinite] px-4 py-2">{text} • {text} • {text}</div>
    <style>{`
      @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    `}</style>
  </div>
);

export default function TeletextGunnerEmre() {
  const [page, setPage] = useState<string>("100");
  const [content, setContent] = useState<any>(initialContent);

  usePageDigits((digits) => {
    if (PAGES[digits]) setPage(digits);
  });

  const ticker = useMemo(() => {
    const items = [
      `${content.owner.domain} // ${content.owner.tagline}`,
      `Now: ${content.now}`,
      ...content.updates.map((u: any) => `${u.type.toUpperCase()} ${fmt(u.date)} — ${u.text}`),
      `Press 100-199 to navigate • Follow @${content.owner.instagramHandle}`,
    ];
    return items.join("  •  ");
  }, [content]);

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-green-500/20">
      <div className="max-w-6xl mx-auto p-3 sm:p-6">
        <TeletextHeader page={page} owner={content.owner} />
        <Nav page={page} onNavigate={setPage} />
        <Toolbar content={content} setContent={setContent} />

        {page === "100" && <HomePage content={content} />}
        {page === "101" && <BlogPage content={content} />}
        {page === "102" && <IdeasPage content={content} />}
        {page === "103" && <ExperimentsPage content={content} />}
        {page === "104" && <DocsPage content={content} />}
        {page === "199" && <ContactPage content={content} />}

        <footer className="mt-8 text-[10px] opacity-60 text-center">
          © 2025 {content.owner.domain}. Built in a Teletext style. All rights reserved.
        </footer>
      </div>

      <Ticker text={ticker} />
    </div>
  );
}
