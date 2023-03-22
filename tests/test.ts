import { expect, test } from '@playwright/test'

test('index page has expected elements', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByText('Lmgtfy', { exact: true })).toBeVisible()
	await expect(page.getByText('Let me Google that for you', { exact: true })).toBeVisible()
	await expect(page.getByText('Google Search', { exact: true })).toBeVisible()
	await expect(page.getByText("I'm Feeling Lucky", { exact: true })).toBeVisible()
})
