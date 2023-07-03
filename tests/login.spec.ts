import { test, expect } from "@playwright/test";

test("login with correct credentials", async ({ page }) => {
  //Arrange
  const url = "https://demo-bank.vercel.app/";
  const userId = "test1234";
  const userPassword = "test1234";
  const expectedUserName = "Jan Demobankowy";
  //Act
  await page.goto(url);
  await page.getByTestId("login-input").fill(userId);
  await page.getByTestId("password-input").fill(userPassword);
  await page.getByTestId("login-button").click();
  //Assert
  await expect(page.getByTestId("user-name")).toHaveText(expectedUserName);
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

// ctrl + shift + R - zrobienie refaktoryzacji
// alt + strzalka przesuniecie lini