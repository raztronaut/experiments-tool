import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const experiments = [
  {
    title: "Chat Send Button",
    description: "A smooth, animated send button for chat interfaces.",
    href: "/experiments/chat-button",
  },
  {
    title: "Shader Landing",
    description: "A WebGL shader experiment for landing pages.",
    href: "/experiments/shader-landing",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen p-8 md:p-24 max-w-4xl mx-auto">
      <div className="mb-12">
        <h1 className="text-2xl font-semibold tracking-tight mb-2">Experiments</h1>
        <p className="text-muted-foreground">A collection of UI interactions and visual experiments.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {experiments.map((experiment) => (
          <Link key={experiment.href} href={experiment.href}>
            <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer border-zinc-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="text-lg">{experiment.title}</CardTitle>
                <CardDescription>{experiment.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
