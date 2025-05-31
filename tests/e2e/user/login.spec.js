import { test, expect } from '@playwright/test'

test('Visible', async ({ page }) => {
  await page.goto('https://lawyerhub.ru/login')
  const locator1 = page.locator('._rightWrapper_gwt5v_17')
  const locator2 = page.locator('._leftWrapper_gwt5v_7')
	const locator3 = page.locator('._logo_gwt5v_97')
  await expect(locator1).toBeVisible()
  await expect(locator2).toBeVisible()
	await expect(locator3).toBeVisible()
})

test('Interactivity', async ({page}) => {
	await page.goto('https://lawyerhub.ru/login')
	const mail = 'Arias@mail.com'
	const password = '123454321'
	await page.getByRole('textbox', { name: 'Почта' }).fill(mail)
	await page.getByRole('textbox', { name: 'Пароль' }).fill(password)
	await expect(page.getByRole('textbox', { name: 'Пароль' })).toHaveValue(password)
	await expect(page.getByRole('textbox', { name: 'Почта' })).toHaveValue(mail)
})