import { describe, expect, test } from 'vitest'
import { Brightness, toBrightness, toggleBrightness } from './brightness.js'

describe('toBrightness', () => {
	test(Brightness.dark, () => {
		const result = toBrightness(Brightness.dark)
		expect(result).toBe(Brightness.dark)
	})

	test(Brightness.light, () => {
		const result = toBrightness(Brightness.light)
		expect(result).toBe(Brightness.light)
	})

	test(String(undefined), () => {
		const result = toBrightness(undefined)
		expect(result).toBe(Brightness.light)
	})
})

describe('toggleBrightness', () => {
	test(Brightness.dark, () => {
		const result = toggleBrightness(Brightness.dark)
		expect(result).toBe(Brightness.light)
	})

	test(Brightness.light, () => {
		const result = toggleBrightness(Brightness.light)
		expect(result).toBe(Brightness.dark)
	})
})
