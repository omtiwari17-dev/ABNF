import Link from "next/link";

export default function NotFound() {
  return (
    <div className="static-page">
      <p className="label">No signal</p>
      <h1 className="display">Nothing is out here.</h1>
      <p>
        <Link href="/" className="btn">Back to the archive</Link>
      </p>
    </div>
  );
}
