const { test, expect } = require("@playwright/test");

test.only("Browser Context Test", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title())

    await page.locator(`input#username`).fill("rahulshettyacademy");
    await page.locator(`[type="password"]`).fill("learning");
    await page.locator(`#signInBtn`).click();

    await page.locator(`//a[normalize-space(text())='Home']`).waitFor();
    console.log(await page.title());

    await page.locator(`//a[normalize-space(text())='Shop']`).click();
});

test("Page Playwright Test", async ({ page }) => {
    await page.goto("https://Google.com/");
    console.log(await page.title())

    await expect(page).toHaveTitle("Google");
})

test("Entering wrong username and password", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    page.getAttribute()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title())

    await page.locator(`input#username`).fill("rahulshetty");
    await page.locator(`[type="password"]`).fill("learning");
    await page.locator(`#signInBtn`).click();

    console.log(await page.locator(`[style*="block"]`).textContent())
    const validateString = `Incorrect`;
    const errorLocator = page.locator(`[style*="block"]`);
    await expect(errorLocator).toContainText(validateString);

    await page.locator(`input#username`).fill("");
    await page.locator(`input#username`).fill("rahulshettyacademy");
    await page.locator(`#signInBtn`).click();

    console.log(await page.locator(`.card-body a`).nth(0).textContent())
    console.log(await page.locator(`.card-body a`).allTextContents())
});

test("Hi", async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("")

    console.log(page.title())
})