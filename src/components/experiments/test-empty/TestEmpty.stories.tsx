import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import TestEmpty from './TestEmpty';

const meta = {
title: 'Experiments/Test Empty',
component: TestEmpty,
parameters: {
layout: 'centered',
},
} satisfies Meta<typeof TestEmpty>;

    export default meta;
    type Story = StoryObj<typeof meta>;

        export const Default: Story = {};