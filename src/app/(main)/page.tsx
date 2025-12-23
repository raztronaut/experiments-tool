import { getExperiments } from "@/lib/experiments";
import { ExperimentList } from "@/components/ui/ExperimentList";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const experiments = await getExperiments();

  return (
    <main className="min-h-screen p-8 md:p-24 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Experiments</h1>
        <p className="text-muted-foreground">A collection of UI interactions and visual experiments.</p>
      </div>

      <ExperimentList experiments={experiments} />
    </main>
  );
}
