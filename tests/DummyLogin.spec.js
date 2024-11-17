const { test, expect } = require("@playwright/test");

test("Entering wrong username and password", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title())

    await page.locator(`#userEmail`).fill("anshika@gmail.com");
    await page.locator(`#userPassword`).fill("Iamking@000");
    await page.locator(`[value='Login']`).click();

    await page.locator(`.card-body b`).first().waitFor();
    console.log(page.locator(`.card-body b`).allTextContents())
});