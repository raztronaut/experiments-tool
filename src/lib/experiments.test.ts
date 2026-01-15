import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getExperiments } from './experiments';
import fs from 'fs/promises';
import path from 'path';

// Mock fs/promises
vi.mock('fs/promises', () => ({
    default: {
        readdir: vi.fn(),
        readFile: vi.fn(),
    }
}));

describe('getExperiments', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should sort experiments by date descending', async () => {
        const mockExperimentsDir = '/mock/experiments';
        const mockDirs = [
            { name: '(exp1)', isDirectory: () => true },
            { name: '(exp2)', isDirectory: () => true },
            { name: '(exp3)', isDirectory: () => true },
            { name: 'not-an-exp', isDirectory: () => true },
            { name: 'some-file.txt', isDirectory: () => false },
        ];

        // Mock readdir to return directories
        (fs.readdir as any).mockResolvedValue(mockDirs);

        // Mock readFile to return config for each experiment
        (fs.readFile as any).mockImplementation(async (filePath: string) => {
            if (filePath.includes('(exp1)')) {
                return JSON.stringify({
                    title: 'Exp 1',
                    slug: 'exp1',
                    created: '2023-01-01T00:00:00.000Z'
                });
            }
            if (filePath.includes('(exp2)')) {
                return JSON.stringify({
                    title: 'Exp 2',
                    slug: 'exp2',
                    created: '2023-01-02T00:00:00.000Z' // Newest
                });
            }
            if (filePath.includes('(exp3)')) {
                return JSON.stringify({
                    title: 'Exp 3',
                    slug: 'exp3',
                    created: '2022-12-31T00:00:00.000Z' // Oldest
                });
            }
            throw new Error('File not found');
        });

        const experiments = await getExperiments();

        expect(experiments).toHaveLength(3);
        expect(experiments[0].slug).toBe('exp2'); // Newest first
        expect(experiments[1].slug).toBe('exp1');
        expect(experiments[2].slug).toBe('exp3'); // Oldest last
    });

    it('should handle missing config files gracefully', async () => {
         const mockDirs = [
            { name: '(exp1)', isDirectory: () => true },
        ];

        (fs.readdir as any).mockResolvedValue(mockDirs);
        (fs.readFile as any).mockRejectedValue(new Error('File not found'));

        const experiments = await getExperiments();
        expect(experiments).toHaveLength(0);
    });
});
