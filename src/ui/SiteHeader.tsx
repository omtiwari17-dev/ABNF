"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { parseRoute } from "@/lib/route";
import { savePrefs, setState, useExperience } from "@/lib/store";

export function SiteHeader() {
  const route = parseRoute(usePathname());
  const reduced = useExperience((s) => s.reducedMotion);
  const world = route.kind === "world" || route.kind === "site" ? route.world : null;

  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Afterlight, home">
        <span className="wordmark__mark" aria-hidden="true" />
        AFTERLIGHT
      </Link>
      <nav aria-label="Worlds" className="site-header__nav">
        <Link href="/moon" className="nav-link" aria-current={world === "moon" ? "page" : undefined}>
          Moon
        </Link>
        <Link href="/mars" className="nav-link" aria-current={world === "mars" ? "page" : undefined}>
          Mars
        </Link>
        <button
          type="button"
          className="nav-link nav-link--toggle"
          aria-pressed={reduced}
          onClick={() => {
            setState({ reducedMotion: !reduced });
            savePrefs();
          }}
          title="Cut between camera shots instead of moving"
        >
          {reduced ? "Motion: reduced" : "Motion: full"}
        </button>
      </nav>
    </header>
  );
}
