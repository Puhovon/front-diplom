import { test, expect } from '@playwright/test'

test('Visible', async ({ page }) => {
  await page.goto('https://lawyerhub.ru/')
	const locator1 = page.locator('._hero_1msg3_1')
  const locator2 = page.locator('._specializations_1msg3_62')
  await expect(locator1).toBeVisible()
  await expect(locator2).toBeVisible()
})
