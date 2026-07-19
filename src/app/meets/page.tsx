import { MeetCard } from "@/components/MeetCard";
import { meets } from "@/data/meets";

export default function MeetsPage() {
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
