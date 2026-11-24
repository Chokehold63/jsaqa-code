const { test, expect } = require("@playwright/test");
const { email, password } = require("../user");

test('Successful login', async ({ page }) => {

  await page.goto("https://netology.ru/?modal=sign_in");
  await page.locator('[data-testid="profile-personal-info-avatar-popup"]').click();
//   await page.locator(".styles_button__MYGdj").click();
  await page.click("text=Другие способы входа");
  await page.click("text=Войти по почте");  
  await page.locator("input[name=\"email\"]").fill(email);
  await page.locator("input[name=\"password\"]").hover();
  await page.locator("input[name=\"password\"]").click();
  await page.locator("input[name=\"password\"]").fill(password);
  await page.locator('[data-testid="login-submit-btn"]').click();
  await expect(page).toHaveURL(/\/profile\/\d+$/);
  await page.waitForTimeout(6000);
  await expect(page.locator('text=Здравствуйте, Константин')).toBeVisible();;
}); 

test('Unsuccessful login', async ({ page }) => {

  await page.goto("https://netology.ru/?modal=sign_in");
  await page.locator('[data-testid="profile-personal-info-avatar-popup"]').click();
//   await page.locator(".styles_button__MYGdj").click();
  await page.click("text=Другие способы входа");
  await page.click("text=Войти по почте");  
  await page.locator("input[name=\"email\"]").fill("abc@df.ru");
  await page.locator("input[name=\"password\"]").hover();
  await page.locator("input[name=\"password\"]").click();
  await page.locator("input[name=\"password\"]").fill("12345");
  await page.locator('[data-testid="login-submit-btn"]').click();
  await expect(
  page.locator('[data-testid="login-error-hint"]')
).toHaveText("Вы ввели неправильно логин или пароль.");
}); 