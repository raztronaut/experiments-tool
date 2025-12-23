# Web Dev Experiments

A personal playground for exploring UI interactions, shaders, and modern web development techniques.

## Overview

This project is a collection of **strictly isolated** experiments. Each experiment runs in its own environment with no shared global styles from the main application, ensuring a clean slate for every idea.

**Tech Stack:**
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS & Shadcn UI (Main App), Isolated CSS (Experiments)
- **Animation**: Framer Motion
- **3D**: React Three Fiber / Three.js

## Experiments

Currently available experiments:

- **[Chat Send Button](/src/app/experiments/(chat-button)/chat-button/page.tsx)**: A morphological send button that transitions into a loading spinner.
- **[Shader Landing Page](/src/app/experiments/(shader-landing)/shader-landing/page.tsx)**: A fullscreen WebGL gradient background using custom GLSL shaders.

## Workflow: How to Build

We use a structured process to ensure experiments remain isolated and organized.

### 1. Scaffold a New Experiment
### 1. Scaffold a New Experiment
Use the interactive automation script to create a fresh, isolated environment and component structure.
```bash
npm run new:experiment
```
Follow the prompts to name your experiment and provide a description.
*This command automatically creates the route, component, stories, and adds the experiment to the homepage list.*

### 2. Develop Components
Build your components in `src/components/experiments/<experiment-name>`.
- Use **Storybook** to develop components in isolation before assembling them on the page.
- Run `npm run storybook` to open the workbench.
- Create stories in `src/components/experiments/<experiment-name>/*.stories.tsx`.

### 3. Assemble the Page
Import your finished components into `src/app/experiments/(<experiment-name>)/<experiment-name>/page.tsx`.
- This page is your blank canvas.
- No global styles from the main site will leak in here.
- If you need specific styles, update `src/app/experiments/experiments.css` or use CSS modules.

### 4. Verify
Visit `http://localhost:3000/experiments/<experiment-name>` to see your creation live.

### 5. Deleting an Experiment
To safely remove an experiment (folder, components, and homepage entry):
```bash
npm run delete:experiment <experiment-name>
# Example: npm run delete:experiment water-ripple
```

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
