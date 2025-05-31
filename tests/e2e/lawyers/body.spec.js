/*
import { test, expect } from '@playwright/test'

test('Visible', async ({ page }) => {
  await page.goto('http://localhost:5173/lawyers')
  const locator1 = page.locator('._lawyerNone_1ml71_132')
  const locator2 = page.locator('._filters_1ml71_12')
  await expect(locator1).toBeVisible()
  await expect(locator2).toBeVisible()
})

test('Interactivity', async ({page}) => {
    await page.goto('http://localhost:5173/lawyers')
    const name = 'Иван'
		await page.locator('id=search').fill(name)
		await expect(page.locator('id=search')).toHaveValue(name)
})
*/