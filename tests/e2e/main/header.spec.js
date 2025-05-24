import { test, expect } from '@playwright/test'

test('Visible', async ({ page }) => {
  await page.goto('http://localhost:5173/')
	const locator = page.getByRole('banner')
  await expect(locator).toBeVisible()
})
