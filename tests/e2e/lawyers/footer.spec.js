/*
import { test, expect } from '@playwright/test'

test('Visible', async ({ page }) => {
  await page.goto('http://localhost:5173/lawyers')
  const locator = page.getByRole('contentinfo')
  await expect(locator).toBeVisible()
})

test('Interactivity', async ({page}) => {
    await page.goto('http://localhost:5173/lawyers')
    const mail = 'Arias@mail.com'
    await page.getByRole('textbox', { name: 'Введите электронную почту' }).fill(mail)
    await expect(page.getByRole('textbox', { name: 'Введите электронную почту' })).toHaveValue(mail)
})
*/