import Link from "next/link";
import type { Meet } from "@/data/meets";

export function MeetCard({ meet }: { meet: Meet }) {
  return (
    <article className="meet-card">
      <div className="meet-card__meta">
        <span>{meet.city}</span>
        <span>{meet.date}</span>
      </div>
      <h3>
        <Link href={`/meets/${meet.slug}`}>{meet.name}</Link>
      </h3>
      <p className="muted">{meet.vibe}</p>
      <p>{meet.description}</p>
      <div className="meet-card__footer">
        <span className="chip">{meet.time}</span>
        <Link href={`/meets/${meet.slug}`} className="text-link">
          Details
        </Link>
      </div>
    </article>
  );
}
