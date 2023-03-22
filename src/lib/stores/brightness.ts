import { browser } from '$app/environment'
import { writable } from 'svelte/store'

export enum Brightness {
	dark = 'dark',
	light = 'light',
}

function toBrightness(s: string | null): Brightness {
	switch (s) {
		case 'dark':
			return Brightness.dark
		case 'light':
			return Brightness.light
		default:
			return Brightness.light
	}
}

export const brightness = writable<Brightness>(
	browser ? toBrightness(localStorage.getItem('brightness')) : Brightness.light,
)

brightness.subscribe(value => {
	if (browser)
		switch (value) {
			case Brightness.dark:
				document.querySelector('html')?.classList.add('dark')
				localStorage.setItem('brightness', Brightness.dark)
				break
			case Brightness.light:
				document.querySelector('html')?.classList.remove('dark')
				localStorage.setItem('brightness', Brightness.light)
				break
		}
})
