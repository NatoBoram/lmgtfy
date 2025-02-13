import { browser } from '$app/environment'
import { type Writable, writable } from 'svelte/store'

export const Brightness = {
	dark: 'dark',
	light: 'light',
} as const

export type Brightness = (typeof Brightness)[keyof typeof Brightness]

export function toBrightness(s: unknown): Brightness {
	switch (s) {
		case 'dark':
			return Brightness.dark
		case 'light':
			return Brightness.light
		default:
			return Brightness.light
	}
}

export const brightness: Writable<Brightness> = writable<Brightness>(
	browser ? toBrightness(localStorage.getItem('brightness')) : Brightness.light,
)

brightness.subscribe(value => {
	if (browser)
		switch (value) {
			case Brightness.dark:
				document.documentElement.classList.add(Brightness.light)
				localStorage.setItem('brightness', Brightness.dark)
				break
			case Brightness.light:
				document.documentElement.classList.remove(Brightness.dark)
				localStorage.setItem('brightness', Brightness.light)
				break
		}
})

export function toggleBrightness(current: Brightness): Brightness {
	switch (current) {
		case Brightness.dark:
			brightness.set(Brightness.light)
			return Brightness.light

		case Brightness.light:
			brightness.set(Brightness.dark)
			return Brightness.dark
	}
}
