import Link from "next/link";
import { machinesOf, WORLDS } from "@/content";

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing__intro fade-in">
        <p className="label">An archive of the machines we left behind</p>
        <h1 className="display landing__title">Afterlight</h1>
        <p className="landing__lede">
          On two dead worlds, rovers and landers sit exactly where they stopped. Each one was sent with a purpose, did its work, and then went quiet. Descend to them, look closely, and read what happened.
        </p>
      </div>
      <nav className="landing__worlds fade-in" aria-label="Choose a world">
        {WORLDS.map((w) => (
          <Link key={w.id} href={`/${w.id}`} className="world-choice" data-world={w.id}>
            <span className="label">{machinesOf(w.id).length} machines</span>
            <span className="display world-choice__name">{w.name}</span>
            <span className="world-choice__line">{w.title}</span>
          </Link>
        ))}
      </nav>
      <p className="landing__note">Facts verified against NASA, NSSDCA, ESA, ISRO, LROC and HiRISE sources, cited in every story. 3D models are labelled stand-ins.</p>
    </div>
  );
}
