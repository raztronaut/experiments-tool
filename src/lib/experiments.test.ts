import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getExperiments } from './experiments';
import fs from 'fs/promises';
import { Dirent } from 'fs';

// Mock fs/promises
vi.mock('fs/promises', () => ({
    default: {
        readdir: vi.fn(),
        readFile: vi.fn(),
    }
}));

// Create a type that matches the minimal interface of Dirent we need
interface MockDirent {
    name: string;
    isDirectory: () => boolean;
}

describe('getExperiments', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    it('should sort experiments by date descending', async () => {
        const mockDirs: MockDirent[] = [
            { name: '(exp1)', isDirectory: () => true },
            { name: '(exp2)', isDirectory: () => true },
            { name: '(exp3)', isDirectory: () => true },
            { name: 'not-an-exp', isDirectory: () => true },
            { name: 'some-file.txt', isDirectory: () => false },
        ];

        // Mock readdir to return directories
        vi.mocked(fs.readdir).mockResolvedValue(mockDirs as unknown as Dirent[]);

        // Mock readFile to return config for each experiment
        vi.mocked(fs.readFile).mockImplementation(async (filePath) => {
            const pathStr = String(filePath);
            if (pathStr.includes('(exp1)')) {
                return JSON.stringify({
                    title: 'Exp 1',
                    slug: 'exp1',
                    created: '2023-01-01T00:00:00.000Z'
                });
            }
            if (pathStr.includes('(exp2)')) {
                return JSON.stringify({
                    title: 'Exp 2',
                    slug: 'exp2',
                    created: '2023-01-02T00:00:00.000Z' // Newest
                });
            }
            if (pathStr.includes('(exp3)')) {
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
        const mockDirs: MockDirent[] = [
            { name: '(exp1)', isDirectory: () => true },
        ];

        vi.mocked(fs.readdir).mockResolvedValue(mockDirs as unknown as Dirent[]);
        vi.mocked(fs.readFile).mockRejectedValue(new Error('File not found'));

        const experiments = await getExperiments();
        expect(experiments).toHaveLength(0);
    });
});
