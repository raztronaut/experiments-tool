import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import Page from '../src/app/(main)/page'

test('Home page renders experiments list', () => {
    render(<Page />)
    expect(screen.getByText('Experiments')).toBeDefined()
    expect(screen.getByText('Chat Send Button')).toBeDefined()
    expect(screen.getByText('Shader Landing')).toBeDefined()
})
