import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About", description: "How Afterlight was made and how its facts were checked." };

export default function About() {
  return (
    <article className="static-page">
      <p className="label">About the archive</p>
      <h1 className="display">How this was made</h1>
      <p>Every date, number and quotation in Afterlight comes from a cited source: NASA and its NSSDCA archive, JPL, ESA, ISRO, LROC, HiRISE, the Apollo Lunar Surface Journal and NASA’s history of deep-space exploration. Where sources disagree, the story says so.</p>
      <p>The 3D machines are hand-built, low-poly stand-ins and are labelled that way. Their proportions follow published dimensions. Terrain is generated, not mapped from real elevation data. The globes use NASA LROC imagery (Moon) and a CC BY 4.0 Solar System Scope map (Mars).</p>
      <p><Link href="/" className="btn">Back to the archive</Link></p>
    </article>
  );
}
