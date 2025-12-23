import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ExperimentList } from '../src/components/ui/ExperimentList'

test('Home page renders experiments list', () => {
    const mockExperiments = [
        { title: "Chat Send Button", description: "desc", slug: "chat-button", href: "/experiments/chat-button", created: "2023-01-01" },
        { title: "Shader Landing", description: "desc", slug: "shader-landing", href: "/experiments/shader-landing", created: "2023-01-01" }
    ];

    render(<ExperimentList experiments={mockExperiments} />)

    expect(screen.getByText('Chat Send Button')).toBeDefined()
    expect(screen.getByText('Shader Landing')).toBeDefined()
})
