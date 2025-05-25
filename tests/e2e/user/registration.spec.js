import { test, expect } from '@playwright/test'

test('Visible', async ({ page }) => {
  await page.goto('http://localhost:5173/registration')
  const locator1 = page.locator('._leftWrapper_7x69e_13')
  const locator2 = page.locator('._rightWrapper_7x69e_22')
  const locator3 = page.locator('._logo_7x69e_7')
  await expect(locator1).toBeVisible()
  await expect(locator2).toBeVisible()
  await expect(locator3).toBeVisible()
})

test('Interactivity User', async ({page}) => {
	await page.goto('http://localhost:5173/registration')
	const name = 'Иван'
	const mail = 'Arias@mail.com'
	const password = '123454321'
	await page.getByRole('textbox', { name: 'Имя' }).fill(name)
	await page.getByRole('textbox', { name: 'Почта' }).fill(mail)
	await page.locator('id=pass').fill(password)
	await page.locator('id=passRepeat').fill(password)
	await expect(page.getByRole('textbox', { name: 'Имя' })).toHaveValue(name)
	await expect(page.getByRole('textbox', { name: 'Почта' })).toHaveValue(mail)
	await expect(page.locator('id=pass')).toHaveValue(password)
	await expect(page.locator('id=passRepeat')).toHaveValue(password)
})

test('Interactivity Lawyer 1', async ({page}) => {
	await page.goto('http://localhost:5173/registration')
	const name = 'Иван'
	const mail = 'Arias@mail.com'
	const password = '123454321'
	await page.getByText('Предоставляю услуги').click()
	await page.getByRole('textbox', { name: 'Имя' }).fill(name)
	await page.getByRole('textbox', { name: 'Почта' }).fill(mail)
	await page.locator('id=pass').fill(password)
	await page.locator('id=passRepeat').fill(password)
	await expect(page.getByRole('textbox', { name: 'Имя' })).toHaveValue(name)
	await expect(page.getByRole('textbox', { name: 'Почта' })).toHaveValue(mail)
	await expect(page.locator('id=pass')).toHaveValue(password)
	await expect(page.locator('id=passRepeat')).toHaveValue(password)
})

test('Interactivity Lawyer 2', async ({page}) => {
	await page.goto('http://localhost:5173/registration')
	const specialization = 'Уголовное право'
	const job = '10 лет'
	const education = 'МГУ'
	const region = 'Санкт-Петербург'
	const license = '1857813194783'
	await page.getByText('Предоставляю услуги').click()
	await page.getByRole('button', { name: 'Далее' }).click()
	await page.getByRole('textbox', { name: 'Специализация' }).fill(specialization)
	await page.getByRole('textbox', { name: 'Опыт работы' }).fill(job)
	await page.getByRole('textbox', { name: 'Образование' }).fill(education)
	await page.getByRole('textbox', { name: 'Регион работы' }).fill(region)
	await page.getByRole('textbox', { name: 'Номер лицензии' }).fill(license)
	await expect(page.getByRole('textbox', { name: 'Специализация' })).toHaveValue(specialization)
	await expect(page.getByRole('textbox', { name: 'Опыт работы' })).toHaveValue(job)
	await expect(page.getByRole('textbox', { name: 'Образование' })).toHaveValue(education)
	await expect(page.getByRole('textbox', { name: 'Регион работы' })).toHaveValue(region)
	await expect(page.getByRole('textbox', { name: 'Номер лицензии' })).toHaveValue(license)
})

test('Interactivity Lawyer 3', async ({page}) => {
	await page.goto('http://localhost:5173/registration')
	await page.getByText('Предоставляю услуги').click()
	await page.getByRole('button', { name: 'Далее' }).click()
	await page.getByRole('button', { name: 'Далее' }).click()
	//Having no file, I will perform a visibility check.
	await expect(page.locator('._registrationForm_7x69e_67')).toBeVisible()
})