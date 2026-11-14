"use client";
import Link from "next/link";
import type { Machine, MarkerSite, World } from "@/content/schema";
import { formatDate, yearOf } from "@/lib/dates";
import { formatLat, formatLon } from "@/lib/geo";
import { getState, setState, useExperience } from "@/lib/store";

export function WorldPanel({ world, machines, markers }: { world: World; machines: Machine[]; markers: MarkerSite[] }) {
  const focused = useExperience((s) => s.focusedSite);
  const descending = useExperience((s) => s.descending);
  const marker = markers.find((m) => m.slug === focused);

  const descend = (e: React.MouseEvent, slug: string) => {
    // With a working canvas the globe flies down first, then navigates.
    if (getState().webgl !== "ok" || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    setState({ descending: slug, focusedSite: null });
  };

  return (
    <div className="world" data-world={world.id} data-descending={Boolean(descending)}>
      <section className="world__panel panel fade-in" aria-labelledby="world-title">
        <p className="label">{world.name}</p>
        <h1 id="world-title" className="display world__title">
          {world.title}
        </h1>
        <p className="world__intro">{world.intro}</p>

        <h2 className="label world__heading">Descend to</h2>
        <ol className="machine-list">
          {machines.map((m) => (
            <li key={m.slug}>
              <Link
                href={`/${m.world}/${m.slug}`}
                className="machine-link"
                onClick={(e) => descend(e, m.slug)}
                onMouseEnter={() => setState({ focusedSite: m.slug })}
                onMouseLeave={() => setState({ focusedSite: null })}
                onFocus={() => setState({ focusedSite: m.slug })}
                onBlur={() => setState({ focusedSite: null })}
              >
                <span className="machine-link__name">{m.name}</span>
                <span className="machine-link__meta data">
                  {yearOf(m.dates.landing)}–{yearOf(m.dates.lastContact)} · {m.status}
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <details className="other-sites">
          <summary className="label">Other silent sites ({markers.length})</summary>
          <ul>
            {markers.map((m) => (
              <li key={m.slug}>
                <button type="button" className="other-site" aria-pressed={focused === m.slug} onClick={() => setState({ focusedSite: focused === m.slug ? null : m.slug })}>
                  {m.name} <span className="data">{yearOf(m.date)}</span>
                </button>
              </li>
            ))}
          </ul>
        </details>
      </section>

      <p className="world__hint label" aria-hidden="true">
        Drag to turn the globe · select a light to descend
      </p>

      {marker && (
        <aside className="site-card panel fade-in" aria-live="polite" aria-label={marker.name}>
          <p className="label">
            {marker.agency} · {formatDate(marker.date)}
          </p>
          <h2 className="site-card__title">{marker.name}</h2>
          <p>{marker.fate}</p>
          <p className="data site-card__coords">
            {marker.coordinates.confidence === "unknown" ? "Location unknown · target area " : ""}
            {formatLat(marker.coordinates.lat)}, {formatLon(marker.coordinates.lon)}
          </p>
          <p className="site-card__sources">
            {marker.sources.map((s) => (
              <a key={s.id} href={s.url} target="_blank" rel="noreferrer">
                {s.publisher}
              </a>
            ))}
          </p>
          <button type="button" className="btn btn--ghost site-card__close" onClick={() => setState({ focusedSite: null })}>
            Close
          </button>
        </aside>
      )}
    </div>
  );
}
