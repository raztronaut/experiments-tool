import { getExperiments } from "@/lib/experiments";
import { ExperimentList } from "@/components/ui/ExperimentList";



export default async function Home() {
  const experiments = await getExperiments();

  return (
    <main className="min-h-screen p-8 md:p-24 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Experiments</h1>
        <p className="text-muted-foreground">A collection of UI interactions and visual experiments.</p>
        <p className="text-sm text-muted-foreground mt-4">
          This is the base template I use for my experiments. You can see how my full experiments look here:{" "}
          <a
            href="https://raziexperiments.vercel.app/"
            className="text-foreground hover:underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            raziexperiments.vercel.app
          </a>
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          You can find the GitHub repository for this tool here:{" "}
          <a
            href="https://github.com/raztronaut/experiments-tool"
            className="text-foreground hover:underline font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/raztronaut/experiments-tool
          </a>
        </p>
      </div>

      <ExperimentList experiments={experiments} />
    </main>
  );
}
