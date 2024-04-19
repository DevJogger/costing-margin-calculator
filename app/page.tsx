import HeadBar from "@/components/HeadBar";
import Row from "@/components/Row";

export default function Home() {
  return (
    <main className="flex flex-col justify-between h-dvh bg-stone-900 text-white">
      <HeadBar title={["Cost", "Unit Cost", "Qty", "TTL Cost"]} />
      <section className="flex-1 overflow-scroll">
        <Row title="Cost of Product" />
      </section>
      <footer>footer</footer>
    </main>
  );
}
