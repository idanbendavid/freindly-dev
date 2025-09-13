import type { Route } from "./+types/index";
import Hero from "~/components/Hero";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "The friendly dev | Welcome" },
    { name: "description", content: "custom wbesite development" },
  ];
}

export default function Home() {
  return (
    <section>
      <Hero />
    </section>
  );
}
