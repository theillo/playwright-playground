import { test, expect } from "@playwright/test";

test("login with correct credentials", async ({ page }) => {
  await page.goto("https://demo-bank.vercel.app/");
  await page.getByTestId("login-input").fill("test1234");
  await page.getByTestId("password-input").fill("test1234");
  await page.getByTestId("login-button").click();
  await expect(page.getByTestId("user-name")).toHaveText("Jan Demobankowy");
});

test("login with incorrect username", async ({ page }) => {
  await page.goto("https://demo-bank.vercel.app/");
  // await page.getByTestId("login-input").click();
  await page.getByTestId("login-input").fill("test");
  await page.getByTestId("password-input").click();
  await expect(page.getByTestId("error-login-id")).toHaveText(
    "identyfikator ma min. 8 znaków"
  );
});
test("login with incorrect password", async ({ page }) => {
  await page.goto("https://demo-bank.vercel.app/");
  // await page.getByTestId("login-input").click();
  await page.getByTestId("login-input").fill("123testz");
  // await page.getByTestId("password-input").click();
  await page.getByTestId("password-input").fill("32");
  // await page.locator('#login_password_container label').click();
  await page.getByTestId("password-input").blur();
  await expect(page.getByTestId("error-login-password")).toHaveText(
    "hasło ma min. 8 znaków"
  );
});
