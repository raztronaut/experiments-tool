# Web Dev Experiments

A personal playground for exploring UI interactions, shaders, and modern web development techniques.

## Purpose

The goal of this project is to provide a robust environment for rapid prototyping. It allows for the exploration of new ideas, libraries, and techniques without the overhead of setting up a new project every time, while ensuring that each experiment remains **strictly isolated** from others.

## Prerequisites

- **Node.js**: v20 or higher
- **npm**: v10 or higher

## Project Structure

The project is organized to separate the main application dashboard from the isolated experiments.

```
experiments/
├── public/
│   └── experiments/          # Experiment assets (images, models)
├── src/
│   ├── app/
│   │   ├── (main)/           # Dashboard application routes
│   │   └── experiments/      # Isolated experiment routes
│   │       └── (group)/      # Route groups (opt-out of main layout)
│   ├── components/
│   │   ├── ui/               # Shared dashboard components (Shadcn)
│   │   └── experiments/      # Experiment-specific components
│   └── lib/                  # Shared utilities
├── scripts/                  # Automation scripts (cleanup, etc.)
└── plopfile.js               # Scaffolding generator
```

## Architecture

To ensure that experiments do not interfere with each other or the main application layout:

- **Isolated Environments**: Each experiment runs in its own route group.
- **Style Isolation**: The main application uses global styles (Tailwind, Shadcn), but experiments can opt-out or use their own isolated CSS to ensure a clean slate.
- **Component Independence**: Components are built specifically for their experiment, often developed in isolation using Storybook before integration.

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS & Shadcn UI (Main Dashboard)
- **Animation**: Framer Motion
- **3D Graphics**: React Three Fiber / Three.js
- **Tooling**: Plop.js for scaffolding, Vitest for testing, Storybook for component development.

## Workflow & Automation

We use custom automation to streamline the creative process and maintain project cleanliness.

### 1. Scaffold a New Experiment (`plop.js`)
Instead of manually creating folders and files, we use a CLI generator to scaffold new experiments.
```bash
npm run new:experiment
```
This command:
- Prompts for an experiment name and description.
- Generates the route structure in `src/app/experiments`.
- Creates a dedicated component directory in `src/components/experiments`.
- **Creates a metadata file (`experiment.json`)** which allows the dashboard to automatically list the experiment.
- **Creates an asset directory** in `public/experiments/<name>` for images/models.
- Sets up initial Storybook stories.

### 2. Develop Components (Storybook)
Complex interactions are best built in isolation.
```bash
npm run storybook
```
We use Storybook to build and refine components without the noise of the full application context.

### 3. Integration
Once components are ready, they are assembled into the page file designated for that experiment.

### 4. Verification
Visit `http://localhost:3000/experiments/<experiment-name>` to see your creation live.

### 5. Cleanup
Experiments can be transient. If an idea doesn't work out or is no longer needed, it can be cleanly removed.
```bash
npm run delete:experiment <experiment-name>
```
This script removes all associated files (routes, components, public assets). Because the registry is dynamic, the experiment automatically disappears from the dashboard.

## Best Practices

- **Strict Isolation**: Do not import components from other experiments. Keep dependencies self-contained.
- **No Global Store Pollution**: Avoid adding experiment-specific state to global stores unless absolutely necessary.
- **Cleanups**: Use `useEffect` cleanups for event listeners, timers, or WebGL contexts to prevent memory leaks when navigating away.

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000) for the main dashboard.

3. **Run component workbench (Storybook)**:
   ```bash
   npm run storybook
   ```

4. **Run tests**:
   ```bash
   npm run test
   ```

## License

MIT
