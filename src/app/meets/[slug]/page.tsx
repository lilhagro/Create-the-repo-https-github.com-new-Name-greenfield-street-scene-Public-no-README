import Link from "next/link";
import { notFound } from "next/navigation";
import { getMeetBySlug, listMeets } from "@/modules/meets/repository";

export async function generateStaticParams() {
  const meets = await listMeets();
  return meets.map((meet) => ({ slug: meet.slug }));
}

export default async function MeetDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meet = await getMeetBySlug(slug);
  if (!meet) notFound();

  return (
    <div className="detail-layout">
      <div
        className="detail-media"
        style={{
          background:
            "linear-gradient(160deg, rgba(230,180,34,0.18), transparent 40%), linear-gradient(180deg,#2a303c,#101318), url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=80) center/cover",
        }}
      />
      <article className="detail-panel">
        <p className="eyebrow">{meet.city}</p>
        <h1>{meet.name}</h1>
        <p className="lede">{meet.vibe}</p>
        <p>{meet.description}</p>
        <div className="tag-row">
          <span className="chip">{meet.date}</span>
          <span className="chip">{meet.time}</span>
          <span className="chip">{meet.capacity}</span>
        </div>
        <p className="muted">Venue: {meet.venue}</p>
        <div className="cta-row">
          <Link href="/#assistant" className="btn btn-primary">
            Ask AI what to wear
          </Link>
          <Link href="/meets" className="btn btn-ghost">
            All meets
          </Link>
        </div>
      </article>
    </div>
  );
}
