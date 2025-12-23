---
trigger: always_on
---

# Experiments Workspace Rules

## When to Apply

These rules apply when working in any project with the `experiments` architecture pattern (characterized by route groups in `src/app/experiments/` and matching component directories).

## Core Rules

1. **Use existing scaffolding**: When creating a new experiment, ALWAYS use `npm run new:experiment` first. Never manually create experiment files.
2. **Experiment Isolation**:
   - Experiment code belongs ONLY in these locations:
     - `src/app/experiments/(experiment-name)/` - Route files
     - `src/components/experiments/experiment-name/` - Components
     - `public/experiments/experiment-name/` - Assets
   - NEVER modify files in `src/app/(main)/` for experiment-specific code
   - NEVER import from other experiments (cross-experiment imports forbidden)
   - NEVER add experiment-specific state to global stores
3. **Shared resources are read-only for experiments**:
   - `src/components/ui/` - Use but don't modify for experiments
   - `src/lib/utils.ts` - Use but don't add experiment-specific utilities
4. **Component Development Flow**:
   - Build complex components in Storybook first (`npm run storybook`)
   - Test isolation before integrating into page
5. **Cleanup discipline**:
   - Use `useEffect` cleanups for event listeners, timers, WebGL contexts
   - If abandoning an experiment, use `npm run delete:experiment <name>`