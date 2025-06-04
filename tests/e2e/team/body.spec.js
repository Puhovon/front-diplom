import { test, expect } from '@playwright/test'

test('Visible', async ({ page }) => {
  await page.goto('https://lawyerhub.ru/team')
  const locator = page.locator('._teamContainer_1754j_1')
  await expect(locator).toBeVisible()
})