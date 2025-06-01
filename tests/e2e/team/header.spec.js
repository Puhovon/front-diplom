import { test, expect } from '@playwright/test'

test('Visible', async ({ page }) => {
  await page.goto('https://lawyerhub.ru/team')
    const locator = page.getByRole('banner')
  await expect(locator).toBeVisible()
})
