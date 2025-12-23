/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const experimentName = process.argv[2];

if (!experimentName) {
  console.error("Please provide an experiment name, e.g., 'npm run new:experiment fluid-sim'");
  process.exit(1);
}

const safeName = experimentName.toLowerCase().replace(/[^a-z0-9-]/g, '-');
const baseDir = path.join(__dirname, '../src/app/experiments');
const groupDir = path.join(baseDir, `(${safeName})`);
const targetDir = path.join(groupDir, safeName);

if (fs.existsSync(groupDir)) {
  console.error(`Experiment "${safeName}" already exists.`);
  process.exit(1);
}

// Create directories
fs.mkdirSync(groupDir, { recursive: true });
fs.mkdirSync(targetDir, { recursive: true });

// Create layout.tsx
const layoutContent = `import "../experiments.css";

export const metadata = {
  title: '${experimentName} Experiment',
  description: 'Isolated experiment',
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;

fs.writeFileSync(path.join(groupDir, 'layout.tsx'), layoutContent);

// Create page.tsx
const pageContent = `export default function Page() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white text-black">
      <h1 className="text-2xl font-bold">${experimentName}</h1>
      <p className="mt-2">Start building your isolated experiment here.</p>
    </div>
  );
}
`;



fs.writeFileSync(path.join(targetDir, 'page.tsx'), pageContent);

// Create error.tsx
const errorContent = `'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white text-black gap-4">
      <h2 className="text-xl font-bold text-red-600">Something went wrong!</h2>
      <p className="text-gray-600">{error.message}</p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  );
}
`;

fs.writeFileSync(path.join(targetDir, 'error.tsx'), errorContent);

// Create page.test.tsx
const testContent = `import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Page from './page';

test('${experimentName} page renders correctly', () => {
    render(<Page />);
    expect(screen.getByText('${experimentName}')).toBeDefined();
});
`;

fs.writeFileSync(path.join(targetDir, 'page.test.tsx'), testContent);

console.log(`Experiment "${safeName}" created successfully at src/app/experiments/(${safeName})/${safeName}`);

// Add to homepage
const homePagePath = path.join(__dirname, '../src/app/(main)/page.tsx');
if (fs.existsSync(homePagePath)) {
  let homeContent = fs.readFileSync(homePagePath, 'utf8');

  // Simple capitalization for title
  const title = experimentName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const newEntry = `  {
    title: "${title}",
    description: "New isolated experiment.",
    href: "/experiments/${safeName}",
  },`;

  // Find the experiments array and inject the new entry before the end
  // We look for 'const experiments = [' and the first closing '];' after it
  const experimentsArrayRegex = /(const experiments = \[\s*)([\s\S]*?)(\s*\];)/;

  if (experimentsArrayRegex.test(homeContent)) {
    homeContent = homeContent.replace(experimentsArrayRegex, (match, start, body, end) => {
      // Check if it already exists to avoid duplicates (though minimal risk with new check)
      if (body.includes(safeName)) return match;
      return `${start}${body}${newEntry}\n${end}`;
    });

    fs.writeFileSync(homePagePath, homeContent, 'utf8');
    console.log(`Added "${title}" to the homepage experiment list.`);
  } else {
    console.warn("Could not find 'experiments' array in homepage. Skipped adding to list.");
  }
} else {
  console.warn("Homepage not found. Skipped adding to list.");
}
