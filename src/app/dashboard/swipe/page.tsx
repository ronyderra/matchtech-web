import { CompanySwipeDeck } from "@/components/dashboard/CompanySwipeDeck/CompanySwipeDeck";

export default function SwipePage() {
  return (
    <main style={{ maxWidth: 980, margin: "0 auto" }}>
      <section style={{ display: "flex", justifyContent: "center" }}>
        <CompanySwipeDeck />
      </section>
    </main>
  );
}
