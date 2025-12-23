import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import TestEmpty from './TestEmpty';

test('Test Empty renders correctly', () => {
render(
<TestEmpty />);
expect(screen.getByText('Test Empty')).toBeDefined();
});