import type { Meta, StoryObj } from '@storybook/react';
import { ChatSendButton } from './chat-send-button';

const meta = {
    title: 'Experiments/ChatSendButton',
    component: ChatSendButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof ChatSendButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InContainer: Story = {
    decorators: [
        (Story) => (
            <div className="w-[400px] bg-black p-8 rounded-xl">
                <Story />
            </div>
        ),
    ],
};
