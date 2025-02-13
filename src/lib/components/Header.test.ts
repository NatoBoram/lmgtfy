import { render, screen } from '@testing-library/svelte'
import { test } from 'vitest'
import Header from './Header.svelte'

test('Header', ({ expect }) => {
	render(Header)

	const button = screen.getByRole<HTMLButtonElement>('button')
	expect(button).toBeDefined()
})
