import { test, expect } from '@playwright/test'

test('Visible', async ({ page }) => {
  await page.goto('http://localhost:5173/')
	const locator1 = page.locator('._hero_13xib_1')
  const locator2 = page.locator('._specializations_13xib_56')
  await expect(locator1).toBeVisible()
  await expect(locator2).toBeVisible()
})
