import { test, expect } from '@playwright/test'

test('Visible', async ({ page }) => {
  await page.goto('https://lawyerhub.ru/registration')
  const locator1 = page.locator('._leftWrapper_1tzsr_19')
  const locator2 = page.locator('._rightWrapper_1tzsr_27')
  const locator3 = page.locator('._logo_1tzsr_11')
  await expect(locator1).toBeVisible()
  await expect(locator2).toBeVisible()
  await expect(locator3).toBeVisible()
})

test('Interactivity User', async ({page}) => {
	await page.goto('https://lawyerhub.ru/registration')
	const firstName = 'Иван'
	const secondName = 'Ианов'
	const thirdName = 'Иванович'
	const mail = 'Arias@mail.com'
	const birthday = '04112006'
	const birthdayCheck = '2006-04-11'
	const password = '123454321'
	await page.getByRole('textbox', { name: 'Имя' }).fill(firstName)
	await page.getByRole('textbox', { name: 'Фамилия' }).fill(secondName)
	await page.locator('id=patronymic').fill(thirdName)
	await page.getByRole('textbox', { name: 'Почта' }).fill(mail)
	await page.locator('id=birthDate').pressSequentially(birthday)
	await page.locator('id=pass').fill(password)
	await page.locator('id=passRepeat').fill(password)
	await page.getByRole('radio', { name: 'Мужской' }).click()
	await expect(page.getByRole('textbox', { name: 'Имя' })).toHaveValue(firstName)
	await expect(page.getByRole('textbox', { name: 'Фамилия' })).toHaveValue(secondName)
	await expect(page.locator('id=patronymic')).toHaveValue(thirdName)
	await expect(page.getByRole('textbox', { name: 'Почта' })).toHaveValue(mail)
	await expect(page.locator('id=birthDate')).toHaveValue(birthdayCheck)
	await expect(page.locator('id=pass')).toHaveValue(password)
	await expect(page.locator('id=passRepeat')).toHaveValue(password)
	await expect(page.getByRole('radio', { name: 'Мужской' })).toBeChecked()
})

test('Interactivity Lawyer 1', async ({page}) => {
	await page.goto('https://lawyerhub.ru/registration')
	const firstName = 'Иван'
	const secondName = 'Ианов'
	const thirdName = 'Иванович'
	const mail = 'Arias@mail.com'
	const birthday = '04112006'
	const birthdayCheck = '2006-04-11'
	const password = 'BaRs123454321'
	await page.getByText('Предоставляю услуги').click()
	await page.getByRole('textbox', { name: 'Имя' }).fill(firstName)
	await page.getByRole('textbox', { name: 'Фамилия' }).fill(secondName)
	await page.locator('id=patronymic').fill(thirdName)
	await page.getByRole('textbox', { name: 'Почта' }).fill(mail)
	await page.locator('id=birthDate').pressSequentially(birthday)
	await page.locator('id=pass').fill(password)
	await page.locator('id=passRepeat').fill(password)
	await page.getByRole('radio', { name: 'Мужской' }).click()
	await expect(page.getByRole('textbox', { name: 'Имя' })).toHaveValue(firstName)
	await expect(page.getByRole('textbox', { name: 'Фамилия' })).toHaveValue(secondName)
	await expect(page.locator('id=patronymic')).toHaveValue(thirdName)
	await expect(page.getByRole('textbox', { name: 'Почта' })).toHaveValue(mail)
	await expect(page.locator('id=birthDate')).toHaveValue(birthdayCheck)
	await expect(page.locator('id=pass')).toHaveValue(password)
	await expect(page.locator('id=passRepeat')).toHaveValue(password)
})

test('Interactivity Lawyer 2', async ({page}) => {
	await page.goto('https://lawyerhub.ru/registration')
	const firstName = 'Иван'
	const secondName = 'Ианов'
	const thirdName = 'Иванович'
	const mail = 'Arias@mail.com'
	const birthday = '04112006'
	const password = 'BaRs123454321'
	const job = '10 лет'
	const education = 'МГУ'
	const region = 'Санкт-Петербург'
	const license = '1857813194783'
	await page.getByText('Предоставляю услуги').click()
	await page.getByRole('textbox', { name: 'Имя' }).fill(firstName)
	await page.getByRole('textbox', { name: 'Фамилия' }).fill(secondName)
	await page.locator('id=patronymic').fill(thirdName)
	await page.getByRole('textbox', { name: 'Почта' }).fill(mail)
	await page.locator('id=birthDate').pressSequentially(birthday)
	await page.locator('id=pass').fill(password)
	await page.locator('id=passRepeat').fill(password)
	await page.getByRole('radio', { name: 'Мужской' }).click()
	await page.getByRole('button', { name: 'Далее' }).click()
	await page.getByRole('textbox', { name: 'Опыт работы' }).fill(job)
	await page.getByRole('textbox', { name: 'Образование' }).fill(education)
	await page.getByRole('textbox', { name: 'Регион работы' }).fill(region)
	await page.getByRole('textbox', { name: 'Номер лицензии' }).fill(license)
	await expect(page.getByRole('textbox', { name: 'Опыт работы' })).toHaveValue(job)
	await expect(page.getByRole('textbox', { name: 'Образование' })).toHaveValue(education)
	await expect(page.getByRole('textbox', { name: 'Регион работы' })).toHaveValue(region)
	await expect(page.getByRole('textbox', { name: 'Номер лицензии' })).toHaveValue(license)
})