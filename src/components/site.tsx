"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImageSlot } from "./image-slot";
import { Icon } from "./icon";
import {
  GROUPS, JOBS, OFFICES, PAGES, PARTNERS, PROJECTS, PROJECT_IMG, QUOTES, APPS_PITCH, SERVICE_IMG, STEPS, SV, TENGENEZA_STEPS, WHY, type PageId,
} from "@/lib/data";

const blankForm = { name: "", company: "", email: "", service: "General enquiry", message: "" };
type Form = typeof blankForm;
const num = (i: number) => String(i + 1).padStart(2, "0");
const projects = PROJECTS.map((p, i) => ({ ...p, key: `p${i}`, img: PROJECT_IMG[i] }));

function Logo({ height }: { height: number }) {
  return (
    <Image
      src="/unetg-logo.png" alt="UNETG" width={Math.round((height * 1596) / 716)} height={height} priority
      style={{ height, width: "auto", display: "block", alignSelf: "flex-start", filter: "brightness(0) invert(.94)" }}
    />
  );
}

export function Site() {
  const [page, setPage] = useState<PageId>("home");
  const [svc, setSvc] = useState(0);
  const [filter, setFilter] = useState("All");
  const [job, setJob] = useState(-1);
  const [form, setForm] = useState<Form>({ ...blankForm });
  const [errors, setErrors] = useState<Partial<Form>>({});
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const carRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const go = (p: PageId) => { setPage(p); setMenuOpen(false); window.scrollTo({ top: 0 }); };
  const openSvc = (i: number) => { setSvc(i); go("services"); };
  const contactAbout = (service: string, message = "") => () => {
    setSent(false); setForm({ ...blankForm, service, message }); go("contact");
  };
  const setField = (k: keyof Form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Partial<Form> = {};
    if (form.name.trim().length < 2) errs.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) errs.message = "Please add a few details about your project.";
    if (Object.keys(errs).length) return setErrors(errs);
    setSent(true);
  };

  const cur = SV[svc] ?? SV[0];
  const ni = (svc + 1) % SV.length;
  const cats = ["All", ...new Set(PROJECTS.map((p) => p.cat))];
  const shown = projects.filter((p) => filter === "All" || p.cat === filter);
  const Arrow = <Icon name="ArrowRight" size={16} />;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--color-divider)] backdrop-blur-[10px]" style={{ background: "color-mix(in srgb,var(--color-bg) 86%,transparent)" }}>
        <div className="wrap flex items-center gap-7 py-3" style={{ maxWidth: 1440 }}>
          <button type="button" className="reset mr-auto" onClick={() => go("home")} aria-label="UNETG home"><Logo height={38} /></button>
          <nav className="hidden flex-wrap items-center gap-[26px] md:flex">
            {PAGES.filter(([id]) => id !== "contact").map(([id, label]) => (
              <button key={id} type="button" className="reset hd hover-accent py-1.5 text-base tracking-[.08em]"
                style={{ color: page === id ? "var(--color-accent-400)" : "var(--color-text)", boxShadow: `inset 0 -2px 0 ${page === id ? "var(--color-accent-400)" : "transparent"}` }}
                onClick={() => go(id)}>{label}</button>
            ))}
          </nav>
          <button type="button" className="reset hd hidden bg-[var(--color-accent)] px-[18px] py-2.5 text-[15px] tracking-[.08em] hover:bg-[var(--color-accent-500)] sm:block" onClick={() => go("contact")}>Contact us</button>
          <button type="button" className="reset hd hover-accent flex items-center gap-2 text-[15px] tracking-[.08em]" aria-label="Open menu" onClick={() => setMenuOpen((o) => !o)}><Icon name="Menu" size={20} />Menu</button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-[var(--color-bg)]">
          <div className="wrap pb-12 pt-3.5">
            <div className="flex items-center justify-between border-b border-[var(--color-divider)] pb-5">
              <Logo height={38} />
              <button type="button" className="reset hd hover-accent flex items-center gap-2 text-[15px] tracking-[.08em]" onClick={() => setMenuOpen(false)}>Close<Icon name="X" size={20} /></button>
            </div>
            <div className="grid gap-10 pt-8" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))" }}>
              <div className="grid gap-3" style={{ gridColumn: "1 / -1", gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,240px),1fr))" }}>
                {SV.map((s, i) => (
                  <div key={s.title} className="relative aspect-[16/10] overflow-hidden bg-[var(--color-surface)]">
                    <ImageSlot placeholder={`${s.title} photo`} img={SERVICE_IMG[i]} />
                    <button type="button" className="reset hd absolute inset-x-0 bottom-0 block px-3.5 pb-3 pt-7 text-lg tracking-[.04em]"
                      style={{ background: "linear-gradient(to top,color-mix(in srgb,var(--color-bg) 92%,transparent),transparent)" }}
                      onClick={() => openSvc(i)}>{s.title}</button>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-1">
                {PAGES.map(([id, label]) => (
                  <button key={id} type="button" className="reset hd hover-accent text-[clamp(34px,4vw,52px)] leading-[1.1]" onClick={() => go(id)}>{label}</button>
                ))}
              </div>
              <div className="flex flex-col gap-2.5 self-end text-[15px]">
                <span className="eyebrow tracking-[.1em]">Networking + Audit + Software + Data + AI</span>
                <a href="mailto:contacte@unetg.com" style={{ color: "var(--color-text)" }}>contacte@unetg.com</a>
                <a href="tel:+15132620639" style={{ color: "var(--color-text)" }}>+1 (513) 262-0639 · USA</a>
                <a href="tel:+243988777258" style={{ color: "var(--color-text)" }}>+243 988 777 258 · DRC</a>
              </div>
            </div>
          </div>
        </div>
      )}

      <main>
        {page === "home" && <Home go={go} openSvc={openSvc} contactAbout={contactAbout} carRef={carRef} />}

        {page === "services" && (
          <>
            <section className="relative h-[46vh] min-h-[340px] overflow-hidden bg-[var(--color-surface)]">
              <ImageSlot placeholder={`${cur.title} photo`} img={SERVICE_IMG[svc]} priority />
              <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top,var(--color-bg),color-mix(in srgb,var(--color-bg) 30%,transparent))" }} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0">
                <div className="wrap pb-9">
                  <span className="eyebrow mb-3 flex items-center gap-3 text-[13px] tracking-[.14em]"><Icon name={cur.icon} size={32} />{num(svc)} · {cur.alt}</span>
                  <h1 className="hd m-0 text-[clamp(44px,6.5vw,104px)] leading-[.92]">{cur.title}</h1>
                </div>
              </div>
            </section>
            <div className="wrap pb-[100px] pt-12">
              <section className="grid items-start gap-14" style={{ gridTemplateColumns: narrow ? "minmax(0,1fr)" : "minmax(220px,300px) minmax(0,1fr)" }}>
                <div className="flex min-w-0 flex-col gap-7" style={{ position: narrow ? "static" : "sticky", top: 90 }}>
                  {GROUPS.map((label, g) => (
                    <div key={label}>
                      <span className="eyebrow block border-b border-[var(--color-divider)] pb-2.5">{label}</span>
                      {SV.map((s, i) => s.g === g && (
                        <button key={s.title} type="button" className="reset grid w-full grid-cols-[24px_1fr] items-center gap-3 border-b border-[var(--color-divider)] p-3 hover:bg-[color-mix(in_srgb,var(--color-accent)_14%,transparent)]"
                          style={{ background: i === svc ? "color-mix(in srgb,var(--color-accent) 24%,transparent)" : undefined, boxShadow: `inset 3px 0 0 ${i === svc ? "var(--color-accent)" : "transparent"}` }}
                          onClick={() => openSvc(i)}>
                          <span className="text-[var(--color-accent-400)]"><Icon name={s.icon} /></span>
                          <span className="text-[15px]">{s.title}</span>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
                <article className="flex min-w-0 max-w-[820px] flex-col gap-6">
                  <p className="hd m-0 text-[clamp(26px,2.6vw,36px)] leading-[1.08] text-[var(--color-accent-400)]">{cur.lead}</p>
                  <p className="body-lg m-0">{cur.intro}</p>
                  {cur.draft && <span className="self-start border border-[var(--color-divider)] px-2.5 py-1 text-xs font-semibold uppercase tracking-[.1em]">Draft copy · replace with your own</span>}
                  <div className="mt-2 border-t border-[var(--color-divider)]">
                    {cur.offers.map(([t, d], i) => (
                      <div key={t} className="grid grid-cols-[56px_1fr] gap-4 border-b border-[var(--color-divider)] py-[26px]">
                        <span className="hd text-[30px] leading-none text-[var(--color-accent-400)]">{num(i)}</span>
                        <div className="flex flex-col gap-2">
                          <h3 className="hd m-0 text-2xl leading-[1.1]">{t}</h3>
                          <p className="muted m-0 text-base leading-[26px]" style={{ color: "color-mix(in srgb,var(--color-text) 78%,transparent)" }}>{d}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {cur.extras && (
                    <div>
                      <span className="eyebrow mb-3 block">Enhanced security features</span>
                      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
                        {cur.extras.map((x) => (
                          <div key={x} className="flex items-center gap-2.5 bg-[var(--color-surface)] p-3.5 text-[15px]"><span className="text-[var(--color-accent-400)]"><Icon name="Check" size={16} /></span>{x}</div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="mr-2 text-xs font-semibold uppercase tracking-[.12em]" style={{ color: "color-mix(in srgb,var(--color-text) 65%,transparent)" }}>Partners</span>
                    {cur.partners.map((p) => <span key={p} className="border border-[var(--color-divider)] px-3 py-[5px] text-[13px]">{p}</span>)}
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-4">
                    <button type="button" className="reset btn-solid" onClick={contactAbout(cur.title)}>Discuss {cur.short}</button>
                    <button type="button" className="reset link-btn" onClick={() => openSvc(ni)}>Next: {SV[ni].title}{Arrow}</button>
                  </div>
                </article>
              </section>
            </div>
          </>
        )}

        {page === "projects" && (
          <div className="bg-white"
            style={{ "--color-bg": "#ffffff", "--color-surface": "#f3f5f8", "--color-text": "#0b1019", "--color-divider": "color-mix(in srgb, #0b1019 14%, transparent)", "--color-accent-400": "#1a5096", color: "#0b1019" } as React.CSSProperties}>
            <div className="wrap pb-[clamp(72px,9vw,120px)] pt-[clamp(56px,7vw,96px)]">
              <div className="grid items-end gap-x-20 gap-y-6 border-b border-[var(--color-divider)] pb-10" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))" }}>
                <div>
                  <span className="eyebrow tracking-[.14em]">Our work</span>
                  <h1 className="h-page hd mt-3">Projects that keep you connected</h1>
                </div>
                <p className="m-0 max-w-[52ch] text-[17px] leading-7 text-[color-mix(in_srgb,#0b1019_72%,transparent)]">From secure branch networks to apps and analytics, a look at the kind of work UNETG delivers across the USA and DRC. Entries are placeholders showing layout; replace them with real client work.</p>
              </div>

              <div className="my-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects">
                  {cats.map((f) => (
                    <button key={f} type="button" role="tab" aria-selected={f === filter}
                      className="reset hd rounded-full border px-[18px] py-2 text-[15px] tracking-[.08em] transition-colors"
                      style={f === filter
                        ? { background: "#0b1019", color: "#fff", borderColor: "#0b1019" }
                        : { borderColor: "var(--color-divider)" }}
                      onClick={() => setFilter(f)}>{f}</button>
                  ))}
                </div>
                <span className="text-sm text-[color-mix(in_srgb,#0b1019_60%,transparent)]">{shown.length} {shown.length === 1 ? "project" : "projects"}</span>
              </div>

              {filter === "Apps" && (
                <section className="mb-10 bg-[#0b1019] p-[clamp(24px,4vw,56px)] text-[#edf0f4]" aria-label="Websites, mobile apps and audit">
                  <h2 className="hd m-0 max-w-[20ch] text-[clamp(32px,4vw,60px)] leading-[.98]">Need a website, a mobile app or an audit? We do all three.</h2>
                  <p className="mb-0 mt-4 max-w-[60ch] text-[17px] leading-7 text-[color-mix(in_srgb,#edf0f4_82%,transparent)]">One team for your whole digital presence: we build it, make sure it is secure and reliable, and keep it running, so you deal with a single partner instead of three.</p>
                  <div className="mt-8 grid gap-px bg-[color-mix(in_srgb,#edf0f4_16%,transparent)]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))" }}>
                    {APPS_PITCH.map((x) => (
                      <div key={x.title} className="flex flex-col gap-3 bg-[#0b1019] p-6">
                        <span className="text-[#6f9dd6]"><Icon name={x.icon} size={28} /></span>
                        <h3 className="hd m-0 text-2xl leading-[1.1]">{x.title}</h3>
                        <p className="m-0 text-[15.5px] leading-[25px] text-[color-mix(in_srgb,#edf0f4_78%,transparent)]">{x.copy}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button type="button" className="reset btn-solid !text-white" onClick={contactAbout(SV.find((v) => v.icon === "Globe")?.title ?? "General enquiry", "I would like to discuss a project (website / mobile app / audit).\n\n")}>Start your project</button>
                    <button type="button" className="reset link-btn" onClick={contactAbout("IT Infrastructure Audit")}>Book an audit{Arrow}</button>
                  </div>
                </section>
              )}

              {shown[0] && (
                <article className="group mb-10 grid overflow-hidden bg-[var(--color-surface)]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))" }}>
                  <div className="relative min-h-[300px] overflow-hidden">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]"><ImageSlot placeholder={shown[0].title} img={shown[0].img} /></div>
                  </div>
                  <div className="flex flex-col justify-center gap-4 p-[clamp(24px,4vw,56px)]">
                    <span className="eyebrow">Featured · {shown[0].cat}</span>
                    <h2 className="hd m-0 text-[clamp(32px,3.6vw,52px)] leading-[.98]">{shown[0].title}</h2>
                    <p className="m-0 text-[17px] leading-7 text-[color-mix(in_srgb,#0b1019_75%,transparent)]">{shown[0].copy}</p>
                    <div className="mt-2 flex gap-6 border-t border-[var(--color-divider)] pt-4 text-sm text-[color-mix(in_srgb,#0b1019_65%,transparent)]">
                      <span>{shown[0].loc}</span><span>{shown[0].year}</span><span>Placeholder</span>
                    </div>
                  </div>
                </article>
              )}

              <div className="grid gap-x-6 gap-y-12" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,340px),1fr))" }}>
                {shown.slice(1).map((pr) => (
                  <article key={pr.key} className="group flex flex-col gap-4">
                    <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface)]">
                      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]"><ImageSlot placeholder={pr.title} img={pr.img} /></div>
                      <span className="hd absolute left-3 top-3 bg-white px-2.5 py-1 text-[13px] tracking-[.1em] text-[#0b1019]">{pr.cat}</span>
                    </div>
                    <h3 className="hd m-0 text-[28px] leading-[1.05]">{pr.title}</h3>
                    <p className="m-0 text-[15.5px] leading-[25px] text-[color-mix(in_srgb,#0b1019_72%,transparent)]">{pr.copy}</p>
                    <div className="mt-auto flex gap-5 border-t border-[var(--color-divider)] pt-3 text-[13px] text-[color-mix(in_srgb,#0b1019_62%,transparent)]">
                      <span>{pr.loc}</span><span>{pr.year}</span><span>Placeholder</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        )}

        {page === "about" && (
          <>
            <section className="relative h-[56vh] min-h-[380px] overflow-hidden bg-[var(--color-surface)]">
              <ImageSlot placeholder="UNETG team in a meeting" img="meeting" priority />
              <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top,var(--color-bg),color-mix(in srgb,var(--color-bg) 25%,transparent))" }} />
              <div className="pointer-events-none absolute inset-x-0 bottom-0"><div className="wrap pb-10"><h1 className="h-page hd">About UNETG</h1></div></div>
            </section>
            <div className="wrap flex flex-col gap-[clamp(64px,8vw,110px)] pb-[100px] pt-14">
              <section className="grid gap-x-20 gap-y-10" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))" }}>
                <h2 className="h-section hd">Technology meets strategy and execution</h2>
                <div className="body-lg flex flex-col gap-5">
                  <p className="m-0">UNETG stands for United Network Group. We are committed to transforming your network into a powerful asset that propels your business forward. We provide the foundation for seamless operations, secure data, and innovative services, enabling you to focus on what you do best—growing your business.</p>
                  <p className="m-0">Join us in redefining what&apos;s possible for your business with network solutions that pave the way for a brighter, more connected future. Let&apos;s build the digital backbone your business deserves, together.</p>
                </div>
              </section>
              <section>
                <h2 className="h-section hd mb-8">How we deliver</h2>
                <div className="grid gap-10" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))" }}>
                  {STEPS.map((st) => (
                    <div key={st.num} className="flex flex-col gap-3 border-t-2 border-[var(--color-accent)] pt-5">
                      <span className="hd text-5xl leading-none text-[var(--color-accent-400)]">{st.num}</span>
                      <h3 className="hd m-0 text-2xl">{st.title}</h3>
                      <p className="m-0 text-[15.5px] leading-[25px]" style={{ color: "color-mix(in srgb,var(--color-text) 76%,transparent)" }}>{st.copy}</p>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h2 className="h-section hd mb-8">Strategic partnerships</h2>
                <div className="grid gap-px border border-[var(--color-divider)] bg-[var(--color-divider)]" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(170px,1fr))" }}>
                  {PARTNERS.map((p) => (
                    <div key={p} className="hd bg-[var(--color-bg)] px-4 py-7 text-center text-xl tracking-[.06em]" style={{ color: "color-mix(in srgb,var(--color-text) 72%,transparent)" }}>{p}</div>
                  ))}
                </div>
              </section>
              <section>
                <h2 className="h-section hd mb-2">Client voices</h2>
                <p className="mb-9 mt-0 text-sm" style={{ color: "color-mix(in srgb,var(--color-text) 65%,transparent)" }}>Placeholder testimonials. Replace with real quotes.</p>
                <div className="grid gap-12" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))" }}>
                  {QUOTES.map((q) => (
                    <figure key={q.who} className="m-0 flex flex-col gap-[18px]">
                      <blockquote className="m-0 text-[28px] font-semibold leading-[1.15]" style={{ fontFamily: "var(--font-heading)" }}>“{q.text}”</blockquote>
                      <figcaption className="text-sm" style={{ color: "color-mix(in srgb,var(--color-text) 68%,transparent)" }}>— {q.who}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}

        {page === "careers" && (
          <div className="wrap pb-[100px] pt-[clamp(56px,7vw,96px)]">
            <h1 className="h-page hd">Join the team</h1>
            <p className="muted mb-10 mt-[18px] text-base">Sample openings shown for layout. Replace with your current roles.</p>
            <div className="border-t border-[var(--color-divider)]">
              {JOBS.map((j, i) => (
                <div key={j.title} className="border-b border-[var(--color-divider)]">
                  <button type="button" className="reset hover-accent grid w-full items-center gap-6 px-1 py-[26px]" style={{ gridTemplateColumns: "minmax(0,1fr) auto auto 24px" }} onClick={() => setJob(i === job ? -1 : i)} aria-expanded={i === job}>
                    <span className="hd text-[clamp(24px,2.6vw,36px)]">{j.title}</span>
                    <span className="eyebrow hidden sm:block">{j.team}</span>
                    <span className="hidden text-sm sm:block" style={{ color: "color-mix(in srgb,var(--color-text) 70%,transparent)" }}>{j.loc}</span>
                    <span style={{ transform: `rotate(${i === job ? 180 : 0}deg)`, transition: "transform .2s" }}><Icon name="ChevronDown" size={20} /></span>
                  </button>
                  {i === job && (
                    <div className="flex max-w-[70ch] flex-col gap-4 px-1 pb-7">
                      <p className="m-0 text-base leading-[26px]" style={{ color: "color-mix(in srgb,var(--color-text) 84%,transparent)" }}>{j.copy}</p>
                      <button type="button" className="reset btn-solid !px-5 !py-3 !text-[15px]" onClick={contactAbout("Careers", `Application: ${j.title}\n\n`)}>Apply for this role</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {page === "contact" && (
          <div className="bg-[whitesmoke]"
            style={{ "--color-bg": "whitesmoke", "--color-surface": "#ffffff", "--color-text": "#0b1019", "--color-divider": "color-mix(in srgb, #0b1019 16%, transparent)", "--color-accent-400": "#1a5096", "--color-accent-300": "#1a5096", color: "#0b1019" } as React.CSSProperties}>
          <div className="wrap grid items-start gap-x-20 gap-y-14 pb-[100px] pt-[clamp(56px,7vw,96px)]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,400px),1fr))" }}>
            <div className="flex flex-col gap-[22px]">
              <h1 className="hd m-0 text-[clamp(52px,7vw,112px)] leading-[.9]">Get in touch</h1>
              <p className="body-lg m-0 max-w-[46ch]">Reach out today to discover how we can help you optimize performance, enhance security, and drive business success.</p>
              <div className="flex flex-col border-t border-[var(--color-divider)]">
                <a href="mailto:contacte@unetg.com" className="flex items-center gap-3 border-b border-[var(--color-divider)] py-[18px] text-[17px]" style={{ color: "var(--color-text)" }}><span className="text-[var(--color-accent-400)]"><Icon name="Mail" /></span>contacte@unetg.com</a>
                {OFFICES.map((o) => (
                  <a key={o.country} href={o.tel} className="flex items-center gap-3 border-b border-[var(--color-divider)] py-[18px] text-[17px]" style={{ color: "var(--color-text)" }}>
                    <span className="text-[var(--color-accent-400)]"><Icon name="Phone" /></span>{o.phone}
                    <span className="eyebrow ml-auto">{o.country}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="bg-[var(--color-surface)] p-[clamp(24px,3vw,40px)]"
              style={{ "--color-bg": "#0b1019", "--color-surface": "#131a26", "--color-text": "#edf0f4", "--color-divider": "color-mix(in srgb, #edf0f4 14%, transparent)", "--color-accent-400": "#6f9dd6", "--color-accent-300": "#a9c6ea", color: "#edf0f4" } as React.CSSProperties}>
              {sent ? (
                <div className="flex min-h-[380px] flex-col justify-center gap-4">
                  <span className="text-[var(--color-accent-400)]"><Icon name="CircleCheck" size={40} /></span>
                  <h3 className="hd m-0 text-4xl">Thanks for your message</h3>
                  <p className="m-0 text-base leading-[26px]">Thank you, {form.name}. We&apos;ll reply to {form.email} about {form.service} shortly.</p>
                  <button type="button" className="reset hd self-start border-b-2 border-[var(--color-accent)] pb-1 text-[15px] tracking-[.08em]" onClick={() => { setSent(false); setForm({ ...blankForm }); }}>Send another request</button>
                </div>
              ) : (
                <form noValidate onSubmit={submit} className="flex flex-col gap-[18px]">
                  <div className="grid gap-[18px]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}>
                    <div className="field flex flex-col gap-1.5">
                      <label htmlFor="f-name">Full name</label>
                      <input id="f-name" className="input" value={form.name} onChange={(e) => setField("name", e.target.value)} placeholder="Jane Doe" />
                      {errors.name && <span className="text-[13px] text-[var(--color-accent-300)]">{errors.name}</span>}
                    </div>
                    <div className="field flex flex-col gap-1.5">
                      <label htmlFor="f-company">Company</label>
                      <input id="f-company" className="input" value={form.company} onChange={(e) => setField("company", e.target.value)} placeholder="Optional" />
                    </div>
                  </div>
                  <div className="field flex flex-col gap-1.5">
                    <label htmlFor="f-email">Email</label>
                    <input id="f-email" className="input" type="email" value={form.email} onChange={(e) => setField("email", e.target.value)} placeholder="you@company.com" />
                    {errors.email && <span className="text-[13px] text-[var(--color-accent-300)]">{errors.email}</span>}
                  </div>
                  <div className="field flex flex-col gap-1.5">
                    <label htmlFor="f-topic">Topic</label>
                    <select id="f-topic" className="input" value={form.service} onChange={(e) => setField("service", e.target.value)}>
                      {["General enquiry", ...SV.map((s) => s.title), "Donate to Tengeneza", "Careers"].map((op) => <option key={op} value={op}>{op}</option>)}
                    </select>
                  </div>
                  <div className="field flex flex-col gap-1.5">
                    <label htmlFor="f-message">Tell us about your project</label>
                    <textarea id="f-message" className="input" rows={5} value={form.message} onChange={(e) => setField("message", e.target.value)} placeholder="Your network, goals and timeline" />
                    {errors.message && <span className="text-[13px] text-[var(--color-accent-300)]">{errors.message}</span>}
                  </div>
                  <button type="submit" className="reset btn-solid !px-6 !text-white">Send request</button>
                </form>
              )}
            </div>
          </div>
          </div>
        )}
      </main>

      {page !== "contact" && (
        <section className="bg-[var(--color-accent)]">
          <div className="wrap flex flex-wrap items-center justify-between gap-7 py-[clamp(48px,6vw,80px)]">
            <h2 className="hd m-0 max-w-[16ch] text-[clamp(36px,5vw,76px)] leading-[.95]">Tell us about your upcoming project</h2>
            <button type="button" className="reset hd flex items-center gap-2.5 bg-[var(--color-bg)] px-7 py-4 text-[17px] tracking-[.08em] hover:bg-[var(--color-accent-900)]" onClick={() => go("contact")}>Get started{Arrow}</button>
          </div>
        </section>
      )}

      <footer className="border-t border-[var(--color-divider)] bg-[var(--color-bg)]">
        <div className="wrap grid gap-10 pb-10 pt-16" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))" }}>
          <div className="flex min-w-0 flex-col gap-[18px]" style={{ gridColumn: narrow ? undefined : "span 2" }}>
            <Logo height={72} />
            <p className="hd m-0 max-w-[22ch] text-[clamp(24px,2.4vw,34px)] leading-[1.05]">Transform your network, empower your business with UNETG</p>
          </div>
          <div className="flex flex-col gap-2.5 text-[15px]">
            <span className="eyebrow">Explore</span>
            {PAGES.map(([id, label]) => (
              <button key={id} type="button" className="reset hover-accent self-start" style={{ color: "color-mix(in srgb,var(--color-text) 80%,transparent)" }} onClick={() => go(id)}>{label}</button>
            ))}
          </div>
          <div className="flex flex-col gap-2.5 text-[15px]">
            <span className="eyebrow">USA · DRC</span>
            <a href="mailto:contacte@unetg.com" style={{ color: "var(--color-text)" }}>contacte@unetg.com</a>
            {OFFICES.map((o) => <a key={o.country} href={o.tel} style={{ color: "var(--color-text)" }}>{o.phone}</a>)}
          </div>
        </div>
        <div className="wrap flex flex-wrap justify-between gap-4 border-t border-[var(--color-divider)] pb-8 pt-5 text-[13px]" style={{ color: "color-mix(in srgb,var(--color-text) 60%,transparent)" }}>
          <span>© 2026 UNETG (United Network Group) // All rights reserved</span>
          <a href="#top" className="text-xs font-semibold uppercase tracking-[.1em]" style={{ color: "var(--color-text)" }}>Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}

function Home({ go, openSvc, contactAbout, carRef }: { go: (p: PageId) => void; openSvc: (i: number) => void; contactAbout: (service: string, message?: string) => () => void; carRef: React.RefObject<HTMLDivElement | null> }) {
  const scrollBy = (left: number) => carRef.current?.scrollBy({ left, behavior: "smooth" });
  const Arrow = <Icon name="ArrowRight" size={16} />;
  return (
    <>
      <section className="relative min-h-[560px] max-h-[960px] overflow-hidden bg-[var(--color-surface)]" style={{ height: "calc(100vh - 63px)" }}>
        <ImageSlot placeholder="City skyline connected by a digital network" img="hero" priority />
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top,var(--color-bg) 2%,color-mix(in srgb,var(--color-bg) 55%,transparent) 45%,color-mix(in srgb,var(--color-bg) 20%,transparent))" }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <div className="wrap flex flex-wrap items-end justify-between gap-8 pb-[clamp(40px,7vh,80px)]">
            <div className="pointer-events-auto">
              <span className="eyebrow mb-[18px] block text-[13px] tracking-[.14em]">Networking + Audit + Software + Data + AI</span>
              <h1 className="hd m-0 ml-[-.04em] text-[clamp(56px,9.5vw,152px)] leading-[.92] tracking-[-.005em]">
                <span className="block">Transform</span><span className="block">your network.</span><span className="block text-[var(--color-accent-400)]">Empower your business.</span>
              </h1>
            </div>
            <a href="#intro" className="pointer-events-auto flex flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[.14em]" style={{ color: "var(--color-text)" }}>Scroll down<Icon name="ArrowDown" /></a>
          </div>
        </div>
      </section>

      <section id="intro" className="wrap grid gap-x-20 gap-y-12 py-[clamp(72px,10vw,140px)] scroll-mt-16" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))" }}>
        <div>
          <h2 className="hd m-0 text-[clamp(52px,7vw,112px)] leading-[.92]">We are<br />UNETG</h2>
          <p className="hd mb-0 mt-4 text-[clamp(18px,1.8vw,24px)] tracking-[.14em] uppercase" style={{ color: "color-mix(in srgb,var(--color-text) 70%,transparent)" }}>United Network Group</p>
          <p className="hd mb-0 mt-5 text-[22px] tracking-[.06em] text-[var(--color-accent-400)]">Where technology meets strategy and execution</p>
        </div>
        <div className="body-lg flex flex-col gap-5 pt-2">
          <p className="m-0">In today&apos;s digital-first world, the backbone of any thriving business is its network infrastructure. At UNETG, we understand the critical role that a robust, reliable, and secure network plays in your organization&apos;s success. We don&apos;t just offer services; we deliver peace of mind, efficiency, and a competitive edge through our tailored IT and network solutions.</p>
          <p className="m-0">Our comprehensive suite of services, spanning Consulting and Advisory, Training and Education, and Specialized Services, is designed to address the unique challenges and opportunities businesses face in the digital age. We also design and build websites, web platforms and mobile apps to put your business online.</p>
          <button type="button" className="reset link-btn mt-2 self-start border-b-2 border-[var(--color-accent)] pb-1.5" onClick={() => go("about")}>About UNETG{Arrow}</button>
        </div>
      </section>

      <section className="wrap pb-[clamp(72px,9vw,120px)]">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
          <h2 className="h-section hd">What we do</h2>
          <button type="button" className="reset link-btn" onClick={() => go("services")}>All services{Arrow}</button>
        </div>
        <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,340px),1fr))" }}>
          {SV.map((s, i) => (
            <div key={s.title} className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface)]">
              <ImageSlot placeholder={`${s.title} photo`} img={SERVICE_IMG[i]} />
              <button type="button" className="reset tile-cta absolute inset-x-0 bottom-0 flex flex-col gap-1.5 px-5 pb-[18px] pt-12"
                style={{ background: "linear-gradient(to top,color-mix(in srgb,var(--color-bg) 94%,transparent) 20%,transparent)" }} onClick={() => openSvc(i)}>
                <span className="eyebrow tracking-[.12em]">{num(i)}</span>
                <span className="hd flex items-end justify-between gap-3 text-2xl leading-[1.05]">{s.title}<span className="flex-none">{Arrow}</span></span>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[whitesmoke] py-[clamp(64px,8vw,110px)]"
        style={{ "--color-bg": "whitesmoke", "--color-surface": "#e6e8eb", "--color-text": "#0b1019", "--color-divider": "color-mix(in srgb, #0b1019 16%, transparent)", "--color-accent-400": "#1a5096", color: "#0b1019" } as React.CSSProperties}>
        <div className="wrap">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-[640px]">
              <h2 className="h-section hd">Recent work</h2>
              <p className="muted mb-0 mt-3.5 text-base leading-[26px]">Placeholder projects, shown for layout. Replace with real client work.</p>
            </div>
            <div className="flex gap-2">
              <button type="button" className="reset icon-btn" aria-label="Previous" onClick={() => scrollBy(-480)}><Icon name="ArrowLeft" /></button>
              <button type="button" className="reset icon-btn" aria-label="Next" onClick={() => scrollBy(480)}><Icon name="ArrowRight" /></button>
            </div>
          </div>
        </div>
        <div ref={carRef} className="no-scrollbar flex gap-4 overflow-x-auto px-[clamp(20px,4vw,56px)] pb-3" style={{ scrollSnapType: "x mandatory", scrollPaddingInline: "clamp(20px,4vw,56px)" }}>
          {projects.map((pr) => (
            <div key={pr.key} className="flex w-[min(80vw,460px)] flex-none snap-start flex-col gap-3.5">
              <div className="relative aspect-[4/3] bg-[var(--color-surface)]"><ImageSlot placeholder={pr.title} img={pr.img} /></div>
              <div className="eyebrow flex justify-between gap-3"><span>{pr.cat}</span><span style={{ color: "color-mix(in srgb,var(--color-text) 60%,transparent)" }}>Placeholder · {pr.loc}</span></div>
              <h3 className="hd m-0 text-[26px] leading-[1.05]">{pr.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="overflow-hidden bg-[var(--color-surface)] pt-[clamp(64px,8vw,110px)]">
        <div className="wrap grid items-end gap-x-20 gap-y-10" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))" }}>
          <h2 className="hd m-0 text-[clamp(64px,10vw,168px)] leading-[.85]">USA <span className="text-[var(--color-accent-400)]">+</span> DRC</h2>
          <div className="flex flex-col gap-[18px]">
            <p className="body-lg m-0">We leverage our partnerships with industry leaders like Cisco, Deloitte, KPMG, Microsoft, Juniper, and VMware to bring you the latest in technology and strategic thinking, ensuring your network is not just a platform for your business operations but a driver of innovation and growth.</p>
            <p className="m-0 text-base leading-[26px]" style={{ color: "color-mix(in srgb,var(--color-text) 76%,transparent)" }}>In the DRC, UNETG also works with <a href="https://cabinetnyamugabo.com/" target="_blank" rel="noopener noreferrer">Cabinet Nyamugabo</a>, a Congolese law firm, across many areas, combining legal expertise with our technology solutions.</p>
            <div className="flex flex-wrap gap-8">
              {OFFICES.map((o) => (
                <a key={o.country} href={o.tel} className="flex flex-col gap-0.5" style={{ color: "var(--color-text)" }}><span className="eyebrow">{o.country}</span><span className="text-base">{o.phone}</span></a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-[clamp(48px,6vw,80px)] overflow-hidden border-t border-[var(--color-divider)] py-7" aria-hidden>
          <div className="flex w-max gap-16" style={{ animation: "unetgMarquee 45s linear infinite" }}>
            {[...PARTNERS, ...PARTNERS].map((p, i) => (
              <span key={i} className="hd whitespace-nowrap text-[clamp(28px,3vw,44px)] tracking-[.04em]" style={{ color: "color-mix(in srgb,var(--color-text) 50%,transparent)" }}>{p}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-[clamp(72px,9vw,120px)]">
        <h2 className="h-section hd mb-10">Why choose UNETG?</h2>
        <div className="grid gap-10" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))" }}>
          {WHY.map((w) => (
            <div key={w.title} className="flex flex-col gap-3.5 border-t-2 border-[var(--color-accent)] pt-[22px]">
              <span className="text-[var(--color-accent-400)]"><Icon name={w.icon} size={26} /></span>
              <h3 className="hd m-0 text-[26px] leading-[1.05]">{w.title}</h3>
              <p className="m-0 text-[15.5px] leading-[25px]" style={{ color: "color-mix(in srgb,var(--color-text) 76%,transparent)" }}>{w.copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="tengeneza" className="bg-white py-[clamp(64px,8vw,110px)]"
        style={{ "--color-bg": "#ffffff", "--color-surface": "#f3f5f8", "--color-text": "#0b1019", "--color-divider": "color-mix(in srgb, #0b1019 16%, transparent)", "--color-accent-400": "#1a5096", color: "#0b1019" } as React.CSSProperties}>
        <div className="wrap grid items-center gap-x-20 gap-y-12" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))" }}>
          <div className="flex flex-col gap-[22px]">
            <span className="eyebrow self-start border border-[var(--color-accent-400)] px-2.5 py-1 tracking-[.14em]">Coming soon · Built by UNETG</span>
            <div className="flex items-center gap-5">
              <Image src="/tengeneza-logo.svg" alt="Tengeneza logo" width={96} height={96} className="h-[clamp(56px,6vw,88px)] w-auto flex-none rounded-2xl" />
              <h2 className="hd m-0 text-[clamp(52px,6.5vw,104px)] leading-[.85]">Tenge<span className="text-[#00a14b]">neza</span></h2>
            </div>
            <p className="hd m-0 text-[22px] tracking-[.06em] text-[var(--color-accent-400)]">The pothole reporting app</p>
            <p className="body-lg m-0 max-w-[52ch]">Tengeneza means &ldquo;repair&rdquo; or &ldquo;fix&rdquo; in Swahili. It is the app UNETG is building so citizens can report potholes in seconds and help get roads repaired, turning everyday reports into data that communities and road authorities can act on. An AI model analyses the photo taken with the user&apos;s phone to detect and confirm the pothole, so every report is verified.</p>
            <div className="flex flex-col gap-3.5 border-l-4 border-[#00a14b] bg-[color-mix(in_srgb,#00a14b_8%,transparent)] p-5">
              <h3 className="hd m-0 text-2xl leading-[1.1]">Support Tengeneza</h3>
              <p className="m-0 max-w-[52ch] text-base leading-[26px]">Your donation helps us build and run Tengeneza, so the DRC government can see problem roads and repair many more of them, faster.</p>
              <div className="flex flex-wrap items-center gap-4">
                <button type="button" className="reset btn-solid !bg-[#00a14b] !text-white hover:!bg-[#008a40]" onClick={contactAbout("Donate to Tengeneza", "I would like to support the Tengeneza project.\n\n")}>Donate to Tengeneza</button>
                <button type="button" className="reset link-btn" onClick={() => go("contact")}>Get updates{Arrow}</button>
              </div>
            </div>
          </div>
          <div className="grid gap-px border border-[var(--color-divider)] bg-[var(--color-divider)]">
            {TENGENEZA_STEPS.map((st) => (
              <div key={st.num} className="grid grid-cols-[56px_1fr] gap-4 bg-[var(--color-bg)] p-6">
                <span className="hd text-[30px] leading-none text-[var(--color-accent-400)]">{st.num}</span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="hd m-0 text-2xl leading-[1.1]">{st.title}</h3>
                  <p className="m-0 text-[15.5px] leading-[25px]" style={{ color: "color-mix(in srgb,var(--color-text) 76%,transparent)" }}>{st.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid min-h-[520px]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,480px),1fr))" }}>
        <div className="relative min-h-[360px] bg-[var(--color-surface)]"><ImageSlot placeholder="Business partners shaking hands" img="handshake" /></div>
        <div className="flex flex-col justify-center gap-[22px] bg-[var(--color-accent-900)] px-[clamp(20px,5vw,80px)] py-[clamp(40px,6vw,96px)]">
          <span className="text-[13px] font-semibold uppercase tracking-[.14em] text-[var(--color-accent-300)]">Our promise</span>
          <h2 className="hd m-0 text-[clamp(34px,3.8vw,56px)] leading-[.98]">Redefining what&apos;s possible for your business</h2>
          <p className="m-0 max-w-[52ch] text-[17px] leading-7" style={{ color: "color-mix(in srgb,var(--color-text) 86%,transparent)" }}>At UNETG, we are committed to transforming your network into a powerful asset that propels your business forward. We provide the foundation for seamless operations, secure data, and innovative services, enabling you to focus on what you do best—growing your business.</p>
          <button type="button" className="reset btn-solid" onClick={() => go("contact")}>Let&apos;s create something together</button>
        </div>
      </section>
    </>
  );
}
