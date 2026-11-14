"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Machine, Source } from "@/content/schema";
import { formatDate } from "@/lib/dates";
import { formatLat, formatLon } from "@/lib/geo";
import { resetForSite, setState, useExperience } from "@/lib/store";

const BEATS: Record<string, string> = { departure: "Why it was sent", "the-work": "What it did", silence: "How it fell silent", "what-remains": "What remains" };

function Cites({ ids, sources }: { ids: string[]; sources: Source[] }) {
  const list = ids.map((id) => sources.find((s) => s.id === id)).filter(Boolean) as Source[];
  return (
    <p className="cites">
      <span className="label">Sources</span>
      {list.map((s) => (
        <a key={s.id} href={s.url} target="_blank" rel="noreferrer" title={s.label}>
          {s.publisher}
        </a>
      ))}
    </p>
  );
}

function Transmission({ machine, onClose }: { machine: Machine; onClose: () => void }) {
  const reduced = useExperience((s) => s.reducedMotion);
  const lines = machine.lastSignal.lines ?? [];
  const [shown, setShown] = useState(reduced ? lines.length : 0);
  useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown((n) => n + 1), 900);
    return () => clearTimeout(t);
  }, [shown, lines.length]);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onClose]);
  return (
    <div className="transmission" role="dialog" aria-modal="true" aria-labelledby="tx-title">
      <div className="transmission__inner">
        <p className="label transmission__label">Last signal · {formatDate(machine.lastSignal.date)}</p>
        <h2 id="tx-title" className="display transmission__title">{machine.lastSignal.title}</h2>
        <ol className="transmission__lines" aria-live="polite">
          {lines.slice(0, shown).map((l, i) => (
            <li key={i} className="fade-in">{l}</li>
          ))}
        </ol>
        {shown >= lines.length && (
          <div className="fade-in">
            <p className="transmission__text">{machine.lastSignal.text}</p>
            {machine.lastSignal.caveat && <p className="caveat">{machine.lastSignal.caveat}</p>}
            <Cites ids={machine.lastSignal.sourceIds} sources={machine.sources} />
          </div>
        )}
        <button type="button" className="btn" onClick={onClose} autoFocus>
          Close
        </button>
      </div>
    </div>
  );
}

function Record({ machine, open, onClose }: { machine: Machine; open: boolean; onClose: () => void }) {
  const c = machine.site.coordinates;
  return (
    <section className="record panel" data-open={open} aria-labelledby="record-title" hidden={!open}>
      <div className="record__head">
        <h2 id="record-title" className="label">The record</h2>
        <button type="button" className="btn btn--ghost" onClick={onClose}>Close</button>
      </div>
      <dl className="stats">
        {machine.stats.map((s) => (
          <div key={s.label}>
            <dt className="label">{s.label}</dt>
            <dd className="data">{s.value}</dd>
          </div>
        ))}
        <div><dt className="label">Launched</dt><dd className="data">{formatDate(machine.dates.launch)}</dd></div>
        <div><dt className="label">Landed</dt><dd className="data">{formatDate(machine.dates.landing)}</dd></div>
        <div><dt className="label">Last contact</dt><dd className="data">{formatDate(machine.dates.lastContact)}</dd></div>
        {machine.dates.declaredEnd && <div><dt className="label">Declared over</dt><dd className="data">{formatDate(machine.dates.declaredEnd)}</dd></div>}
      </dl>
      <p className="data">{machine.site.name} · {formatLat(c.lat)}, {formatLon(c.lon)} ({c.confidence})</p>
      {c.note && <p className="caveat">{c.note}</p>}
      <h3 className="label">What remains</h3>
      <p>{machine.remains.text}</p>
      <h3 className="label">Worth knowing</h3>
      <ul className="facts">{machine.funFacts.map((f) => <li key={f.text}>{f.text}</li>)}</ul>
      <h3 className="label">Timeline</h3>
      <ol className="timeline">
        {machine.timeline.map((t) => (
          <li key={t.date + t.label} data-kind={t.kind}><span className="data">{formatDate(t.date)}</span> {t.label}</li>
        ))}
      </ol>
      {machine.openQuestions.length > 0 && (
        <>
          <h3 className="label">Open questions</h3>
          <ul className="facts caveat">{machine.openQuestions.map((q) => <li key={q}>{q}</li>)}</ul>
        </>
      )}
      <h3 className="label">All sources</h3>
      <ul className="sources">
        {machine.sources.map((s) => (
          <li key={s.id}><a href={s.url} target="_blank" rel="noreferrer">{s.label}</a> <span className="data">· {s.publisher}</span></li>
        ))}
      </ul>
    </section>
  );
}

export function MachineView({ machine, next }: { machine: Machine; next: { href: string; name: string; world: string } }) {
  const mode = useExperience((s) => s.mode);
  const chapter = useExperience((s) => s.chapter);
  const hotspotId = useExperience((s) => s.hotspot);
  const [tx, setTx] = useState(false);
  const [record, setRecord] = useState(false);
  const total = machine.chapters.length;
  const ch = machine.chapters[chapter] ?? machine.chapters[0]!;
  const hotspot = machine.hotspots.find((h) => h.id === hotspotId);
  const last = chapter === total - 1;

  useEffect(() => resetForSite(), [machine.slug]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (tx || (e.target as HTMLElement).closest("input,textarea")) return;
      if (mode === "story" && e.key === "ArrowRight") setState((s) => ({ chapter: Math.min(total - 1, s.chapter + 1) }));
      if (mode === "story" && e.key === "ArrowLeft") setState((s) => ({ chapter: Math.max(0, s.chapter - 1) }));
      if (e.key === "Escape") setState({ hotspot: null });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, total, tx]);

  return (
    <div className="machine" data-world={machine.world}>
      <header className="machine__head fade-in">
        <Link href={`/${machine.world}`} className="back label">← {machine.world === "moon" ? "The Moon" : "Mars"}</Link>
        <h1 className="display machine__name">{machine.name}</h1>
        <p className="machine__meta data">{machine.mission} · {machine.agency}</p>
        <p className="machine__epitaph">{machine.epitaph}</p>
        <p className="chips">
          <span className="chip">{machine.status}</span>
          {machine.model.standIn && <span className="chip chip--warn" title="Low-poly placeholder; real model pending">Stand-in model</span>}
        </p>
      </header>

      <div className="mode-switch" role="group" aria-label="View mode">
        <button type="button" className="btn" aria-pressed={mode === "story"} onClick={() => setState({ mode: "story", hotspot: null })}>Story</button>
        <button type="button" className="btn" aria-pressed={mode === "explore"} onClick={() => setState({ mode: "explore" })}>Explore</button>
        <button type="button" className="btn" aria-expanded={record} onClick={() => setRecord((r) => !r)}>Record</button>
      </div>

      {mode === "story" ? (
        <section className="story panel" aria-roledescription="story" aria-label={`${machine.name}: story`}>
          <p className="label story__beat">
            {chapter + 1} / {total} · {BEATS[ch.beat]}
          </p>
          <div key={ch.id} className="fade-in" aria-live="polite">
            <h2 className="display story__title">{ch.title}</h2>
            {ch.body.map((p) => <p key={p}>{p}</p>)}
            <Cites ids={ch.sourceIds} sources={machine.sources} />
          </div>
          <div className="story__nav">
            <button type="button" className="btn btn--icon" aria-label="Previous chapter" disabled={chapter === 0} onClick={() => setState({ chapter: chapter - 1 })}>←</button>
            <ol className="dots" aria-hidden="true">
              {machine.chapters.map((c, i) => <li key={c.id} data-on={i === chapter} />)}
            </ol>
            {!last ? (
              <button type="button" className="btn btn--solid" onClick={() => setState({ chapter: chapter + 1 })}>Continue →</button>
            ) : (
              <button type="button" className="btn btn--signal" onClick={() => setTx(true)}>Last signal</button>
            )}
          </div>
          {last && (
            <Link href={next.href} className="next-card">
              <span className="label">Next{next.world !== machine.world ? ` · on ${next.world === "moon" ? "the Moon" : "Mars"}` : ""}</span>
              <span className="display next-card__name">{next.name} →</span>
            </Link>
          )}
        </section>
      ) : (
        <section className="inspect panel" aria-label="Instruments">
          <p className="label">Drag to orbit · scroll or pinch to zoom · choose a part</p>
          <ol className="hotspot-list">
            {machine.hotspots.map((h, i) => (
              <li key={h.id}>
                <button type="button" className="hotspot-item" aria-pressed={hotspotId === h.id} onClick={() => setState({ hotspot: hotspotId === h.id ? null : h.id })}>
                  <span className="data">{i + 1}</span> {h.label}
                </button>
              </li>
            ))}
          </ol>
          {hotspot && (
            <div className="hotspot-detail fade-in" aria-live="polite">
              <h2 className="hotspot-detail__title">{hotspot.label}</h2>
              <p>{hotspot.body}</p>
              <Cites ids={hotspot.sourceIds} sources={machine.sources} />
            </div>
          )}
        </section>
      )}

      <Record machine={machine} open={record} onClose={() => setRecord(false)} />
      {tx && <Transmission machine={machine} onClose={() => setTx(false)} />}
    </div>
  );
}
