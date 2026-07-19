import { MeetCard } from "@/components/MeetCard";
import { listMeets } from "@/modules/meets/repository";

export default async function MeetsPage() {
  const meets = await listMeets();

  return (
    <>
      <header className="page-hero">
        <p className="eyebrow">Meets</p>
        <h1>Lots, cruises, and early light</h1>
        <p>
          Find a night lot, sunrise grid, or coastal roll. Details are sample events you can swap for your real calendar.
        </p>
      </header>
      <section className="section" style={{ paddingTop: "1.5rem" }}>
        <div className="meet-grid">
          {meets.map((meet) => (
            <MeetCard key={meet.id} meet={meet} />
          ))}
        </div>
      </section>
    </>
  );
}
